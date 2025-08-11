import { Component, inject } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { globalModules } from '../globalModules';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from './services/user.service';
import { AdduserComponent } from './adduser/adduser.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,RouterLink,globalModules, MatToolbarModule, RouterLink, MatSidenavModule, MatIconModule, MatListModule],
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
  readonly dialog = inject(MatDialog); // in global Modules?
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

     public AddUser() {
        //console.log(element)
        //alert(element.name)
        
        const dialogRef = this.dialog.open(AdduserComponent, {
        });
       // alert()
        dialogRef.afterClosed().subscribe(result => {
          //console.log(`Dialog result: ${result}`);
          //alert(result.price)
          //alert(result)
          console.log(result)
          //this.userRole = result.userType
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
    
         // this.GetProducts();
        });
    }
    public CreateVendor(result:any){
       this.userService.createVendor(result.user).subscribe({
            next: (data) => {
              this.userService.getVendors().subscribe({
                next: (data) => {
                  this.userService.vendors.next(data)
                  //console.log(data);
                  //this.dataSource = data;
                },
                error: (err:any) => {
                  console.log(err)
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
}
