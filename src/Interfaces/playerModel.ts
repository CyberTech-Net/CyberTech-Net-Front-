import countryModel from "./countryModel";

export default interface playerModel {
    id: string;
    country: countryModel;
    firstName : string;
    nickName: string;
    secondName: string;
    birthDate: string; 
    imageId: string;
  }
  