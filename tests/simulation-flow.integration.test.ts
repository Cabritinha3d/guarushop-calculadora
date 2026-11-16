import {test} from 'node:test';
import assert from 'node:assert/strict';
import {runSimulation, type FormData} from '../src/app/simulation-flow.ts';
const form:FormData={product:'20,00',packaging:'1,00',freight:'2,00',fixed:'2,00',other:'',commission:'12',taxes:'8',target:'10,00',price:''};

test('INTEGRACAO: formulario decimal -> validacao -> preco minimo',()=>{
 const response=runSimulation(form,'minimum',1);
 assert.deepEqual(response.errors,{});
 assert.equal(response.message,'');
 assert.equal(response.result?.price,43.75);
 assert.equal(response.result?.totalCosts,25);
 assert.equal(response.result?.idSimulacao,1);
});
test('INTEGRACAO: conferencia integra taxas e sinal de sobra ou falta',()=>{
 const profit=runSimulation({...form,price:'50,00',target:''},'check',2);
 const loss=runSimulation({...form,price:'30,00'},'check',3);
 assert.equal(profit.result?.balance,15);
 assert.equal(loss.result?.balance,-1);
 assert.equal(loss.result?.coversCosts,false);
});
test('INTEGRACAO: taxas invalidas bloqueiam e correcao recupera o fluxo',()=>{
 const invalid=runSimulation({...form,commission:'92'},'minimum',4);
 assert.equal(invalid.result,null);
 assert.ok(invalid.errors.commission);
 assert.ok(invalid.errors.taxes);
 const corrected=runSimulation(form,'minimum',5);
 assert.equal(corrected.result?.price,43.75);
 assert.deepEqual(corrected.errors,{});
});
test('INTEGRACAO: erros de entrada e limites retornam mensagens sem resultado',()=>{
 const missing=runSimulation({...form,product:''},'minimum',6);
 assert.ok(missing.errors.product);assert.equal(missing.result,null);
 const script=runSimulation({...form,product:'<script>alert(1)</script>'},'minimum',7);
 assert.ok(script.errors.product);assert.equal(script.result,null);
 const overflow=runSimulation({...form,product:'1000000000',commission:'99,99',taxes:'0'},'minimum',8);
 assert.equal(overflow.result,null);assert.match(overflow.message,/limite/);
 const zero=runSimulation({...form,price:'0'},'check',9);
 assert.ok(zero.errors.price);assert.equal(zero.result,null);
});
