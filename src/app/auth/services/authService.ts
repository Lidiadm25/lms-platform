import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { AuthResponse } from './../interfaces/auth-response.interface';


// New type that will be used to save the state of authentication
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  public _role = signal<string>('');

  // If theres already a token for the current user, we can collect it from localStorage
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });  

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);


  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) =>
          this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      ); 
  }

  register(email:string, password:string, fullname:string): Observable<boolean> {

      return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        email: email,
        password: password,
        fullName: fullname
      })
      .pipe(
        map((resp) =>
          this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      ); 
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
     this.logout();
     return of(false);
    } 

    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error)),
      );
  }
      
  /**
   * Receives token and user and assigns it to current signals
   * 
   * @param param0 
   * @returns 
   */
  private handleAuthSuccess({ token, user }: AuthResponse) {

    this._role.set(user.roles[0]);
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  /**
   * Returns an obsevarble with value false and calls logout method
   * 
   * @param error 
   * @returns 
   */
  private handleAuthError(error:any){
    
    this.logout();
    return of(false);
  }

  /**
   * Changes status of the user and removes the token to sucessfully do a logout
   * 
   */
  public logout(){
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null)

    localStorage.removeItem('token')
  }
  
}
