import { FacebookAdConnectService } from './../facebook-ad-connect.service';
import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { ActivatedRoute } from '@angular/router';
import { GoogleAdsAuthService } from '../google-ads-auth.service';

declare var FB: any;
declare var gapi:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adget:boolean = false;
  name;
  ad_id;

  constructor(
              private service:FacebookAdConnectService,
              private googleAdsService: GoogleAdsAuthService,
              private route: ActivatedRoute,
              private authService: GoogleAuthService,
              private gapiService: GoogleApiService) {

              this.gapiService.onLoad().subscribe();

  }

  ngOnInit() {


    /*Facebook Login API initialization start
    ------------------------------------------------------------*/

            (window as any).fbAsyncInit = function() {
              FB.init({
                appId      : '1491473041015243',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.1'
              });
              FB.AppEvents.logPageView();
            };

            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

    /*Facebook Login API initialization end
    ------------------------------------------------------------*/


  }

  /*Facebook Login button function start
    ------------------------------------------------------------*/

        facebookLogin(){
          console.log("submit login to facebook");
          // FB.login();
          FB.login((response)=>{
                console.log('submitLogin',response);
                if (response.authResponse)
                {

                  this.service.sendTokenToServer(response.authResponse.accessToken,response.authResponse.userID)
                  .subscribe(res=>{
                    console.log(res);
                  },error=>{
                    console.log(error)
                  });

                }
                else
                {
                  console.log('User login failed');
                }
            });
        }
  /*Facebook Login button function end
  ------------------------------------------------------------*/

  /*Google Login button function start
  ------------------------------------------------------------*/

        public googleLogin(){
          this.googleAdsService.signIn();
        }

        public isGoogleLoggedIn(): boolean {
          return this.googleAdsService.isUserSignedIn();
        }

  /*Google Login button function end
  ------------------------------------------------------------*/



}
