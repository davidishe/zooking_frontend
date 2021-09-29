import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/shared/models/user/user';
import { IRoles } from 'src/app/shared/models/user/userRoles';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: IUser;
  btnDisabled: boolean = true;
  roles: any[]  = 
  [
    {
      value: "User",
      name: "Пользователь"
    },
    {
      value: "Admin",
      name: "Админ"
    },
    {
      value: "Curator",
      name: "Куратор"
    },
    {
      value: "ShelterOwner",
      name: "Представитель приюта"
    },
    {
      value: "Volonter",
      name: "Волонтер"
    },
    {
      value: "Feeder",
      name: "Компания"
    }
  ];
  postedRoles: IRoles = {
    userRoles: []
  };


  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,

  ) { }
  @ViewChild('roleList', {static: false}) checkboxList: MatSelectionList;


  ngOnInit() {
  }


  submit(userId: number) {
    this.btnDisabled = true;
    const roles = this.checkboxList._value;
    this.postedRoles.userRoles = roles;
    this.roleService.changeUserRoles(userId, this.postedRoles).subscribe((res: any) => {
      console.log(res);
      this.openSnackBar('Изменения сохранены');
    })
  }


  getCheckboxStatus(userRoles: string[], role: string): boolean {
    for (let index = 0; index < userRoles.length; index++) {
      const userRole = userRoles[index];
      if (userRole === role) {
        return true;
      }
    }
    return false;
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
