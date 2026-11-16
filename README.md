# Projeto 1 — Calculadora de preços da Guarushop

MVP acadêmico em Angular. Simula o preço mínimo e confere um preço de venda. Não salva dados, não consulta taxas e não apura tributos. Todos os valores são fornecidos pelo usuário. Não representa lucro líquido da empresa.

## Executar

Use Node.js 24 LTS (ou versão compatível com Angular 22) e npm.

```sh
npm ci
npm start
```

Abra o endereço informado pelo Angular CLI (normalmente http://localhost:4200).

## Conferir e gerar

```sh
npm test
npm run build
```

A pasta `dist` contém os arquivos estáticos. Publique essa pasta no Cloudflare Pages ou hospedagem estática equivalente, com HTTPS. O Node.js é necessário para desenvolver e gerar os arquivos, não no dispositivo do usuário. Credenciais de implantação devem ficar fora do código.

## Estrutura

- `src/app/calculations.ts`: dados e funções puras de validação e cálculo.
- `src/app/app.component.ts`: interação, estado em memória e controle das etapas.
- `src/app/app.component.html`: entrada principal, formulário, resultados e alertas.
- `src/styles.css`: apresentação responsiva, foco e estilos de acessibilidade.
- `tests/calculations.test.ts`: casos de referência e limites.

## Regras

Preço mínimo = (custos por unidade + ganho desejado em reais) / (1 − soma dos percentuais em decimal). Arredondamento para cima no centavo.

Saldo = preço × (1 − taxas) − custos. Os custos incluem produto, embalagem, frete pago pela loja, cobrança fixa e outros custos. Campos opcionais vazios valem zero. Taxas somadas devem ser menores que 100%. Entradas aceitam ponto ou vírgula decimal e até duas casas. Limite de R$ 1 bilhão por entrada e no preço calculado. Valores da simulação e resultados são descartados ao atualizar a página.

## Protótipo e requisitos

Três etapas na mesma aplicação: escolha, valores e resultado. RF01 valida entradas; RF02 calcula preço; RF03 confere preço. RF04 (limpar) foi adiado. Sem login, histórico, estoque, integrações ou banco. As capturas usam dados fictícios: produto 20, embalagem 1, frete 2, cobrança fixa 2, comissão 12%, tributos 8% e ganho 10; preço mínimo R$ 43,75.

Os testes automatizados não substituem validação com o parceiro, medição de desempenho no aparelho real ou auditoria completa de acessibilidade. A meta de 5 segundos/500 KB é requisito a verificar, não resultado já comprovado.

## Git e portabilidade

O repositório inclui código, configurações, testes e arquivo de dependências. `node_modules`, `dist` e caches não devem ser enviados ao Git. Para publicar em subdiretório, configure o base href na geração.

## Verificação manual e critérios de aceite

- Menu: selecionar cada operação e confirmar o formulário correspondente.
- RF02: custos R$ 25,00, taxas 20%, ganho R$ 10,00 → preço mínimo R$ 43,75.
- RF03: mesmos custos/taxas, preço R$ 30,00 → falta R$ 1,00; preço R$ 50,00 → sobra R$ 15,00.
- RF01: rejeitar negativos, texto, mais de duas casas decimais e taxas somando 100% ou mais; ocultar resultado antigo após alterar entradas.
- RNF04: navegar por Tab/Shift+Tab, ativar com Enter, conferir foco, rótulos e mensagens; ampliar a 200% sem perda de conteúdo. Verificar contraste dos campos e preços longos em tela pequena.
- Privacidade: valores não devem aparecer na URL, nas requisições nem no armazenamento persistente do navegador.
- Desempenho planejado: mediana de cinco carregamentos após aquecimento até 5 segundos, cache desativado, rede de 1,6 Mbps / 750 kbps e latência de 150 ms; orçamento de 500 KB.
- Validação com parceiro: três tarefas sem ajuda direta, tarefa central até 180 segundos e facilidade de uso pelo menos 4 em 5. Registrar resultados reais; esses limites são metas, não resultados obtidos.

## Implantação reproduzível

1. Instale com `npm ci` em Node compatível.
2. Execute `npm test` e `npm run build`.
3. Publique o conteúdo de `dist` como arquivos estáticos por HTTPS. Não publique `node_modules` nem credenciais.
4. No Cloudflare Pages, configure saída `dist`; domínio e credenciais ficam no provedor.
5. Para subdiretório, use `npm run build -- --base-href /guarushop-calculadora/` e confira os caminhos.
6. Para conferir o build localmente, use um servidor estático em `dist`, não abertura por `file://`.

Alterações neste repositório não atualizam automaticamente a prévia privada anterior. Uma nova publicação deve utilizar o build do commit da entrega.
