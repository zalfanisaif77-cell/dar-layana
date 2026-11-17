
import './globals.css';
import type {Metadata} from 'next';
export const metadata:Metadata={
  metadataBase:new URL('https://darlayana.com'),
  title:{default:'Dar Layana | Maison d’hôtes et expériences à Hammamet',template:'%s | Dar Layana'},
  description:'Dar Layana à Hammamet : maison d’hôtes, séjours privés, moments de détente, gastronomie et événements sur demande.',
  robots:{index:true,follow:true},
  openGraph:{type:'website',locale:'fr_TN',siteName:'Dar Layana',title:'Dar Layana · Maison de la Douceur',description:'Un lieu pour se retrouver, se ressourcer et partager des moments précieux à Hammamet.'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>;}
