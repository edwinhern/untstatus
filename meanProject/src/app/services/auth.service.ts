import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:8080/';
const baseUrl = '';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  sendEmail(item : any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(baseUrl + 'contacts/send', item, {
      headers: headers
    });
  }

  // Http get Request: Retreive Canvas status: JSON format
  getCanvasData(): Observable<any> {
    const canvas = this.http.get('https://status.instructure.com/api/v2/status.json');
    return canvas;
  }

  // Http get Request: Retreive Turnitin status: JSON format
  getTurnitinData(): Observable<any> {
    const turnitin = this.http.get('https://turnitin.statuspage.io/api/v2/status.json');
    return turnitin;
  }

  // Http get Request: Retreive Respondus status: JSON format
  getRespondusData(): Observable<any> {
    const respondus = this.http.get('https://status.respondus.com/api/v2/status.json');
    return respondus;
  }

  // Http get Request: Retreive Zoom status: JSON format
  getZoomData(): Observable<any> {
    const zoom = this.http.get('https://status.zoom.us/api/v2/status.json');
    return zoom;
  }
}
