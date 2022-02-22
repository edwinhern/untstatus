import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { observable, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Canvas Variables
  rawlist_canvas: any;
  indicator_canvas: any;
  date_canvas: any;

  // Turnitin Variables
  rawlist_turnitin: any;
  indicator_turnitin: any;
  date_turnitin: any;

  // Zoom Variables
  rawlist_zoom: any;
  indicator_zoom: any;
  date_zoom: any;

  // Respondus Variables
  rawlist_respondus: any;
  indicator_respondus: any;
  date_respondus: any;
  session: any;

  // Stripe Payment


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private title: Title,
  ) {
    this.title.setTitle('untStatus');
  }

  //function that runs on updating the status
  //add calls to the functions as we add more services
  ngOnInit(): void {
    this.getCanvasData();
    this.getTurnitinData();
    this.getZoomData();
    this.getRespondusData();
  }

  getCanvasData() {
    let observable = this.authService.getCanvasData();
    observable.subscribe(
      (data) => {
        (this.rawlist_canvas = data.status),
          (this.date_canvas = data.page),
          (this.indicator_canvas = data.status.indicator);
      },
      (error) => console.log(error)
    );
    // console.log(this.rawlist_z); //check data
  }

  getTurnitinData() {
    let observable = this.authService.getTurnitinData();
    observable.subscribe(
      (data) => {
        (this.rawlist_turnitin = data.status),
          (this.date_turnitin = data.page),
          (this.indicator_turnitin = data.status.indicator);
      },
      (error) => console.log(error)
    );
    // console.log(this.rawlist_z); //check data
  }

  getZoomData() {
    let observable = this.authService.getZoomData();
    observable.subscribe(
      (data) => {
        (this.rawlist_zoom = data.status),
          (this.date_zoom = data.page),
          (this.indicator_zoom = data.status.indicator);
      },
      (error) => console.log(error)
    );
    // console.log(this.rawlist_z); //check data
  }

  getRespondusData() {
    let observable = this.authService.getRespondusData();
    observable.subscribe(
      (data) => {
        (this.rawlist_respondus = data.status),
          (this.date_respondus = data.page),
          (this.indicator_respondus = data.status.indicator);
      },
      (error) => console.log(error)
    );
    // console.log(this.rawlist_z); //check data
  }

    // changes color of bar
  customCss1(status: string) {
    if (status == 'none') {
      return 'bg-success';
    } else if (status == 'minor') {
      return 'bg-warning';
    } else if (status == 'danger') {
      return 'bg-danger';
    }
    return 'bg-danger';
  }

  customCss2(status: string) {
    // changes percentage of bar
    if (status == 'none') {
      return '100%';
    } else if (status == 'minor') {
      return '75%';
    } else if (status == 'danger') {
      return '50%';
    }
    return '25%';
  }
}
