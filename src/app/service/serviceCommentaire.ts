import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class serviceCommentaire{

    // injection de l'API
    constructor( private httpClient : HttpClient){ }

    // methode pour recuperer les commentaire se trouvant dans l'API JSON...

    getCommentaire(){

        this.httpClient.get("https://jsonplaceholder.typicode.com/comments")

    }

}