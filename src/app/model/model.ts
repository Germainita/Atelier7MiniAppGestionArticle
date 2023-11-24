// Fichier pour les models article, utilisateur et commentaire 

import { Adresse } from "./adresse";
import { Company } from "./company";

// Model pour article 
export interface IArticle {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
  }

  export class Article implements IArticle {
    constructor(public userId?: number, public id?: number,  public title?: string,public body?: string) {
      this.userId = userId;
      this.id = id;
      this.title = title;
      this.body = body;
    }
  }

//   Model pour commentaires 
export interface ICommentaire {
    idArticle?: number;
    id?: number;
    name?: string;
    email?: string;
    body?: string;
  }

  export class Commentaire implements ICommentaire {
    constructor(public idArticle?: number, public id?: number,  public name?: string, public email?: string, public body?: string) {
      this.idArticle = idArticle;
      this.id = id;
      this.name = name;
      this.email = email;
      this.body = body;
    }
  }

// Model pour utilisateur 
export interface IUtilisateur {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    adress?: Adresse;
    phone?: string;
    website?: string;
    company?: Company;
  }

  export class Utilisateur implements IUtilisateur {
    constructor
    (
        public id?: number,  
        public name?: string, 
        public username?: string, 
        public email?: string, 
        public adress?: Adresse,
        public phone?: string,
        public website?: string,
        public company?: Company
    ) 
    {
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.adress = adress;
      this.phone = phone;
      this.website = website;
      this.company = company;
    }
  }