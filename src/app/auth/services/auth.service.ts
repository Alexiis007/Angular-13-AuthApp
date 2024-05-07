import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environmets';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly baseURL : string = environment.baseURL;
  private http = inject(HttpClient);

  constructor() { }

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=>this._authStatus());

  public login(email:string, password:string):Observable<boolean>{
    const url = `${this.baseURL}/auth/login`
    const body = {email, password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      tap( res => {
        this._currentUser.set(res.user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token',res.token);
      }),
      map(()=>true),
      catchError(
        err => {
          return throwError(()=>err.error.message);
        })
    )
  }
}
