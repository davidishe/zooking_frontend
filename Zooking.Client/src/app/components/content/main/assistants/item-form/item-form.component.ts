import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { IAssistant } from 'src/app/shared/models/animals/assistant';
import { AssistantsService } from '../../items/assistants.service';

type Type = IAssistant;


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})

export class ItemFormComponent implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() title: string = 'Новый продукт';
  type: string;

  item: Type;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private assistantService: AssistantsService,
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
        mainPhoto: ""
      };

        this.createPet();

    }
  }

  createPet() {
    this.assistantService.createItem(this.item).subscribe((item: Type) => {
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

  setTimeOut(): void {
    setTimeout(() => {
    }, 100);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
