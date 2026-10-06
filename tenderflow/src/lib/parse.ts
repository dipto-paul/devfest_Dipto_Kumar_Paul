import type {RequirementsPack,Requirement,TenderInfo} from '../types'
const s=(v:unknown)=>typeof v==='string'?v.trim():''
export function parsePack(raw:any):RequirementsPack{
 const t=raw.tender??raw.tender_info??raw
 const tender:TenderInfo={tender_id:s(t.tender_id??t.id??t.tenderId),title_en:s(t.title_en??t.title??t.name_en),title_bn:s(t.title_bn??t.name_bn??t.title),procuring_entity:s(t.procuring_entity??t.procuringEntity??t.entity),bidder:s(t.bidder??t.bidder_name),submission_deadline:s(t.submission_deadline??t.submissionDeadline??t.deadline)}
 const arr=raw.requirements??raw.documents??raw.required_documents
 if(!Array.isArray(arr)||!arr.length) throw new Error('requirements')
 const requirements:Requirement[]=arr.map((r:any,i:number)=>({id:s(r.id??r.code??`R${String(i+1).padStart(2,'0')}`),order:Number(r.order??i+1),title_en:s(r.title_en??r.title??r.name_en??r.name),title_bn:s(r.title_bn??r.name_bn??r.title??r.name),mandatory:Boolean(r.mandatory??r.required??true),has_expiry:Boolean(r.has_expiry??r.expiry_required??false)})).sort((a,b)=>a.order-b.order)
 if(!tender.tender_id||!tender.title_en||!tender.submission_deadline) throw new Error('tender')
 return {tender,requirements}
}
