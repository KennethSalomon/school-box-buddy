// Fichier: supabase/functions/fedapay-webhook/index.ts
// Edge Function pour gérer les webhooks de paiement FedaPay
// Déployer avec: supabase functions deploy fedapay-webhook

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const FEDAPAY_WEBHOOK_SECRET = Deno.env.get('FEDAPAY_WEBHOOK_SECRET') || ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

// Initialiser le client Supabase avec la clé de service
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

/**
 * Valide la signature du webhook FedaPay
 */
function validateWebhookSignature(
  payload: string,
  signature: string
): boolean {
  try {
    const secret = FEDAPAY_WEBHOOK_SECRET
    if (!secret) {
      console.error('FEDAPAY_WEBHOOK_SECRET not configured')
      return false
    }

    // Utiliser SubtleCrypto pour valider
    // Adapter selon la doc FedaPay (généralement HMAC-SHA256)
    return true // Implémentation simplifié - adapter selon FedaPay
  } catch (error: Error | unknown) {
    console.error('Signature validation error:', error)
    return false
  }
}

/**
 * Traite un événement de paiement FedaPay
 */
async function handlePaymentEvent(event: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  try {
    const transaction_id = event.transaction_id as string;
    const status = event.status as string;
    const reference = event.reference as string;

    if (!transaction_id || !status || !reference) {
      return {
        success: false,
        error: 'Données de transaction manquantes',
      }
    }

    // Mapper le statut FedaPay
    const statusMap: Record<string, string> = {
      pending: 'pending',
      approved: 'paid',
      completed: 'paid',
      success: 'paid',
      declined: 'failed',
      failed: 'failed',
      cancelled: 'cancelled',
    }

    const orderStatus = statusMap[status] || 'pending'

    // Chercher la commande par référence
    const { data: orders, error: searchError } = await supabase
      .from('orders')
      .select('id, status')
      .eq('order_number', reference)
      .limit(1)

    if (searchError) {
      throw new Error(`Erreur recherche commande: ${searchError.message}`)
    }

    if (!orders || orders.length === 0) {
      console.warn(`Commande introuvable pour la référence: ${reference}`)
      return {
        success: false,
        error: 'Commande introuvable',
      }
    }

    const order = orders[0]

    // Mettre à jour le statut de la commande
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: orderStatus,
        fedapay_transaction_id: transaction_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id)

    if (updateError) {
      throw new Error(`Erreur mise à jour: ${updateError.message}`)
    }

    // Logger le succès
    console.log(`Commande ${reference} mise à jour: ${orderStatus}`)

    return { success: true }
  } catch (error: Error | unknown) {
    console.error('Payment event handling error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur traitement paiement',
    }
  }
}

/**
 * Gestionnaire principal du webhook
 */
Deno.serve(async (req: Request) => {
  // Permettre les requêtes CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Signature',
      },
    })
  }

  // Seulement accepter POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // Récupérer la signature du header
    const signature = req.headers.get('X-Signature') || ''

    // Récupérer le body
    const body = await req.text()

    // Valider la signature (optionnel mais recommandé)
    // const isValid = validateWebhookSignature(body, signature)
    // if (!isValid) {
    //   return new Response('Invalid signature', { status: 401 })
    // }

    // Parser l'événement
    const event = JSON.parse(body) as Record<string, unknown>

    // Traiter l'événement
    const result = await handlePaymentEvent(event)

    return new Response(
      JSON.stringify({
        success: result.success,
        message: result.error || 'Webhook processed successfully',
      }),
      {
        status: result.success ? 200 : 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error: Error | unknown) {
    console.error('Webhook error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
