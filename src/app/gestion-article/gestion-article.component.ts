import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/model';
import Swal from 'sweetalert2';
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

  // Tableau des article de l'utisateur connecté 
  tabArticlesUser: any;
 
  archivedArticles: Article[] = [];
  
  

  // Définition du constructeur 
  // constructor (private route: ActivatedRoute){}

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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


  // Archiver(article: any[]){
    
  //   const index = article.indexOf([]);

  //   if (index !== -1) {
  //     const elementArchive = article.splice(index, 1)[0];
  //     this.archivedElements.push(elementArchive); // Ajouter l'élément archivé à la liste des éléments archivés
  //     console.log('Élément archivé avec succès.');
  
  //     // Ici, vous pouvez également appeler un service pour sauvegarder l'élément dans une base de données ou effectuer d'autres opérations de sauvegarde.
  //     this.monService.sauvegarderElementArchive(elementArchive).subscribe(
  //       () => {
  //         console.log('Élément archivé sauvegardé avec succès.');
  //       },
  //       (erreur: Error) => {
  //         console.error('Erreur lors de la sauvegarde de l\'élément archivé :', erreur);
  //       }
  //     );
  //   } else {
  //     console.log('Élément non trouvé dans la liste.');
  //   }
  // }


  archiver(article: any): void {
    console.log(article);
    // const index = this.tabArticlesUser.indexOf(article);
    const index=this.tabArticlesUser

    if (index !== -1) {
      const archivedArticle = this.tabArticlesUser.splice(index, 1)[0];
      this.archivedArticles.push(archivedArticle);
      console.log('Article archivé avec succès.');
      console.log(this.archivedArticles);

      // Envoyer une requête HTTP PUT ou PATCH pour mettre à jour l'article archivé sur l'API JSONPlaceholder
      this.http.put(`https://jsonplaceholder.typicode.com/posts/${archivedArticle.id}`, archivedArticle)
        .subscribe(() => {
          console.log('Article archivé mis à jour avec succès sur l\'API.');
        }, (error: any) => {
          console.error('Erreur lors de la mise à jour de l\'article archivé sur l\'API :', error);
        });
    } else {
      console.log('Article non trouvé dans la liste.');
    }
  }

}
