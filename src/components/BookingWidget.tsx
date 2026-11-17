
'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {stayNights} from '@/lib/booking-pricing';
export default function BookingWidget(){
 const router=useRouter(),[arrival,setArrival]=useState(''),[departure,setDeparture]=useState(''),[adults,setAdults]=useState(2),[children,setChildren]=useState(0),[error,setError]=useState('');
 const today=new Date().toLocaleDateString('en-CA');
 function submit(){
  const nights=stayNights(arrival,departure);
  if(!arrival||!departure||arrival<today||nights<2||nights>10){setError('Sélectionnez des dates futures pour un séjour de 2 à 10 nuits.');return;}
  if(adults+children>10){setError('La capacité maximale annoncée est de 10 personnes, sous réserve de confirmation.');return;}
  router.push('/booking?'+new URLSearchParams({arrivee:arrival,depart:departure,adultes:String(adults),enfants:String(children)}).toString());
 }
 return <div className="container"><div className="bookingBar propertyBookingBar">
  <div className="field"><label htmlFor="widget-arrival">Arrivée</label><input id="widget-arrival" type="date" value={arrival} min={today} onChange={e=>{setArrival(e.target.value);setError('');}}/></div>
  <div className="field"><label htmlFor="widget-departure">Départ</label><input id="widget-departure" type="date" value={departure} min={arrival||today} onChange={e=>{setDeparture(e.target.value);setError('');}}/></div>
  <div className="field"><label htmlFor="widget-adults">Adultes</label><select id="widget-adults" value={adults} onChange={e=>setAdults(+e.target.value)}>{Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></div>
  <div className="field"><label htmlFor="widget-children">Enfants</label><select id="widget-children" value={children} onChange={e=>setChildren(+e.target.value)}>{Array.from({length:10},(_,i)=><option key={i} value={i}>{i}</option>)}</select></div>
  <button type="button" className="btn" onClick={submit}>Demander un séjour</button>
  {error&&<p className="inlineError" role="alert">{error}</p>}
  </div><p className="miniHint">Séjour de 2 à 10 nuits selon l’annonce publique. Disponibilité confirmée par l’établissement.</p></div>;
}
