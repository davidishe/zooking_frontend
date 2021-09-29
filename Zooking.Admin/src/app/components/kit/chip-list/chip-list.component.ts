import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  @Input() user: IUser;
  @Input() users: IUser[];
  @Input() usersIndex: number;
  hoveredUser: IUser; 
  hoveredRole: string;


  constructor() { }

  ngOnInit() {
  }

  setHoveredRoleAndUser(user: IUser, role: string): void {
    this.hoveredUser = user;
    this.hoveredRole = role;
  }

  deleteHoveredRoleAndUser(): void {
    this.hoveredUser = null;
    this.hoveredRole = null;
  }

  getSelectedRole(): number {
    if (this.hoveredUser) {
      var index = this.hoveredUser.userRoles.findIndex(z => z === this.hoveredRole);
      return index;
    }
  }

  getSelectedUser(): number {
    var index = this.users.findIndex(u => u === this.hoveredUser);
    return index;
  }

}
