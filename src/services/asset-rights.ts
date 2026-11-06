export type Authorization={authorization:string;rightsConfirmed:boolean};
export function mayPublish(asset:Authorization){return asset.authorization==='approved'&&asset.rightsConfirmed===true;}
