import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ServiceArticle {
    http: any;
    baseUrl: any;
    // Injection de dépendance de la classe HttpClient
    constructor(private httpClient: HttpClient){}

    // Methode pour récupérer les articles 
    getArticle(){
        return this.httpClient.get("https://jsonplaceholder.typicode.com/posts");
    }
    ajouterArticle(article: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/posts`, article);
      }
    
    
    
}