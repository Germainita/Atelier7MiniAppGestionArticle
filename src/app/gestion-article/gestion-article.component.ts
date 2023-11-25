import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Commentaire } from '../model/model';
import { ServiceArticle } from '../service/serviceArticle';
import Swal from 'sweetalert2';

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
  articlesArchive=[];
  articlesSupprime=[];

  titre = "";
  description = "";



  // Tableau des article de l'utisateur connecté 
  tabArticlesUser: any;

  // Tableau des articles archivés
  tabArticlesArchives:any[] = [];

  // Tableau des articles supprimés
  tabArticlesSupprimes:any[] = [];

  // Déclaration d'un objet article 
  objectArticle = new Article;

  // Déclaration d'un objet commentaire 
  tabCommentsArticles: Commentaire[] = []
  // objectCommenatire [] = new Commentaire [];

  // L'article trouvé: 
  articleFound: any;

  chooseDetail: boolean = true;

  // Pour la recherche de l'article 
  inputSerach: string = "";
  articlesUserFilter: any;

  // Attribut pour la pagination
  articlesParPage = 5; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Définition du constructeur 
  constructor (private route: ActivatedRoute, private articleService: ServiceArticle){}
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];



  ngOnInit() {
    // On récuere les donnees du localStorage
    // les utilisateurs
    this.tabUtilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    // les articles 
    this.tabArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    // les commentaires: 
    this.tabCommentaies = JSON.parse(localStorage.getItem("commentaires") || "[]");
    // On trouve l'utilisateur qui s'est connecté 
    this.userConnect = this.tabUtilisateurs.find((element:any) => element.id == this.idUserConnect);
    
    // On stocke le tableau des articles archivés dans le localstorage 
    if(!localStorage.getItem("articlesArchives")){
      localStorage.setItem("articlesArchives", JSON.stringify(this.articlesArchive));
    }
    this.tabArticlesArchives = JSON.parse(localStorage.getItem("articlesArchives") || "[]")
    
    // On stocke le tableau des articles supprimés dans le localstorage 
    if(!localStorage.getItem("articlesSupprimes")){
      localStorage.setItem("articlesSupprimes", JSON.stringify(this.articlesArchive));
    }
    this.tabArticlesSupprimes = JSON.parse(localStorage.getItem("articlesSupprimes") || "[]")

    // Les articles de l'utilisateur connecté 
    this.articlesUserFunction();
  }

  // Methode pour récupérer les articles de l'utilisateur connecté 
  articlesUserFunction(){
    // On récupère les article de l'utisateur connecté
    this.tabArticlesUser = this.tabArticles.filter((element?:any)=>element?.userId == this.idUserConnect);
    this.articlesUserFilter = this.tabArticlesUser;
  }

  // Recherche des articles supprimés de l'utilisateur 
  onSearch(){
    // Recherche se fait selon le nom ou le prenom
    this.articlesUserFilter = this.tabArticlesUser.filter(
      (elt:any) => (elt?.title.toLowerCase().includes(this.inputSerach.toLowerCase()))
    );
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  messageAlert(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });

  }

  viderArticle(){
    this.titre = "";
    this.description = "";
  }
  
  // Methode pour ajouter un article 
  ajouter(){
    // On récupère l'identifiant du dernier element du tableau article
    let lastIdArticle = this.tabArticles[this.tabArticles.length - 1].id;

    // On crée l'objet à ajouter 
    let article = {
      userId: this.idUserConnect,
      title: this.titre,
      body: this.description
    }
    
    if (!this.titre){
      // Si le titre n'est pas renseigné, on n'ajoute pas 
      this.messageAlert("Ajout impossible!", "Le titre est obligatoire", "error")
    }else{
      // On cherche dans le tableau si l'utilisateur n'a pas déja un article avec le meme titre 
      let articleExist = this.tabArticlesUser.find((article:any)=> article.title.toLowerCase() == this.titre.toLowerCase());
      if(articleExist){
        this.messageAlert("Ajout impossible!", "L'article existe déjà", "error");
      }
      else{
        this.articleService.addArticle(article).subscribe(valeur =>{
          // l'objet valeur renvoyé à toujours le meme identifiant
          this.objectArticle = valeur
          
          // On change l'identifiant de l'element à ajouter 
          this.objectArticle.id = lastIdArticle + 1;
          
          // On ajoute l'objet dans le tableau des articles 
          this.tabArticles.push(this.objectArticle);
    
          // On met à jour le tableau qui est stocké dans le localStorage 
          localStorage.setItem("articles", JSON.stringify(this.tabArticles))
          this.messageAlert("Felicitation!", "Article ajouter avec success", "success");
          
          // On vide les champs de l'objetarticle
          this.viderArticle();
    
          // On met à jour le tableau des articles de l'utilisateur
          this.articlesUserFunction();
        });
      }
    }
    
  }


  // Methode pour modifier un article 
  // Charger les informations de l'article 
  // On récupère l'article cliqué avec la méthode getArticleById de notre service 
  chargerInfosArticle(article:any){
    this.articleFound = article;
    this.objectArticle.id = article.id;
    this.objectArticle.userId = article.userId;
    this.objectArticle.title = article.title;
    this.objectArticle.body = article.body;
  }
  
  // Methode pour modifier l'article en question 
  modfier(){
    // Mis à jour d'un article
    if(!this.objectArticle.title){
      this.messageAlert("Impossible!", "Titre obligatoire", "error"); 
    }
    else{
      // On s'assure que le titre ne soit pas vide
      // On fait appel à la méthode updateArticle de notre service article 
      this.articleService.updateArticle(this.objectArticle, this.articleFound.id)
      .subscribe(
        valeur =>{
          console.log(valeur);
          // On met à jour l'objet trouvé pour lui donnner les nouvelles valeurs 
          this.articleFound = valeur;
          // On demande une confirmation de modification 
          Swal.fire({
            title: "Etes-vous sur???",
            text: "Vous allez mofier cet article",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Annuler",
            confirmButtonColor: "#596235",
            cancelButtonColor: "#D96845",
            confirmButtonText: "Oui, je modifie!"
          }).then((result) => {
            if (result.isConfirmed) {
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
              // On met à jour le tableau qui est stocké dans le localStorage 
              localStorage.setItem("articles", JSON.stringify(this.tabArticles))
              this.messageAlert("Article modifié!", "", "success");     
            }
          });
        },
        // Si on n'accede pas à l'APi, une reponse d'érreur est envoyé 
        reponse =>{
          // console.log(reponse.status)
          if(reponse.status== 500){
            // On ne peut pas récupérer l'article avec l'api
            // On modifie directement avec localStorage
            Swal.fire({
              title: "Etes-vous sur???",
              text: "Vous allez mofier cet article",
              icon: "warning",
              showCancelButton: true,
              cancelButtonText: "Annuler",
              confirmButtonColor: "#596235",
              cancelButtonColor: "#D96845",
              confirmButtonText: "Oui, je modifie!"
            }).then((result) => {
              if (result.isConfirmed) {
                // On recherche l'objet dans le tableau des articles de l'utilisateurs puis on le met à jpur 
                // console.log(this.articleFound);
                // console.log(this.objectArticle.title);
                // console.log(this.objectArticle.body);
                this.articleFound.title = this.objectArticle.title;
                this.articleFound.body = this.objectArticle.body;

                // On met à jour le tableau qui est stocké dans le localStorage 
                localStorage.setItem("articles", JSON.stringify(this.tabArticles))
                this.messageAlert("Article modifié!", "", "success");     
              }
            });

          }
          console.log("On ne peut pas récupérer l'article avec l'api")
          
          console.log("Post call in error", reponse);
         
        },
        () =>{
          console.log("The post observable is now completed")
        }
      )      
    } 
    
  }

  // Détails d'un article
  details(article:any){
    this.objectArticle = article;
    // On recherche les commentaires de l'article en question dans le tableau des commentaires
    this.tabCommentsArticles = this.tabCommentaies.filter((element?:any)=>element?.postId == article.id);
    console.log(this.tabCommentsArticles)
  }

  showDetail(){
    this.chooseDetail = !this.chooseDetail;
  }
  // Archiver un article 
  archiver(article:any){    
    // On trouve l'indexe par rapport à l'identifiant
    let index = this.tabArticles.findIndex((element:any)=>element.id == article.id);

    if(index !== -1){
      // Alert de confirmation 
      Swal.fire({
        title: "Etes-vous sur???",
        text: "Vous allez archiver cet article",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#596235",
        cancelButtonColor: "#D96845",
        confirmButtonText: "Oui, j'archive!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.tabArticlesArchives.push(article);
          console.log(this.tabArticlesArchives);
          this.tabArticles.splice(index,1)
          this.tabArticlesUser.splice(index,1)
          console.log(this.tabArticles);
          console.log(this.tabArticlesUser);
          // On met à jour le tableau des articles dans le localStorage 
          localStorage.setItem("articles", JSON.stringify(this.tabArticles))
          this.messageAlert("Article archivé!", "", "success");     
          // On met à jour le localStorage pour les articles archivés
          localStorage.setItem("articlesArchives", JSON.stringify(this.tabArticlesArchives));

          // On met à jour le tableau des articles de l'utilisateur
          this.articlesUserFunction();
        }
      })

    }
  }

  // Archiver un article 
  supprimer(article:any){    
    // On trouve l'indexe par rapport à l'identifiant
    let index = this.tabArticles.findIndex((element:any)=>element.id == article.id);

    if(index !== -1){
      // Alert de confirmation 
      Swal.fire({
        title: "Etes-vous sur???",
        text: "Vous allez supprimer définitivement cet article",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#596235",
        cancelButtonColor: "#D96845",
        confirmButtonText: "Oui, je supprime!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.tabArticlesSupprimes.push(article);
          console.log(this.tabArticlesSupprimes);
          this.tabArticles.splice(index,1)
          this.tabArticlesUser.splice(index,1)
          console.log(this.tabArticles);
          console.log(this.tabArticlesUser);
          // On met à jour le tableau des articles dans le localStorage 
          localStorage.setItem("articles", JSON.stringify(this.tabArticles))
          this.messageAlert("Article supprimé!", "", "success");     
          // On met à jour le localStorage pour les articles archivés
          localStorage.setItem("articlesSupprimes", JSON.stringify(this.tabArticlesSupprimes));

          // On met à jour le tableau des articles de l'utilisateur
          this.articlesUserFunction();
        }
      })

    }
  }


  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.articlesUserFilter.slice(indexDebut, indexFin);
  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.articlesUserFilter.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }
  
  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.articlesUserFilter.length / this.articlesParPage);
  }
  
}
