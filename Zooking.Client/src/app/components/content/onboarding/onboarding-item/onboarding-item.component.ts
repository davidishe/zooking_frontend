import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/components/layouts/account/account.service';
import { IRoles } from 'src/app/shared/models/user/userRoles';
import { RoleService } from '../../admin/user/role.service';

@Component({
  selector: 'app-onboarding-item',
  templateUrl: './onboarding-item.component.html',
  styleUrls: ['./onboarding-item.component.scss']
})
export class OnboardingItemComponent implements OnInit {


  isSelected: string = "Не выбрано";
  notChecked: boolean;
  @Input() role: string;
  @Input() title: string;
  @Input() text: string;
  @Input() selectedRoles?: string[];

  formGroup: FormGroup;

  roles: IRoles = {
    userRoles: []
  };

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.notChecked = false;
    this.initForm();
    this.setInitialValuesOfToggle();
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      enabled: false,
    });
  }

  setInitialValuesOfToggle(): boolean {
    if (this.selectedRoles) {
      for (let index = 0; index < this.selectedRoles.length; index++) {
      const role = this.selectedRoles[index];
      
      if (role === this.role) {
        this.formGroup.controls.enabled.setValue(true);
        this.isSelected = "Выбрано";
        return true;
      }
    }      
    }
  }

  setNameOfBanner(): void {
    // if (this.notChecked) {
    //   this.isSelected = "Выбрано";
    // }
    // if (!this.notChecked) {
    //   this.isSelected = "Не выбрано";
    // }
    // this.notChecked = !this.notChecked;
  }

  setUserRole(event: any): void {

    // TODO: надо сделать метод в бэке для добавления определенной роли к уже имеющеся
    // this.roleService.changeUserRoles(userId, this.roles)
  }

  onFormSubmit(formValue: any) {
    const previousToggleValue = formValue.enabled;
    if (previousToggleValue === false) {
      this.roles.userRoles.push(this.role);
      this.addRole(this.role);
      this.isSelected = "Выбрано";
    }
    if (previousToggleValue === true) {
      console.log('deleting');
      this.roles.userRoles = [];
      this.deleteRole(this.role);
      this.isSelected = "Не выбрано";
      
    }
  }
  
  deleteRole(role: string): void {
    this.roleService.deleteRoleForCurrentUser(role).subscribe((res: boolean) => {
      if (res === true) {
        console.log('роль ' +  this.role + ' удалена');
      }
    })

  }

  addRole(role: string): void {
    this.roleService.addRoleForCurrentUser(role).subscribe((res: boolean) => {
      if (res === true) {
        console.log('роль ' +  this.role + ' добавлена');
      }
    })


  }

}
