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

    // Methode pour modifier un article 
    public updateArticle(postData: Object, id:number) {
        // let endPoints = "/posts/1"
        return this.httpClient.put(`${this.url}/posts/${id}`, postData);
        // this.httpClient.put(`${this.url}/posts/${id}`, postData).subscribe(data => {
        //   console.log(data);
        // });
    }    

}