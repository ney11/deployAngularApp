import { Injectable } from '@angular/core';
import { Post } from './posts.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private userSubject: BehaviorSubject<Post>;
  public user: Observable<Post>;
  private authStatusListner = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient
) {
    this.userSubject = new BehaviorSubject<Post>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
}

  public get userValue(): Post {
    return this.userSubject.value;
}

  onLogin(email, password) {
    return this.http.post<Post>(`${environment.apiUrl}/users/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
            }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}

  register(user: Post) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
}

getAll() {
    return this.http.get<Post[]>(`${environment.apiUrl}/users`);
}

}
