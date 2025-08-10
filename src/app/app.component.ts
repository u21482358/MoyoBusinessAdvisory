import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';
import { globalModules } from '../globalModules';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,RouterLink,HeaderComponent,globalModules, MatToolbarModule, RouterLink, MatSidenavModule, MatIconModule, MatListModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myApp';


// https://stackoverflow.com/questions/70549898/how-to-fit-different-components-into-mat-sidenav-content
// https://stackblitz.com/edit/mat-toolbar-with-sidenav?file=src%2Fapp%2Fnavbar%2Fnavbar.component.html
// https://stackblitz.com/edit/angular-ivy-meopgy?file=src%2Fapp%2Fnavigation%2Fnavigation.component.css
  activeUser:any = null
   constructor(private userService:UserService,private router:Router){
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

    LogOut(){
      if(typeof localStorage !== 'undefined'){
        localStorage.removeItem('token')
        //localStorage.removeItem('user')
        this.activeUser = null
        //this.router.nav(['/product']);
        this.router.navigate([''])
      }
    }
}
