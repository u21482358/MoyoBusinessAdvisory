import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
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
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';


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
    email: new FormControl(''),
    password: new FormControl(''),
  });
   readonly dialog = inject(MatDialog);
  constructor(private userService: UserService,private router:Router,private authService:SocialAuthService) {}

  Login(){
//console.log(this.loginForm.value);
this.loginForm.value.username = this.loginForm.value.email
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

SignUp(){
 const dialogRef = this.dialog.open(AdduserComponent, {
    });
   // alert()
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      //alert(result.price)
      //alert(result)
       switch(result.userType){
    case "client":
      this.CreateClient(result);
      break;
    case "vendor":
     this.CreateVendor(result);
      break;
    case "capturer":
      this.CreateCapturer(result);
      //this.user.userType = 'vendor';
      break;
    default:
      //this.user.userType = 'client'; // Default to client if no selection
  }
      if(result){
     
    }
})
}

public CreateVendor(result:any){
   this.userService.createVendor(result.user).subscribe({
        next: (data) => {
          this.userService.getVendors().subscribe({
            next: (data) => {
              //this.vendors = data
              //console.log(data);
              //this.dataSource = data;
            }
        })
    }
    })
}
public CreateCapturer(result:any){
   this.userService.createCapturer(result.user).subscribe({
        next: (data) => {
        
    }
    })
  }
  public CreateClient(result:any){
   this.userService.createClient(result.user).subscribe({
        next: (data) => {
        
    }
    })
  }

 
    
    

   
  
    //alert("hi")
    //window.alert("yo")
  

   ngOnInit() {
    // https://github.com/akorez/angular-google-login/tree/master/src/app
    // https://medium.com/@atakankorez/google-login-with-angular-15-d399d5fe15c5
    this.authService.authState.subscribe((user: SocialUser) => {
      console.log("auth state")
      console.log(user)
      this.userService.SignInWithGoogle(user).subscribe((res)=>{
        console.log(res)
this.router.navigate(['/product'])
      },(error)=>{
        console.log(error)
      })
   },(error:any) => {
  //     console.error("Error during Google sign-in:", error);
  //     // Handle the error appropriately
     })
    }
    //this.Submit()
    //console.log("hello")
  
}
