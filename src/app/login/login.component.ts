import { Component } from '@angular/core';
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



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [globalModules,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private userService: UserService,private router:Router) {}
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
    //alert("hi")
    //window.alert("yo")
  

   ngOnInit() {
    //this.Submit()
    //console.log("hello")
  }
}
