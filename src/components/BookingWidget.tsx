'use client';
import {useState} from 'react';
import Link from 'next/link';

export default function BookingWidget(){
  const [guests,setGuests]=useState('2');
  return <div className="container"><div className="bookingBar"><div className="field"><label>Arrivée</label><input type="date"/></div><div className="field"><label>Départ</label><input type="date"/></div><div className="field"><label>Voyageurs</label><select value={guests} onChange={e=>setGuests(e.target.value)}><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></div><Link href="/booking" className="btn">Voir les disponibilités</Link></div></div>
}
