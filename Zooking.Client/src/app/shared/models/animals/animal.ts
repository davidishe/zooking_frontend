export interface IAnimal {
  id?: number;
  name: string;
  description?: string;
  price: number;
  pictureUrl: string;
  quantity?: number;
  type?: string;
  region?: string;
  enrolledDate?: Date;
  guId?: number;
  isSelected?: boolean;
  isSale?: boolean;
  userName?: string;

}

export interface IAnimalToCreate {
  id?: number;
  name: string;
  description?: string;
  pictureUrl?: string;
  guId?: number;
  typeId: number;
  regionId: number;
}


