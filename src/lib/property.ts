
/** Facts found in public Dar Layana listings in November 2026.
 * Confirm all commercial conditions with the property before production.
 */
export const property={
  name:'Dar Layana',
  slogan:'Maison de la Douceur',
  location:'Sidi Jadidi, Hammamet, Tunisie',
  address:'Sidi Jadidi 8032, Tunisie',
  phoneDisplay:'+216 58 405 413',
  phoneInternational:'+21658405413',
  phoneWhatsapp:'21658405413',
  googleMaps:'https://www.google.com/maps/search/?api=1&query=Dar%20Layana%20Sidi%20Jadidi%20Tunisie',
  externalGallery:'https://vilivio.com/logements/dar-layana/',
  publishedPriceSource:'https://vilivio.com/logements/dar-layana/',
  bookingNote:'Demande de disponibilité uniquement : aucune réservation ni aucun paiement ne sont confirmés automatiquement.',
};
export const propertyFeatures=[
  {symbol:'🏡',title:'Villa privative',text:'Une maison à vivre ensemble, dans un environnement calme à Sidi Jadidi.'},
  {symbol:'🛏',title:'4 chambres, dont 2 suites',text:'Différents espaces de repos pour un séjour en famille ou entre amis.'},
  {symbol:'🏊',title:'Piscine et jacuzzi',text:'Une parenthèse de détente, avec des espaces extérieurs propices au repos.'},
  {symbol:'🍽',title:'Cuisine et repas',text:'Cuisine équipée, espace barbecue et restauration possible sur demande.'},
  {symbol:'📶',title:'Wi-Fi et confort',text:'Climatisation, Wi-Fi et équipements pour faciliter le séjour.'},
  {symbol:'🚘',title:'Parking sur place',text:'Un pied-à-terre près de Hammamet pour découvrir la région.'},
];
export const namedBedrooms=[
  {title:'Suite Soltana',subtitle:'Une suite pour deux personnes',kind:'Suite',description:'Suite mentionnée sur l’annonce publique Dar Layana. Literie et équipements exacts à confirmer lors de la demande.'},
  {title:'Suite Letaifa',subtitle:'Une suite pour deux personnes',kind:'Suite',description:'Un autre espace de repos nommé dans l’annonce de la maison. Configuration exacte à confirmer.'},
  {title:'Chambre Eline',subtitle:'Une chambre double',kind:'Chambre',description:'Chambre double annoncée pour deux occupants. Répartition et prestations vérifiées à la demande.'},
  {title:'Quatrième chambre',subtitle:'Une chambre double',kind:'Chambre',description:'Quatrième chambre mentionnée dans les annonces, dont le nom commercial reste à préciser.'},
];
export const extras=[
  {key:'breakfast',label:'Petit-déjeuner',price:30,detail:'par personne et par nuit'},
  {key:'lunch',label:'Déjeuner à la carte',price:80,detail:'par personne et par nuit'},
  {key:'dinner',label:'Dîner à la carte',price:110,detail:'par personne et par nuit'}
] as const;
