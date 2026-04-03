
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const FEDAPAY_API_KEY = Deno.env.get('FEDAPAY_API_KEY') || ''
const FEDAPAY_API_URL = 'https://api.fedapay.com/v1'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

// Initialiser le client Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

/**
 * Récupère le statut d'une transaction FedaPay
 */
async function getTransactionStatus(transactionId: string): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${FEDAPAY_API_URL}/transactions/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${FEDAPAY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`FedaPay API error: ${response.status}`)
    }

    return await response.json() as Record<string, unknown>
  } catch (error: Error | unknown) {
    console.error('FedaPay API error:', error)
    throw error
  }
}

/**
 * Gestionnaire du contrôle de statut de paiement
 */
Deno.serve(async (req: Request) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  // Vérifier l'authentification (token JWT Supabase)
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const url = new URL(req.url)
    const orderId = url.searchParams.get('order_id')

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'order_id parameter required' }),
        { status: 400 }
      )
    }

    // Récupérer l'ID de transaction FedaPay depuis la base de données
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('fedapay_transaction_id, status')
      .eq('id', orderId)
      .single()

    if (fetchError) {
      throw new Error(`Erreur récupération commande: ${fetchError.message}`)
    }

    if (!order) {
      return new Response(
        JSON.stringify({ error: 'Commande introuvable' }),
        { status: 404 }
      )
    }

    if (!order.fedapay_transaction_id) {
      return new Response(
        JSON.stringify({
          status: order.status,
          message: 'Pas de transaction FedaPay pour cette commande',
        })
      )
    }

    // Récupérer le statut depuis FedaPay
    const transaction = await getTransactionStatus(
      order.fedapay_transaction_id as string
    )

    // Mapper le statut
    const statusMap: Record<string, string> = {
      pending: 'pending',
      approved: 'paid',
      completed: 'paid',
      success: 'paid',
      declined: 'failed',
      failed: 'failed',
      cancelled: 'cancelled',
    }

    const mappedStatus = statusMap[(transaction.status as string) || 'pending'] || 'pending'

    // Mettre à jour s'il y a un changement
    if (mappedStatus !== order.status) {
      await supabase
        .from('orders')
        .update({ status: mappedStatus })
        .eq('id', orderId)
    }

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderId,
        status: mappedStatus,
        transaction_status: transaction.status,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error: Error | unknown) {
    console.error('Check payment error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Erreur vérification paiement',
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
