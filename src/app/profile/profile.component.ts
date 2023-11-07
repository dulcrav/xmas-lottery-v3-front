import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { NewPassword } from '../model/new-password.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  form: any = {};
  successfullyChangedPassword = false;

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
  }

  onSubmit(): void {
    let newPassword = new NewPassword(this.form.password);
    this.userService.changeUserPassword(this.currentUser.id, newPassword).subscribe(data => {
      this.successfullyChangedPassword = true;
      setTimeout(() => {
        this.successfullyChangedPassword = false;
        this.token.signOut();
        window.location.reload();
      }, 3000);
    });
  }

}
