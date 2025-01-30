import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavouritesComponent implements OnInit {

  constructor(private modalService: NgbModal,private http:HttpClient,private _storageService: StoragedetectComponent) { }
  Favourites:[] ;
  addtocartitem=[] as any;
  AddonText=[] as any;;
  closeResult:string;
  fav=[] as any;
  data=[] as any;
  RemoveCartitem=[] as any;
RemoveCart(){
  debugger;
  this.modalService.dismissAll("Addon");
  var item = this.RemoveCartitem;
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
 
  var value= this.http.get(environment.apiUrl + 'Fav/DeleteFav?CustomerDetails_ID=' +UserId +'&MenuVariance_ID=' + item.menuVariance +'&GustId='+GustId  ).toPromise().then(
    (data:any)=> {
      debugger;
       this.Favitems();
      alert("Selected Item(s) Successfully Removed From Favourites");
      //  this.Favourites=data;
    
    });

  
}
Addtotalcart(){
  debugger;
  this.fav =JSON.stringify(this.Favourites) ;
  this.fav =JSON.parse(this.fav) ;
 var Quan=1;
  for(var j =this.fav.length - 1; j >= 0; j--){
    this.data=JSON.parse(localStorage.getItem('CartItem'));
  
    var check= null;
    if(this.data != null){
      if(this.data.length !=0){
        for (var i =   this.data.length - 1; i >= 0; i--) {
          if (  this.data[i].MenuVarianceId ==this.fav[j].menuVariance) {
            var prQan = this.data[i].Quan;
            var prprice = this.data[i].price;
            check="entry";
            Quan=prQan + this.fav[j].newPrice;
           var Pricede = Quan * this.fav[j].price;
           this.data.splice(i, 1);
            this.data.push({"Addon":"","Quan":Quan, "MenuVarianceId":this.fav[j].menuVariance, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].price,"orginalpric":this.fav[j].price,sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
          }
         
           
      }
      if(check!="entry"){
        var Pricede =  this.fav[j].newPrice * this.fav[j].price;
        this.data.push({"Addon":"","Quan":this.fav[j].newPrice, "MenuVarianceId":this.fav[j].menuVariance, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":(this.fav[j].price),"orginalpric":this.fav[j].price,sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
      }
    }
    else{
      var Pricede =  this.fav[j].newPrice * this.fav[j].price;
      this.data.push({"Addon":"","Quan":this.fav[j].newPrice, "MenuVarianceId":this.fav[j].menuVariance, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].price,"orginalpric":(this.fav[j].newPrice) *(this.fav[j].price),sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
    }
    }
     
      else{
        var Pricede =  this.fav[j].newPrice * this.fav[j].price;
        this.data=[{"Addon":"","Quan":this.fav[j].newPrice, "MenuVarianceId":this.fav[j].menuVariance, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].price,"orginalpric":(this.fav[j].newPrice) *(this.fav[j].price),sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan}];
      }
      var resid=   localStorage.getItem('ResturntId');
localStorage.clear();
alert("Selected Items added to Cart");
localStorage.setItem('ResturntId',resid);
  //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
  this._storageService.setItem('CartItem',JSON.stringify(this.data));
    
    
  // localStorage.clear();
  // alert("Selected Items added to Cart");
  //     localStorage.setItem('CartItem',JSON.stringify(this.data) );
     
  }
 // window.location.href="/Favourite";
  return false;
}
AddonCartitems(Addon){
  debugger;
 
  this.modalService.dismissAll(Addon);
  var tes =this.AddonText;
    var list= this.addtocartitem;
var Quan=1;
    this.data=JSON.parse(localStorage.getItem('CartItem' ));
    if(this.AddonText != undefined && this.AddonText != "" ){
   
      this.AddonText = [{ Addon: this.AddonText,prize : 0 }];
  
      }
       else{
      
 
  }
     for(var k=0; k<this.addtocartitem.fav.length;k++ ){
   this.AddonText.push({ Addon: this.addtocartitem.fav[k].favname,prize : this.addtocartitem.fav[k].price });
         }
  var check= null;
  if(this.data != null){
    if(this.data.length !=0){
      for (var i =   this.data.length - 1; i >= 0; i--) {
        if (  this.data[i].MenuVarianceId == this.addtocartitem.menuVariance) {
          var prQan = this.data[i].Quan;
          var prprice = this.data[i].price;
          check="entry";
          Quan=prQan + this.addtocartitem.newPrice;
         var Pricede = this.data[i].price + this.addtocartitem.price;
         this.data.splice(i, 1);
          this.data.push({"Addon":this.AddonText,"Quan":Quan, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.price,"orginalpric":this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
        }
         
    }
    if(check!="entry"){
           
      this.data.push({"Addon":this.AddonText,"Quan": this.addtocartitem.newPrice, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.price,"orginalpric":this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
    }

  }
    else{
    
      this.data.push({"Addon":this.AddonText,"Quan":this.addtocartitem.newPrice, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":  this.addtocartitem.price,"orginalpric":this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
    }
  }
 
  else{
    this.data =[{"Addon":this.AddonText,"Quan":this.addtocartitem.newPrice, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":  this.addtocartitem.price,"orginalpric":this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan}];
  }
  var resid=   localStorage.getItem('ResturntId');
localStorage.clear();
alert("Selected Items added to Cart");
localStorage.setItem('ResturntId',resid);
  //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
  this._storageService.setItem('CartItem',JSON.stringify(this.data));
    localStorage.setItem('Addon',tes);
   // window.location.href="/Favourite";
    return false;
  }
  Remove(){
    this.modalService.dismissAll("Addon");
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    var value= this.http.get(environment.apiUrl + 'Fav/deleteAllFav?CustomerDetails_ID=' +UserId +'&GustId='+GustId   ).toPromise().then(
      (data:any)=> {
        debugger;
       this.Favitems();
         // this.Favourites=data;
         alert("Selected Item(s) Successfully Removed From Favourites");
         });
  }

open(content,item:any) {
  debugger;
  this.addtocartitem=item;
    this.modalService.open(content,{ windowClass: 'custom-class'} ).result.then((result) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
    });
  }

  openfav(content,item) {
    debugger;
    this.RemoveCartitem=item;
      this.modalService.open(content,{ windowClass: 'custom-class'} ).result.then((result) => {
    
        this.closeResult = `Closed with: ${result}`;
    
      }, (reason) => {
    
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
      });
    }
  
    openRemov(content) {
      debugger;
   
        this.modalService.open(content,{ windowClass: 'custom-class'} ).result.then((result) => {
      
          this.closeResult = `Closed with: ${result}`;
      
        }, (reason) => {
      
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
        });
      }
  private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
  
      return 'by pressing ESC';
  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
      return 'by clicking on a backdrop';
  
    } else {
  
      return  `with: ${reason}`;
  
    }
  
  }

  
  PriceRemove(customise,Addon,customization){
    debugger;
    let UserId =sessionStorage.getItem('CustomerId');
    var value= this.http.get(environment.apiUrl + 'Fav/FavMenuitem?customer=' +UserId +'&Menuid=' +Addon.favouritecustomizationid ).toPromise().then(
      (data:any)=> {
        debugger;
        this.Favitems();
      }).catch((data: any) => {
        this.Favitems();
      });
   
     
    
  }

  Favitems (){
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    var Res= localStorage.getItem('ResturntId');
    var value= this.http.get(environment.apiUrl + 'Fav/Favitem?customer=' +UserId +'&Gust='+ GustId + '&ResId='+Res).toPromise().then(
      (data:any)=> {
        debugger;
    
        this.Favourites=data;
  
      });
  }

  ngOnInit(): void {
debugger;
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    if(UserId != null || UserId != "" ){
    //  window.location.href="/Favourite";
      
    } else  if(GustId != null || GustId != "" ){
    //  window.location.href="/Favourite";
      
    }
    else{
      alert("Please Login to view Favourites");
      return ;
    }
    this._storageService.watchStorage().subscribe((data:string) => {
      debugger;
  
     })
    //var UserId=1;
     var Res= localStorage.getItem('ResturntId');
    var value= this.http.get(environment.apiUrl + 'Fav/Favitem?customer=' +UserId +'&Gust='+ GustId +'&ResId='+Res).toPromise().then(
      (data:any)=> {
        debugger;
      if(data.length!=0 ){
        this.Favourites=data;
      }
      else{
      };
      });
      
      function confirm(title, msg, $true, $false, $link) { /*change*/
        var $content =  "<div class='dialog-ovelay'>" +
                        "<div class='dialog'><header>" +
                         " <h3> " + title + " </h3> " +
                         "<i class='fa fa-close'></i>" +
                     "</header>" +
                     "<div class='dialog-msg'>" +
                         " <p> " + msg + " </p> " +
                     "</div>" +
                     "<footer>" +
                         "<div class='controls'>" +
                             " <button class='button button-danger doAction'>" + $true + "</button> " +
                             " <button class='button button-default cancelAction'>" + $false + "</button> " +
                         "</div>" +
                     "</footer>" +
                  "</div>" +
                "</div>";
         $('body').prepend($content);
      $('.doAction').click(function () {
        window.open($link, "_blank"); /*new*/
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
          $(this).remove();
        });
      });
$('.cancelAction, .fa-close').click(function () {
        $(this).parents('.dialog-ovelay').fadeOut(500, function () {
          $(this).remove();
        });
      });
      
   }
  }
  Adddown(min,item){
    let UserId =sessionStorage.getItem('CustomerId');
    debugger;
    // var Mynumber = parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) - 1;
    // ((document.getElementById("AddNumber") as HTMLInputElement).value)= String(Mynumber);
    // if (parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) <= parseInt(min)) {
    //    (document.getElementById("AddNumber") as HTMLInputElement).value = min;
    // }
    var GustId= sessionStorage.getItem('GuesId');
    if(item.newPrice != 1){
      item.price= item.price;
      item.newPrice=item.newPrice -1;
      var value= this.http.get(environment.apiUrl + 'Fav/UpdateQty?CustomerDetails_ID=' +UserId +'&MenuVariance_ID=' + item.menuVariance +'&Qty='+item.newPrice +'&GustId='+GustId ).toPromise().then(
        (data:any)=> {
          debugger;
     
        });
    }
  
   
  }
  Addup(max,item){
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    debugger;
 
 
    item.price= item.price ;
    item.newPrice=item.newPrice +1;
    var value= this.http.get(environment.apiUrl + 'Fav/UpdateQty?CustomerDetails_ID=' +UserId +'&MenuVariance_ID=' + item.menuVariance +'&Qty='+item.newPrice+'&GustId='+GustId  ).toPromise().then(
      (data:any)=> {
        debugger;
   
      });
 
   
    
  }
  // AddcartQuant(item){
  //   debugger;
  //   if(item.newPrice != 0){
  //     item.newPrice= item.newPrice ;
  //   }
  //   else{
  //     item.newPrice=1;      
  //   }
  // }
  AddcartQuant(item){
    debugger;
    if(item.newPrice != 0){
      item.newPrice= item.newPrice ;
    }
    else{
      item.newPrice=1;
          }
          var len = (item.newPrice).toString().length;
    if(len > 3){
      var numbert= Number(item.newPrice.toString().substring(0,3));
      item.newPrice =numbert;
    }
    
   
  }
}
