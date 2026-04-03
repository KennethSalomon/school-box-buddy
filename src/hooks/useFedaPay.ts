import { useState } from 'react';
import { fedaPayService, FedaPayInitiateRequest, FedaPayTransaction } from '@/integrations/fedapay/client';

export interface UseFedaPayState {
  loading: boolean;
  error: string | null;
  transaction: FedaPayTransaction | null;
  paymentLink: string | null;
}

export const useFedaPay = () => {
  const [state, setState] = useState<UseFedaPayState>({
    loading: false,
    error: null,
    transaction: null,
    paymentLink: null,
  });

  const initiatePayment = async (payload: FedaPayInitiateRequest) => {
    setState({ loading: true, error: null, transaction: null, paymentLink: null });

    try {
      const result = await fedaPayService.initiatePayment(payload);

      if (!result.success) {
        setState({
          loading: false,
          error: result.error || 'Erreur lors de l\'initiation du paiement',
          transaction: null,
          paymentLink: null,
        });
        return result;
      }

      // Redirection vers FedaPay
      if (result.data?.link) {
        setState({
          loading: false,
          error: null,
          transaction: null,
          paymentLink: result.data.link,
        });
      }

      return result;
    } catch (error: Error | unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors du paiement';
      setState({
        loading: false,
        error: errorMsg,
        transaction: null,
        paymentLink: null,
      });
      return { success: false, error: errorMsg };
    }
  };

  const checkTransactionStatus = async (transactionId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const transaction = await fedaPayService.getTransactionStatus(transactionId);

      if (!transaction) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Transaction introuvable',
        }));
        return null;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        transaction,
      }));

      return transaction;
    } catch (error: Error | unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors de la vérification du statut';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg,
      }));
      return null;
    }
  };

  const reset = () => {
    setState({
      loading: false,
      error: null,
      transaction: null,
      paymentLink: null,
    });
  };

  return {
    ...state,
    initiatePayment,
    checkTransactionStatus,
    reset,
  };
};
