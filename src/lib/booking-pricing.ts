
/** Public listing reference prices, NOT a live property booking engine. */
export type MealOption='breakfast'|'lunch'|'dinner';
export const examplePrices={weekday:1300,weekend:1500,weekly:1200,cleaning:100,guarantee:2000} as const;
function utc(date:string){return new Date(date+'T12:00:00Z');}
export function stayNights(arrival:string,departure:string):number{
 if(!arrival||!departure)return 0;
 const a=utc(arrival),b=utc(departure);
 if(!Number.isFinite(a.getTime())||!Number.isFinite(b.getTime()))return 0;
 return Math.max(0,Math.round((b.getTime()-a.getTime())/86400000));
}
export function publicEstimate(arrival:string,departure:string,adults:number,children:number,meals:MealOption[]){
 const nights=stayNights(arrival,departure);
 if(nights<2||nights>10||adults<1||children<0||adults+children>10)return null;
 let accommodation=0;
 for(let i=0;i<nights;i++){
  const date=utc(arrival);date.setUTCDate(date.getUTCDate()+i);
  const weekend=[0,5,6].includes(date.getUTCDay());
  accommodation+=nights>=7?examplePrices.weekly:weekend?examplePrices.weekend:examplePrices.weekday;
 }
 const people=adults+children;
 const breakfast=meals.includes('breakfast')?30*people*nights:0;
 const lunch=meals.includes('lunch')?80*people*nights:0;
 const dinner=meals.includes('dinner')?110*people*nights:0;
 const cleaning=examplePrices.cleaning;
 return {nights,accommodation,breakfast,lunch,dinner,cleaning,total:accommodation+breakfast+lunch+dinner+cleaning};
}
