import { HAMMER_LOADER, BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { CoreModule } from './components/core/core.module';
import { TypesService } from './services/products/types.service';
import { RegionsService } from './services/products/regions.service';
import { JwtInterceptor } from './components/core/interceptors/jwt.interceptor';
import { ShopService } from './services/products/shop.service';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ErrorInterceptor } from './components/core/interceptors/error.interceptor';
import { BusyService } from './services/infrastructure/busy.service';
import { LoadingInterceptor } from './components/core/interceptors/loading.interceptor';
import { MatButtonModule } from './components/kit/buttons/mat-button/mat-button.module';
import { NavbarModule } from './components/layouts/nav-menu/navbar.module';
import { ItemsModule } from './components/content/main/items/items.module';
import { SheltersModule } from './components/content/main/shelters/shelters.module';
import { ItemDetailedCardModule } from './components/kit/item-detailed-card/item-detailed-card.module';
import { PetsModule } from './components/content/main/pets/pets.module';
import { ItemFormEditModule } from './components/kit/item-form-edit/item-form-edit.module';
import { HeroModule } from './components/layouts/hero/hero.module';
import { AdminModule } from './components/content/admin/admin.module';
import { TitleModule } from './components/kit/title/title.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpBoardModule } from './components/content/main/help-board/help-board.module';
import { VolonterBoardModule } from './components/content/main/volonter-board/volonter-board.module';


registerLocaleData(localeRu, 'ru');

const UserComponents = [
]

const UserModules = [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    Ng2CarouselamosModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatButtonModule,
    NavbarModule,
    ItemsModule,
    SheltersModule,
    ItemDetailedCardModule,
    PetsModule,
    ItemFormEditModule,
    HeroModule,
    AdminModule,
    TitleModule,
    MatTooltipModule,
    HelpBoardModule,
    VolonterBoardModule
]

@NgModule({
  declarations:
  [
    AppComponent,
    ErrorComponent,
    ServererrorComponent,
    NotFoundComponent,
    UserComponents
  ],

  imports:
  [
    UserModules
  ],

  exports: [
  ],

  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

    TypesService,
    RegionsService,
    ShopService,
    BusyService,
    {                                   
      provide: HAMMER_LOADER,
      useValue: () => new Promise(() => {})
    },
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
