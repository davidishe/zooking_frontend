import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistantService } from 'src/app/components/content/main/assistants/assistant.service';
import { IAssistant } from 'src/app/shared/models/animals/assistant';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../../../layouts/account/account.service';
import { PhotoService } from '../../photo.service';

type IItem = IAssistant;

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
    private assistantService: AssistantService,
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
      this.loadShelterByGuId();
      console.log('halo worild');
      
    }, 100);
  }


  patchValues() {
    this.itemForm.controls.name.patchValue(this.item.name);
    this.itemForm.controls.description.patchValue(this.item.mainPhoto);
  }



  onFormInit() {
    this.itemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }


  loadShelterByGuId() {
      this.assistantService.GetById(this.itemId).subscribe((response:  IItem) => {
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

      this.assistantService.Delete(id).subscribe((res: any) => {
        if (res) {
          this.router.navigateByUrl('/shelters');
        }
      })

  }


}
