import { Component, OnInit } from '@angular/core';
import { ServiceArticle } from '../service/serviceArticle';
import { Article } from '../model/model';
import { ServiceUtilisateur } from '../service/serviceUtilisateur';
import { serviceCommentaire } from '../service/serviceCommentaire';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  // Déclaration des varibles
  articles: any[]=[]; 
  commentaires: any[]=[]; 
  utilisateurs: any[]=[];

  tabArticles: any;
  tabCommentaires: any;
  tabUtilisateurs: any;

  // Déclaration des méthodes
  // Constructeur 
  // Injection de dépendance du service article 
  constructor(private artcileService: ServiceArticle, private utilisateurService: ServiceUtilisateur, private commentaireService: serviceCommentaire){}
  ngOnInit(): void {
    // On récupere les articles à partir de l'API 
    this.artcileService.getArticle().subscribe(data => {
      // console.log(data);
      this.tabArticles = data;
      // On stocke le tableau des articles dans le localStorage
      if(!localStorage.getItem("articles")){
        // localStorage.setItem("articles", JSON.stringify(this.articles));
        localStorage.setItem("articles", JSON.stringify(this.tabArticles));
      }
    });
    // On récupère les articles à partir du localstorage 
    this.articles = JSON.parse(localStorage.getItem("articles") || "[]");
    // console.log(this.articles);

    // On récupere les utilisateurs;
    this.utilisateurService.getUtilisateur().subscribe(utilisateur =>{
      this.tabUtilisateurs = utilisateur;
      // On stocke le tableau des utilisateurs dans le localStorage
      if(!localStorage.getItem("utilisateurs")){
        // localStorage.setItem("utilisateurs", JSON.stringify(this.utilisateurs));
        localStorage.setItem("utilisateurs", JSON.stringify(this.tabUtilisateurs));
      }
    })
    

    // On recupere les commentaires 
    this.commentaireService.getCommentaire().subscribe(commentaire =>{
      this.tabCommentaires = commentaire;
      // On stocke le tableau des commentaires dans le localStorage
      if(!localStorage.getItem("commentaires")){
        // localStorage.setItem("commentaires", JSON.stringify(this.commentaires));
        localStorage.setItem("commentaires", JSON.stringify(this.tabCommentaires));
      } 
    })
  }
  
}
