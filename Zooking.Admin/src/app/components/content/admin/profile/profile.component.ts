import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { IUser } from 'src/app/shared/models/user/user';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAddress } from 'src/app/shared/models/user/address';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from 'src/app/components/layouts/account/account.service';
import { IPhoto } from 'src/app/shared/models/user/photo';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
          animate(300, style({ opacity: 0 }))
          ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  currentUser$!: Observable<IUser | any>;
  currentUser: IUser = {
    email: null
  };

  progress: number;
  addressEdited: boolean = false;
  @Output() public OnUploadFinished = new EventEmitter();

  public result?: IPhoto;

  baseUrl = environment.apiUrl;
  siteUrl = environment.siteUrl;

  noPictureUrl = this.siteUrl + 'Assets/Images/Users/nouserpicture.png';


  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.getCurrentUserProfile();
    this.currentUser$ = this.accountService.currentUser$;
  }





  // getCurrentUserProfile() {
  //   this.accountService.getCurrentUserProfile().subscribe((response: IUser) => {
  //     console.log('sdfsdfsdfsdfs');
  //     this.currentUser = response;
  //     // this.patchFormProifileValues();
  //   });
  // }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload = <File> files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.result = null;

    
    this.http.post(this.baseUrl + 'photo/user', formData, {reportProgress: true, observe: 'events'})
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.OnUploadFinished.emit(event.body);
          this.accountService.loadCurrentUser().subscribe((res: IUser) => {
            if (res) {
              this.currentUser.pictureUrl = event.body.photoUrl;
            }
          })
        }
    });
  }


  mapRoleName(role: string): string {
    switch (role) {
      case "User": return "Пользователь";
      case "Admin": return "Администратор";    
      case "Curator": return "Куратор";    
      case "Volonter": return "Волонтер";
      case "ShelterOwner": return "Представитель приюта";
      case "Feeder": return "Представитель компании";
      default: role;
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./dialog.scss'],
})
export class DialogContentComponent {

  formProfile: FormGroup;
  formAddress: FormGroup;
  currentUser$!: Observable<IUser | any>;
  currentUser: IUser = null;
  userProfileEdited: boolean = false;




  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.getCurrentUserProfile();
    this.currentUser$ = this.accountService.currentUser$;
    this.createFormProfile();
    this.createFormAddress();
    }



  onProfileSubmit() {
      if (this.formProfile.invalid) {
      console.log('errrrrror');
      return;
    } else {
      console.log(this.formProfile.value);
      this.accountService.updateUserProfile(this.formProfile.value).subscribe((response: IUser) => {
        this.currentUser = response;
        this.accountService.loadCurrentUser().subscribe();
        this.dialog.closeAll();
      });
      this.forHideControlEdited();

    }
  }

  forHideControlEdited() {
    this.userProfileEdited = false;
  }

  patchFormProifileValues() {
      this.formProfile.get('displayName').patchValue(this.currentUser.displayName);
      this.formProfile.get('email').patchValue(this.currentUser.email);
      this.formProfile.get('userDescription').patchValue(this.currentUser.userDescription);
      if (this.currentUser.address) {
        this.formAddress.get('zipCode').patchValue(this.currentUser.address.zipCode);
        this.formAddress.get('city').patchValue(this.currentUser.address.city);
        this.formAddress.get('street').patchValue(this.currentUser.address.street);
        this.formAddress.get('house').patchValue(this.currentUser.address.house);
      }
  }



  createFormProfile() {
    this.formProfile = new FormGroup({
      displayName: new FormControl(null, [Validators.required]),
      userDescription: new FormControl(null, [])
    });
  }

  createFormAddress() {
    this.formAddress = new FormGroup({
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [Validators.required])
    });
  }

  

  onAddressSubmit() {
      if (this.formAddress.invalid) {
      console.log('errrrrror');
      return;
    } else {
      this.accountService.updateUserAddress(this.formAddress.value).subscribe((response: IAddress) => {
        this.currentUser.address = response;
      });

    }
  }






}









