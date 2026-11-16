import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
bootstrapApplication(AppComponent).catch(() => { document.body.textContent = 'Não foi possível abrir a calculadora. Recarregue a página.'; });
