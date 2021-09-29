export interface IShelter {
  id?: number;
  name: string;
  description?: string;
  pictureUrl?: string;
  region?: string;
  enrolledDate?: Date;
  isSelected?: boolean;
  animalCount?: number;
  isSale?: boolean;
  guId?: number;
  userName?: string;

  // TODO: добавить кураторов
  // TODO: добавить помощников
  // TODO: добавить питомцев

}

export interface IShelterToCreate {
  id?: number;
  name: string;
  description?: string;
  animalCount?: number;
  pictureUrl?: string;
  guId?: number;
  typeId: number;
  regionId: number;
  userName?: string;

}

