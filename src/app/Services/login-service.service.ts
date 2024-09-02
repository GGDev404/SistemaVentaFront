import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class LoginServiceService {


  constructor(private http: HttpClient , private router: Router) {}
  private loginUrl = 'https://gemaapidineroinmediato.azurewebsites.net/api/Login/signIn';
  private toketnKey = "AuthTokenKey";
  Login(UserName: string, Password: string) : Observable<any> {
    return this.http.post<any>(this.loginUrl, {
      UserName,Password}).pipe(tap(Response => {
        if(Response.token){
          console.log(Response.token);
          this.setToken(Response.token);

      }

  })) ;
}

private setToken(token: string) : void {
  localStorage.setItem(this.toketnKey, token);
}

private getToken(): string | null {
  return localStorage.getItem(this.toketnKey);
}

IsAuthenticated(): boolean {
  const token = this.getToken();
  if(!token){
    return false;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expirationDate = new Date(payload.exp * 1000);
  const now = new Date();
  return expirationDate > now;
}

logOut(): void {
  localStorage.removeItem(this.toketnKey);
  this.router.navigate(['/login']);
}


}
