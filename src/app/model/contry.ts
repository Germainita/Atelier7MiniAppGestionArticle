export interface ICountry {
    id?: number;
    name?: string;
    iso?: string;
    code?: string;
  }
  
  export class Country implements ICountry {
    constructor(
      public id?: number,
      public name?: string,
      public code?: string,
      public iso?:string,
  
    ) {
      this.id = id;
      this.name = name;
      this.code=code;
      this.iso = iso;
  
    }
  }