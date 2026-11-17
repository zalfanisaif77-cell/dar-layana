# Dar Layana — Site + back-office V2

Site Next.js/TypeScript pour présenter Dar Layana à Hammamet, promouvoir les séjours et événements et traiter les demandes clients.

## Pages
- `/` : accueil et valeur des services
- `/house` : identité et esprit de la maison
- `/rooms` : catalogue des séjours
- `/experiences` : table, détente et événements
- `/gallery` : galerie de photos d'ambiance à remplacer par les photos officielles
- `/booking` : formulaire de demande de réservation, **sans confirmation automatique**
- `/contact` : contact
- `/admin` : gestion sécurisée des demandes, messages, offres et photos

## Installation
```bash
npm install
npm run dev
```
Configurer ensuite Supabase avec les étapes de [SETUP.md](./SETUP.md).

## Statut
Version en développement : la base Supabase et l'administrateur doivent être créés. Pas encore de paiement, réservation instantanée, email transactionnel, synchronisation Booking/Airbnb, ou calendrier anti-double-réservation. Les photos externes sont des exemples d'ambiance, pas des photos certifiées Dar Layana. Aucun DNS ni site public n'a été modifié.

Le site peut être déployé sur Vercel une fois la validation et les tests effectués.

## Recherche documentaire
Les informations factuelles, tarifs indicatifs et contradictions des sources sont détaillés dans [RESEARCH-DAR-LAYANA.md](./RESEARCH-DAR-LAYANA.md). 
Le nouveau formulaire /booking est un parcours touristique en 3 étapes, incluant une estimation tarifaire **non contractuelle** et un contact direct via WhatsApp ou téléphone.
