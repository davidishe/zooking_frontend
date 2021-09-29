import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user/user';
import { AccountService } from '../../layouts/account/account.service';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  roles: string[];

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCurrentUserRoles();
  }


  getCurrentUserRoles(): void {
    this.roles = this.accountService.getCurrentUserRoles();    
  }


  setOnboardedStatus(): void {
    this.accountService.setOnboardedStatus().subscribe((res: boolean) => {
      if (res) {
        this.accountService.loadCurrentUser().subscribe((response: IUser) => {
          if (response.isOnboarded) {
            this.router.navigate(['/']);
          }
        });
        
      }

    })
  }



}
