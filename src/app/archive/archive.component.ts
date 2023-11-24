import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionArticleComponent } from '../gestion-article/gestion-article.component';
import Swal from 'sweetalert2';
import { Article } from '../model/model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  // déclaration des variables
  tabUtilisateurs: any;
  tabArticles:any;
  userConnect: any;

  // Tableau des articles archivés
  tabArticlesArchives:any[] = [];

  // Les articles archivé de l'utilisateur
  articlesUserArchives:any[] = [];

  // Tableau des articles supprimés
  tabArticlesSupprimes:any[] = [];

  // Déclaration d'un objet article 
  objectArticle = new Article;
  

  // Définition du constructeur 
  constructor (private route: ActivatedRoute){}
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  ngOnInit() {
    // les utilisateurs
    this.tabUtilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");

    // On trouve l'utilisateur qui s'est connecté 
    this.userConnect = this.tabUtilisateurs.find((element:any) => element.id == this.idUserConnect);
    
    // on récupere les articles 
    this.tabArticles = JSON.parse(localStorage.getItem("articles") || "[]");

    // On récupère le tableau des articles archivés 
    this.tabArticlesArchives = JSON.parse(localStorage.getItem("articlesArchives") || "[]");

    // Les articles archivés de l'utilisateur connecté
    this.articlesUserArchiveFunction();
  }

  // Methode pour récupérer les articles archivés de l'utilisateur connecté 
  articlesUserArchiveFunction(){
    // On récupère les article de l'utisateur connecté
    this.articlesUserArchives = this.tabArticlesArchives.filter((element?:any)=>element?.userId == this.idUserConnect);
    console.log(this.articlesUserArchives);
  }

  // Désarchiver un article 
  desarchiver(article:any){
    // On trouve l'indexe par rapport à l'identifiant
    let index = this.tabArticlesArchives.findIndex((element:any)=>element.id == article.id);

    if(index !== -1){
      // Alert de confirmation 
      Swal.fire({
        title: "Etes-vous sur???",
        text: "Vous allez desarchiver cet article",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#596235",
        cancelButtonColor: "#D96845",
        confirmButtonText: "Oui, je désarchive!"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(article);
          // On ajoute l'article dans le tableau des articles initiale
          this.tabArticles.push(article);
          console.log(this.tabArticles);
          // On met à jour le localStorage pour les articles archivés
          localStorage.setItem("articles", JSON.stringify(this.tabArticles));
          

          // On supprime dans le tableau des articles archivé 
          this.tabArticlesArchives.splice(index,1)

          // On met à jour le localStorage
          localStorage.setItem("articlesArchives", JSON.stringify(this.tabArticlesArchives));

          // On met à jour le tableau des articles de l'utilisateur
          this.articlesUserArchiveFunction();
    
        }
      })

    }
  }

  // Supprimer un article 
  supprimer(article:any){    
    // On trouve l'indexe par rapport à l'identifiant
    let index = this.tabArticlesArchives.findIndex((element:any)=>element.id == article.id);

    if(index !== -1){
      // Alert de confirmation 
      Swal.fire({
        title: "Etes-vous sur???",
        text: "Vous allez supprimer cet article",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#596235",
        cancelButtonColor: "#D96845",
        confirmButtonText: "Oui, je supprime!"
      }).then((result) => {
        if (result.isConfirmed) {
          // On ajoute l'article dans le tableau des articles supprimés
          this.tabArticlesSupprimes.push(article);
          console.log(this.tabArticlesSupprimes);
          // On met à jour le localStorage pour les articles archivés
          localStorage.setItem("articlesSupprimes", JSON.stringify(this.tabArticlesSupprimes));
          

          // On supprime dans le tableau des articles archivé 
          this.tabArticlesArchives.splice(index,1)

          // On met à jour le localStorage
          localStorage.setItem("articlesArchives", JSON.stringify(this.tabArticlesArchives));

          // On met à jour le tableau des articles de l'utilisateur
          this.articlesUserArchiveFunction();

          // this.gestionArticle.tabArticlesUser.splice(index,1)
          // console.log(this.gestionArticle.tabArticles);
          // console.log(this.gestionArticle.tabArticlesUser);
          // On met à jour le tableau des articles dans le localStorage 
          // this.gestionArticle.messageAlert("Article supprimé!", "", "success");     
        }
      })

    }
  }
  
}
