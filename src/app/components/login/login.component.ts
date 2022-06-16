import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from 'src/app/config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    
    this.oktaSignin = new OktaSignIn(
      {
        logo: 'assets/images/EC_logo.png',
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }
      }
    );
  }

  ngOnInit(): void {
    this.oktaSignin.remove(); // remove render

    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget' // element id
      },
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );
  }

}
