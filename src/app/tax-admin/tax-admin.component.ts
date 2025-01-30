import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-tax-admin',
  templateUrl: './tax-admin.component.html',
  styleUrls: ['./tax-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaxAdminComponent implements OnInit {
  Drop=true;
  constructor() { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
  }
  Show(){
    this.Drop=false;
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
