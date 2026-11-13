# Simplificador de etiqueta

Junta a etiqueta do Mercado Livre e a DANFE numa folha 10x15 só.
Nas bordas vai o aviso de produto frágil.

A etiqueta do Flex não tem nota. Ela sai em 10x15, compacta, com o nome do cliente embaixo.
Nas bordas e no topo vai o aviso de produto frágil.
O nome vem da lista de separação, então baixe a etiqueta do Flex com ela.

Na Amazon, solte a etiqueta e a DANFE do pedido juntas. Sai uma folha 10x15 com a etiqueta,
a DANFE embaixo e o aviso de frágil nas bordas. O nome do arquivo da etiqueta precisa ter o
número do pedido, por exemplo `etiqueta-amazon-701-2347273-7877803.pdf`.

Use em https://guirlviana.github.io/simplificador-etiqueta/

1. No Mercado Livre, baixe as etiquetas no formato 10x15, com a DANFE.
2. Solte o PDF na página.
3. Clique em "Abrir para imprimir".

O PDF fica no seu computador. A página não envia nada para nenhum servidor.

## Pela linha de comando

```
npm install
node simplificar.mjs <saida.pdf> <entrada.pdf>...
```

Usa o mesmo código da página. Sai com erro (código 1) se faltar uma DANFE ou uma etiqueta.
