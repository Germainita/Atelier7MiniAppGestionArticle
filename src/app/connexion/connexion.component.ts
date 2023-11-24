import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  // Déclaration des variables 
  defaultPassword:string = "passer";
  tabUtilisateurs: any;
  utilisateurTrouve:any;


  // Variable pour la connexion
  emailCon : String = "";
  passwordCon: String = "";

  // Pour vérifier les champs pour la connexion
  verifEmailCon : String = "";
  verifPasswordCon: String = "";

  // Variables Si les valeurs sont exactes
  exactEmailCon : boolean = false;
  exactPasswordCon : boolean = false;

  // Déclaration des méthodes
  constructor(private route : Router){}

  ngOnInit(): void {
    this.tabUtilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]")
  }

   // Fonction de Verification de l'email pour la fonctionnalité connexion
   verifEmailConFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmailCon = false;

    if(this.emailCon == ""){
      this.verifEmailCon = "Veuillez renseigner votre email";
    }
    else if (!this.emailCon.match(emailPattern) ){
      this.verifEmailCon = "Veuillez donner un email valide";
    }
    else {
      this.verifEmailCon = "";
      this.exactEmailCon = true;
    }
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  verifPasswordConFonction(){
    this.exactPasswordCon = false;
    if(this.passwordCon == ""){
      this.verifPasswordCon = "Veuillez renseigner votre mot de passe";
    }
    else if (this.passwordCon.length < 5 ){
      this.verifPasswordCon = "Mot de passe doit être supérieur ou égal à 5";
    }
    else{
      this.verifPasswordCon = "";
      this.exactPasswordCon = true;
    }
  }

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }


  // Methode pour vider les champs de la connexion
  viderChampsCon(){
    this.emailCon = "";
    this.passwordCon = "";

    this.verifEmailCon = "";
    this.verifPasswordCon = "";

    this.exactEmailCon = false;
    this.exactPasswordCon = false;
  }

  // Methode pour connexion 
  connexion(){
    this.verifEmailConFonction();
    this.verifPasswordConFonction();
    if (this.exactEmailCon && this.exactPasswordCon){

      this.utilisateurTrouve = this.tabUtilisateurs.find((element:any)=> element.email==this.emailCon && this.defaultPassword==this.passwordCon);
  
      if(this.utilisateurTrouve){
        this.viderChampsCon();
        this.verifierChamps("Félicitation!", "Authentifié avec succes", "success");
        this.route.navigate(['gestionArticle', this.utilisateurTrouve.id]);
      }
      else{
        this.verifierChamps("Erreur!", "Le compte n'existe pas", "error");
      }
    }
  }
}
