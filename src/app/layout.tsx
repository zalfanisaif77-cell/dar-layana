import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dar Layana | Luxury Guest House',
  description: 'Luxury guest house and private experiences in Hammamet.'
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="fr"><body>{children}</body></html>;
}
