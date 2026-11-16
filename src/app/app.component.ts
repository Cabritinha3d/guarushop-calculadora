import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculate, parseNumber, type Mode, type CalculationResult, type Simulation } from './calculations';
type FieldKey='product'|'packaging'|'freight'|'fixed'|'other'|'commission'|'taxes'|'target'|'price';
@Component({selector:'app-root',standalone:true,imports:[FormsModule],templateUrl:'./app.component.html'})
export class AppComponent {
  screen:'home'|'form'|'result'='home'; mode:Mode='minimum'; result:CalculationResult|null=null; error=''; errors:Record<string,string>={}; counter=0;
  data:Record<FieldKey,string>={product:'',packaging:'',freight:'',fixed:'',other:'',commission:'',taxes:'',target:'',price:''};
  rates:FieldKey[]=['commission','taxes'];
  costs:{key:FieldKey;label:string;hint:string;required?:boolean}[]=[{key:'product',label:'Custo do produto',hint:'Custo de compra por unidade.',required:true},{key:'packaging',label:'Embalagem',hint:'Gasto para embalar uma unidade.'},{key:'freight',label:'Frete',hint:'Somente a parte paga pela loja.'},{key:'fixed',label:'Cobrança fixa',hint:'Valor fixo da plataforma por venda.'},{key:'other',label:'Outros custos',hint:'Outros gastos por unidade.'}];
  select(mode:Mode){this.mode=mode;this.screen='form';this.result=null;this.error='';this.errors={};this.focus('page-title');}
  home(){this.screen='home';this.result=null;this.error='';this.focus('page-title');}
  edit(){this.screen='form';this.result=null;this.focus('page-title');}
  changed(){this.result=null;this.error='';this.errors={};}
  focus(id:string){setTimeout(()=>document.getElementById(id)?.focus(),0);}
  submit(){
    this.errors={}; this.error='';this.result=null;
    const fields:FieldKey[]=['product','packaging','freight','fixed','other','commission','taxes',this.mode==='minimum'?'target':'price'];
    const values:Record<string,number>={};
    for(const key of fields){try{values[key]=parseNumber(this.data[key],key==='product'||key==='target'||key==='price');}catch(e){this.errors[key]=(e as Error).message;}}
    if(this.mode==='check'&&values['price']===0)this.errors['price']='Informe um preço de venda maior que zero.';
    if(values['commission']+values['taxes']>=100){this.errors['commission']='A soma das taxas deve ser menor que 100%. Revise os percentuais.';this.errors['taxes']='Revise este percentual e a taxa do marketplace.';}
    if(Object.keys(this.errors).length){this.error='Não foi possível calcular. Confira os campos destacados.';this.focus(Object.keys(this.errors)[0]);return;}
    try{
      const simulation={...values,idSimulacao:++this.counter,mode:this.mode} as unknown as Simulation;
      this.result=calculate(simulation);this.screen='result';this.focus('page-title');
    }catch(e){this.error=(e as Error).message;this.focus('form-alert');}
  }
  money(v:number){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}
  percent(v:number){return (v*100).toLocaleString('pt-BR',{maximumFractionDigits:2})+'%';}
  get progress(){return this.screen==='home'?1:this.screen==='form'?2:3;}
}
