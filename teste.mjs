import fs from 'fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const nucleo = html.match(/<script id="nucleo">([\s\S]*?)<\/script>/)[1];
const { lerDanfe } = new Function(nucleo + '\nreturn { lerDanfe };')();

const layoutAntigo = `CHAVE DE ACESSO
35261136959020000131550050000000131300000130
NATUREZA DA OPERAÇÃO
Venda Fora do Estado
NOME/RAZÃO SOCIAL
Cliente Antigo
DATA DE EMISSÃO
17/11/2026
Pedido Amazon 701-8992938-5266652 DOCUMENTO EMITIDO`;

const layoutIbsCbs = `CHAVE DE ACESSO
3526 1136 9590 2000 0131 5500 5000 0000 1413 0000 014
Consulte a autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal
NATUREZA DA OPERAÇÃO
Venda Fora do Estado
NOME / RAZÃO SOCIAL
Cliente Novo
DATA DE EMISSÃO
18/11/2026
Pedido Amazon 701-0014700-5515426 DOCUMENTO EMITIDO`;

test('layout antigo da DANFE', () => {
  const d = lerDanfe(layoutAntigo);
  assert.equal(d.chave, '35261136959020000131550050000000131300000130');
  assert.equal(d.nf, '13');
  assert.equal(d.destinatario, 'Cliente Antigo');
  assert.equal(d.valida, true);
});

test('layout com IBS/CBS: chave com espaços e cortada no último dígito', () => {
  const d = lerDanfe(layoutIbsCbs);
  assert.equal(d.chave, '35261136959020000131550050000000141300000145');
  assert.equal(d.nf, '14');
  assert.equal(d.serie, '5');
  assert.equal(d.pedido, '701-0014700-5515426');
  assert.equal(d.emissao, '18/11/2026');
  assert.equal(d.destinatario, 'Cliente Novo');
  assert.equal(d.valida, true);
});

const chaveEmDuasLinhas = `CHAVE DE ACESSO
3526 1136 9590 2000 0131 5500 5000 0000 1513
0000 0150
Consulte a autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal
NATUREZA DA OPERAÇÃO
Venda Fora do Estado
NOME / RAZÃO SOCIAL
Cliente Natal
DATA DE EMISSÃO
18/11/2026
Pedido Amazon 701-8831354-1380231 DOCUMENTO EMITIDO`;

test('layout com IBS/CBS: chave quebrada em duas linhas', () => {
  const d = lerDanfe(chaveEmDuasLinhas);
  assert.equal(d.chave, '35261136959020000131550050000000151300000150');
  assert.equal(d.nf, '15');
  assert.equal(d.valida, true);
});
