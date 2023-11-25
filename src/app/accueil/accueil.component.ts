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

  inputSerach: string = "";
  articlesFilter: any;

  // Attribut pour la pagination
  articlesParPage = 10; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

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
    this.articlesFilter = this.articles;

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

  // On recherche un article par rapport au titre ou à la description 
  onSearch(){
  // Recherche se fait selon le nom ou le prenom
  this.articlesFilter = this.articles.filter(
    (elt:any) => (elt?.title.toLowerCase().includes(this.inputSerach.toLowerCase()))
  );
  // this.filteredApprenants = this.tabApprenants.filter(
  //   (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))
  // );
  
  }

  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.articlesFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.articlesFilter.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }


  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.articlesFilter.length / this.articlesParPage);
  }
}
