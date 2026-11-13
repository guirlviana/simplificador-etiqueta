import fs from 'fs';
import * as PDFLib from 'pdf-lib';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

const [saida, ...entradas] = process.argv.slice(2);
const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const nucleo = html.match(/<script id="nucleo">([\s\S]*?)<\/script>/)[1];
const montar = new Function(nucleo + '\nreturn montar;')();
const arquivos = entradas.map(f => ({ nome: f.split('/').pop(), bytes: new Uint8Array(fs.readFileSync(f)) }));
const r = await montar(arquivos, { pdfjsLib, PDFLib });
fs.writeFileSync(saida, r.pdf);
const { avisos, total, comFaixa, amazon, erros } = r;
console.log(JSON.stringify({ avisos, total, comFaixa, amazon, erros }));
process.exit(erros || !total ? 1 : 0);
