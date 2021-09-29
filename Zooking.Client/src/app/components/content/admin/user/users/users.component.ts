import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { IUser } from 'src/app/shared/models/user/user';
import { AdminService } from '../../admin.service';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  users: IUser[];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.getAllUsers();

  }

  constructForms() {

  }


  getAllUsers(): void {
    this.adminService.getUsers().subscribe((res: IUser[]) => {
      this.users = res;
      
    })
  }
  


  submit(): void {

    const values = [];
    // for (let index = 0; index < this.checkboxList.selectedOptions.selected.length; index++) {
    //   const element = this.checkboxList.selectedOptions.selected[index].value;
    //   console.log(element);
    // }
    
    
    
  }

}
