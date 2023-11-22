import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  // Déclaration des variables 
  email?: string;
  password?: string;
  defaultPassword:string = "passer";
  tabUtilisateurs: any;
  utilisateurTrouve:any;

  // Déclaration des méthodes
  constructor(private route : Router){}

  ngOnInit(): void {
    this.tabUtilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]")
  }

  // Methode pour connexion 
  connexion(){
    this.utilisateurTrouve = this.tabUtilisateurs.find((element:any)=> element.email==this.email && this.defaultPassword==this.password);

    if(this.utilisateurTrouve){
      alert("Trouvé")
      this.route.navigate(['gestionArticle', this.utilisateurTrouve.id]);
    }
    else{
      alert("Le compte n'existe pas");
    }
  }
}
