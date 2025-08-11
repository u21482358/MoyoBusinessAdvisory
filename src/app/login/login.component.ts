import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
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
import { Subject, Subscription } from 'rxjs';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { InjectionToken } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { BROWSER_STORAGE } from '../services/browserservice.service';



// https://stackoverflow.com/questions/73255003/how-bind-angular-component-function-to-google-signin-button


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [globalModules,FormsModule,
    GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})



export class LoginComponent implements OnInit {
   private _snackBar = inject(MatSnackBar);
   value?:Subscription
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });
   readonly dialog = inject(MatDialog);
  constructor(private userService: UserService,private router:Router,private authService:SocialAuthService) {
   // this.localStorage = document.defaultView?.localStorage;
  }

  Login(){
//console.log(this.loginForm.value);


this.loginForm.value.username = this.loginForm.value.email
    this.userService.Login(this.loginForm.value).subscribe({
      next: (data:any) => {
        //console.log(data.token)

         if(typeof localStorage !== 'undefined'){
          console.log("in")
        localStorage.setItem('token', data.token);
        this.router.navigate(['/product']);
         }
      },
      error:(err:any) => {
    console.log(err)
    this._snackBar.open('Error Failed to Login', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
  }

  });
  }
  


   async ngOnInit() {
    // https://github.com/akorez/angular-google-login/tree/master/src/app
    // https://medium.com/@atakankorez/google-login-with-angular-15-d399d5fe15c5
    //this.authService.signIn
    this.value = this.authService.authState.subscribe((user: SocialUser) => {
      console.log("auth state")
      console.log(user)
      if(user){
      this.userService.SignInWithGoogle(user).subscribe((res:any)=>{
        console.log(res)
        if(typeof(localStorage) !== 'undefined'){
           localStorage.setItem('token', res.token);
          this.router.navigate(['/product'])
          
        }

      })
    }
  },(error)=>{
        this._snackBar.open('Error Failed to Login', 'OK', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
        console.log(error)
      })
    }

   

  

   
    //this.Submit()
    //console.log("hello")
  
}
