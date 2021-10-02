export interface IAssistant {
  id?: number;
  name: string;
  mainPhoto: string;
  isEnabled?: boolean;
  description?: string;
  rating?: number;

  street?: string;
  city?: string;
  house?: string;
  zipCode?: string;

}

// export interface IAnimalToCreate {
//   id?: number;
//   name: string;
//   description?: string;
//   pictureUrl?: string;
//   guId?: number;
//   typeId: number;
//   regionId: number;
// }


