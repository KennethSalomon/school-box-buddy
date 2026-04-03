/**
 * FedaPay Service - Intégration avec l'API FedaPay
 * Gère les transactions, webhooks et paiements
 */

export interface FedaPayTransaction {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  metadata: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface FedaPayInitiateRequest {
  amount: number;
  currency?: string;
  description: string;
  reference: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  metadata?: Record<string, unknown>;
  callback_url?: string;
}

export interface FedaPayInitiateResponse {
  success: boolean;
  data?: {
    id: string;
    link: string;
    reference: string;
  };
  error?: string;
}

class FedaPayService {
  private apiKey: string;
  private apiUrl = 'https://api.fedapay.com/v1';
  private currency: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_FEDAPAY_API_KEY || '';
    this.currency = import.meta.env.VITE_FEDAPAY_CURRENCY || 'XOF';

    if (!this.apiKey) {
      console.warn('FedaPay API Key not configured');
    }
  }

  /**
   * Initie une transaction de paiement
   */
  async initiatePayment(payload: FedaPayInitiateRequest): Promise<FedaPayInitiateResponse> {
    try {
      if (!this.apiKey) {
        throw new Error('FedaPay API Key not configured');
      }

      if (!payload.amount || payload.amount <= 0) {
        throw new Error('Montant invalide');
      }

      if (!payload.reference) {
        throw new Error('Référence de commande obligatoire');
      }

      const requestPayload = {
        ...payload,
        currency: payload.currency || this.currency,
        amount: Math.round(payload.amount * 100), // Convert to cents
      };

      const response = await fetch(`${this.apiUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
        throw new Error(
          (errorData?.message as string) || `FedaPay error: ${response.status}`
        );
      }

      const data = await response.json() as Record<string, unknown>;

      return {
        success: true,
        data: {
          id: (data.id as string) || '',
          link: (data.authorization_url as string) || (data.link as string) || '',
          reference: (data.reference as string) || '',
        },
      };
    } catch (error: Error | unknown) {
      console.error('FedaPay initiation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'initiation du paiement',
      };
    }
  }

  /**
   * Vérifie le statut d'une transaction
   */
  async getTransactionStatus(transactionId: string): Promise<FedaPayTransaction | null> {
    try {
      if (!this.apiKey) {
        throw new Error('FedaPay API Key not configured');
      }

      const response = await fetch(
        `${this.apiUrl}/transactions/${transactionId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`FedaPay API error: ${response.status}`);
      }

      const data = await response.json() as Record<string, unknown>;

      return {
        id: (data.id as string) || '',
        reference: (data.reference as string) || '',
        amount: ((data.amount as number) || 0) / 100, // Convert from cents
        currency: (data.currency as string) || '',
        status: this.mapStatus((data.status as string) || 'pending'),
        description: (data.description as string) || '',
        metadata: (data.metadata as Record<string, unknown>) || {},
        created_at: data.created_at as string,
        updated_at: data.updated_at as string,
      };
    } catch (error: Error | unknown) {
      console.error('FedaPay status check error:', error);
      return null;
    }
  }

  /**
   * Valide la signature d'un webhook FedaPay
   */
  validateWebhookSignature(payload: string, signature: string): boolean {
    try {
      const secret = import.meta.env.VITE_FEDAPAY_WEBHOOK_SECRET || '';
      
      if (!secret) {
        console.warn('FedaPay webhook secret not configured');
        return false;
      }

      // Implémentation basique - adapter selon la doc FedaPay
      // Utiliser Web Crypto API au lieu de require('crypto')
      // Cette implémentation est simplifiée et nécessite une vraie validation HMAC-SHA256
      const textEncoder = new TextEncoder();
      const secretKey = textEncoder.encode(secret);
      const payloadData = textEncoder.encode(payload);
      
      // Note: Pour une vraie implémentation, utiliser crypto.subtle.sign
      // Pour l'instant, c'est une validation basique
      return signature.length > 0; // Placeholder - adapter selon FedaPay
    } catch (error: Error | unknown) {
      console.error('Webhook signature validation error:', error);
      return false;
    }
  }

  /**
   * Utilitaire interne pour mapper les statuts FedaPay
   */
  private mapStatus(
    status: string
  ): 'pending' | 'completed' | 'failed' | 'cancelled' {
    const statusMap: Record<string, string> = {
      pending: 'pending',
      new: 'pending',
      approved: 'completed',
      completed: 'completed',
      success: 'completed',
      declined: 'failed',
      failed: 'failed',
      cancelled: 'cancelled',
    };

    return statusMap[status] || 'pending';
  }

  /**
   * Formate le montant au format FedaPay (centimes)
   */
  formatAmount(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Déformate le montant depuis le format FedaPay
   */
  unformatAmount(amount: number): number {
    return amount / 100;
  }
}

export const fedaPayService = new FedaPayService();
