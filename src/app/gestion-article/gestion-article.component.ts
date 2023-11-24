import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-article',
  templateUrl: './gestion-article.component.html',
  styleUrls: ['./gestion-article.component.css']
})
export class GestionArticleComponent implements OnInit {
  // Déclarations des attributs
  tabUtilisateurs: any;
  userConnect: any;
  tabArticles: any;
  tabCommentaies: any;
  Articles: any;

  // Tableau des article de l'utisateur connecté 
  tabArticlesUser: any;
  apiService: any;

  // Définition du constructeur 
  constructor (private route: ActivatedRoute,httpClient: HttpClient){}
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];


  ngOnInit(): void {
    // On récuere les donnees du localStorage
    // les utilisateurs
    this.tabUtilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    // les articles 
    this.tabArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    // les commentaires: 
    this.tabCommentaies = JSON.parse(localStorage.getItem("commentaires") || "[]");
    // On trouve l'utilisateur qui s'est connecté 
    this.userConnect = this.tabUtilisateurs.find((element:any) => element.id == this.idUserConnect);

    // On récupère les article de l'utisateur connecté
    this.tabArticlesUser = this.tabArticles.filter((element?:any)=>element?.userId == this.idUserConnect);
    console.log("Les articles de l'utilisateurs connecté");
    console.log(this.tabArticlesUser);
  }
//   // methode pour sauvegarder
// sauvegarder(){
  
// }

  // constructor(private httpClient: HttpClient) {}

// addPost(Articles: any) {
//   const url = 'https://jsonplaceholder.typicode.com/posts';

//   this. tabArticlesUser.post(url, Articles).subscribe((element:any) => {
//     console.log('Article ajouté :', element);
//   });
// }
  
posts: any[] = [];
  nouvelArticle = { title: '', body: '' };
  isAjoutModalOuvert = false;
  

ajouterArticle() {
    const titreTemporaire = this.nouvelArticle.title;
    const contenuTemporaire = this.nouvelArticle.body;

    this.apiService.ajouterArticle(this.nouvelArticle).subscribe((response: any) => {
      console.log('Réponse du service après ajout d\'article :', response);
      this.posts.push(response); // Ajouter le nouvel article à la liste existante
      this.fermerAjoutModal(); // Fermer le modal

      // Réinitialiser les champs en utilisant les valeurs temporaires
      this.nouvelArticle = { title: '', body: '' };
    });

    // Afficher les valeurs pour le débogage
    console.log('Valeurs après ajout :', titreTemporaire, contenuTemporaire);
  }
  fermerAjoutModal() {
    throw new Error('Method not implemented.');
  }
  

}
