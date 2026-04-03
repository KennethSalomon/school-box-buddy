# Supabase Edge Functions

Ce dossier contient les Edge Functions Supabase nécessaires pour gérer les webhooks et vérifications de paiement FedaPay.

## Déploiement

### Prérequis
- CLI Supabase installée: `npm install supabase`
- Variables d'environnement configurées dans `.env.local` et Supabase

### Configurer les secrets Supabase

```bash
# Configurer les secrets
supabase secrets set FEDAPAY_API_KEY="your-api-key"
supabase secrets set FEDAPAY_WEBHOOK_SECRET="your-webhook-secret"
```

### Déployer les Edge Functions

```bash
# Déployer toutes les functions
supabase functions deploy

# Ou déployer une fonction spécifique
supabase functions deploy fedapay-webhook
supabase functions deploy check-payment-status
```

## Functions disponibles

### 1. `fedapay-webhook`
Reçoit et traite les webhooks de paiement FedaPay.

**Endpoint**: `https://<project-id>.supabase.co/functions/v1/fedapay-webhook`

**Méthode**: POST

**Corps (JSON)**:
```json
{
  "transaction_id": "12345",
  "status": "completed",
  "reference": "ORD-1234567890",
  "amount": 50000
}
```

**Réponse**:
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

### 2. `check-payment-status`
Vérifie le statut actuel d'une transaction FedaPay.

**Endpoint**: `https://<project-id>.supabase.co/functions/v1/check-payment-status?order_id=<order-id>`

**Méthode**: GET

**Headers**:
```
Authorization: Bearer <jwt-token>
```

**Réponse**:
```json
{
  "success": true,
  "order_id": "order-uuid",
  "status": "paid",
  "transaction_status": "completed"
}
```

## Configuration FedaPay

Ajouter l'URL du webhook dans le dashboard FedaPay:
```
https://<project-id>.supabase.co/functions/v1/fedapay-webhook
```

## Statuts de paiement

- `pending` - En attente de paiement
- `paid` - Paiement confirmé
- `failed` - Paiement échoué
- `cancelled` - Paiement annulé

## Troubleshooting

### Les fonctions ne se déploient pas
1. Vérifier les secrets Supabase: `supabase secrets list`
2. Vérifier les logs: `supabase functions list`

### Les webhooks ne sont pas reçus
1. Vérifier l'URL du webhook dans FedaPay dashboard
2. Vérifier les logs: `supabase functions logs fedapay-webhook --no-tailf`

### Erreurs de validation de signature
1. Vérifier que `FEDAPAY_WEBHOOK_SECRET` est correctement défini
2. Adapter la logique de validation selon la documentation FedaPay
