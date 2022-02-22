import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router, RouterModule} from '@angular/router';
import {FlashMessagesService } from 'flash-messages-angular';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private titleService: Title
  ) { 
    this.titleService.setTitle('Login - untStatus')
  }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout:5000});
        this.router.navigate(['dashboard']);
      }else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout:5000});
        this.router.navigate(['login']);
      }
    });

  }

}
