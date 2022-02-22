import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(
    private http: HttpClient
  ) {}

  
  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: headers,
    });
    // .pipe(map((res: any) => res.json()));
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {
      headers: headers,
    });
    // .pipe(map((res: any) => res.json()));
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
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
