import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(), provideAnimationsAsync(),provideHttpClient(withInterceptorsFromDi()),  {provide:HTTP_INTERCEPTORS,useClass:AuthenticationService,multi:true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '153781463009-47lr197g2h121om900oov4rb8e6ims0a.apps.googleusercontent.com'
            )
          }
        ],
        onError: (error) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig,
}] // removed provideClientHydration as it was causing issues with the app
};
//https://stackoverflow.com/questions/77624853/interceptor-not-intercepting-in-angular-17
//https://stackoverflow.com/questions/77470390/how-to-inject-application-configuration-and-add-http-interceptor-to-standalone-c
// https://stackoverflow.com/questions/50860293/interceptor-not-intercepting-http-requests-angular-6
// https://stackoverflow.com/questions/77163778/angular-standalone-app-nullinjectorerror-no-provider-for-httpclient