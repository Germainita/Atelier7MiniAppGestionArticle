import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionArticleComponent } from './gestion-article/gestion-article.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component'
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    GestionArticleComponent,
    InscriptionComponent,
    ConnexionComponent,
    HttpClient,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
