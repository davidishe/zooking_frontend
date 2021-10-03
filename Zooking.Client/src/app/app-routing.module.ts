import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ItemFormComponent } from './components/content/main/assistants/item-form/item-form.component';
import { ItemDetailedCardComponent } from './components/kit/card/mat-card-hero/item-detailed-card/item-detailed-card.component';
import { OnboardingPageGuard } from './components/core/guards/onboardingpage.guard';
import { HelpBoardComponent } from './components/content/main/help-board/help-board.component';
import { AdminGuard } from './components/core/guards/admin.guard';
import { AssistantsComponent } from './components/content/main/assistants/assistants.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Главная'},},

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'assistants', component: AssistantsComponent, data: {breadcrumb: 'Питомцы'}},
  { path: 'assistants/add', component: ItemFormComponent, data: {breadcrumb: 'Добавление'}},
  { path: 'assistants/:id', component: ItemDetailedCardComponent, data: {breadcrumb: 'Подробности'}},


  { path: 'help', component: HelpBoardComponent, data: {breadcrumb: 'Помощь'}},

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
