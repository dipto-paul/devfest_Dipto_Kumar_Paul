export type Lang = 'en' | 'bn'
export type Status = 'MISSING' | 'EXPIRY_NEEDED' | 'EXPIRED' | 'NOT_PROVIDED' | 'OK'
export interface TenderInfo { tender_id:string; title_en:string; title_bn?:string; procuring_entity:string; bidder:string; submission_deadline:string }
export interface Requirement { id:string; order:number; title_en:string; title_bn:string; mandatory:boolean; has_expiry:boolean }
export interface RequirementsPack { tender:TenderInfo; requirements:Requirement[] }
export interface DocumentItem { id:string; file:File; hash:string; pageCount:number; error?:string; matchId?:string; expiryDate?:string; }
