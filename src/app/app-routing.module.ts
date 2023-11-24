import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionArticleComponent } from './gestion-article/gestion-article.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CorbeilleComponent } from './corbeille/corbeille.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  // Route par défaut 
  {path:"", redirectTo:"accueil", pathMatch:"full"},
  
  // Route vers connexion
  {path: "connexion", component: ConnexionComponent},

   // Route vers inscription
  {path: "inscription", component: InscriptionComponent},

  // Route vers accueil 
  {path: "accueil", component: AccueilComponent},
  
  // Route vers gestion article 
  {path: "gestionArticle/:id", component: GestionArticleComponent},
  
  // Route vers corbeille 
  {path: "corbeille/:id", component: CorbeilleComponent},

  // Route vers archive 
  {path: "archive/:id", component: ArchiveComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
