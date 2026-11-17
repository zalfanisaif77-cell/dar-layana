# Dar Layana — Recherche publique du 17 novembre 2026

## Finalité
Base factuelle du site Next.js, à réconcilier avec les informations officielles de la direction. Ne pas déduire les tarifs, disponibilités ou les droits photographiques des plateformes sans vérification.

## Sources
1. Vilivio, fiche Dar Layana : https://vilivio.com/logements/dar-layana/
2. Google Travel, Dar Layana : https://www.google.tn/travel/hotels/entity/CiQIkfbR3cfEpc_tARCS2qXG85vOl2UaDS9nLzExenkwdDhucnQQAg
3. Kharjet, fiche DAR LAYANA : https://www.kharjet.tn/hotels-tunisie/dar-layana/
4. Trivago : https://www.trivago.ca/fr-CA/oar/maison-appartement-entier-dar-layana-hammamet?search=100-49115444
5. Hébergement tiers listant Dar Layana à Sidi Jedidi : https://www.tophammamethotels.com/fr/property/villa-dar-layana.html
6. Layana Tours : https://layanatours.tn/

## Constats fortement convergents
- Implantation secteur Sidi Jadidi, Hammamet. Kharjet : Sidi Jadidi 8032, téléphone +216 58 405 413.
- Hébergement en villa, deux suites et deux autres chambres (quatre chambres au total).
- Piscine, jacuzzi/bain à remous, Wi-Fi, cuisine équipée, jardin, terrasse et parking.
- Les annonces décrivent petit-déjeuner, déjeuner/dîner possibles et prestations optionnelles.
- Le positionnement valorisable est la villa privative, le calme et les moments en petit groupe.

## Détails présents sur Vilivio (NE PAS les considérer comme prix contractualisés)
- Nombre d'occupants annoncé : 10 ; 4 chambres ; 3 salles de bain ; 5 lits.
- Suite Soltana, suite Letaifa, chambre Eline et une quatrième chambre sans nom détaillé.
- Prix indicatif hors calendrier futur : 1 300 TND/nuit ; 1 500 TND/nuit les vendredi/samedi/dimanche ; 1 200 TND/nuit pour 7 nuits ou plus.
- Nettoyage annoncé : 100 TND/séjour.
- Petit-déjeuner : 30 TND/personne/nuit, déjeuner : 80 TND/personne/nuit, dîner : 110 TND/personne/nuit.
- Minimum 2 nuits, maximum 10 nuits, caution 2 000 TND, arrivée après 15h, départ avant 11h.
- Les suppléments / tarifs saisonniers publiés s'arrêtent au 31 octobre 2026. Tout devis pour les périodes ultérieures doit être confirmé par l'hôte.

## Points contradictoires à clarifier avant publication officielle
| Champ | Source A | Source B | Décision pour site |
| --- | --- | --- | --- |
| Capacité | 10 (Vilivio) | 8 (Google Travel / Vrbo) | Indiquer « 8 à 10 selon configuration », demander confirmation |
| Salles de bain | 3 (Vilivio et descriptif Google) | 2 (résumé Google) | Ne pas mettre un chiffre ferme |
| Heure d'arrivée | Après 15h (Vilivio) | 16h (Google Travel) | « horaire confirmé avec l'hôte » |
| Animaux | « non » dans règles Vilivio et Google | « oui » dans texte additionnel Vilivio / autres annonces | Ne pas promettre l'autorisation |
| Fêtes | « non » dans règles Vilivio | Présence d'espaces événementiels | Toute manifestation sur accord préalable |
| Localisation | « Yasmine Hammamet » dans Vilivio | Sidi Jedidi dans Kharjet et autres annonces | Privilégier Sidi Jedidi, proche de Hammamet |
| Prix agrégateurs | Frais en TND sur Vilivio | Montants anormaux en USD sur Google | Ne pas reprendre les prix aberrants |

## Réservation : périmètre opérationnel
- Parcours de **demande de disponibilité** en trois étapes : dates, adultes/enfants et âges, options à la carte, coordonnées et récapitulatif.
- Estimation tarifaire à partir de valeurs publiées par Vilivio ; attention, **ce n'est pas un moteur de réservation en temps réel ni un devis officiel**.
- Transmission possible à l'établissement par WhatsApp si le numéro public en dispose ; appel téléphonique en solution de repli.
- Enregistrement de demande en Supabase après configuration des clés/du SQL et création d'un administrateur.
- Aucune connexion PMS, Booking.com ou Airbnb ; aucun paiement en ligne, aucune confirmation automatique ni anti-double-réservation.

## Photographies
La recherche a trouvé plusieurs pages contenant des photos de la propriété, mais les fichiers de photo originaux ne figurent pas dans ce dépôt. Pour ne pas publier des photos d'autres villas ou des images récupérées sans confirmation des droits, les visuels du site restent explicitement marqués « illustration ». La galerie dispose d'un lien direct vers une annonce publique de Dar Layana. Pour la publication finale, remplacer avec les photos originales autorisées (villa, suites, jardin, piscine, jacuzzi, repas) via Storage /admin.

## Vercel — accessibilité
Les URLs de **prévisualisation** peuvent être protégées par « Deployment Protection ». Si la preview demande une connexion Vercel, dans le projet Vercel :
- Utiliser le menu de partage de la deployment pour générer une URL partageable ; ou
- Settings > Deployment Protection > protection désactivée pour previews, selon le niveau de confidentialité souhaité.
Les domaines de production sont distincts ; ne pas modifier les DNS de darlayana.com sans validation.
Documentation : https://vercel.com/docs/deployment-protection

## Informations de la direction à obtenir
- Confirmation de l'adresse exacte, téléphone et compte WhatsApp actif
- Capacité maximale et âge des enfants retenu pour la tarification
- Règles événements, animaux, tabac, annulation, acompte et caution
- Check-in/check-out exacts, prix et saisons 2026/2027
- Photos originales et droits, nom de la 4e chambre, données de réservation actuelles
- Accès Supabase/Vercel pour activer les envois et personnaliser le back-office
