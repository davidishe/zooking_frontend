import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnimal } from 'src/app/shared/models/animals/animal';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PetService } from '../../content/main/items/pet.service';
import { PetsService } from '../../content/main/pets/pets.service';
import { SheltersService } from '../../content/main/shelters/shelters.service';
import { AccountService } from '../../layouts/account/account.service';
import { PhotoService } from '../card/photo.service';

type IItem = IAnimal | IShelter;

@Component({
  selector: 'app-item-detailed-card',
  templateUrl: './item-detailed-card.component.html',
  styleUrls: ['./item-detailed-card.component.scss']
})
export class ItemDetailedCardComponent implements OnInit {

  item: IItem;
  itemId: number;
  type: string;
  progress: boolean;
  formData = new FormData();
  isEdited: boolean;
  itemForm?: FormGroup;
  

  constructor(
    private petService: PetService,
    private sheltersService: SheltersService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private breadcrumbService: BreadcrumbService,
    public accountService: AccountService,
    private router: Router,

  ) {
      this.breadcrumbService.set('@productDetails', '');
  }

  ngOnInit() {
    this.onFormInit();
  }


  ngAfterViewInit(): void {
    this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');

    setTimeout(() => {
      this.loadItemWithOptions();
      console.log('halo worild');
      
    }, 100);
  }


  patchValues() {
    this.itemForm.controls.name.patchValue(this.item.name);
    this.itemForm.controls.description.patchValue(this.item.description);
  }


  loadItemWithOptions(): void {

    if (this.type === 'shelter') {
      this.loadShelterByGuId();
    }

    if (this.type === 'pet') {
      this.loadPetByGuId();
    }
  }


  onFormInit() {
    this.itemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  loadPetByGuId() {
      this.petService.getItemById(this.itemId).subscribe((response: IItem) => {
        if (response) {
          this.item = response;
          this.breadcrumbService.set('@productDetails', this.item.name);
          this.patchValues();
        }
    }, err => {
      console.log(err);
    });
  }


  loadShelterByGuId() {
      this.sheltersService.getItemById(this.itemId).subscribe((response:  IItem) => {
      this.item = response;
      console.log(this.item);
      this.breadcrumbService.set('@productDetails', this.item.name);
      this.patchValues();

    }, err => {
      console.log(err);
    });
  }





  getEmitedOutputItem(item: IItem) {
    this.item = item;
    this.isEdited = false;
  }


  editMode(status: boolean): void {
    this.isEdited = status;
  }


  delete(id: number): void {

    if (this.type === 'pet') {
      this.petService.deleteItem(id).subscribe((res: any) => {
        if (res) {
          this.router.navigateByUrl('/pets');
        }
      })
    }

    if (this.type === 'shelter') {
      this.sheltersService.deleteItem(id).subscribe((res: any) => {
        if (res) {
          this.router.navigateByUrl('/shelters');
        }
      })
    }



  }


}
