import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }

  Braintree()
  {
    var value = this.http.get(environment.apiUrl + 'BrainTree/GetClientToken').toPromise().then(
      (data: any) => {
      debugger;
      }).catch((data: any) => {
        debugger;
      });
  }
  SitemapClick(value)
  {
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    if(UserId != null && UserId != "" ){
      //window.location.href="/Favourite";
      
    } else  if(GustId != null && GustId != "" ){
      //window.location.href="/Favourite";
      
    }
    else{
      alert("Please Login to view.");
      return false;
    }

    if(value=="My Favourites"){
      window.location.href="/Favourite";
    }
    else if(value=="Order Summary"){
      window.location.href="/MyOrder";
    }
    else if(value=="My Account"){
      window.location.href="/MyOrder";
    }
    else if(value=="My Order"){
      window.location.href="/MyOrder";
    }
    else if(value=="Order Details"){
      window.location.href="/OrderDetail";
    }
    else if(value=="My Addresses"){
      window.location.href="/Review";
    }
    else if(value=="Reviews"){
      window.location.href="/Review";
    }
    
  }
}
