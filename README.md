# Dar Layana — Website + Back Office Template V1

Première version de démonstration du futur site direct-booking Dar Layana.

## Ce qui est inclus
- Site public premium : Home, Maison, Chambres, Expériences, Galerie, Contact.
- Prototype de réservation avec calcul du total et de l'acompte de 50%.
- Back-office visuel accessible sur `/admin`.
- Dashboard, réservations, calendrier, chambres, services, clients, paiements, messages, paramètres (plusieurs écrans sont encore des placeholders).
- Design responsive.
- Photos de démonstration extraites des captures sociales fournies par le client.

## Important
C'est un TEMPLATE. Il n'y a pas encore :
- base de données réelle,
- paiement réel,
- authentification sécurisée,
- email transactionnel,
- synchronisation Booking/Airbnb,
- vraie disponibilité.

Mot de passe admin de démonstration : `demo123`

## Lancer en local avec PowerShell
```powershell
npm install
npm run dev
```

Puis ouvrir : http://localhost:3000

Back-office : http://localhost:3000/admin

## Déploiement recommandé
GitHub = dépôt du code.
Pour mettre le site en ligne facilement avec Next.js, connecter le dépôt GitHub à Vercel. La future V2 avec base de données et paiement fonctionnera également mieux sur Vercel/Supabase que sur GitHub Pages.

## Prochaines étapes après validation client
1. Remplacer les placeholders par les vraies données.
2. Ajouter Supabase PostgreSQL + Auth + Storage.
3. Créer la vraie gestion chambres/services/prix.
4. Construire le calendrier de disponibilité anti-double-réservation.
5. Intégrer le paiement de 50%.
6. Ajouter emails de confirmation.
7. Ajouter FR / EN / AR.
8. Sécuriser `/admin` et implémenter les rôles.
