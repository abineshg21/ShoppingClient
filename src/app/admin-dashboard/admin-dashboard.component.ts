import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDashboardComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
      this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
   this.loadScript('http://slidesigma.com/themes/html/costic/assets/js/jquery-ui.min.js');

  }

      public loadScript(url: string) {
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
      }
}
