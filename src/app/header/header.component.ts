import { Component } from '@angular/core';
import { globalModules } from '../../globalModules';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [globalModules,MatToolbarModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

activeUser:any = null
  constructor(userService:UserService){
this.activeUser = userService.activeUserRole;
  }
  Submit(){
    console.log("Submit button clicked");
    window.alert("Submit button clicked"); // This will make it more obvious when the method is called
  }
}
