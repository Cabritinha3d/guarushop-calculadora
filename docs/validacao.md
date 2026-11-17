# Roteiro e ficha de validação do MVP

Este documento é um plano. Campos em branco não representam testes concluídos. Utilize dados fictícios e obtenha concordância do participante antes de observar ou registrar o teste. Não publique telefone, senha, código de verificação ou dados pessoais desnecessários.

## Preparação

- Registrar data, commit testado, navegador, dispositivo e condição de rede.
- Explicar que o teste avalia a interface, não a capacidade da pessoa.
- Ler somente o objetivo de cada tarefa, sem antecipar onde clicar.
- Repetir o enunciado é permitido. Orientação direta será anotada como ajuda.
- Intervir quando solicitado ou após dois minutos sem progresso. Se a pessoa continuar trabalhando, manter a observação até concluir ou atingir o limite aplicável.

## Tarefas

| Tarefa | Estado inicial e objetivo | Resultado esperado |
| --- | --- | --- |
| 1 — Iniciar | Menu aberto. Encontrar a opção para descobrir o preço mínimo que cobre os gastos e o ganho desejado. | Acessar o formulário de preço mínimo sem ajuda direta. |
| 2 — Calcular | Formulário aberto. Produto 20, embalagem 1, frete 2, cobrança fixa 2, outros custos 0, taxa do marketplace 12%, tributos 8% e ganho desejado 10 (valores em reais quando não indicado percentual). | Preço mínimo R$ 43,75. |
| 3 — Corrigir alerta | Avaliadora prepara o formulário com os dados anteriores, mas taxa 92% e tributos 8%, e tenta calcular. Participante deve interpretar o alerta, corrigir a taxa para 12% usando teclado e explicar o resultado. | Entender a restrição de taxas menores que 100%, corrigir com foco visível e obter R$ 43,75; reconhecer que apenas gastos informados entram na conta. |

## Critérios de medição

- **Usabilidade:** 3 de 3 tarefas concluídas sem ajuda direta (100%). Correções espontâneas não invalidam sucesso; ajuda direta é registrada separadamente.
- **Eficiência:** tarefa 2 concluída corretamente em até 180 segundos, desde o fim da leitura até o resultado correto. Esclarecimentos e correções não pausam a contagem.
- **Satisfação:** ao final perguntar: “Considerando a clareza das informações e a navegação, como foi usar este protótipo?”. Escala: 1 muito difícil; 2 difícil; 3 nem difícil nem fácil; 4 fácil; 5 muito fácil. Meta mínima 4. Perguntar o motivo sem indução.
- **Acessibilidade:** observar na tarefa 3 o uso do teclado, foco visível, identificação dos campos e interpretação textual do alerta. Complementar com testes técnicos; um participante não representa todos os públicos.

## Ficha a preencher após o teste

Commit testado: ____

Data, dispositivo, navegador e rede: ____

Concordância registrada de forma autorizada: ____

| Tarefa | Tempo em segundos | Sem ajuda / com ajuda / não concluiu | Erros, hesitações e intervenções |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

Nota de facilidade: ____

Comentário declarado pelo participante: ____

Observações do comportamento (separadas da opinião): ____

## Decisão e revisão

Aceitar quando os três limites forem atingidos e não houver falha crítica. Aceitar com ajustes se os limites forem atingidos e restarem apenas problemas secundários. Caso contrário, corrigir antes de aprovar: resultado incorreto, impedimento da função central, perda inesperada durante o fluxo ou alerta inacessível exigem revisão e novo teste. O descarte anunciado ao recarregar é uma limitação prevista.

Decisão, justificativa e ajustes propostos: ____

Preservar cada rodada separadamente, sem apagar resultados anteriores. Não generalizar a medição de uma pessoa para todo o público.
