
export type Offer = {
  id: string; name: string; description: string; image_url: string;
  price_from: number | null; capacity: number | null; category?: string;
  active?: boolean; sort_order?: number;
};

// Visuels d'ambiance libres d'utilisation (Unsplash) ; non contractuels.
// Remplacer par des photos originales validées de Dar Layana avant publication.
export const photos = {
  pool: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=82',
  lounge: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=82',
  bedroom: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=82',
  table: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=82',
  garden: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82',
  celebration: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=82',
};

export const defaultRooms: Offer[] = [
  {id:'villa', name:'Séjour à Dar Layana', description:'Une escapade en couple, en famille ou entre amis dans un cadre intime à Hammamet. Configuration et disponibilités sur demande.', image_url:photos.pool,price_from:null,capacity:null,sort_order:1},
  {id:'suite', name:'Espaces de repos', description:'Découvrez les espaces de la maison et composez un séjour adapté à votre groupe. Détails des chambres et conditions sur demande.',image_url:photos.bedroom,price_from:null,capacity:null,sort_order:2},
];

export const defaultServices: Offer[] = [
  {id:'detente',name:'Séjours & détente',description:'Changer de rythme, profiter d’un cadre paisible et partager des moments privilégiés autour de la piscine et des espaces de vie.',image_url:photos.pool,price_from:null,capacity:null,category:'Séjour',sort_order:1},
  {id:'table',name:'La table de Dar Layana',description:'Petit-déjeuner et expériences culinaires à organiser selon les prestations proposées et la disponibilité de l’équipe.',image_url:photos.table,price_from:null,capacity:null,category:'Gastronomie',sort_order:2},
  {id:'evenements',name:'Événements privés',description:'Un cadre à découvrir pour vos moments importants : célébrations familiales, fiançailles et rencontres privées. Organisation sur devis.',image_url:photos.celebration,price_from:null,capacity:null,category:'Événement',sort_order:3},
  {id:'corporate',name:'Rencontres & corporate',description:'Un environnement différent pour réunir une équipe, organiser une rencontre ou envisager une expérience professionnelle sur mesure.',image_url:photos.lounge,price_from:null,capacity:null,category:'Entreprise',sort_order:4},
];
