import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corbeille',
  templateUrl: './corbeille.component.html',
  styleUrls: ['./corbeille.component.css']
})
export class CorbeilleComponent {
  // déclaration des variables
  tabUtilisateurs: any;
  tabArticles:any;
  userConnect: any;

  // Les articles archivé de l'utilisateur
  articlesUserSupprimes:any[] = [];

  // Tableau des articles supprimés
  tabArticlesSupprimes:any[] = [];

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

    // On récupère le tableau des articles supprimés 
    this.tabArticlesSupprimes = JSON.parse(localStorage.getItem("articlesSupprimes") || "[]")

    // this.tabArticlesArchives = JSON.parse(localStorage.getItem("articlesArchives") || "[]");

    // Les articles archivés de l'utilisateur connecté
    this.articlesSupprimeFunction();
  }

  // Methode pour récupérer les articles archivés de l'utilisateur connecté 
  articlesSupprimeFunction(){
    // On récupère les article de l'utisateur connecté
    this.articlesUserSupprimes = this.tabArticlesSupprimes.filter((element?:any)=>element?.userId == this.idUserConnect);
    console.log(this.articlesUserSupprimes);
  }

  // Restaurer un article 
  restaurer(article:any){
    // On trouve l'indexe par rapport à l'identifiant
    let index = this.tabArticlesSupprimes.findIndex((element:any)=>element.id == article.id);

    if(index !== -1){
      // Alert de confirmation 
      Swal.fire({
        title: "Etes-vous sur???",
        text: "Vous allez restaurer cet article",
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
          this.tabArticlesSupprimes.splice(index,1)

          // On met à jour le localStorage
          localStorage.setItem("articlesSupprimes", JSON.stringify(this.tabArticlesSupprimes));

          // On met à jour le tableau des articles de l'utilisateur
          this.articlesSupprimeFunction();
    
        }
      })

    }
  }
  
}
