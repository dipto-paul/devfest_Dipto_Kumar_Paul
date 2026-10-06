import {PDFDocument,StandardFonts,rgb} from 'pdf-lib'
import type {DocumentItem,Requirement,TenderInfo} from '../types'
export async function buildPackage(tender:TenderInfo,reqs:Requirement[],docs:DocumentItem[],includeIndex=true,logoBytes?:Uint8Array){
 const out=await PDFDocument.create();const font=await out.embedFont(StandardFonts.Helvetica);const bold=await out.embedFont(StandardFonts.HelveticaBold)
 const included=reqs.filter(r=>docs.some(d=>d.matchId===r.id)).sort((a,b)=>a.order-b.order)
 const cover=out.addPage([595.28,841.89]);const {width,height}=cover.getSize()
 cover.drawRectangle({x:0,y:height-128,width,height:128,color:rgb(.035,.23,.31)})
 cover.drawRectangle({x:0,y:height-132,width,height:4,color:rgb(.78,.61,.24)})
 if(logoBytes){try{const logo=await out.embedPng(logoBytes);cover.drawImage(logo,{x:42,y:height-103,width:52,height:52})}catch{} }
 cover.drawText('TENDER SUBMISSION PACKAGE',{x:112,y:height-65,size:19,font:bold,color:rgb(1,1,1)})
 cover.drawText('TenderFlow · Tender Document Package Builder',{x:112,y:height-88,size:8.5,font,color:rgb(.77,.87,.9)})
 const rows=[['Tender ID',tender.tender_id],['Tender Title',tender.title_en],['Procuring Entity',tender.procuring_entity],['Bidder',tender.bidder],['Submission Deadline',tender.submission_deadline],['Package Generated',new Date().toISOString().slice(0,10)]]
 let y=height-175;rows.forEach(([k,v])=>{cover.drawText(k,{x:48,y,size:9,font:bold,color:rgb(.32,.38,.48)});cover.drawText(String(v||'—'),{x:180,y,size:11,font,color:rgb(.08,.1,.15),maxWidth:360});y-=42})
 y-=8;cover.drawText('INCLUDED DOCUMENTS',{x:48,y,size:12,font:bold,color:rgb(.035,.23,.31)});y-=28
 included.forEach(r=>{cover.drawText(`${String(r.order).padStart(2,'0')}`,{x:50,y,size:10,font:bold,color:rgb(.08,.34,.43)});cover.drawText(r.title_en,{x:88,y,size:10,font});y-=23})
 cover.drawText('Prepared for submission',{x:48,y:48,size:8,font,color:rgb(.45,.48,.54)})
 const index=includeIndex?out.addPage([595.28,841.89]):null;let startPage=includeIndex?3:2
 if(index){index.drawText('DOCUMENT INDEX',{x:48,y:790,size:20,font:bold,color:rgb(.035,.16,.22)});index.drawText(`${tender.tender_id} · Submission package`,{x:48,y:768,size:9,font,color:rgb(.4,.44,.5)});let iy=720;for(const r of included){index.drawText(r.title_en,{x:50,y:iy,size:10,font});index.drawText(String(startPage),{x:500,y:iy,size:10,font:bold});iy-=28;const d=docs.find(x=>x.matchId===r.id)!;startPage+=d.pageCount}}
 for(const r of included){const d=docs.find(x=>x.matchId===r.id)!;const src=await PDFDocument.load(await d.file.arrayBuffer(),{ignoreEncryption:false});const copied=await out.copyPages(src,src.getPageIndices());copied.forEach(p=>out.addPage(p))}
 const total=out.getPageCount();out.getPages().forEach((p,i)=>{const {width,height}=p.getSize();p.drawLine({start:{x:32,y:27},end:{x:width-32,y:27},thickness:.5,color:rgb(.82,.84,.88)});const label=`${tender.tender_id} | Page ${i+1} of ${total}`;p.drawText(label,{x:width-32-font.widthOfTextAtSize(label,7),y:13,size:7,font,color:rgb(.38,.41,.46)})})
 return await out.save()
}
export function csvFor(reqs:Requirement[],docs:DocumentItem[],status:(r:Requirement)=>string){const esc=(s:string)=>`"${s.replaceAll('"','""')}"`;const rows=['Document,File Name,Pages,Expiry Date,Status'];reqs.slice().sort((a,b)=>a.order-b.order).forEach(r=>{const d=docs.find(x=>x.matchId===r.id);rows.push([esc(r.title_en),esc(d?.file.name??''),String(d?.pageCount??''),d?.expiryDate??'',status(r)].join(','))});return new Blob([rows.join('\n')],{type:'text/csv;charset=utf-8'})}
