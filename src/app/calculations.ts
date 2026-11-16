export type Mode = 'minimum' | 'check';
export interface Simulation { idSimulacao:number; mode:Mode; product:number; packaging:number; freight:number; fixed:number; other:number; commission:number; taxes:number; target?:number; price?:number; }
export interface CalculationResult { idSimulacao:number; totalCosts:number; totalRates:number; price:number; fees:number; balance:number; coversCosts:boolean; }
export const MAX_AMOUNT = 1_000_000_000;
export function parseNumber(raw: string, required=false): number {
  const text = String(raw ?? '').trim();
  if (!text) { if(required) throw new Error('Informe este valor.'); return 0; }
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(text)) throw new Error('Use um número positivo ou zero, com até duas casas decimais.');
  const value = Number(text.replace(',', '.'));
  if (!Number.isFinite(value) || value > MAX_AMOUNT) throw new Error('Informe um valor de até 1 bilhão.');
  return value;
}
export function calculate(s:Simulation):CalculationResult {
  const values=[s.product,s.packaging,s.freight,s.fixed,s.other,s.commission,s.taxes];
  if(values.some(v=>!Number.isFinite(v)||v<0||v>MAX_AMOUNT)) throw new Error('Revise os valores informados.');
  const totalCosts=(Math.round(s.product*100)+Math.round(s.packaging*100)+Math.round(s.freight*100)+Math.round(s.fixed*100)+Math.round(s.other*100))/100;
  const totalRates=(s.commission+s.taxes)/100;
  if(totalRates>=1) throw new Error('A soma das taxas deve ser menor que 100%. Revise os percentuais.');
  let price:number;
  if(s.mode==='minimum') {
    if(s.target===undefined||!Number.isFinite(s.target)||s.target<0||s.target>MAX_AMOUNT) throw new Error('Informe um ganho desejado válido.');
    const unrounded=(totalCosts+s.target)/(1-totalRates);
    const cents=unrounded*100;
    // Remove apenas o ruído de ponto flutuante próximo de um centavo exato.
    price=Math.ceil(cents-Number.EPSILON*Math.abs(cents)*4)/100;
  } else {
    if(s.price===undefined||!Number.isFinite(s.price)||s.price<=0||s.price>MAX_AMOUNT) throw new Error('Informe um preço de venda maior que zero.');
    price=s.price;
  }
  if(!Number.isFinite(price)||price>MAX_AMOUNT) throw new Error('O resultado ultrapassa o limite de cálculo. Revise os valores e as taxas.');
  const fees=price*totalRates;
  const rawBalance=price-fees-totalCosts;
  const balance=Math.abs(rawBalance)<0.0000001?0:Math.round((rawBalance+Number.EPSILON)*100)/100;
  return {idSimulacao:s.idSimulacao,totalCosts,totalRates,price,fees,balance,coversCosts:rawBalance>=-0.0000001};
}
