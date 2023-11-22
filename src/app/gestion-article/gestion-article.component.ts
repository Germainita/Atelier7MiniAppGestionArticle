import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  // Définition du constructeur 
  constructor (private route: ActivatedRoute){}
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
  }
}
