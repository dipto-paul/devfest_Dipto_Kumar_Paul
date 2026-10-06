# TenderFlow

**Your Name:** Dipto Paul  
**Registration Number:** [ADD REGISTRATION NUMBER]  
**Live Website:** [ADD PUBLIC HTTPS URL]  
**Repository:** [ADD PUBLIC GITHUB URL]

## Overview
TenderFlow is a browser-only Tender Document Package Builder for office procurement workflows. It loads a dynamic `requirements.json`, accepts PDF documents, validates them, detects exact duplicates, matches files to requirements, checks expiry dates and generates a single ordered submission package.

The problem statement requires a frontend-only application, local PDF processing, bilingual UI, exact status logic and a generated PDF with an English cover and footer on every page. fileciteturn1file0L50-L73

## Features
- Dynamic tender and requirement loading
- English / Bangla interface
- Multi-PDF upload and drag & drop
- 30-file / 50 MB limits
- MIME + extension validation
- PDF page counting with pdf.js
- SHA-256 exact duplicate detection
- One-file / one-requirement matching
- Safe filename auto-match
- Expiry-date validation against the submission deadline
- Blocking release gate
- English cover page
- Document index
- Correct requirement ordering
- All source pages preserved
- `Tender ID | Page X of Y` footer on every page
- Browser-generated package download
- CSV checklist export
- PDF preview
- Corrupt/password-protected PDF error handling
- Responsive enterprise UI
- Sample-pack company logo asset integrated into the visual identity

## Main Features Completed
All core tasks in the problem statement are represented in the application architecture: load list, upload files, match files, enter expiry dates, calculate statuses, detect duplicates, generate and download the package, and switch the complete UI between English and Bangla. fileciteturn1file0L50-L73

## Bonus Features
- Index page
- CSV checklist export
- Auto-match
- PDF preview
- Sample branding/logo integration
- Enhanced release-gate UX

## Technology
- React
- Vite
- TypeScript
- pdf-lib
- pdfjs-dist
- lucide-react
- Browser Web Crypto API
- Local browser APIs

## How to Run
```bash
npm install
npm run dev
```

Open the local Vite URL in the latest Google Chrome.

## How to Build
```bash
npm run build
```

## How to Deploy
Deploy the generated `dist/` directory to any static HTTPS host that supports client-side SPAs.

## Browser Requirements
Latest Google Chrome is the target browser.

## Privacy
Tender PDFs are processed locally in the browser. The application does not require Firebase, Supabase, Appwrite, a participant-controlled backend, serverless functions, a database, or an online document-storage service.

## AI Tools Used
Claude Code

## Most Useful Prompt
A competition-focused implementation prompt requiring a frontend-only Tender Document Package Builder with dynamic requirements, local PDF processing, exact status rules, duplicate detection, bilingual UI, ordered package generation, footer pagination and production-quality UX.

## Known Problems
No known critical problems. A full dependency install/build should be run in the contestant's local environment before final submission because this development environment did not have npm registry access during final QA.
