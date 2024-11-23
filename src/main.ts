import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AutenticacionComponent } from './app/autenticacion/autenticacion.component';  
import { PublicacionesComponent } from './app/publicaciones/publicaciones.component';  

import { PerfilComponent } from './app/perfil/perfil.component';  
import { GruposComponent } from './app/grupos/grupos.component';  
import { EventosComponent } from './app/eventos/eventos.component'; 
import { FormsModule } from '@angular/forms'; 




const routes: Routes = [
  { path: '', redirectTo: '/autenticacion', pathMatch: 'full' },  
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'feed', component: PerfilComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'eventos', component: EventosComponent },
  
];


const appConfig = {
  providers: [
    provideRouter(routes),  
  ],
    
  imports: [RouterModule, FormsModule] 
};


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));