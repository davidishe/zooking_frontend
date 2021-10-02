import { Component, Input } from '@angular/core';
import { IAssistant } from 'src/app/shared/models/animals/assistant';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { PhotoService } from '../photo.service';


type IType = IAssistant;

@Component({
  selector: 'app-mat-card-hero',
  templateUrl: './mat-card-hero.component.html',
  styleUrls: ['./mat-card-hero.component.scss']
})


export class MatCardHeroComponent  {
  @Input() content?: string;
  @Input() isHidden?: boolean;
  @Input() item?: IType;
  @Input() detailedMode: boolean;
  @Input() link?: string;


  progress: boolean;
  formData = new FormData();

  constructor(
    private photoService: PhotoService
  ) {
    this.detailedMode = true;
  }

  onImageUpload(files, item) {

    if (files.length === 0) { return; }
    // this.products.filter(z => z.id === product.id)[0].mainPhoto = '';
    const fileToUpload = files[0] as File;
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.progress = true;
    this.addPhotoToShelter(files, item);

  }

  addPhotoToPet(files, item): void {
    this.photoService.addPhotoToPet(item, this.formData).subscribe((res: IType) => {
      this.item.mainPhoto = res.mainPhoto;
      this.progress = false;
      this.formData.delete('file');
      files = [];
    });
  }

  addPhotoToShelter(files, item): void {
    this.photoService.addPhotoToShelter(item, this.formData).subscribe((res: IType) => {
      this.item.mainPhoto = res.mainPhoto;
      this.progress = false;
      this.formData.delete('file');
      files = [];
    });
  }

  getArray(value: number) {
    const arrayOfDigits = Array.from(String(value), Number);
    return arrayOfDigits;
  }

}
