import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router, RouterModule} from '@angular/router';
import {FlashMessagesService } from 'flash-messages-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit(): void {}

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('Logged out', {cssClass: 'alert-success', timeout:3000});
    this.router.navigate(['/']);
    return false;
  }
  isCollasped = false;
}
