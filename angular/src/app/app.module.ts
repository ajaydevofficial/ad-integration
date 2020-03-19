import { GoogleAdsAuthService } from './google-ads-auth.service';
import { FacebookAdConnectService } from './facebook-ad-connect.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleApiModule, GoogleApiService, GoogleAuthService, NgGapiClientConfig, NG_GAPI_CONFIG,GoogleApiConfig } from "ng-gapi";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';



let gapiClientConfig: NgGapiClientConfig = {
  client_id: "659302116920-5mbp70vctvhgnkttjvtnp9e9trrpel2h.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics",
      "https://www.googleapis.com/auth/adwords"

  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [FacebookAdConnectService,GoogleAdsAuthService,HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
