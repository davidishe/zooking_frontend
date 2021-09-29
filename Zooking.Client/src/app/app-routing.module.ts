import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/core/guards/auth.guard';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { SheltersComponent } from './components/content/main/shelters/shelters.component';
import { ItemFormComponent } from './components/kit/item-form/item-form.component';
import { ItemDetailedCardComponent } from './components/kit/item-detailed-card/item-detailed-card.component';
import { PetsComponent } from './components/content/main/pets/pets.component';
import { ItemFormEditComponent } from './components/kit/item-form-edit/item-form-edit.component';
import { AdminGuard } from './components/core/guards/admin.guard';
import { OnboardingGuard } from './components/core/guards/onboarding.guard';
import { OnboardingPageGuard } from './components/core/guards/onboardingpage.guard';
import { HelpBoardComponent } from './components/content/main/help-board/help-board.component';
import { VolonterBoardComponent } from './components/content/main/volonter-board/volonter-board.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Главная'},  canActivate: [OnboardingGuard]},

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'pets', component: PetsComponent, data: {breadcrumb: 'Питомцы'}, canActivate: [OnboardingGuard]},
  { path: 'pets/add/:type', component: ItemFormComponent, data: {breadcrumb: 'Добавление'}, canActivate: [OnboardingGuard]},
  { path: 'pets/:type/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}, canActivate: [OnboardingGuard]},

  { path: 'shelters', component: SheltersComponent, data: {breadcrumb: 'Приюты'}, canActivate: [OnboardingGuard]},
  { path: 'shelters/add/:type', component: ItemFormComponent, data: {breadcrumb: 'Добавление'}, canActivate: [OnboardingGuard]},
  { path: 'shelters/:type/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}, canActivate: [OnboardingGuard]},
  { path: 'shelters/:type/:id/edit', component: ItemFormEditComponent, data: {breadcrumb: 'Изменение'}, canActivate: [OnboardingGuard]},



  { path: 'help', component: HelpBoardComponent, data: {breadcrumb: 'Помощь'}, canActivate: [OnboardingGuard]},
  { path: 'volonters', component: VolonterBoardComponent, data: {breadcrumb: 'Волонтеры'}, canActivate: [OnboardingGuard]},


  { path: 'admin', loadChildren: () => import('./components/content/admin/admin.module').then(mod => mod.AdminModule),
  data: {breadcrumb: 'Администратор'}, canActivate: [AdminGuard]},

  { path: 'onboarding', loadChildren: () => import('./components/content/onboarding/onboarding.module').then(mod => mod.OnboardingModule), data: {breadcrumb: 'Онбоардинг'}, canActivate: [OnboardingPageGuard]},

  { path: 'account', loadChildren: () => import('./components/layouts/account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}, },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
