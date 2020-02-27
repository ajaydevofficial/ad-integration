import { FacebookAdConnectService } from './../facebook-ad-connect.service';
import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

declare var FB: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adget:boolean = false;
  name;
  ad_id;

  constructor(private service:FacebookAdConnectService) {

  }

  ngOnInit() {

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

  }

  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response)=>{
          console.log('submitLogin',response);
          if (response.authResponse)
          {

            this.service.sendTokenToServer(response.authResponse.accessToken,response.authResponse.userID)
            .subscribe(res=>{
              alert("Name : " + res.name);
              alert("Ad_ID : " + res.id);
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

}
