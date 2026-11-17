import './globals.css';
import type {Metadata} from 'next';
const isProduction=process.env.VERCEL_ENV==='production';
export const metadata:Metadata={
 metadataBase:new URL('https://darlayana.com'),
 title:{default:'Dar Layana | Villa privative à Sidi Jadidi – Hammamet',template:'%s | Dar Layana'},
 description:'Dar Layana à Sidi Jadidi, près de Hammamet : villa privative de 4 chambres dont 2 suites, piscine, jacuzzi, cuisine et séjours sur demande.',
 robots:{index:isProduction,follow:isProduction},
 openGraph:{type:'website',locale:'fr_TN',siteName:'Dar Layana',title:'Dar Layana · Maison de la Douceur',description:'Villa privative à Sidi Jadidi, Hammamet. Piscine, jacuzzi, deux suites, deux chambres, gastronomie et séjour à votre rythme.'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>;}
