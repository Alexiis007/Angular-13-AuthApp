import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environmets';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/ckeck-token.response';

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

  private setAuthentication(res : CheckTokenResponse):boolean{
    this._currentUser.set(res.user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token',res.token);

    return true;
  }

  public login(email:string, password:string):Observable<boolean>{
    const url = `${this.baseURL}/auth/login`
    const body = {email, password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map( res =>  this.setAuthentication(res) ),
      catchError(
        err => {
          return throwError(()=>err.error.message);
        })
    )
  }

  public checkAuthStatus():Observable<boolean>{
    const url   = `${this.baseURL}/auth/check-token`;
    const token = localStorage.getItem('token');

    if(!token) {
      this.logout();
      return of(false);}

    const headers = new HttpHeaders()
    .set('Authorization',`Bearer${token}`)

    return this.http.get<CheckTokenResponse>(url, {headers:headers})
    .pipe(
      map(res => this.setAuthentication(res) ),
      catchError(()=>{
        this._authStatus.set(AuthStatus.notAuthenticated)
        return of(false)
      })
    )
  }

  public logout():void{
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
