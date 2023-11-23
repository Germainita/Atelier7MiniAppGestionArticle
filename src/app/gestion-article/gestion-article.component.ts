import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/model';
import { ServiceArticle } from '../service/serviceArticle';

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

  // Déclaration d'un objet article 
  objectArticle = new Article;

  // L'article trouvé: 
  articleFound: any;

  // Définition du constructeur 
  constructor (private route: ActivatedRoute, private articleService: ServiceArticle){}
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
    // console.log("Les articles de l'utilisateurs connecté");
    // console.log(this.tabArticlesUser);

  }

  // Methode pour modifier un article 
  // Charger les informations de l'article 
  // On récupère l'article cliqué avec la méthode getArticleById de notre service 
  chargerInfosArticle(article:any){
    // console.log(article);
    this.articleFound = article;
    this.objectArticle.id = article.id;
    this.objectArticle.idUser = article.userId;
    this.objectArticle.title = article.title;
    this.objectArticle.body = article.body;
  }
  modfier(){
    // Mis à jour d'un article 
    // On fait appel à la méthode updateArticle de notre service article 
    this.articleService.updateArticle(this.objectArticle, this.articleFound.id).subscribe(data =>{
      // console.log(data);
      // On met à jour l'objet trouvé pour lui donnner les nouvelles valeurs 
      this.articleFound = data;
      // Swal.fire({
      //   title: "Etes-vous sur???",
      //   text: "Vous allez mofier ce contact",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: "#BE3144",
      //   cancelButtonColor: "#F05941",
      //   confirmButtonText: "Oui, je modifie!"
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.profFound.nom = this.nom;
      //     this.profFound.prenom = this.prenom;
      //     this.profFound.email = this.email;
      //     this.profFound.adresse = this.adresse;
      //     this.profFound.telephone = this.telephone;
      //     this.profFound.image = this.imageUrl;
      //     this.profFound.updateAt = new Date();
      //     this.profFound.updateBy = this.adminConnect.email;
      //     // On met à jour le tableau qui est stocké dans le localStorage 
      //     localStorage.setItem("professeurs", JSON.stringify(this.tabProfs))
      //     this.verifierChamps("Compte modifié!", "", "success");     
      //   }
      // });
      // On recherche l'objet dans le tableau des articles de l'utilisateurs puis on le met à jpur 
      for(let i=0; i< this.tabArticlesUser.length; i++){
        if (this.tabArticlesUser[i].id == this.articleFound.id){
          // console.log("trouvé");
          this.tabArticlesUser[i].title = this.articleFound.title;
          this.tabArticlesUser[i].body = this.articleFound.body;
          console.log(this.tabArticlesUser[i]);
          console.log(this.tabArticles);
          break;
          // On met à jour le localStorage
        }
      }

      // On parcourt le tableau pour lui donner l'objet modifier 
      
      // console.log(this.tabArticlesUser);
    })
    console.log(this.articleFound)
    // console.log(article);
    // alert(this.objectArticle.title);
    // this.articleFound.title = this.objectArticle.title;
    // this.articleFound.body = this.objectArticle.body;
    // console.log(this.articleFound);
    // console.log(this.tabArticlesUser);
    // console.log(this.tabArticles);
  }

  // Methode pour mettre à jour un article 
  public updatePost(postData: Object) {
    let endPoints = "/posts/1"
    // this.httpClient.put(this.url + endPoints, postData).subscribe(data => {
      // console.log(data);
    // });
  }

  
}
