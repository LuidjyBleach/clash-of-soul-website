import data from '../data/showcase.json';
import {mayPublish} from './asset-rights';
export const isReview=import.meta.env.MODE==='review';
export const cards=data.cards;
export type ShowcaseCard=typeof cards[number];
export function cardImage(card:ShowcaseCard,size:360|720=360):string|undefined {
  if(isReview)return import.meta.env.BASE_URL+`review-assets/${card.id}-${size}.webp`;
  if(mayPublish(card))return import.meta.env.BASE_URL+`images/cards/${card.id}-${size}.webp`;
  return undefined;
}
export function illustration(id:string):string|undefined {
  const asset=data.illustrations.find(a=>a.id===id);
  if(!asset)return undefined;
  if(isReview)return import.meta.env.BASE_URL+`review-assets/${id}.webp`;
  if(mayPublish(asset))return import.meta.env.BASE_URL+`images/characters/${id}.webp`;
  return undefined;
}
