'use client';
import {FormEvent,useState} from 'react';
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import {backendConfigured,getSupabase} from '@/lib/supabase';
export default function Booking(){
 const [data,setData]=useState({guest_name:'',email:'',phone:'',offer_name:'Séjour à Dar Layana',arrival_date:'',departure_date:'',guests:2,message:''});
 const [status,setStatus]=useState(''),[sending,setSending]=useState(false);
 const set=(key:string,value:string|number)=>setData(v=>({...v,[key]:value}));
 async function submit(e:FormEvent){e.preventDefault();setStatus('');
  const today=new Date().toLocaleDateString('en-CA');
  if((data.arrival_date&&!data.departure_date)||(!data.arrival_date&&data.departure_date)){setStatus('Indiquez les deux dates du séjour.');return;}
  if(data.arrival_date&&(data.departure_date<=data.arrival_date||data.arrival_date<today)){setStatus('Les dates choisies ne sont pas valides.');return;}
  if(!backendConfigured){setStatus('Les demandes en ligne ne sont pas encore activées.');return;}
  setSending(true);
  const {error}=await getSupabase()!.from('booking_requests').insert({...data,arrival_date:data.arrival_date||null,departure_date:data.departure_date||null,status:'pending'});
  setSending(false);setStatus(error?'Envoi impossible : réessayez ultérieurement.':'Demande transmise. Votre réservation reste soumise à confirmation.');
 }
 return <><Header/><PageHero kicker="Réservations" title="Parlons de votre prochain moment." text="Décrivez votre séjour ou événement. Notre équipe vérifiera les possibilités avant toute confirmation."/><section className="section"><div className="container grid2"><div><h2>Une proposition personnalisée.</h2><p className="lead">Chaque projet est unique. Indiquez vos dates, le nombre de participants et les prestations souhaitées. Nous reviendrons vers vous avec une proposition et les conditions applicables.</p><p className="notice">Aucune disponibilité ni aucun tarif ne sont garantis sur ce formulaire. Aucun paiement ne sera prélevé.</p></div><form className="panel" onSubmit={submit}>
 {!backendConfigured&&<p className="notice">Service de réservation en attente de connexion à la base de données.</p>}
 <div className="formGrid">
 <div className="field"><label>Nom complet *</label><input required maxLength={120} autoComplete="name" value={data.guest_name} onChange={e=>set('guest_name',e.target.value)}/></div>
 <div className="field"><label>Email *</label><input type="email" required maxLength={200} autoComplete="email" value={data.email} onChange={e=>set('email',e.target.value)}/></div>
 <div className="field"><label>Téléphone *</label><input type="tel" required maxLength={40} autoComplete="tel" value={data.phone} onChange={e=>set('phone',e.target.value)}/></div>
 <div className="field"><label>Votre projet *</label><select value={data.offer_name} onChange={e=>set('offer_name',e.target.value)}><option>Séjour à Dar Layana</option><option>La table</option><option>Événement privé</option><option>Corporate</option></select></div>
 <div className="field"><label>Arrivée (facultatif)</label><input type="date" value={data.arrival_date} onChange={e=>set('arrival_date',e.target.value)}/></div>
 <div className="field"><label>Départ (facultatif)</label><input type="date" value={data.departure_date} onChange={e=>set('departure_date',e.target.value)}/></div>
 <div className="field"><label>Participants</label><input type="number" min={1} max={30} value={data.guests} onChange={e=>set('guests',Number(e.target.value))}/></div>
 <div className="field"><label>Message</label><textarea rows={5} maxLength={3000} value={data.message} onChange={e=>set('message',e.target.value)}/></div></div>
 {status&&<p role="status" className="notice">{status}</p>}
 <button type="submit" disabled={!backendConfigured||sending||status.startsWith('Demande transmise')} className="btn fieldTop">{sending?'Envoi…':'Envoyer ma demande'}</button>
 <p className="muted note">Vos coordonnées serviront uniquement à donner suite à votre demande.</p>
 </form></div></section><Footer/></>;
}