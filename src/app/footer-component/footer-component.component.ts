import { Component, OnInit } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {
  ItemsArrayMenu:[];
  TimeArray:[];
  StartTime;
  constructor(private modalService: NgbModal,private http:HttpClient,private _storageService: StoragedetectComponent) { }

  ngOnInit(): void {
   this.MenuTiming();
      this.ResTiming();
      this._storageService.watchStorage().subscribe((data:string) => {
        debugger;
this.ResTiming();
this.MenuTiming();
       })
      debugger;
    
  }
MenuTiming(){
  var resid=  localStorage.getItem('ResturntId');
  //Bind SubCategory
  var value= this.http.get(environment.apiUrl + 'Menu/Sub?RestaruntId='+resid+'&System=Web').toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
      this.ItemsArrayMenu=data;
    }
    else{
    };
    });
}

ResTiming(){
  var res = localStorage.getItem('ResturntId');
  //Bind Working Hours 
  var value= this.http.get(environment.apiUrl + 'customerdetails/GetWorkingHours?restarunt='+ res).toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
      this.TimeArray=data;
    }
    else{
    };
    });
}
}
