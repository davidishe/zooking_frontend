import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IAssistant } from 'src/app/shared/models/animals/assistant';
import { AssistantsService } from '../../content/main/items/assistants.service';

type IItem = IAssistant;

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

  items: IAssistant[] = [];  

  constructor(
    private breadcrumbService: BreadcrumbService,
    private assistantService: AssistantsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
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
        mainPhoto: "sdfsdf"
      };
        this.updateAnimal(this.item);

    }
  }


  updateAnimal(item: IItem) {
    this.assistantService.updateItemShelter(item).subscribe((item: IItem) => {
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

  emitItem(item: IItem | boolean): void {
    this.changedItem.emit(item);
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
