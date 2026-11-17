# Dar Layana V2 : configuration

## Déjà développé
- Pages publiques remaniées, galerie et visuels d'ambiance illustratifs, catalogue dynamique.
- Formulaire de demande de réservation : enregistrement dans Supabase après configuration.
- Contact : enregistrement dans Supabase après configuration.
- Espace administrateur sécurisé par Supabase Auth et RLS.
- Gestion des demandes, messages, offres, tarifs optionnels et photos via Supabase Storage.

## Activer les fonctionnalités
1. Créer un nouveau projet Supabase, de préférence dédié à Dar Layana.
2. Exécuter `supabase/schema.sql` dans le SQL Editor.
3. Dans Authentication > Users, créer un administrateur avec email vérifié et mot de passe fort.
4. Dans SQL Editor, exécuter la requête suivante en remplaçant l'email : 
   `insert into public.admin_users(user_id) select id from auth.users where email='ADMIN@EXEMPLE.TN';`
5. Définir sur Vercel ou dans `.env.local` :
   `NEXT_PUBLIC_SUPABASE_URL=https://YOURPROJECT.supabase.co`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY`
   Ne jamais placer la clé service_role dans le navigateur.
6. Déployer le dépôt sur Vercel, relancer le build et tester connexion, création d'offre, photo, message et demande.

## Limites / sécurité
- Les formulaires sont désactivés lorsque Supabase n'est pas configuré.
- Le site reçoit des DEMANDES, pas des réservations confirmées : pas de calendrier temps réel, anti-double réservation, paiement, emails automatiques ou synchronisation Booking/Airbnb.
- Avant lancement public, ajouter protection anti-spam/rate limiting côté serveur, notification email, consentement et politique de confidentialité.
- Valider les tarifs et prestations exacts avec Dar Layana. Les images Unsplash sont illustratives et ne représentent pas nécessairement la maison. Les remplacer par les photographies originales autorisées.
- Ne pas transférer le DNS darlayana.com sans confirmer les accès et sauvegarder le site actuel.
- Tester toutes les policies RLS avant ouverture publique.

## Local
`npm install`
`npm run dev`
Pages : /, /rooms, /experiences, /gallery, /booking, /contact, /admin.

## Demande client via WhatsApp

La page de réservation contient trois étapes (dates, adultes/enfants avec âges, options de repas, coordonnées). L'estimation affiche des tarifs indicatifs issus de l'annonce Vilivio, jamais des disponibilités temps réel. Un bouton prépare une conversation WhatsApp vers le numéro public +216 58 405 413 ; l'existence d'un compte WhatsApp actif sur ce numéro doit être confirmée. Un bouton d'appel reste disponible. Si Supabase est connecté, un autre bouton enregistre la demande dans le back-office.

Un événement spécial peut être proposé sans dates précises : les informations communiquées seront conservées dans le message. Les réservations ne sont jamais automatiquement confirmées.

## Données à valider avant toute communication publique
- Tarif officiel et saisons tarifaires après octobre 2026.
- Conditions d'annulation et capacité réelle : les plateformes ne concordent pas.
- Photographies originales des lieux, autorisations, et nom de la quatrième chambre.
- Numéro WhatsApp actif : le numéro de téléphone peut être distinct du numéro WhatsApp.
- Politique de confidentialité et durée de conservation des contacts.
- Options de paiement et calendrier anti-double réservation pour un moteur de réservation instantané.
