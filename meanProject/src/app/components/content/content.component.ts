import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  // Data fetching:
  // Status Description: status
  // Updated at status: page.updated_at
  // Indicator: status.indicator

  allCanvasData: any = [];
  allTurnitinData: any = [];
  allZoomData: any = [];
  allRespondusData: any = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchAllCanvasData();
    this.fetchAllRespondusData();
    this.fetchAllTurnitinData();
    this.fetchAllZoomData();
  }

  fetchAllCanvasData() {
    // Fetch Canvas data and convert to json string
    const dataObservable = this.authService.getCanvasData();
    dataObservable.subscribe((data: any) => {
      this.allCanvasData = JSON.parse(JSON.stringify(data));
      // console.log(JSON.stringify(this.allCanvasData)); // View data stored
    });
  }

  fetchAllRespondusData() {
    // Fetch Respondus data and convert to json string
    const dataObservable = this.authService.getRespondusData();
    dataObservable.subscribe((data: any) => {
      this.allRespondusData = JSON.parse(JSON.stringify(data));
      // console.log(JSON.stringify(this.allRespondusData)); // View data stored
    });
  }

  fetchAllTurnitinData() {
    // Fetch Turnitin data and convert to json string
    const dataObservable = this.authService.getTurnitinData();
    dataObservable.subscribe((data: any) => {
      this.allTurnitinData = JSON.parse(JSON.stringify(data));
      // console.log(JSON.stringify(this.allTurnitinData)); // View data stored
    });
  }

  fetchAllZoomData() {
    // Fetch Zoom data and convert to json string
    const dataObservable = this.authService.getZoomData();
    dataObservable.subscribe((data: any) => {
      this.allZoomData = JSON.parse(JSON.stringify(data));
      // console.log(JSON.stringify(this.allZoomData)); // View data stored
    });
  }

  // changes color of bar
  customCss1(status: string) {
    if (status == 'none') {
      return 'bg-green-500';
    } else if (status == 'minor') {
      return 'bg-yellow-500';
    } else if (status == 'danger') {
      return 'bg-red-500';
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
