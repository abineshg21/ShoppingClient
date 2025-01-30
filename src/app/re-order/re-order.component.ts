import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import{ HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-re-order',
  templateUrl: './re-order.component.html',
  styleUrls: ['./re-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReOrderComponent implements OnInit {
  closeResult:String;
  Name :string;
  LastName:string;
  EmailId:string;
  Mobileno:string;
  AddressErrorMsg:string;
  AddressSuccessMsg:string;
  isShownErrorAddress:boolean =false;
  isShownSuccessAddress:boolean=false;
  Filepng:File;
  ReOrder=[] as any;
  ItemPrice=[] as any;
  OrderId : number;
  OrderDate :number;
  TotalAmt:number;
  CouponAmt:number;
  TaxAmt:number;
  TipsAmt:number;
  Res_Name:string;
  addtocartitem=[] as any;
  data=[] as any;
  OffersCoupon=[] as any;
  AddonText:string;
  fav=[] as any;
  selectedCount:number;
  constructor(private modalService: NgbModal,private http:HttpClient,private _storageService: StoragedetectComponent) { }

  ngOnInit(): void {
    this.selectedCount=0;
    var CustomarId= localStorage.getItem('ReOrderId');
    var Reorder = this.http.get(environment.apiUrl +'Myorder/OrderDetails?OrderId='+CustomarId).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
        
       this.ItemPrice=data;
       this.OrderId=data["0"].orderId;
       this.OrderDate=data["0"].orderDate;
       this.TotalAmt=data["0"].amountPaid;
       this.CouponAmt=data["0"].DisAmt
       this.Res_Name= data["0"].resturantName;
    
       this.TipsAmt=data["0"].tipsAmt;
      }
     // this.check();
          });
  }
  Adddown(min,item : any){
    debugger;
    var Mynumber = parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) - 1;
    // ((document.getElementById("AddNumber") as HTMLInputElement).value)= String(Mynumber);
    // if (parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) <= parseInt(min)) {
    //    (document.getElementById("AddNumber") as HTMLInputElement).value = min;
    // }
    
    if(item.qty !=1){
      item.iTEMprice= item.iTEMprice;
      item.qty=item.qty -1;
    }

  }
  Addtotalcart(){
    debugger;
    this.fav =JSON.stringify(this.ItemPrice) ;
    this.fav =JSON.parse(this.fav) ;
   var Quan=1;
    for(var j =this.fav.length - 1; j >= 0; j--){
      this.data=JSON.parse(localStorage.getItem('CartItem'));
    
      var check= null;
      if(this.data != null){
        if(this.data.length !=0){
          for (var i =   this.data.length - 1; i >= 0; i--) {
            if (  this.data[i].MenuVarianceId ==this.fav[j].menuVarianceId) {
              var prQan = this.data[i].Quan;
              var prprice = this.data[i].price;
              check="entry";
              Quan=prQan + this.fav[j].iTEMprice;
             var Pricede = Quan * this.fav[j].qty;
             this.data.splice(i, 1);
              this.data.push({"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":Quan, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].iTEMprice,"orginalpric":this.fav[j].iTEMprice,sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
            }
           
             
        }
        if(check!="entry"){
          var Pricede =  this.fav[j].newPrice * this.fav[j].price;
          this.data.push({"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":this.fav[j].qty, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":(this.fav[j].iTEMprice),"orginalpric":this.fav[j].iTEMprice,sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
        }
     
      }
      else{
        var Pricede =  this.fav[j].newPrice * this.fav[j].price;
        this.data.push({"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":this.fav[j].qty, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].iTEMprice,"orginalpric":(this.fav[j].iTEMprice) *(this.fav[j].iTEMprice),sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
      }
      }
       
        else{
          var Pricede =  this.fav[j].newPrice * this.fav[j].price;
          this.data=[{"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :"") ,"Quan":this.fav[j].qty, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].iTEMprice,"orginalpric":(this.fav[j].iTEMprice) *(this.fav[j].iTEMprice),sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan}];
        }
      
      
  //  localStorage.clear();
    
    //    localStorage.setItem('CartItem',JSON.stringify(this.data) );
    var resid=   localStorage.getItem('ResturntId');
    localStorage.clear();
    alert("Selected Items added to Cart");
    localStorage.setItem('ResturntId',resid);
      //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
      this._storageService.setItem('CartItem',JSON.stringify(this.data));
    //    localStorage.setItem('Addon',tes); 
    }
  //  window.location.href="/MyOrder";
    return false;
  }

  CheckOut(){
    this.data=JSON.parse(localStorage.getItem('CartItem' ));
    if(this.data != null){
      var items =  this.data;

      if(items.length == 0){
        alert("Please Add some items");
        return false;
      }
      else{
        window.location.href="/CheckOut";
      }
    }
    else{
      alert("Please Add some items");
     return false;
    }
   
  }
  handleSelected1($event){
   debugger;
  if ($event.target.checked === true) {
  $(" input:checkbox").prop('checked', true);

  this.fav =JSON.stringify(this.ItemPrice) ;
  this.fav =JSON.parse(this.fav) ;
 var Quan=1;
  for(var j =this.fav.length - 1; j >= 0; j--){
    this.data=JSON.parse(localStorage.getItem('CartItem'));
  
    var check= null;
    if(this.data != null){
      if(this.data.length !=0){
        for (var i =   this.data.length - 1; i >= 0; i--) {
          if (  this.data[i].MenuVarianceId ==this.fav[j].menuVarianceId) {
            var prQan = this.data[i].Quan;
            var prprice = this.data[i].price;
            check="entry";
            Quan=prQan + this.fav[j].iTEMprice;
           var Pricede = Quan * this.fav[j].qty;
           this.data.splice(i, 1);
            this.data.push({"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":Quan, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].iTEMprice,"orginalpric":this.fav[j].iTEMprice,sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
          }
         
           
      }
      if(check!="entry"){
        var Pricede =  this.fav[j].newPrice * this.fav[j].price;
        this.data.push({"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":this.fav[j].qty, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":(this.fav[j].iTEMprice),"orginalpric":this.fav[j].iTEMprice,sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
      }
   
    }
    else{
      var Pricede =  this.fav[j].newPrice * this.fav[j].price;
      this.data.push({"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":this.fav[j].qty, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].iTEMprice,"orginalpric":(this.fav[j].iTEMprice) *(this.fav[j].iTEMprice),sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan});
    }
    }
     
      else{
        var Pricede =  this.fav[j].newPrice * this.fav[j].price;
        this.data=[{"Addon": (this.fav[j].addon != undefined ?  this.fav[j].addon :""),"Quan":this.fav[j].qty, "MenuVarianceId":this.fav[j].menuVarianceId, "ImageUrl":this.fav[j].imageUrl,"itemName":this.fav[j].itemName  +" " +(this.fav[j].varianceName != null && this.fav[j].varianceName != "" ?  "-" +this.fav[j].varianceName :"") ,"couponAmt":this.fav[j].couponAmt,"couponType":this.fav[j].couponType,"price":this.fav[j].iTEMprice,"orginalpric":(this.fav[j].iTEMprice) *(this.fav[j].iTEMprice),sTax:this.fav[j].salestax,hTax:this.fav[j].hospitalitytax,oTax:this.fav[j].othertax,discountQuan:this.fav[j].discountQuan}];
      }
    
    
 // localStorage.clear();
 var resid=   localStorage.getItem('ResturntId');
 localStorage.clear();
 alert("Selected Items added to Cart");
 localStorage.setItem('ResturntId',resid);
   //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
   this._storageService.setItem('CartItem',JSON.stringify(this.data));
   //   localStorage.setItem('CartItem',JSON.stringify(this.data) );
     
  }
  //window.location.href="/MyOrder";
  //return false;
  }
  else{
    $(" input:checkbox").prop('checked', false); 
    this.fav =JSON.stringify(this.ItemPrice) ;
    this.fav =JSON.parse(this.fav) ;
    var Quan=1;
     for(var j =this.fav.length - 1; j >= 0; j--){
    var vCart = localStorage.getItem("CartItem");
    let CartItem = JSON.parse(vCart);
     for (var i = CartItem.length - 1; i >= 0; i--) {
         if (CartItem[i].MenuVarianceId == this.fav[j].menuVarianceId) {
             CartItem.splice(i, 1);
         }
     }
     var Location = localStorage.getItem('Location');
   var res=  localStorage.getItem('ResturntId');
     localStorage.clear();
     
     localStorage.setItem("CartItem", JSON.stringify(CartItem));
     var vCartItems = localStorage.getItem("CartItem");
  }
}
  var generallen = $(" input[name=Check]:checked").length;
  
	if (generallen > 0) {
    this.selectedCount =generallen;
	} else {
		this.selectedCount=0;
  }
  }
  handleSelected($event,item) {
    debugger;
    if ($event.target.checked === true) {
      this.selectedCount +=1;
      var tes =this.AddonText;
        this.addtocartitem=item;
    var Quan=1;
        this.data=JSON.parse(localStorage.getItem('CartItem' ));
      
      var check= null;
      if(this.data != null){
        if(this.data.length !=0){
          for (var i =   this.data.length - 1; i >= 0; i--) {
            if (  this.data[i].MenuVarianceId == this.addtocartitem.menuVarianceId) {
              var prQan = this.data[i].Quan;
              var prprice = this.data[i].price;
              check="entry";
              Quan=prQan + this.addtocartitem.qty;
             var Pricede = Quan * this.addtocartitem.prize;
             this.addtocartitem.couponAmt = (this.addtocartitem.couponId != null ? 0: this.addtocartitem.couponAmt)
             this.data.splice(i, 1);
              this.data.push({"Addon":this.addtocartitem.splitem,"Quan":Quan, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName +" "+ (this.addtocartitem.varianceName == null ||this.addtocartitem.varianceName == '' ? " " : "-"+this.addtocartitem.varianceName  ),"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
            }
          
        }
        if(check!="entry"){
               
          this.data.push({"Addon":this.addtocartitem.splitem,"Quan": this.addtocartitem.qty, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName +" "+ (this.addtocartitem.varianceName == null ||this.addtocartitem.varianceName == '' ? " " : "-"+this.addtocartitem.varianceName  ),"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
        }
      }
        else{
          var Pricede =  this.addtocartitem.qty * this.addtocartitem.prize;
          this.data.push({"Addon":this.addtocartitem.splitem,"Quan":this.addtocartitem.qty, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName  +" "+ (this.addtocartitem.varianceName == null ||this.addtocartitem.varianceName == '' ? " " : "-"+this.addtocartitem.varianceName  ),"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
        }
      }
      else{
        this.data=[{"Addon":this.addtocartitem.splitem,"Quan":this.addtocartitem.qty, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName  +" "+ (this.addtocartitem.varianceName == null ||this.addtocartitem.varianceName == '' ? " " : "-"+this.addtocartitem.varianceName  ),"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan}];
      }
      var res=  localStorage.getItem('ResturntId');
    localStorage.clear();
    localStorage.setItem('ResturntId',res);
        localStorage.setItem('CartItem',JSON.stringify(this.data) );
        localStorage.setItem('Addon',tes);
      //  window.location.href="/MyOrder";
      //  return false;
 }
else{
  this.selectedCount -=1;
  var vCart = localStorage.getItem("CartItem");
  let CartItem = JSON.parse(vCart);
   for (var i = CartItem.length - 1; i >= 0; i--) {
       if (CartItem[i].MenuVarianceId == item.menuVarianceId) {
           CartItem.splice(i, 1);
       }
   }
   var Location = localStorage.getItem('Location');
 var res=  localStorage.getItem('ResturntId');
   localStorage.clear();
   
   localStorage.setItem("CartItem", JSON.stringify(CartItem));
   var vCartItems = localStorage.getItem("CartItem");
   localStorage.setItem("Location",Location);
    localStorage.setItem('ResturntId',res);
  // window.location.href="";

}
}
  AddonCartitems(Addon){
    debugger;
   
    this.modalService.dismissAll(Addon);
    var tes =this.AddonText;
      var list= this.addtocartitem;
  var Quan=1;
      this.data=JSON.parse(localStorage.getItem('CartItem' ));
    
    var check= null;
    if(this.data != null){
      if(this.data.length !=0){
        for (var i =   this.data.length - 1; i >= 0; i--) {
          if (  this.data[i].MenuVarianceId == this.addtocartitem.menuVarianceId) {
            var prQan = this.data[i].Quan;
            var prprice = this.data[i].price;
            check="entry";
            Quan=prQan + this.addtocartitem.qty;
           var Pricede = Quan * this.addtocartitem.prize;
           this.addtocartitem.couponAmt = (this.addtocartitem.couponId != null ? 0: this.addtocartitem.couponAmt)
           this.data.splice(i, 1);
            this.data.push({"Addon":this.addtocartitem.splitem,"Quan":Quan, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice});
          }
        
      }
      if(check!="entry"){
             
        this.data.push({"Addon":this.addtocartitem.splitem,"Quan": this.addtocartitem.qty, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice});
      }
    }
      else{
        var Pricede =  this.addtocartitem.quantity * this.addtocartitem.prize;
        this.data.push({"Addon":this.addtocartitem.splitem,"Quan":this.addtocartitem.qty, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice});
      }
    }
    else{
      this.data=[{"Addon":this.addtocartitem.splitem,"Quan":this.addtocartitem.qty, "MenuVarianceId":this.addtocartitem.menuVarianceId, "ImageUrl":this.addtocartitem.imageUrl,"itemName":this.addtocartitem.itemName,"couponAmt":this.addtocartitem.couponAmt,"couponType":this.addtocartitem.couponType,"price":this.addtocartitem.iTEMprice,"orginalpric":this.addtocartitem.iTEMprice}];
    }
     
//  localStorage.clear();
  
  //    localStorage.setItem('CartItem',JSON.stringify(this.data) );
  //    localStorage.setItem('Addon',tes);
    //  window.location.href="/MyOrder";
      var res=  localStorage.getItem('ResturntId');
      localStorage.clear();
      
      localStorage.setItem("CartItem", JSON.stringify(this.data));
      var vCartItems = localStorage.getItem("CartItem");
     // localStorage.setItem("Location",Location);
       localStorage.setItem('ResturntId',res);
      return false;
    }
  Addup(max,item : any){
    debugger;
   var Mynumber = parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) + 1;
  //  ((document.getElementById("AddNumber") as HTMLInputElement).value)= String(Mynumber);
  //   if ( Number(Mynumber) >= Number(max)) {
  //      (document.getElementById("AddNumber") as HTMLInputElement).value = max;
  //   }

 
    item.iTEMprice= item.iTEMprice;
    item.qty=item.qty +1;
 
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
    AddcartQuant(item){
      debugger;
      debugger;
      if(item.qty != 0){
        item.qty= item.qty ;
      }
      else{
        item.qty=1;      
      }
    }
}
