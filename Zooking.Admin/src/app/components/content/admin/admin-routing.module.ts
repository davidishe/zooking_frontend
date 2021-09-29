import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './user/users/users.component';
import { ProductFormComponent } from './base/product-form/product-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';


const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'users', component: UsersComponent, data: {breadcrumb: 'Пользователи' }},
  { path: '', component: ProfileModule, data: {breadcrumb: {alias: 'products'}} },

  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule),
  data: {breadcrumb: {skip: true}}},


  { path: 'products', component: BaseComponent, data: {breadcrumb: {alias: 'products'}} },
  { path: 'products/add/:id', component: ProductFormComponent, data: {breadcrumb: {alias: 'productDetails'}} },
  { path: 'products/add', component: ProductFormComponent, data: {breadcrumb: {alias: 'productDetails'}} },


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
