import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';
import { globalModules } from '../../globalModules';
import { NgModule } from '@angular/core'; // find out about why cant import from exported
import { UserService } from '../services/user.service';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Subject } from 'rxjs';


// https://stackoverflow.com/questions/73255003/how-bind-angular-component-function-to-google-signin-button
declare global {
  interface Window {
    onGoogleSignIn: (response: any) => void;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [globalModules,FormsModule,
    GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})



export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private userService: UserService,private router:Router,private authService:SocialAuthService) {}
private extAuthChangeSub = new Subject<SocialUser>();
  extAuthChanged:any = this.extAuthChangeSub.asObservable();
  platform = GoogleLoginProvider.PROVIDER_ID
  Login(){
//console.log(this.loginForm.value);
    this.userService.Login(this.loginForm.value).subscribe({
      next: (data:any) => {
        //console.log(data.token)
        localStorage.setItem('token', data.token);
        this.router.navigate(['/product']);
      }

  })
    
    
    //console.log("Fuck")
  }

    onGoogleSignIn(res: any) {
      console.log("google function")
    console.log(res);

  }



  SignInWithGoogle(){
   this.authService.signIn(this.platform).then( (response) => {

console.log("reach")

   }
    
    
// (response) => {
// //Get all user details
//      console.log(platform + ' logged in user data is= ' , response);
// //Take the details we need and store in an array
//      this.userData.push({
//        UserId: response.id,
//        Provider: response.provider,
//        FirstName: response.firstName,
//        LastName: response.lastName,
//        EmailAddress: response.email,
//        PictureUrl: response.photoUrl
//      });
//  },
//  (error) => {
//    console.log(error);
//    this.resultMessage = error;
// }
   )
  }
    //alert("hi")
    //window.alert("yo")
  

   ngOnInit() {
    // https://github.com/akorez/angular-google-login/tree/master/src/app
    // https://medium.com/@atakankorez/google-login-with-angular-15-d399d5fe15c5
    this.authService.authState.subscribe((user: SocialUser) => {
      console.log("auth state")
      console.log(user)
    })
    //this.Submit()
    //console.log("hello")
  }
}
