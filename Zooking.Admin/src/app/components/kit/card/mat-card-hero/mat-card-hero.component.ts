import { Component, Input } from '@angular/core';
import { IAnimal } from 'src/app/shared/models/animals/animal';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { PhotoService } from '../photo.service';


type IItem = IAnimal | IShelter;

@Component({
  selector: 'app-mat-card-hero',
  templateUrl: './mat-card-hero.component.html',
  styleUrls: ['./mat-card-hero.component.scss']
})


export class MatCardHeroComponent  {
  @Input() content?: string;
  @Input() isHidden?: boolean;
  @Input() item?: IItem;
  @Input() detailedMode: boolean;
  @Input() link?: string;
  @Input() type?: string;

  progress: boolean;
  formData = new FormData();

  constructor(
    private photoService: PhotoService
  ) {
    this.detailedMode = true;
  }

  onImageUpload(files, item) {

    if (files.length === 0) { return; }
    // this.products.filter(z => z.id === product.id)[0].pictureUrl = '';
    const fileToUpload = files[0] as File;
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.progress = true;

    console.log(this.type);
    

    if (this.type === 'pet') {
      this.addPhotoToPet(files, item);
    }

    if (this.type === 'shelter') {
      console.log(1231231231231231231);
      
      this.addPhotoToShelter(files, item);
    }

  }

  addPhotoToPet(files, item): void {
    this.photoService.addPhotoToPet(item, this.formData).subscribe((res: IItem) => {
      this.item.pictureUrl = res.pictureUrl;
      this.progress = false;
      this.formData.delete('file');
      files = [];
    });
  }

  addPhotoToShelter(files, item): void {
    this.photoService.addPhotoToShelter(item, this.formData).subscribe((res: IItem) => {
      this.item.pictureUrl = res.pictureUrl;
      this.progress = false;
      this.formData.delete('file');
      files = [];
    });
  }

}
