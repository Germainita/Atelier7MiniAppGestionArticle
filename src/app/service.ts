import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class ServiceUser {
    constructor(private httpclient: HttpClient){}

    // Methode pour recupérer les utilisateurs de jsonplaceholder
    getUsers(){
        return this.httpclient.get("https://jsonplaceholder.typicode.com/users");
    }
}