import { Component, OnInit } from '@angular/core';
import { globalModules } from '../../globalModules';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule, MatList } from '@angular/material/list';
import  {MatGridListModule} from '@angular/material/grid-list';
// https://stackblitz.com/edit/angular-material-with-angular-sidenav?file=app%2Fapp.module.ts
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [globalModules, MatToolbarModule, RouterLink, MatSidenavModule, MatIconModule, MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
//showNavigation
// https://stackblitz.com/edit/mat-toolbar-with-sidenav?file=src%2Fapp%2Fnavbar%2Fnavbar.component.html
// https://stackblitz.com/edit/angular-ivy-meopgy?file=src%2Fapp%2Fnavigation%2Fnavigation.component.css
activeUser:any = null
 constructor(private userService:UserService){
this.activeUser = userService.activeUserRole;
  }
  Submit(){
    console.log("Submit button clicked");
    window.alert("Submit button clicked"); // This will make it more obvious when the method is called
  }

  ngOnInit(){
this.userService.showNavigation.subscribe((next)=>{
  this.activeUser = next
})
  }
}
