import { Country } from "./contry";

export interface ICity {
    id?: number;
    name?: string;
    iso?: string;
    country_id?: Country;
  }

  export class City implements ICity {
    constructor(public id?: number, public name?: string,public iso?: string, public country?: Country,) {
      this.id = id;
      this.name = name;
      this.iso = iso;
      this.country = country;
    }
  }