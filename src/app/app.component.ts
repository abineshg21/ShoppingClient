import { Component, OnInit, HostListener } from '@angular/core'
import { ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

 
  title = 'Home';
  showAdmin:boolean =false;
  showHead: boolean = false;
  constructor(private router: Router){
    router.events.forEach((event) => {
     
      if (event instanceof NavigationStart) {
        if (event['url'] == '/Admin') {
          this.showHead = false;
          this.showAdmin=false;
        } else if(event['url'] =='/AdminHome'){
          this.showHead = false;
          this.showAdmin=true;
        }else if(event['url'] =='/AdminTax'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminTips'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminWaiter'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminCoupon'){
          this.showHead = false;
          this.showAdmin=true;
        } else if(event['url'] =='/AdminOffer'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminTable'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminViewOrder'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminRating'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminDashboard'){
          this.showHead = false;
          this.showAdmin=true ;
        }
        else if(event['url'] =='/AdminReports'){
          this.showHead = false;
          this.showAdmin=true;
        }else if(event['url'] =='/AdminHoliday'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/Adminworking'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminCategory'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/AdminSubCategory'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/SuperAdminRestarunt'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/SuperAdminTax'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url'] =='/Adminprofile'){
          this.showHead = false;
          this.showAdmin=true;
        }
        
        else if(event['url'] =='/AdminPrinter'){
          this.showHead = false;
          this.showAdmin=true;
        } 
          else if(event['url'] =='/ItemSettings'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url']=='/UserRights'){
          this.showHead = false;
          this.showAdmin=true;
        }
        else if(event['url']=='/Extra'){
          this.showHead = false;
          this.showAdmin=true;
        }
         else {
          // console.log("NU")
          this.showAdmin=false;
          this.showHead = true;
        }
      }
    });
  }
 
  //Logde=true;
  onDeactivate() {
    document.body.scrollTop = 0;
    // Alternatively, you can scroll to top by using this other call:
    // window.scrollTo(0, 0)
  }
  ngOnInit():void{
   
    window.scrollTo(0, 0);

  }
  
 }
