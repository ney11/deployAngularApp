import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';



@Injectable({providedIn: 'root'})

export class AuthService {
  private isAthenticated = true;
  private authStatusListner = new Subject<boolean>();

  constructor( private http: HttpClient, private router: Router) {}

  getIsAuth() {
    return this.isAthenticated;
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }

}
