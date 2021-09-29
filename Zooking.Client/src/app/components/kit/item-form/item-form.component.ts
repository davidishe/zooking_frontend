import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from 'src/app/services/products/shop.service';
import { IAnimal, IAnimalToCreate } from 'src/app/shared/models/animals/animal';
import { ItemsService } from '../../content/main/items/items.service';
import { PetService } from '../../content/main/items/pet.service';
import { IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { SheltersService } from '../../content/main/shelters/shelters.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})

export class ItemFormComponent implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  type: string;

  item: IAnimalToCreate | IShelterToCreate;
  // items: IAnimal[] = [];  

  constructor(
    private breadcrumbService: BreadcrumbService,
    private petService: PetService,
    private shelterService: SheltersService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.onFormInit();
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
  }

  onFormInit() {
    this.itemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  AddItem() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.controls.itemForm.errors);
      return;
    } else {
      this.item = {
        name: this.itemForm.controls.name.value,
        description: this.itemForm.controls.description.value,
        pictureUrl: "",
        typeId: 1,
        regionId: 1
      };

      if (this.type === 'pet') {
        this.createPet();
      }
      if (this.type === 'shelter') {
        this.createShelter();
      }

    }
  }

  createPet() {
    this.petService.createItem(this.item).subscribe((item: IAnimalToCreate) => {
      if (item) {
        this.openSnackBar('запись добавлена');
        // this.setTimeOut();
        this.router.navigateByUrl('pets');
      }
    }, error => {
      console.log(error);
      this.openSnackBar('что-то пошло не так!');
    });
  }

  createShelter() {
    this.shelterService.createItem(this.item).subscribe((item: IShelterToCreate) => {
      if (item) {
        this.openSnackBar('запись добавлена');
        // this.setTimeOut();
        this.router.navigateByUrl('shelters');
      }
    }, error => {
      console.log(error);
      this.openSnackBar('🙁 что-то пошло не так!');
    });
  }

  setTimeOut(): void {
    setTimeout(() => {
    }, 100);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
