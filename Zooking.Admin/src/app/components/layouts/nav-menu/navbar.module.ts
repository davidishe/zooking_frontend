import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import { RouterModule } from '@angular/router';
import { ScrollMenuComponent } from './scroll-menu/scroll-menu.component';
import { NavStateService } from './services/nav-state.service';
import { WindowService } from './services/window.service';
import { HttpClientModule } from '@angular/common/http';
import { ThemeService } from './services/theme.service';
import { MatBtnSmallModule } from '../../kit/buttons/mat-btn-small/mat-btn-small.module';



@NgModule({
  declarations: [
    NavMenuComponent,
    ScrollMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatBtnSmallModule,
    HttpClientModule,
  ],
  exports: [
    NavMenuComponent
  ],
  providers: [
    {
      provide: NavStateService,
      useClass: NavStateService
    },
    {
      provide: WindowService,
      useClass: WindowService
    },
    {
      provide: ThemeService,
      useClass: ThemeService
    }
  ]
})
export class NavbarModule { }
