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

  // Pour la recherche de l'article 
  inputSerach: string = "";
  articlesArchFilter: any;
  
  // Attribut pour la pagination
  articlesParPage = 5; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

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
    this.articlesArchFilter = this.articlesUserArchives;
  }

  // Recherche des articles supprimés de l'utilisateur 
  onSearch(){
    // Recherche se fait selon le nom ou le prenom
    this.articlesArchFilter = this.articlesUserArchives.filter(
      (elt:any) => (elt?.title.toLowerCase().includes(this.inputSerach.toLowerCase()))
    );
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
  

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.articlesArchFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.articlesArchFilter.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  
  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.articlesArchFilter.length / this.articlesParPage);
  }
}
