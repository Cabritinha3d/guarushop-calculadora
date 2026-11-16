import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculate,parseNumber} from '../src/app/calculations.ts';
const base={idSimulacao:1,mode:'minimum' as const,product:20,packaging:1,freight:2,fixed:2,other:0,commission:12,taxes:8,target:10};
test('preço mínimo e conferência de sobra e falta',()=>{assert.equal(calculate(base).price,43.75);assert.equal(calculate({...base,mode:'check',price:50}).balance,15);const loss=calculate({...base,mode:'check',price:30});assert.equal(loss.balance,-1);assert.equal(loss.coversCosts,false);});
test('arredonda preço para cima sem arredondar centavo exato indevidamente',()=>{assert.equal(calculate({...base,product:20.01}).price,43.77);for(let c=1;c<500;c++){const r=calculate({...base,product:c/100,packaging:0,freight:0,fixed:0,target:0});assert.ok(r.price*(1-.2)+1e-9>=c/100);}});
test('rejeita taxas inválidas, negativos e resultados extremos',()=>{assert.throws(()=>calculate({...base,commission:92}));assert.throws(()=>calculate({...base,product:-1}));assert.throws(()=>calculate({...base,product:1e9,commission:99.99,taxes:0}));assert.throws(()=>calculate({...base,mode:'check',price:0}));});
test('entrada decimal brasileira, obrigatórios e conteúdo inseguro',()=>{assert.equal(parseNumber('2,50'),2.5);assert.equal(parseNumber(''),0);for(const value of ['-1','NaN','Infinity','1e6','<script>alert(1)</script>','2,555','1.2.3'])assert.throws(()=>parseNumber(value));assert.throws(()=>parseNumber('',true));});
