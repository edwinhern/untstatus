import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  companyName?: string;
  email?: string;
  message?: string;
  toggle = 0;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  OnSubmit() {
    const item = {
      companyName: this.companyName,
      email: this.email,
      message: this.message,
    };

    if(!this.validateInfo(item)) {
      this.flashMessage.show(
        'Please fill in all the required fields.',
        {cssClass: 'bg-red-600 text-white rounded-lg p-4',
         timeout:3000});
      return false;
    }
    if(!this.validateEmail(item.email)) {
      this.flashMessage.show('Please use a valid email',
      {cssClass: 'bg-red-600 text-white rounded-lg p-4',
      timeout:3000});
      return false;
    }

    // Send content to email
    this.authService.sendEmail(item).subscribe((data: any) => {
      if(data.success) {
        this.flashMessage.show('Email Sent.', {
          cssClass:'bg-green-300 text-white rounded-lg p-4',
          timeout: 3000,
        });
        this.toggle = 1;
      } else {
        this.flashMessage.show('Something went wrong.', {
          cssClass:
            'bg-red-600 text-white rounded-lg p-4',
          timeout: 3000,
        });
      }
    })

  }

  validateInfo(item: any) {
    if(
      item.companyName == undefined ||
      item.email == undefined ||
      item.message == undefined
      ) {

        return false;
      } else {
        return true;
      }
  }

  validateEmail(email: any) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
