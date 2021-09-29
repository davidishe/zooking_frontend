import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IAnimal, IAnimalToCreate } from 'src/app/shared/models/animals/animal';
import { ItemsService } from '../../content/main/items/items.service';
import { IShelter, IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { SheltersService } from '../../content/main/shelters/shelters.service';
import { PetService } from '../../content/main/items/pet.service';

type IItem = IShelterToCreate | IAnimalToCreate;

@Component({
  selector: 'app-item-form-edit',
  templateUrl: './item-form-edit.component.html',
  styleUrls: ['./item-form-edit.component.scss']
})

export class ItemFormEditComponent implements OnInit {

  @Input() itemForm?: FormGroup;
  @Input() item: IItem;
  @Input() type: string;
  @Output() changedItem = new EventEmitter<IItem | boolean>();

  items: IAnimal[] = [];  

  constructor(
    private breadcrumbService: BreadcrumbService,
    private itemService: ItemsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private petService: PetService,
    private shelterService: SheltersService,
    private router: Router
  ) {}

  ngOnInit() {

  }


  UpdateItem() {
    if (this.itemForm.invalid) {
      console.log(this.itemForm.controls.itemForm.errors);
      return;
    } else {
      this.item = {
        id: this.item.id,
        name: this.itemForm.controls.name.value,
        description: this.itemForm.controls.description.value,
        pictureUrl: this.item.pictureUrl,
        typeId: 1,
        regionId: 1
      };

      if (this.type === 'pet') {
        this.updateAnimal(this.item);
        
        
      }

      if (this.type === 'shelter') {
        this.updateShelter(this.item);
      }

    }
  }


  updateAnimal(item: IItem) {
    this.petService.updateItem(item).subscribe((item: IItem) => {
      if (item) {        
        this.openSnackBar('запись обновлена');
        this.changedItem.emit(item);
        // this.router.navigateByUrl('/pets/pet/' + item.id);
      }
    }, error => {
      console.log(error);
      this.openSnackBar('🙁 что-то пошло не так!');
    });
  }


  updateShelter(item: IShelter) {
    this.itemService.updateItemShelter(item).subscribe((item: IAnimalToCreate) => {
      if (item) {
        this.openSnackBar('запись обновлена');
        this.changedItem.emit(item);
        // this.router.navigateByUrl('/shelters/shelter/' + item.id);
      }
    }, error => {
      console.log(error);
      this.openSnackBar('🙁 что-то пошло не так!');
    });
  }


  emitItem(item: IItem | boolean): void {
    this.changedItem.emit(item);
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
