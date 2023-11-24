import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ServiceArticle {
    article:any;
    // Les attributs
    url = "https://jsonplaceholder.typicode.com/"
    // Injection de dépendance de la classe HttpClient
    constructor(private httpClient: HttpClient){}

    // Methode pour récupérer les articles 
    getArticle(){
        return this.httpClient.get(this.url+"/posts");
    }

    // Methode pour récuperer un article selon l'identifiant
    public getArticleById(id?:number) {
        return this.httpClient.get(`${this.url}/posts/${id}`);        
    }

    // Methode pour ajouter un article 
    public addArticle(postData: Object) {
        return this.httpClient.post(`${this.url}/posts/`, postData);
    } 

    // Methode pour modifier un article 
    public updateArticle(postData: Object, id:number) {
        return this.httpClient.put(`${this.url}/posts/${id}`, postData);
    } 
    
    // Methode pour supprimer 
    public deleteArticle(id:number) {
       return this.httpClient.delete(`${this.url}/posts/${id}`);
    }

}