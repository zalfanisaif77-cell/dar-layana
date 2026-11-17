
'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function BookingWidget(){
  const [arrival,setArrival]=useState(''),[departure,setDeparture]=useState(''),[guests,setGuests]=useState('2');
  const [error,setError]=useState('');
  const router=useRouter();
  const today=new Date().toLocaleDateString('en-CA');
  function go(){
    if(arrival&&departure&&departure<=arrival){setError('Le départ doit être après l’arrivée.');return;}
    const qs=new URLSearchParams({arrivee:arrival,depart:departure,voyageurs:guests});
    router.push('/booking?'+qs.toString());
  }
  return <div className="container"><div className="bookingBar">
    <div className="field"><label htmlFor="arrival">Arrivée</label><input id="arrival" type="date" min={today} value={arrival} onChange={e=>{setArrival(e.target.value);setError('')}}/></div>
    <div className="field"><label htmlFor="departure">Départ</label><input id="departure" type="date" min={arrival||today} value={departure} onChange={e=>{setDeparture(e.target.value);setError('')}}/></div>
    <div className="field"><label htmlFor="guests">Voyageurs</label><select id="guests" value={guests} onChange={e=>setGuests(e.target.value)}>{Array.from({length:12},(_,i)=><option key={i} value={i+1}>{i+1}</option>)}</select></div>
    <button type="button" onClick={go} className="btn">Demander les disponibilités</button>
    {error&&<p className="inlineError">{error}</p>}
  </div></div>;
}
