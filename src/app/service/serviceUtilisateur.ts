import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ServiceUtilisateur{
    // injection de dépendance de la class HttpClient 
    constructor(private httpClient: HttpClient){}

    // méthode de recupération des articles
    getUtilisateur(){
        return this.httpClient.get("http://jsonplaceholder.typicode.com/users")
    }
    

}