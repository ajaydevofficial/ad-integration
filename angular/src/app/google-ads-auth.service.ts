import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;


@Injectable({
  providedIn: 'root'
})
export class GoogleAdsAuthService {

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user:GoogleUser = undefined;


  constructor(private googleAuth: GoogleAuthService,private ngZone: NgZone) {

  }

  public setUser(user: GoogleUser): void {
    this.user = user;
  }

  public getCurrentUser(): GoogleUser {
      return this.user;
  }

  public getToken(): string {
      let token: string = sessionStorage.getItem(GoogleAdsAuthService.SESSION_STORAGE_KEY);
      if (!token) {
          throw new Error("no token set , authentication required");
      }
      return sessionStorage.getItem(GoogleAdsAuthService.SESSION_STORAGE_KEY);
  }

  public signIn() {
      this.googleAuth.getAuth().subscribe((auth) => {
          auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
      });
  }

  //TODO: Rework
  public signOut(): void {
      this.googleAuth.getAuth().subscribe((auth) => {
          try {
              auth.signOut();
          } catch (e) {
              console.error(e);
          }
          sessionStorage.removeItem(GoogleAdsAuthService.SESSION_STORAGE_KEY)
      });
  }

  public isUserSignedIn(): boolean {
       if(sessionStorage.getItem(GoogleAdsAuthService.SESSION_STORAGE_KEY)){
         return true;
       }
       else{
         return false;
       }
  }

  private signInSuccessHandler(res: GoogleUser) {
      this.ngZone.run(() => {
          this.user = res;
          sessionStorage.setItem(
              GoogleAdsAuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
          );
      });
  }

  private signInErrorHandler(err) {
      console.warn(err);
  }

}
