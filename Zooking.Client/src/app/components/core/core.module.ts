import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LayerComponent } from './layer/layer.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { DateAgoPipe } from 'src/app/pipes/time-ago.pipe';
import { CarouselComponent } from 'ng-carousel-cdk';
import { MatCarouselComponent } from './mat-carousel/mat-carousel.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { DadataAddressComponent } from '../kit/dadata-address/dadata-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const UserComponents = [
  DadataAddressComponent
]

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    LayerComponent,
    StepperComponent,
    DateAgoPipe,
    MatCarouselComponent,
    UserComponents

  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MaterialModule,
    RouterModule,
    Ng2CarouselamosModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BreadCrumbComponent,
    PageHeaderComponent,
    StepperComponent,
    UserComponents,

    DateAgoPipe,
    BreadcrumbModule,
    LayerComponent,
    MatCarouselComponent
  ]
})
export class CoreModule { }
