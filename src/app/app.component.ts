import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceUser } from './service';
import { Adresse } from './model/adresse';
import { Company } from './model/company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'atelier6';

  users: any;

  // Adresse: 
  objectAdresse = new Adresse();
  
  // Company: 
  objectCompany = new Company();
  bs: string = "";
  catchPhrase: string = "";
  name: string = "";

  // Les données de Jsonplaceolder 

  // Injection du service HttpClient 
  constructor(private serviceUser: ServiceUser){}

  ngOnInit(): void {
    this.serviceUser.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }

  showAddress(adresseUser:any){

    this.objectAdresse.city = adresseUser.city;
    this.objectAdresse.street = adresseUser.street;
    this.objectAdresse.suite = adresseUser.suite;
    this.objectAdresse.zipcode = adresseUser.zipcode;
  }

  showCompany(companyUser:any){
    this.objectCompany.bs = companyUser.bs;
    this.objectCompany.catchPhrase = companyUser.catchPhrase;
    this.objectCompany.name = companyUser.name;
  }

  
  
}
