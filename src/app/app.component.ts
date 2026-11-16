import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Mode, type CalculationResult } from './calculations';
import { runSimulation, type FieldKey } from './simulation-flow';
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
    const response=runSimulation(this.data,this.mode,++this.counter);
    this.result=response.result;
    this.error=response.message;
    this.errors=response.errors;
    if(response.result){this.screen='result';this.focus('page-title');}
    else {this.focus(Object.keys(response.errors)[0] ?? 'form-alert');}
  }
  money(v:number){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}
  percent(v:number){return (v*100).toLocaleString('pt-BR',{maximumFractionDigits:2})+'%';}
  get progress(){return this.screen==='home'?1:this.screen==='form'?2:3;}
}
