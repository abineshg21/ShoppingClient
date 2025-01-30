import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OfferComponent implements OnInit {
  addtocartitem=[] as any;
  closeResult :string;
  data=[] as any;
  OffersCoupon=[] as any;
  AddonText=[] as any;
  constructor(private modalService: NgbModal,private http:HttpClient,private _storageService: StoragedetectComponent) { }
  MoreDetails=true;
  ngOnInit(): void {
    var resId = localStorage.getItem("ResturntId");
    var value= this.http.get(environment.apiUrl + 'Offer/Offer?ResId='+resId ).toPromise().then(
      (data:any)=> {
        debugger;
      if(data.length!=0 ){
        this.OffersCoupon=data;
      }
      else{
      };
      });
      this._storageService.watchStorage().subscribe((data:string) => {
        debugger;

       })
  }
  
  down(min,item ){
    debugger;
    var Mynumber = parseInt((document.getElementById("myNumber") as HTMLInputElement).value);
    // ((document.getElementById("myNumber") as HTMLInputElement).value)= String(Mynumber);
    // if (parseInt((document.getElementById("myNumber") as HTMLInputElement).value) <= parseInt(min)) {
    //    (document.getElementById("myNumber") as HTMLInputElement).value = min;
    // }
    if(item.quantity !=1){
      item.prize= item.prize;
      item.quantity=item.quantity -1;
    }
   
  }
  up(max,item){
    debugger;
  //  var Mynumber = parseInt((document.getElementById("myNumber") as HTMLInputElement).value) + 1;
  //  ((document.getElementById("myNumber") as HTMLInputElement).value)= String(Mynumber);
  //   if ( Number(Mynumber) >= Number(max)) {
  //      (document.getElementById("myNumber") as HTMLInputElement).value = max;
  //   }
    item.prize= item.prize;
    item.quantity=item.quantity +1;
  }
  LoadDetail(){
    this.MoreDetails=false;
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
    var check= null;
    if(this.data != null){
      if(this.data.length !=0){
        for (var i =   this.data.length - 1; i >= 0; i--) {
          if (  this.data[i].MenuVarianceId == this.addtocartitem.menuVariance) {
            var prQan = this.data[i].Quan;
            var prprice = this.data[i].price;
            check="entry";
            Quan=prQan + this.addtocartitem.quantity;
           var Pricede = Quan * this.addtocartitem.prize;
           this.addtocartitem.couponAmt = (this.addtocartitem.couponId != null ? 0: this.addtocartitem.couponAmt)
           this.data.splice(i, 1);
            this.data.push({"Addon":this.AddonText,"Quan":Quan, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.discountAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.prize,"orginalpric":this.addtocartitem.prize,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
          }
         
      }
      if(check!="entry"){
        this.addtocartitem.couponAmt = (this.addtocartitem.couponId != null ? 0: this.addtocartitem.couponAmt)
        this.data.push({"Addon":this.AddonText,"Quan": this.addtocartitem.quantity, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.discountAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.prize,"orginalpric":this.addtocartitem.prize,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
      }
    }
      else{
        this.addtocartitem.couponAmt = (this.addtocartitem.couponId != null ? 0: this.addtocartitem.couponAmt)
        var Pricede =  this.addtocartitem.quantity * this.addtocartitem.prize;
        this.data.push({"Addon":this.AddonText,"Quan":this.addtocartitem.quantity, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.discountAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.prize,"orginalpric":this.addtocartitem.prize,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
      }
    }
    else{
      this.addtocartitem.couponAmt = (this.addtocartitem.couponId != null ? 0: this.addtocartitem.couponAmt)
      var Pricede =  this.addtocartitem.quantity * this.addtocartitem.prize;
      this.data=[{"Addon":this.AddonText,"Quan":this.addtocartitem.quantity, "MenuVarianceId":this.addtocartitem.menuVariance, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.discountAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.prize,"orginalpric":this.addtocartitem.prize,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan}];
    }
    
    alert("Selected Items added to Cart");
    var resId = localStorage.getItem("ResturntId");
    
  localStorage.clear();
  localStorage.setItem("ResturntId",resId);
     // localStorage.setItem('CartItem',JSON.stringify(this.data) );
     this._storageService.setItem('CartItem',JSON.stringify(this.data));
      localStorage.setItem('Addon',tes);
    //  window.location.href="/Offer";
      return false;
    }

    // AddcartQuant(item){
    //   debugger;
    //   if(item.quantity !=0 ){
    //     item.quantity= item.quantity ;
    //   }
    //   else{
    //     item.quantity= 1 ;
    //   }
      
    // }
    AddcartQuant(item){
      debugger;
      if(item.quantity != 0){
        item.quantity= item.quantity ;
      }
      else{
        item.quantity=1;
            }
            var len = (item.quantity).toString().length;
      if(len > 3){
        var numbert= Number(item.quantity.toString().substring(0,3));
        item.quantity =numbert;
      }
      
     
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
  
  private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {
  
      return 'by pressing ESC';
  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
      return 'by clicking on a backdrop';
  
    } else {
  
      return  `with: ${reason}`;
  
    }
  
  }
}
