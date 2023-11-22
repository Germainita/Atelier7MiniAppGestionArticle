import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ServiceArticle {
    // Injection de dépendance de la classe HttpClient
    constructor(private httpClient: HttpClient){}

    // Methode pour récupérer les articles 
    getArticle(){
        return this.httpClient.get("https://jsonplaceholder.typicode.com/posts");
    }
}