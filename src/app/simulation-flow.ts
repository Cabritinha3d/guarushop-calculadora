import { calculate, parseNumber, type Mode, type Simulation, type CalculationResult } from './calculations.ts';

export type FieldKey = 'product'|'packaging'|'freight'|'fixed'|'other'|'commission'|'taxes'|'target'|'price';
export type FormData = Record<FieldKey, string>;
export interface FlowResponse {
  result: CalculationResult | null;
  errors: Partial<Record<FieldKey, string>>;
  message: string;
}

/** Integra os valores textuais do formulário com a validação e o cálculo. */
export function runSimulation(data: FormData, mode: Mode, id: number): FlowResponse {
  const errors: Partial<Record<FieldKey,string>> = {};
  const fields: FieldKey[] = ['product','packaging','freight','fixed','other','commission','taxes',mode==='minimum'?'target':'price'];
  const values: Partial<Record<FieldKey,number>> = {};
  for (const key of fields) {
    try { values[key] = parseNumber(data[key],key==='product'||key==='target'||key==='price'); }
    catch(e) { errors[key]=(e as Error).message; }
  }
  if (mode==='check' && values.price===0) errors.price='Informe um preço de venda maior que zero.';
  if ((values.commission ?? 0)+(values.taxes ?? 0)>=100) {
    errors.commission='A soma das taxas deve ser menor que 100%. Revise os percentuais.';
    errors.taxes='Revise este percentual e a taxa do marketplace.';
  }
  if (Object.keys(errors).length) return {result:null,errors,message:'Não foi possível calcular. Confira os campos destacados.'};
  const simulation: Simulation = {
    idSimulacao:id,mode,product:values.product!,packaging:values.packaging!,freight:values.freight!,
    fixed:values.fixed!,other:values.other!,commission:values.commission!,taxes:values.taxes!,
    ...(mode==='minimum'?{target:values.target!}:{price:values.price!})
  };
  try { return {result:calculate(simulation),errors:{},message:''}; }
  catch(e) { return {result:null,errors:{},message:(e as Error).message}; }
}
