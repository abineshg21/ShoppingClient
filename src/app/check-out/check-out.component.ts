import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Time } from '@angular/common';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckOutComponent implements OnInit {

  constructor(private modalService: NgbModal,private http:HttpClient,private _storageService: StoragedetectComponent,private authService: SocialAuthService) { }
  Deliver =false;
  mtoken:string;
  DeliverAdd=true;
  FillAdd=false;
  Deliverlo=false;
  closeResult: string;
  Addtocart=[] as any;
  TipMaster=[] as any;
  location:string;
  Discount: number;
  price:number;
  Taxamt:number;
  Couponcode:string;
  CouponAmt:number;
  DeliveryAmt:number;
  SubTotal:number;
  TipAmt:number;
  TipAmt1:number;
  NetBalance:number;
  UserId: string;
  Password: string;
  ForgotMailId: string;
  VerificationCode: string;
  isShownErrorVerCode: boolean = false;
  isShownSuccessVerCode: boolean = false;
  VerificationErrorMsg: string;
  VerificationSuccessMsg: string;
  isShownErrorLogin: boolean = true;
  isShownSuccessLogin: boolean = true;
  LoginErrorMsg: string;
  LoginSuccessMsg: string;
  cartcount;
  CustomerNam: string;
  SignUpFirstName: string;
  SignUpLastName: string;
  SignUpEmail: string;
  SignUpMobile: string;
  SignUpPassword: string;
  SignUpConfirmPass: string;
  Name:string;
  isShownErrorSignUp: boolean = true;
  isShownSuccessSignUp: boolean = true;
  SignUpErrorMsg: string;
  SignUpSuccessMsg: string;
  isShownErrorGuest: boolean = true;
  isShownSuccessGuest: boolean = true;
  GuestErrorMsg: string;
  GuestSuccessMsg: string;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  passwordPattern = "(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}";
  LoginCaptha2: string;
  LoginCaptha3: string;
  SignUpCaptha: string;
  SignUpCaptha1: string;
  GustFirstName: string;
  GustLastName: string;
  GustEmail: string;
  GustMobile: string;
  GustCaptha: string;
  GustCaptha1: string;

  AddFirstName:string;
  AddAddLine1:string;
  AddLine2:string;
  AddCity:string;
  AddState:string;
  AddZip:string;
  AddMobile:string;

  payCaptha1:string;
  payCaptha:string;
  payCaptha2:string;
  payCaptha4:string;

  ChangeAddErrorMsg:string;
  ChangeAddSuccessMsg:string;
  isShownErrorChange:boolean= false;
  isShownSuccessChange:boolean=false;
  isShownErrorAddnew:boolean=false;
  isShownSuccessAddnew:boolean=false;
  AddNewSuccessMsg:string;
  AddnewErrorMsg:string;
  AddNewFirstName:string;
  AddNewLine1:string;
  AddNewLine2:string;
  AddnewCity:string;
  AddNewState:string;
  AddNewZip:string;
  EditAddress=[] as any;
  Custdelivery:string;
  Immediate:string;
  AlertMsg:string;
  Alertshow:boolean = false;
  SelectTime:Time;
  stattime:string;
  Oldprice:number;
  endtime:string;
DeliveryAddress_Id :number;
CarryFillFName:string;
CarryFillLName:string;
CarryFillEmail:string;
CarryFillMobile:string;
StartTime:string;
DeliverType:string;
ButtonName:string;
DeliveryTime:Time;
LoginCaptha: string;
LoginCaptha1: string;
ForgotCaptha: string;
ForgotCaptha1: string;
isShownErrorForgot: boolean = true;
isShownSuccessForgot: boolean = true;
ForgotErrorMsg: string;
ForgotSuccessMsg: string;
DeliveryStatus=false;
addtocartitem=[] as any;
deliverypaytype=false;
Carryoutpaytype=false;
PaymentType :string;
CarrypayOnline=false;
DeliveryPayOnline=false;
CarryPaybutton=false;
deliveryOnlinePaybutton=false;
Selectlatertime=false;
Deliverylatertime=false;
selectedIndex: number | null = null;
  dit =[] as any;
  CarryDelType :string;
  Delivery(){
    this.PaymentType="Delivery";
    var vCart = localStorage.getItem("CartItem");
    let CartItem = JSON.parse(vCart);
    if( CartItem == undefined ||CartItem.length ==0 ){
      window.location.href="/";
    }
    debugger;
   var Customer= sessionStorage.getItem('CustomerId');
   var GustId= sessionStorage.getItem('GuesId');
   if(Customer != null && Customer !=""){
    this.Deliver =false;
    //this.DeliverAdd=true;
    this.FillAdd=false;
    this.Deliverlo=false;
    this.DeliveryStatus=true;
    
    this.deliveryfee();
    
   
   }else if(GustId != null && GustId !=""){
    this.Deliver =false;
    this.DeliverAdd=false;
    this.FillAdd=false;
    this.Deliverlo=false;
    this.DeliveryStatus=true;
    this.deliveryfee();
    
   
   }
   else{
    this.Deliver =true;
    this.DeliverAdd=false;
    this.FillAdd=false;
    this.Deliverlo=false;
    this.DeliveryStatus=false;
   }
   // this.Deliver =true;
   

  }
  selectItem(index: number,deliveryId): void {
    this.selectedIndex = index;
    this.DeliveryAddress_Id=deliveryId;
  }

  DeliveryPayask(){
    var lenth= this.EditAddress.length;
    if(lenth == 0){
      alert("Please Enter Address Details");
      return false;
    }
    this.deliverypaytype=true;
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
  DeliveryChecStatus(){
    debugger;
    this.Alertshow = false;
    if(this.Immediate == "" || this.Immediate == undefined){
      this.Alertshow = true;
     this.AlertMsg="Please Choose Type"; 
    return false;
    }
  
    if(this.Immediate =="Later"){
  if(this.DeliveryTime == null || this.DeliveryTime == undefined){
    this.Alertshow = true;
    this.AlertMsg="Please Choose Time";
    return false; 
  }
}
  var end =( localStorage.getItem('Endtime')); 
  var star= this.stattime.split(":");
  var timeend = star["1"].split(" ");
  var sta =new Date();
  var Diiff = sta.getHours();
  var Diiff1 = sta.getHours();
  if(Diiff >12){
    Diiff = Diiff -12;
  }
  var min = sta.getMinutes();
  var enddate = end.split(':');
  var tw4hour =  Number(enddate["0"] );
  var tw4Min1 =  (enddate["1"].split(' ') );
  var tw4Min= Number(tw4Min1["0"]);
var hourdiff = tw4hour- Diiff;
var staringdiff =parseInt(star["0"])  - Diiff;
if(Diiff1 <12){
  if(staringdiff >0)
  {
    alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
    return false;
  }
}
if(Diiff1 < 12){
  if( staringdiff == -1 ||  staringdiff == -2 ||  staringdiff == -3|| staringdiff == 0 || staringdiff ==1 || staringdiff ==2 || staringdiff ==3){
   
  }
  else{
    if(hourdiff >= 1){
      if(hourdiff ==1 ){
        if(tw4Min ==0){
          var selectMindiff= 60 -min;
        }
        else{
          var selectMindiff= tw4Min -selectMin;
        }
      

      if( selectMindiff >= 30){
      
      }
      else{
        alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
      //alert("Please place the order during Restaurant Timing"); 
      return false;
      }
      
      }
      else if( Diiff > tw4hour) {
        alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
       // alert("Please place the order during Restaurant Timing"); 
        return false;
      }
        }
        else{
          alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
         // alert("Please place the order during Restaurant Timing");
          return false;
        }
  }
 
}
 
  if(this.DeliveryTime !=null){
    var SelectTime = String(this.DeliveryTime).split(":");
    var selectHours =  Number(SelectTime["0"]);
    var selectMin1 =  (SelectTime["1"].split(" "));
    var selectMin = Number(selectMin1["0"]);
    var selecthourdiff = tw4hour - selectHours;
    if(selecthourdiff >= 1){


      if(selecthourdiff ==1 ){
      //  var mindiff = min -selectMin;
        if(tw4Min ==0){
          var selectMindiff= 60 -selectMin;
        }
        else{
          var selectMindiff= min -selectMin;
        }

if( selectMindiff >= 30){

}
else{
  alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
 // alert("Please place the order during Restaurant Time"); 
  return false;
}

      }
      // else if( Diiff > selectHours) {
      //   alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
      // //  alert("Please place the order during Restaurant Time"); 
      //   return false;
      // }
    }
    else{
      alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
    //  alert("Please place the order during Restaurant Time");
      return false;
    }
  }
window.scroll(0,300);
  //   var sta =new Date();
  
  //   var Diiff = sta.getHours();
  // var min = sta.getMinutes();
  //   var enddate = end.split(':');
  // var tw4hour =  Number(enddate["0"] );
  // var tw4 =tw4hour -Diiff;
  
  // var hourdiff = tw4 - Diiff;
  // if(tw4 >= 1)
  // {
  //   if(tw4 == 1){
  //     var demofile1 =enddate["1"].split(" ");
  //     var mindi = min - Number(demofile1["0"]);
  // if(Number(mindi) > 30){
  //   alert("Please Order Before 30 mins")
  //   return false;
  // }
  //   }
   
  // }
  
  // if(this.DeliveryTime !=null){
  // var SelectTime = String(this.DeliveryTime).split(":");
  // var tw41 =tw4hour - Number(SelectTime["0"]);
  // if(tw41 >= 1)
  // {
  //   if(tw41 == 1){
  //     var demofile =enddate["1"].split(" ");
  //     var mindi1 = (60 + Number(SelectTime["1"]))  - Number(this.SelectTime["1"]);
  // if(Number(mindi) > 30){
  
  //   alert("Please Order Before 30 mins");
  //   return false;
  // }
  //   }
   
  // }
  // else{
  //   alert("Pls place the order during Restaurant Time");
  //   return false;
  // }
  // }
  
  //   }
  // if(this.Immediate != null){
      
  //   var end =( localStorage.getItem('Endtime')); 
  
  //   var sta =new Date();
  
  //   var Diiff = sta.getHours();
  // var min = sta.getMinutes();
  //   var enddate = end.split(':');
  
  // var tw4 =Diiff - Number(enddate["0"] );
  
  // var hourdiff = tw4 - Diiff;
  // if(tw4 >= 1)
  // {
  //   if(tw4 == 1){
  //     var mindi = min - Number(enddate["1"]);
  // if(Number(mindi) > 30){
  //   alert("Please Order Before 30 mins")
  //   return false;
  // }
  //   }
   
  // }
  
  
  if($('#ritema18').is(':checked') == false){
    this.Alertshow = true;
    this.AlertMsg="Please Accept Terms and Conditions";
    return false; 
  }
  
    this.Deliver =false;
    this.DeliverAdd=true;
    this.FillAdd=false;
    this.Deliverlo=false;
    this.DeliveryStatus=false; 
  }
deliveryfee(){
  var res=  localStorage.getItem('ResturntId');
  var value = this.http.get(environment.apiUrl + 'Checkout/Deliveryfee?RestaruntId=' +res+'&zipcode='+this.AddZip).toPromise().then(
    (data: any) => {
      debugger;
      if (data.length != 0) {
      //  this.TimeArray = data;
      //  this.StartTime = data["0"].stHours;
      var deliveryfee = data["0"].deliveryFee;
      this.DeliveryAmt=data["0"].deliveryFee;
      this.price = this.price;
      this.SubTotal=this.price + this.DeliveryAmt + this.Taxamt;
      this.NetBalance = this.price + this.DeliveryAmt + this.Taxamt + this.TipAmt;
      }
      else {
      };
    });
}
  Imedia(options){
    debugger;
this.Immediate=options;
if(this.Immediate == "Later"){
  this.Selectlatertime=true;
  this.Deliverylatertime=true;
}
  }
 
  TippEnter(perce){
    debugger;
    var amtt= (perce/100) * this.SubTotal;
    this.TipAmt =parseFloat(amtt.toFixed(2));
this.NetBalance = this.TipAmt + this.SubTotal;
  }
  TipsPenter(){
   // this.TipAmt = 
  
    this.NetBalance = this.TipAmt + this.SubTotal; 
  }
  CarryOut(){
    debugger;
    this.PaymentType="CarryOut";
    var vCart = localStorage.getItem("CartItem");
    let CartItem = JSON.parse(vCart);
    if( CartItem ==undefined||CartItem.length ==0){
      window.location.href="/";
    }
    var Customer= sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    if(Customer != null && Customer !=""){
      this.Deliver =false;
      this.DeliverAdd=false;
      this.FillAdd=true;
      this.Deliverlo=false;
      this.DeliveryStatus=false;
    }
    else if(GustId != null && GustId !=""){
      this.Deliver =false;
      this.DeliverAdd=false;
      this.FillAdd=true;
      this.Deliverlo=false;
      this.DeliveryStatus=false;
      
     
     }
    else{
    
      this.Deliver =true;
      this.DeliverAdd=false;
      this.FillAdd=false;
      this.Deliverlo=false;
      this.DeliveryStatus=false;
    }
   
  }
  RemoveCart(){
    debugger;
    var item = this.addtocartitem;
    var vCart = localStorage.getItem("CartItem");
   let CartItem = JSON.parse(vCart);
    for (var i = CartItem.length - 1; i >= 0; i--) {
        if (CartItem[i].MenuVarianceId == item.MenuVarianceId) {
            CartItem.splice(i, 1);
        }
    }
    if(  CartItem == undefined || CartItem.length ==0){
      window.location.href="/home";
    }
    var Location = localStorage.getItem('Location');
  var res=  localStorage.getItem('ResturntId');
  
    localStorage.clear();
    
    localStorage.setItem("CartItem", JSON.stringify(CartItem));
    var vCartItems = localStorage.getItem("CartItem");
    localStorage.setItem("Location",Location);
     localStorage.setItem('ResturntId',res);
    window.location.href="/CheckOut";
  }

  PriceRemove(customise,Addon,customization){
    debugger;
    var vContain="";
    var price= customise.price;
    
        if (customise.Addon.length != 0) {
          for (var i = customise.Addon.length - 1; i >= 0; i--) {
            if (customise.Addon[i].Addon == customization) {
              debugger;
              customise.price= (  customise.price -customise.Addon[i].prize);
              this.SubTotal = this.SubTotal -  (customise.Quan* customise.Addon[i].prize);
              this.price=this.price -(customise.Quan* customise.Addon[i].prize);
              customise.Addon.splice(i, 1);
            
            }
            else {
              
            }
          }
        
        }
        var vCart = localStorage.getItem("CartItem");
        let CartItem = JSON.parse(vCart);
        if(customise.length !=0){
          for (var i = CartItem.length - 1; i >= 0; i--) {
            if (CartItem[i].MenuVarianceId == customise.MenuVarianceId) {
                CartItem.splice(i, 1);
                CartItem.push({Addon: customise.Addon,Quan:customise.Quan, MenuVarianceId:customise.MenuVarianceId, ImageUrl:customise.ImageUrl,itemName:customise.itemName,couponAmt:customise.couponAmt,couponType:customise.couponType,price:customise.price,orginalpric:customise.orginalpric,sTax:customise.sTax,hTax:customise.hTax,oTax:customise.oTax,discountQuan:customise.discountQuan});  
            }
        }
       
        }
        var Location = localStorage.getItem('Location');
        var res=  localStorage.getItem('ResturntId');
          localStorage.clear();
          
          localStorage.setItem("CartItem", JSON.stringify(CartItem));
          var vCartItems = localStorage.getItem("CartItem");
          localStorage.setItem("Location",Location);
           localStorage.setItem('ResturntId',res);
    
    //       localStorage.setItem("CartItem",customise);
   this.Addtocart=JSON.parse(localStorage.getItem('CartItem'));
    
  }

  AddressAdd(){
    var Customer =sessionStorage.getItem("CustomerId");
    var Guset =sessionStorage.getItem("GuesId");
    var value= this.http.get(environment.apiUrl + 'CheckOut/DeliveryAddress?Cus_Id='+Customer + '&Gust='+Guset).toPromise().then(
      (data:any)=> {
        debugger;
      if(data.length!=0 ){
        this.AddFirstName=data["0"].name;
        this.AddAddLine1=data["0"].addLine1;
        this.AddLine2=data["0"].addLine2;
        this.AddCity=data["0"].city;
        this.AddState=data["0"].state;
        this.AddZip=data["0"].Zip;
        this.deliveryfee();
     //   this.TipMaster = data;
     //   this.Filter=false;
       // this.FilterData=data;
      }
      else{
      };
      });
  }
  ngOnInit(): void {
    
this.FillAdd=false;
this.Deliverlo=false;
this.DeliveryStatus=true;

this.deliveryfee();
  // sessionStorage.clear();
  window.addEventListener('message', function(event) {
    debugger;
    var token = JSON.parse(event.data);
    var mytoken = document.getElementById('mytoken');
    
    ((document.getElementById('mytoken') as HTMLInputElement).value) = token.message;
    var vtoken= ((document.getElementById('mytoken') as HTMLInputElement).value);
    
    }, false);
  this._storageService.watchStorage().subscribe((data:string) => {
    debugger;

   })
   this.loadScript('https://www.google.com/recaptcha/api.js');
  this.loadScript('../../assets/js/Alert.js');
  this.Repeat();
    this.DeliveryAmt=0;
    this.Taxamt=0;
    this.TipAmt=0;
   // this.stattime = localStorage.getItem('StartTime');
  //  this.endtime = localStorage.getItem('Endtime');
    this.location= localStorage.getItem("Location");
    var count= localStorage.getItem('CartItem');
    let  myCartItem = (count);
    var res=  localStorage.getItem('ResturntId');
    var Customer =sessionStorage.getItem("CustomerId");
    var Guset =sessionStorage.getItem("GuesId");
    var value= this.http.get(environment.apiUrl + 'CheckOut/DeliveryAddress?Cus_Id='+Customer + '&Gust='+Guset).toPromise().then(
      (data:any)=> {
        debugger;
      if(data.length!=0 ){
        this.EditAddress=data;
        this.AddFirstName=data["0"].name;
        this.AddAddLine1=data["0"].addLine1;
        this.AddLine2=data["0"].addLine2;
        this.AddCity=data["0"].city;
        this.AddState=data["0"].state;
        this.AddZip=data["0"].Zip;
     //   this.TipMaster = data;
     //   this.Filter=false;
       // this.FilterData=data;
      }
      else{
      };
      });
 
    
   debugger;
   if (myCartItem === null) {
   
   } else {
     debugger;
         this.Addtocart=JSON.parse(myCartItem);
         this.price =0;
         this.Discount=0;
         this.CouponAmt=0;
         for(var i =   this.Addtocart.length - 1; i >= 0; i--){
           var test = this.Addtocart[i].couponType;
           var test1 = this.Addtocart["0"].couponAmt;
         var HTax=( (this.Addtocart[i].Quan * this.Addtocart[i].price *this.Addtocart[i].sTax/100));
         var Stax =((this.Addtocart[i].Quan * this.Addtocart[i].price *this.Addtocart[i].hTax/100));
         var otax =((this.Addtocart[i].Quan * this.Addtocart[i].price *this.Addtocart[i].oTax/100));
         this.Taxamt += HTax + Stax+otax;
         var tax =Number(this.Taxamt).toFixed(2);
         this.Taxamt=Number(tax);
      this.Discount += (this.Addtocart[i].discountQuan  <= this.Addtocart[i].Quan)? (this.Addtocart[i].couponType =="P" ? ( (this.Addtocart[i].Quan * this.Addtocart[i].price * (this.Addtocart[i].couponAmt/100))):((this.Addtocart[i].couponAmt))):0;
      this.price += (this.Discount !=0)? (this.Addtocart[i].discountQuan  <= this.Addtocart[i].Quan)?(this.Addtocart[i].couponType =="P" ? ( (this.Addtocart[i].Quan * this.Addtocart[i].price) -(this.Addtocart[i].Quan * this.Addtocart[i].price *this.Addtocart[i].couponAmt/100)):( (this.Addtocart[i].Quan * this.Addtocart[i].price )-(this.Addtocart[i].couponAmt))):this.Addtocart[i].Quan * this.Addtocart[i].price :this.Addtocart[i].Quan * this.Addtocart[i].price;
      this.SubTotal=this.price + this.DeliveryAmt + this.Taxamt;
 this.NetBalance = this.price + this.DeliveryAmt + this.Taxamt + this.TipAmt;
      }
   }
  }
  CouponAvail(){
    debugger;
var  Coupon = this.Couponcode;

if(this.Oldprice ==null){
  this.Oldprice = this.price ;
}

if(Coupon == ""){
  alert("Please Enter Coupon Code");
  return false;
}
else{
  var res=  localStorage.getItem('ResturntId');
  var value= this.http.get(environment.apiUrl + 'Checkout/CouponValidate?Restarunt='+res +'&Coupon='+this.Couponcode).toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
    //  this.ItemsArrayMenu=data;
    var re;
    if(data["0"].holiday != null){
      alert("Please Enter Valid Coupon Code");
    }
    else {
      for(var i =   this.Addtocart.length - 1; i >= 0; i--){
        for(var j= data.length-1; j >=0; j--){
          if(this.Addtocart[i].MenuVarianceId == data[j].menuVariance)
          {
             re =1;
            this.CouponAmt = (data["0"].couponType =="P" ?  (  this.price *(data["0"].couponAmt/100)) :(  ((data["0"].couponAmt))) );
            this.price = this.Oldprice -(data["0"].couponType =="P" ?  ( this.price *(data["0"].couponAmt/100)) :(  ((data["0"].couponAmt))) );
            this.SubTotal=this.price + this.DeliveryAmt + this.Taxamt;
          this.NetBalance=  this.price + this.DeliveryAmt + this.Taxamt + this.TipAmt;
          alert("Coupon Code Applied Successfully");
          }
        }
      
      
      }
      if(re != 1){
        alert("Selected Items do not have valid Coupon Code");
        return false;
      }
    }
    }
});

}
  }
  open1(content1, content) {
  //ForgotPassword Click Function
  debugger;
  if (content1 == "Forget") {
    let params = new HttpParams();
    var vEmailId = this.ForgotMailId;
    params = params.append('EmailId', vEmailId);

    var value = this.http.get(environment.apiUrl + 'customerdetails/ForgotPassword', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //this.ItemsArrayMenu=data;
          var vMsg = data;
          if (vMsg == "success") {

            this.modalService.dismissAll(content1);
            this.modalService.open(content, { windowClass: 'hwi' }).result.then((result) => {

              this.closeResult = `Closed with: ${result}`;

            }, (reason) => {

              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

            });
          }
        }
        else {
        };
      });
  }
  else {
    debugger;
    this.CaptchaSignUp();
    this.CaptchaGust();
    this.modalService.dismissAll(content1);
    this.modalService.open(content, { windowClass: 'hwi' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

    // if(content1=="SignUp")
    //{
    //  this.CaptchaSignUp();
    //}
  }

}

CarryDelivery(Type){
this.CarryDelType=Type;
this.Captchapayment();

  if(this.CarryDelType== "" || this.CarryDelType== undefined){
  
    alert("Please Select the Payment Type");
      return false; 
    }
  if(this.CarryDelType =="Cash"){
    //this.CarryPayNow();
 //   this.ButtonName="PLACE ORDER";
    this.CarrypayOnline=false;
    this.CarryPaybutton=true;
  }
  else {
    window.scroll(0,500);
   // this.ButtonName="PAY NOW";
    this.CarryPaybutton=false;
    this.CarrypayOnline=true;
  
  }
}
DeliDelivery(Type){
this.DeliverType=Type;
this.Captchapayment();
if(this.DeliverType =="" || this.DeliverType == null ){
  alert("Please Select the Payment Type");
  return false;
}
window.scroll(0,500);
this.deliveryOnlinePaybutton =false;
this.DeliveryPayOnline=true;
}
CarryPayNow1(content){
  this.Captchapayment();
  if(this.PaymentType =="CarryOut"){
    if(this.CarryDelType== "" || this.CarryDelType== undefined){
    
      alert("Please Select the Payment Type");

        return false; 
      }
    if(this.CarryDelType =="Cash"){
      this.ButtonName="PLACE ORDER";
    }
    else {
      this.CarryPaybutton=false;
      this.CarrypayOnline=true;
      // this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {
    
      //   this.closeResult = `Closed with: ${result}`;
    
      // }, (reason) => {
    
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
      // });
    }
  }
 
 
  
}

DeliveyOnline(){
  this.Captchapayment();
  if(this.DeliverType =="" || this.DeliverType == null ){
    alert("Please Select the Payment Type");
    return false;
  }
  this.deliveryOnlinePaybutton =false;
  this.DeliveryPayOnline=true;
}
CarreyOut(content){
  debugger;
  this.Alertshow = false;
  if(this.Immediate == "" || this.Immediate == undefined){
    this.Alertshow = true;
   this.AlertMsg="Please Choose Type"; 
  return false;
  }

  if(this.Immediate =="Later"){
if(this.SelectTime == null || this.SelectTime == undefined){
  this.Alertshow = true;
  this.AlertMsg="Please Choose Time";
  return false; 
}
  }
  var end =( localStorage.getItem('Endtime')); 
  var star= this.stattime.split(":");
var timeend = star["1"].split(" ");
  var sta =new Date();
  var Diiff = sta.getHours() ;
  var Diiff1 = sta.getHours() ;
  if(Diiff >12){
    Diiff = Diiff -12;

  }
  var min = sta.getMinutes();
  var enddate = end.split(':');
  var tw4hour =  Number(enddate["0"] );
  var tw4Min1 =  (enddate["1"].split(' ') );
  var tw4Min= Number(tw4Min1["0"]);
var hourdiff = tw4hour- Diiff;
var staringdiff = parseInt( star["0"]) - Diiff;


if(Diiff1 <12){
  if(staringdiff >0)
  {
    alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
  //  alert("Please place the order during Restaurant Timing"); 
    return false;
  }
}

if(Diiff1 < 12){
  if(  staringdiff == -1 ||  staringdiff == -2 ||  staringdiff == -3||staringdiff == 0 || staringdiff ==1 || staringdiff ==2 || staringdiff ==3){
   
  }
  else{
    if(hourdiff >= 1){
      if(hourdiff ==1 ){
        if(tw4Min ==0){
          var selectMindiff= 60 -min;
        }
        else{
          var selectMindiff= tw4Min -selectMin;
        }
      

      if( selectMindiff >= 30){
      
      }
      else{
        alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
      //alert("Please place the order during Restaurant Timing"); 
      return false;
      }
      
      }
      else if( Diiff > tw4hour) {
        alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
       // alert("Please place the order during Restaurant Timing"); 
        return false;
      }
        }
        else{
          alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
         // alert("Please place the order during Restaurant Timing");
          return false;
        }
  }
 
}
 

  if(this.SelectTime !=null){
    var SelectTime = String(this.SelectTime).split(":");
    var selectHours =  Number(SelectTime["0"]);
    var selectMin1 =  (SelectTime["1"].split(" "));
    var selectMin = Number(selectMin1["0"]);
    var selecthourdiff = tw4hour - selectHours;
    if(selecthourdiff >= 1){
      if(selecthourdiff ==1 ){
      //  var mindiff = min -selectMin;
        if(tw4Min ==0){
          var selectMindiff= 60 -selectMin;
        }
        else{
          var selectMindiff= min -selectMin;
        }

if( selectMindiff >= 30){

}
else{
  alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
//  alert("Please place the order during Restaurant Timing"); 
  return false;
}

      }
      // else if( Diiff > selectHours) {
      //   alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
      //   //alert("Please place the order during Restaurant Timing"); 
      //   return false;
      // }
    }
    else{
      alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
     // alert("Please place the order during Restaurant Time");
      return false;
    }
  }
if($('#ritema6').is(':checked') == false){
  this.Alertshow = true;
 // alert("Order(s) can be placed during Restaurant Hours only.Today Restaurant hours is "+this.stattime+" to "+end+""); 
  alert("Please Accept Terms and Conditions");
  return false; 
}
this.Carryoutpaytype=true;
window.scroll(0,300);
  // this.modalService.open(content).result.then((result) => {

  //   this.closeResult = `Closed with: ${result}`;

  // }, (reason) => {

  //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  // });
}
PayNow(){
  debugger;
  if(this.DeliveryAddress_Id ==0 || this.DeliveryAddress_Id ==undefined || this.DeliveryAddress_Id ==null){
alert("Please select an existing shipping address or add a new one.");
return;
  }
  this.DeliverType ="Cash";
// if(this.payCaptha1 != this.payCaptha4){
//   alert("Please Enter Valid Captcha");
//     return false;
// }
//   if(this.DeliverType =="" || this.DeliverType == null ){
//     alert("Please Select the Payment Type");
//     return false;
//   }
  if(this.DeliverType =="Cash" ){

  
  debugger;
  var Customer= sessionStorage.getItem('CustomerId');
  var Res= localStorage.getItem('ResturntId');
  var netamt=Number(this.NetBalance).toFixed(2);
  var tax =Number(this.Taxamt).toFixed(2);
  var Discount = Number(this.Discount).toFixed(2);
  var tips =Number(this.TipAmt).toFixed(2);
  var Coupon = Number(this.CouponAmt).toFixed(2);
  var Delivery= Number(this.DeliveryAmt).toFixed(2);
  var Guset =sessionStorage.getItem("GuesId") =="undefiend"?"":sessionStorage.getItem("GuesId");
  this.modalService.dismissAll("Payout");
  this.Immediate ="Cash";
 // var value= this.http.get(environment.apiUrl + 'Checkout/PayoutDelivery?Cus_Id='+ Customer+'&Discount='+Discount+'&Res_Id='+Res +'&OrderAmount='+netamt+'&tax='+tax+'&tips='+tips+'&Couponamt='+Coupon + '&DeliveryAmt=' + Delivery +'&DeliverAddress='+this.DeliveryAddress_Id  +'&Gust_Id='+Guset ).toPromise().then(
   // (data:any)=> {
   if(this.Immediate  != "Later"){
   var recent= new Date();
   
   }
    var value= this.http.get(environment.apiUrl + 'Checkout/PayoutDeliveryType?Cus_Id='+ Customer+'&Discount='+Discount+'&Res_Id='+Res +'&OrderAmount='+netamt+'&tax='+tax+'&tips='+tips+'&Couponamt='+Coupon + '&DeliveryAmt=' + Delivery +'&DeliverAddress='+this.DeliveryAddress_Id  +'&Gust_Id='+Guset +'&Payment=Cash&OrderTime='+this.DeliveryTime +'&PayType='+this.Immediate +'&OrderReceived=Web' ).toPromise().then(
      (data:any)=> {
   debugger;

   if(data.length !=0 ){
var Order =data["0"].orderId;
this.Addtocart=JSON.parse(localStorage.getItem('CartItem' ));
for (let i =1; i <= (this.Addtocart.length);i++)
{
  var Addonlis="";
  var j = i-1;
  var Addonleng= this.Addtocart[j].Addon;
  var Addonleng1= this.Addtocart[j].Addon.length;
  if(this.Addtocart[j].Addon != undefined && this.Addtocart[j].Addon.length !=0){
for(let k=0;k< this.Addtocart[j].Addon.length;k++ ){
  if(Addonlis ==""){
    Addonlis=this.Addtocart[j].Addon[k].Addon +","+ this.Addtocart[j].Addon[k].prize;
  }
  else{
    Addonlis=Addonlis + "|"+this.Addtocart[j].Addon[k].Addon +","+ this.Addtocart[j].Addon[k].prize;
  }
}
  }
  if(this.Addtocart[j].Addon1 != undefined)
  {
    if(Addonlis ==""){
      Addonlis=this.Addtocart[j].Addon1;
    }
    else{
      Addonlis=Addonlis + ","+this.Addtocart[j].Addon1 ;
    }
  }

  var value= this.http.get(environment.apiUrl + 'Checkout/PayoutMenuItem?OrderId='+ Order+'&MenuVariance='+this.Addtocart[j].MenuVarianceId+'&Qty='+this.Addtocart[j].Quan +'&SplItem='+Addonlis+'&Price='+this.Addtocart[j].price+'&DiscountPerc='+this.Addtocart[j].couponAmt ).toPromise().then(
    (data:any)=> {
      if(this.Addtocart.length == i){
        alert("Order is placed Suceessfully.Your Order details is sent to your email address and mobile");
        var resid=  localStorage.getItem('ResturntId');
        localStorage.clear();
     localStorage.setItem('ResturntId',resid);
     window.location.href="";
        var value= this.http.get(environment.apiUrl + 'Checkout/OrderConfirmMail?OrderId='+ Order +'&Type=Delivery&Payment=Cash' ).toPromise().then(
          (data:any)=> {
      
           
         debugger;
          }); 
      }
      
   debugger;
    });

}


   }
   else{
     alert("Order Failed");
   }

	});

  }
 else{
  var test =((document.getElementById('mytoken') as HTMLInputElement).value);
  if(test == undefined || test== null || test==""){
    alert("Please Fill Valid card details");
    return false;
  }
  
    debugger;
    var Customer= sessionStorage.getItem('CustomerId');
    var Res= localStorage.getItem('ResturntId');
    var netamt=Number(this.NetBalance).toFixed(2);
    var tax =Number(this.Taxamt).toFixed(2);
    var Discount = Number(this.Discount).toFixed(2);
    var tips =Number(this.TipAmt).toFixed(2);
    var Coupon = Number(this.CouponAmt).toFixed(2);
    var Delivery= Number(this.DeliveryAmt).toFixed(2);
    var Guset =sessionStorage.getItem("GuesId");
    this.modalService.dismissAll("Payout");
    // var value= this.http.get(environment.apiUrl + 'customerdetails/FirstDataGateway?sAmount='+netamt  + '&sTokens='+test ).toPromise().then(
    //  (data:any)=> {
     if(this.Immediate  != "Later"){
     var recent= new Date();
     
     }
      var value= this.http.get(environment.apiUrl + 'Checkout/PayoutDeliverypay?Cus_Id='+ Customer+'&Discount='+Discount+'&Res_Id='+Res +'&OrderAmount='+netamt+'&tax='+tax+'&tips='+tips+'&Couponamt='+Coupon + '&DeliveryAmt=' + Delivery +'&DeliverAddress='+this.DeliveryAddress_Id  +'&Gust_Id='+Guset +'&Payment=Online&OrderTime='+this.DeliveryTime +'&PayType='+this.Immediate +'&OrderReceived=Web&sTokens='+test ).toPromise().then(
        (data:any)=> {
     debugger;
     if(data ==1){
      this.Captchapayment();
      this.payCaptha2="";
      this.payCaptha4="";
      alert("Payment Failure, please try again");
      return;
    }
     if(data.length !=0 ){
  var Order =data;
  this.Addtocart=JSON.parse(localStorage.getItem('CartItem' ));
  for (let i =1; i <= (this.Addtocart.length);i++)
  {
    var Addonlis="";
    var j = i-1;
    var Addonleng= this.Addtocart[j].Addon;
    var Addonleng1= this.Addtocart[j].Addon.length;
    if(this.Addtocart[j].Addon != undefined && this.Addtocart[j].Addon.length !=0){
  for(let k=0;k< this.Addtocart[j].Addon.length;k++ ){
    if(Addonlis ==""){
      Addonlis=this.Addtocart[j].Addon[k].Addon +","+ this.Addtocart[j].Addon[k].prize;
    }
    else{
      Addonlis=Addonlis + "|"+this.Addtocart[j].Addon[k].Addon +","+ this.Addtocart[j].Addon[k].prize;
    }
  }
    }
    if(this.Addtocart[j].Addon1 != undefined)
    {
      if(Addonlis ==""){
        Addonlis=this.Addtocart[j].Addon1;
      }
      else{
        Addonlis=Addonlis + ","+this.Addtocart[j].Addon1 ;
      }
    }
    var value= this.http.get(environment.apiUrl + 'Checkout/PayoutMenuItem?OrderId='+ Order+'&MenuVariance='+this.Addtocart[j].MenuVarianceId+'&Qty='+this.Addtocart[j].Quan +'&SplItem='+Addonlis+'&Price='+this.Addtocart[j].price+'&DiscountPerc='+this.Addtocart[j].couponAmt ).toPromise().then(
      (data:any)=> {
        if(this.Addtocart.length == i){
          alert("Order is placed Suceessfully.Your Order details is sent to your email address and mobile");
          var resid=  localStorage.getItem('ResturntId');
          localStorage.clear();
       localStorage.setItem('ResturntId',resid);
          var value= this.http.get(environment.apiUrl + 'Checkout/OrderConfirmMail?OrderId='+ Order +'&Type=Delivery&Payment=Online' ).toPromise().then(
            (data:any)=> {
        
              window.location.href="";
           debugger;
            }); 
        }
        
     debugger;
      });
  
  }
  
  
     }
     else{
       alert("Order Failed");
     }
  
    });
    //  }).catch((data: any) => {
    //    alert("Payment Failure Please try again");
    //    });
    }
 
}

AddressClick(){
  alert("Address Add Successfully");
}
Checkadd(content){
 var lenth= this.EditAddress.length;
 if(lenth == 0){
   alert("Please Enter Address Details");
   return false;
 }
 var end =( localStorage.getItem('Endtime')); 

  var sta =new Date();

  var Diiff = sta.getHours();
var min = sta.getMinutes();
  var enddate = end.split(':');
var tw4hour =  Number(enddate["0"] ) +12;
var tw4 =tw4hour -Diiff;

var hourdiff = tw4 - Diiff;
if(tw4 >= 1)
{
  if(tw4 == 1){
    var demofile1 =enddate["1"].split(" ");
    var mindi = min - Number(demofile1["0"]);
if(Number(mindi) > 30){
  alert("Please Order Before 30 mins")
}
  }
 
}
  this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {
  
    this.closeResult = `Closed with: ${result}`;

  }, (reason) => {

    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  });
}
open3(content,item ) {
  debugger;
  this.Custdelivery=item;

  var value= this.http.get(environment.apiUrl + 'Myorder/EditAddressDelivery?Cus_Id='+this.Custdelivery).toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
      this.Name=data["0"].name;
      this.AddAddLine1=data["0"].addLine1;
      this.AddLine2=data["0"].addLine2;
      this.AddCity=data["0"].city;
      this.AddState=data["0"].state;
      this.AddZip=data["0"].zip;
   //   this.TipMaster = data;
   //   this.Filter=false;
     // this.FilterData=data;
    }
    else{
    };
    });

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
        this.closeResult = `Closed with: ${result}`;
  
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
      });
  
    }
  
open2(content1, content) {
      debugger;
  
      this.modalService.dismissAll(content1);
      this.modalService.open(content).result.then((result) => {
  
        this.closeResult = `Closed with: ${result}`;
  
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
      });
    }

loginClick() {
      debugger;
      this.isShownErrorLogin = true;
      this.isShownSuccessLogin = true;
      this.LoginErrorMsg = "";
      this.LoginSuccessMsg = "";
  
      var vCaptcha = localStorage.getItem('sumLoginCaptha');
      var vId = this.UserId;
      var vPass = this.Password;
      var vCapt = this.LoginCaptha;
      var vCapt1 = this.LoginCaptha1;
      if (vId == undefined || vId == "") {
        this.isShownErrorLogin = false;
        this.LoginErrorMsg = "Please Enter Your EmailId/PhoneNo.";
        return false;
      }
      if (vPass == undefined || vPass == "") {
        this.isShownErrorLogin = false;
        this.LoginErrorMsg = "Please Enter Your Password.";
        return false;
      }
      if (vCapt1 == undefined || vCapt1 == "") {
        this.isShownErrorLogin = false;
        this.LoginErrorMsg = "Please Enter The Valid Captcha.";
        return false;
      }
  
      let params = new HttpParams();
      params = params.append('userId', vId);
      params = params.append('password', vPass);
  
      var value = this.http.get(environment.apiUrl + 'customerdetails/GETLoginDetails', { params: params }).toPromise().then(
        (data: any) => {
          debugger;
          if (data.length != 0) {
            //this.ItemsArrayMenu=data;
            var vData = data;
            var vCustomerDetails_ID = vData["0"].customerDetails_ID;
            var vCustomerName = vData["0"].customerName;
  
            var vLogIn = document.getElementById("divLogin");
            var vLoged = document.getElementById("divLoged");
            if (vCustomerDetails_ID != undefined && vCustomerDetails_ID != '') {
              this.UserId = "";
              this.Password = "";
              this.LoginCaptha = "";
              this.LoginCaptha1 = "";
              localStorage.setItem('CustomerNam', vCustomerName);
              localStorage.setItem('CustomerId', vCustomerDetails_ID);
             
              vLogIn.style.display = 'none';
              vLoged.style.display = 'block';
             
              this.CustomerNam = vCustomerName;
              sessionStorage.setItem('CustomerId',vCustomerDetails_ID);
              sessionStorage.setItem('CustomerNam',vCustomerName);
              this.modalService.dismissAll("Login");
              //window.location.href = '/Search';
if(this.PaymentType =="CarryOut"){
  this.Deliver =false;
  this.DeliverAdd=false;
  this.FillAdd=true;
  this.Deliverlo=false;
  this.DeliveryStatus=false;
}
else if(this.PaymentType =="Delivery") {
  this.Deliver =false;
  //this.DeliverAdd=true;
  this.FillAdd=false;
  this.Deliverlo=false;
  this.DeliveryStatus=true;
  
  this.deliveryfee();
}
this._storageService.setItem('CustomerId',vCustomerDetails_ID);
            }
            else {
              vLogIn.style.display = 'block';
              vLoged.style.display = 'none';
              this.isShownErrorLogin = false;
              this.LoginErrorMsg = "Login Failed, Please Enter The Correct Details.";
              return false;
            }
  
          }
          else {
            var vLogIn = document.getElementById("divLogin");
            var vLoged = document.getElementById("divLoged"); 
            vLogIn.style.display = 'block';
            vLoged.style.display = 'none';
            this.isShownErrorLogin = false;
            this.LoginErrorMsg = "Incorrect UserId or Password, Login Failed.";
            return false;
          };
        });
  
    }
  
RemoveOpen(content, item:any){
    this.addtocartitem=item;
    this.modalService.open(content,{ windowClass: 'custom-class'} ).result.then((result) => {
  
      this.closeResult = `Closed with: ${result}`;
  
    }, (reason) => {
  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
    });
   }
open(content) {
      debugger;
      this.UserId = "";
      this.Password = "";
      this.LoginCaptha = "";
      this.LoginCaptha1 = "";
  this.CaptchaSignUp();
  this.CaptchaGust();
      this.Captcha();
      this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {
  
        this.closeResult = `Closed with: ${result}`;
  
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
      });
    }
confirm() {
  
    }
private getDismissReason(reason: any): string {
  
      if (reason === ModalDismissReasons.ESC) {
  
        return 'by pressing ESC';
  
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
        return 'by clicking on a backdrop';
  
      } else {
  
        return `with: ${reason}`;
  
      }
  
    }
VerificationSubmit() {

      //VerificationCode Click Function
      this.isShownErrorVerCode = true;
      this.isShownSuccessVerCode = true;
      this.VerificationErrorMsg = "";
      this.VerificationSuccessMsg = "";
  
      debugger;
      let params = new HttpParams();
      var vVerificationCode = this.VerificationCode;
      var cEmailId = this.ForgotMailId;
      if (vVerificationCode == "") {
        this.isShownErrorVerCode = false;
        this.VerificationErrorMsg = "Please Enter The Verification Code.";
        return false;
      }
      params = params.append('EmailId', cEmailId);
      params = params.append('Code', vVerificationCode);
  
      var value = this.http.get(environment.apiUrl + 'customerdetails/verificationcodeSubmit', { params: params }).toPromise().then(
        (data: any) => {
          debugger;
          // if (data.length != 0) {
          //   //this.ItemsArrayMenu=data;
          //   var vMsg = data;
          //   if (vMsg == "success") {
          //     this.isShownSuccessVerCode = true;
          //     this.VerificationErrorMsg = "Password sent to your Email, Please check your Mail.";
          //   }
          // }
          // else {
          // };
        }).catch((data: any) => {
          debugger;
  
  
          var vDataError = JSON.stringify(data.error.text);
          var vErrorMsg = vDataError.replace('"', '');
          var vErrorMsg1 = vErrorMsg.replace('"', '');
          if (vErrorMsg1 == "success") {
            this.isShownSuccessVerCode = false;
            this.VerificationSuccessMsg = "New Password send to your Email, Please check your Mail.";
            this.VerificationCode = "";
            this.ForgotMailId = "";
            setTimeout(() => {
              this.modalService.dismissAll("Submit");
            }, 2000);
          }
  
          else {
            this.isShownErrorVerCode = false;
            this.VerificationErrorMsg = "EmailId/MobileNumber Not Registered";
          }
        });;
  
  
    }
  
    SignUpClick() {
      var vFirstName = this.SignUpFirstName;
      var vLstName = this.SignUpLastName;
      var vEmailId = this.SignUpEmail;
      var vMobileNo = this.SignUpMobile;
      var vPassword = this.SignUpPassword;
      var vConPass = this.SignUpConfirmPass;
      var vSignUpCaptha = this.SignUpCaptha;
      var vSignUpCaptha1 = this.SignUpCaptha1;
      var vCaptchaSU = localStorage.getItem('sumSignUpCaptha');
      debugger;
      this.isShownErrorSignUp = true;
      this.isShownSuccessSignUp = true;
      this.SignUpErrorMsg = "";
      this.SignUpSuccessMsg = "";
  
      if (vFirstName == undefined || vFirstName == "") {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please Enter Your FirstName.";
        return false;
      }
      if (vLstName == undefined || vLstName == "") {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please Enter Your LastName.";
        return false;
      }
      if (vMobileNo == undefined || vMobileNo == "") {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please Enter Your MobileNo.";
        return false;
      }
      ////var regMobile = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;
  
      if (regMobile.test(vMobileNo) == false) {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please Enter The Valid MobileNo. Format Should like (123)456-7890";
        return false;
      }
  
      if (vEmailId != undefined && vEmailId != "") {
        //<--Email Validation-->
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  
        if (regEmail.test(vEmailId) == false) {
          this.isShownErrorSignUp = false;
          this.SignUpErrorMsg = 'EmailID is not valid';
          return false;
  
        }
      }
      if (vPassword == undefined || vPassword == "") {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please Enter The Password.";
        return false;
      }
  
      var vPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,20}$/;
      //var checkPattern=vPasswordPattern.test(vPassword);
      if (vPasswordPattern.test(vPassword) == false) {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Password should have, Min 8 charecter, Atleast One UpperCase, Lowercase, Number & Specia lCharecter";
        return false;
  
      }
      if (vConPass == undefined || vConPass == "") {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please Enter The Confirm Password.";
        return false;
      }
      if (vPassword != vConPass) {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Password and Confirm Password Should be Same.";
        return false;
      }
      if (vSignUpCaptha1 == undefined || vSignUpCaptha1 == "") {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please enter the Captcha Calculated value";
        return false;
      }
      if (vSignUpCaptha1 != vCaptchaSU) {
        this.isShownErrorSignUp = false;
        this.SignUpErrorMsg = "Please enter the Valid Captcha.";
        return false;
      }
      let params = new HttpParams();
      params = params.append('FirstName', vFirstName);
      params = params.append('LastName', vLstName);
      params = params.append('EmailId', vEmailId);
      params = params.append('MobileNo', vMobileNo);
      params = params.append('Password', vPassword);
      var value = this.http.get(environment.apiUrl + 'customerdetails/SignUp', { params: params }).toPromise().then(
        (data: any) => {
          debugger;
  
          //this.ItemsArrayMenu=data;
          // var vData = data.Text;
          // if (vData == "Success") {
          //   this.isShownSuccessSignUp = false;
          //   this.SignUpSuccessMsg = "SignUp Successfully.";
          // }
          // else if (vData == "AlreadyExist") {
          //   this.isShownErrorSignUp = false;
          //   this.SignUpErrorMsg = "Your Mobile Nubmer Already Registered. Please Signin or signup with different Mobile Number.";
          // }
          // else {
          //   this.isShownErrorSignUp = false;
          //   this.SignUpErrorMsg = "SignUp Failed Please Try Again.";
          // }
        }).catch((data: any) => {
          debugger;
          var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        if (vErrorMsg1 == "Success") {
          this.SignUpFirstName = "";
          this.SignUpLastName = "";
          this.SignUpEmail = "";
          this.SignUpMobile = "";
          this.SignUpPassword = "";
          this.SignUpConfirmPass = "";
          this.SignUpCaptha = "";
          this.SignUpCaptha1 = "";
          this.isShownSuccessSignUp = false;
          this.SignUpSuccessMsg = "SignUp Successfully, Please check your mail to Activate your Account.";
          setTimeout(() => {
            this.modalService.dismissAll("Login");
          }, 2000);
        }
        else if (vErrorMsg1 == "AlreadyExist") {
          this.isShownErrorSignUp = false;
          this.SignUpErrorMsg = "Your Mobile Nubmer Already Registered. Please Signin or signup with different Mobile Number.";
        }
        else {
          this.isShownErrorSignUp = false;
          this.SignUpErrorMsg = "SignUp Failed Please Try Again.";
        }
      });

    }
  
    GustClick() {
      var vFirstName = this.GustFirstName;
      var vLstName = this.GustLastName;
      var vEmailId = this.GustEmail;
      var vMobileNo = this.GustMobile;
  
      var vGustCaptha = this.GustCaptha;
      var vGustCaptha1 = this.GustCaptha1;
      var vCaptchaGT = localStorage.getItem('sumGustCaptha');
      debugger;
      this.isShownErrorGuest = true;
      this.isShownSuccessGuest = true;
      this.GuestErrorMsg = "";
      this.GuestSuccessMsg = "";
  
      if (vFirstName == undefined || vFirstName == "") {
        this.isShownErrorGuest = false;
        this.GuestErrorMsg = "Please Enter Your FirstName.";
        return false;
      }
      if (vLstName == undefined || vLstName == "") {
        this.isShownErrorGuest = false;
        this.GuestErrorMsg = "Please Enter Your LastName.";
        return false;
      }
      if (vMobileNo == undefined || vMobileNo == "") {
        this.isShownErrorGuest = false;
        this.GuestErrorMsg = "Please Enter Your MobileNo.";
        return false;
      }
      //var regMobile = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;
      if (regMobile.test(vMobileNo) == false) {
        this.isShownErrorGuest = false;
        this.SignUpErrorMsg = "Please Enter The Valid MobileNo. Format Should like (123)456-7890";
        return false;
      }
  
      if (vEmailId != undefined && vEmailId != "") {
        //<--Email Validation-->
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  
        if (regEmail.test(vEmailId) == false) {
          this.isShownErrorGuest = false;
          this.GuestErrorMsg = 'EmailID is not valid';
          return false;
  
        }
      }
  
      if (vGustCaptha1 == undefined || vGustCaptha1 == "") {
        this.isShownErrorGuest = false;
        this.GuestErrorMsg = "Please enter the Captcha Calculated value";
        return false;
      }
      if (vGustCaptha1 != vCaptchaGT) {
        this.isShownErrorGuest = false;
        this.GuestErrorMsg = "Please enter the Valid Captcha.";
        return false;
      }
      let params = new HttpParams();
      params = params.append('FirstName', vFirstName);
      params = params.append('LastName', vLstName);
      params = params.append('EmailId', vEmailId);
      params = params.append('MobileNo', vMobileNo);
      var value = this.http.get(environment.apiUrl + 'customerdetails/SignUpGust', { params: params }).toPromise().then(
        (data: any) => {
          debugger;
        
          debugger;
          //  var vDataError = JSON.stringify(data.error.text);
            //var vErrorMsg = vDataError.replace('"', '');
           // var vErrorMsg1 = vErrorMsg.replace('"', '');
            if (data != null) {
              var vName=this.GustFirstName+" "+this.GustLastName;
              this.GustFirstName = "";
              this.GustLastName = "";
              this.GustEmail = "";
              this.GustMobile = "";
              this.GustCaptha = "";
              this.GustCaptha1 = "";
              this.isShownSuccessGuest = false;
            //  this.GuestSuccessMsg = "Guest SignUp Successfully.";
              localStorage.setItem('CustomerType', "Gust");
              var vLogIn = document.getElementById("divLogin");
              var vLoged = document.getElementById("divLoged"); 
            
              sessionStorage.setItem('GuesId', data["0"].customerDetails_ID);
              sessionStorage.setItem('CustomerType', "Gust")
              vLogIn.style.display = 'none';
                vLoged.style.display = 'block';
            //    localStorage.setItem('CustomerNam', vName);
            //    sessionStorage.setItem('CustomerNam',vName);

             //   this._storageService.setItem('CustomerNam',vName);
                if(this.PaymentType =="CarryOut"){
                  this.Deliver =false;
                  this.DeliverAdd=false;
                  this.FillAdd=true;
                  this.Deliverlo=false;
                  this.DeliveryStatus=false;
                }
                else if(this.PaymentType =="Delivery") {
                  this.Deliver =false;
                  //this.DeliverAdd=true;
                  this.FillAdd=false;
                  this.Deliverlo=false;
                  this.DeliveryStatus=true;
                  
                  this.deliveryfee();
                }
                localStorage.setItem('CustomerId', data["0"].customerDetails_ID);         
                setTimeout(() => {
                  this.modalService.dismissAll("Login");
                }, 2000);
            }
            else {
              this.isShownErrorGuest = false;
              this.GuestErrorMsg = "Guest SignUp Failed Please Try Again.";
            }
    
            // if (data.length != 0) {
            //   //this.ItemsArrayMenu=data;
            //   var vData = data;
            //   if (vData == "Success") {
            //     this.isShownSuccessGuest = false;
            //     this.GuestSuccessMsg = "Gust SignUp Successfully.";
            //   }
            //   else {
            //     this.isShownErrorGuest = false;
            //     this.GuestErrorMsg = "Gust SignUp Failed Please Try Again.";
            //   }
    
            // }
            // else {
            // };
          }).catch((data: any) => {
            
          });
    }
  
    Captcha() {
      debugger;
      var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','3','4','5','6','7','8','9');
      var i;
      for (i = 0; i < 5; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code1 = a + '' + b + '' + c+''+d+''+e;
      //var c='+';
      // var alpha1 = new Array('+', '-')
      // for (i = 0; i < 1; i++) {
      //   var c = alpha1[Math.floor(Math.random() * alpha1.length)];
  
      // }
      //var code = '    ' + a + ' ' + c + ' ' + b;
      
      //document.getElementById("mainCaptcha").value = code
      //document.getElementById("mainCaptcha1").value = code1
      this.LoginCaptha = code1;
      this.LoginCaptha1 = "";
      var sum;
      //sum = parseFloat(a) + parseFloat(b);
      localStorage.setItem('sumLoginCaptha', code1);
      // var sum;
      // if (c == "+") {
      //   sum = parseFloat(a) + parseFloat(b);
      //   localStorage.setItem('sumLoginCaptha', sum);
      // }
      // else {
      //   sum = parseFloat(a) - parseFloat(b);
      //   localStorage.setItem('sumLoginCaptha', sum);
      // }
  
    }
  
    CaptchaSignUp() {
      debugger;
      var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','3','4','5','6','7','8','9');
      var i;
      for (i = 0; i < 5; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code1 = a + '' + b + '' + c+''+d+''+e;
      //var code1 = a + ' ' + c + ' ' + b;
      this.SignUpCaptha = code1;
      this.SignUpCaptha1 = "";
      //var sum;
      //sum = parseFloat(a) + parseFloat(b);
      localStorage.setItem('sumSignUpCaptha', code1);
      // var sum;
      // if (c == "+") {
      //   sum = parseFloat(a) + parseFloat(b);
      //   localStorage.setItem('sumSignUpCaptha', sum);
      // }
      // else {
      //   sum = parseFloat(a) - parseFloat(b);
      //   localStorage.setItem('sumSignUpCaptha', sum);
      // }
  
    }
  
    CaptchaGust() {
      debugger;
      var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','3','4','5','6','7','8','9');
      var i;
      for (i = 0; i < 5; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code1 = a + '' + b + '' + c+''+d+''+e;
      this.GustCaptha = code1;
      this.GustCaptha1 = "";
      // var sum;
      // sum = parseFloat(a) + parseFloat(b);
      localStorage.setItem('sumGustCaptha', code1);
      // var sum;
      // if (c == "+") {
      //   sum = parseFloat(a) + parseFloat(b);
      //   localStorage.setItem('sumGustCaptha', sum);
      // }
      // else {
      //   sum = parseFloat(a) - parseFloat(b);
      //   localStorage.setItem('sumGustCaptha', sum);
      // }
  
    }
  
    CaptchaForgot() {
      debugger;
      var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','3','4','5','6','7','8','9');
      var i;
      for (i = 0; i < 5; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code1 = a + '' + b + '' + c+''+d+''+e;
      this.ForgotCaptha = code1;
      this.ForgotCaptha1 = "";
      // var sum;
      // sum = parseFloat(a) + parseFloat(b);
      localStorage.setItem('sumForgotCaptha', code1);
      // var sum;
      // if (c == "+") {
      //   sum = parseFloat(a) + parseFloat(b);
      //   localStorage.setItem('sumForgotCaptha', sum);
      // }
      // else {
      //   sum = parseFloat(a) - parseFloat(b);
      //   localStorage.setItem('sumForgotCaptha', sum);
      // }
  
    }
    Captchapayment() {
      var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','3','4','5','6','7','8','9');
      var i;
      for (i = 0; i < 5; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var code1 = a + '' + b + '' + c+''+d+''+e;
      // var alpha1 = new Array('+', '-')
      // for (i = 0; i < 1; i++) {
      //   var c = alpha1[Math.floor(Math.random() * alpha1.length)];
  
      // }
      //document.getElementById("mainCaptcha").value = code
      //document.getElementById("mainCaptcha1").value = code1
      this.payCaptha = code1;
      this.LoginCaptha1 = "";
      var sum;
     // sum = parseFloat(a) + parseFloat(b);
      this.payCaptha1 = code1;
     // localStorage.setItem('sumLoginCaptha', sum);
      // var sum;
      // if (c == "+") {
      //   sum = parseFloat(a) + parseFloat(b);
      //   localStorage.setItem('sumLoginCaptha', sum);
      // }
      // else {
      //   sum = parseFloat(a) - parseFloat(b);
      //   localStorage.setItem('sumLoginCaptha', sum);
      // }
  
    }
  
    //signInWithGoogle() {
    //  let socialPlatformProvider;  
    //  //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //  socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    //  this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
    //    console.log("google", socialusers);  
    //    console.log(socialusers);  
    //    debugger;
    //    this.Savesresponse(socialusers);  
    //  });  
    //}
    // Savesresponse(socialusers: Socialusers) {  
    //  this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {  
    //    debugger;  
    //    console.log(res);  
    //    this.socialusers=res;  
    //    //this.response = res.userDetail;  
    //    localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
    //    console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
    //   //this.router.navigate([`/Dashboard`]);  
    //  })  
    //}
  
    public socialSignIn(socialPlatform: string):void {
      debugger;
      let socialPlatformProvider;
      if (socialPlatform == "facebook") {
  
    
        socialPlatformProvider =Promise.resolve(FacebookLoginProvider.PROVIDER_ID);
  this.authService.signIn(socialPlatform)
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
       .then(socialusers => {     
           console.log(socialusers);
           let params = new HttpParams();
  var test =  socialusers.firstName;
  params = params.append('FirstName', socialusers.firstName);
  params = params.append('LastName', socialusers.lastName);
  params = params.append('EmailId', socialusers.email);
  params = params.append('Photo', socialusers.photoUrl);
  var value = this.http.get(environment.apiUrl + 'customerdetails/SignUpGoogle', { params: params }).toPromise().then(
    (data: any) => {
      debugger;
      if(data.length != 0){
        var vLogIn = document.getElementById("divLogin");
        var vLoged = document.getElementById("divLoged");
        localStorage.setItem('CustomerId', data[0].customerDetails_ID);
  var vCustomerName = data[0].customerName;
  var vCustomerDetails_ID =data[0].customerDetails_ID;
        vLogIn.style.display = 'none';
        vLoged.style.display = 'block';
        localStorage.setItem('CustomerName', vCustomerName);
        this.CustomerNam = vCustomerName;
        sessionStorage.setItem('CustomerId',vCustomerDetails_ID);
        sessionStorage.setItem('CustomerNam',vCustomerName);
        this.modalService.dismissAll("Login");
      }
  
    }).catch((data: any) => {
      
    });
  
        });
  
      } else if (socialPlatform == "google") {
        debugger;
        socialPlatform=GoogleLoginProvider.PROVIDER_ID
        this.authService.signIn(socialPlatform).then((response) =>{
  debugger;
  console.log(response);
  let params = new HttpParams();
  var test =  response.firstName;
  params = params.append('FirstName', response.firstName);
  params = params.append('LastName', response.lastName);
  params = params.append('EmailId', response.email);
  params = params.append('Photo', response.photoUrl);
  var value = this.http.get(environment.apiUrl + 'customerdetails/SignUpGoogle', { params: params }).toPromise().then(
    (data: any) => {
      debugger;
      if(data.length != 0){
        var vLogIn = document.getElementById("divLogin");
        var vLoged = document.getElementById("divLoged");
        localStorage.setItem('CustomerId', data[0].customerDetails_ID);
  var vCustomerName = data[0].customerName;
  var vCustomerDetails_ID =data[0].customerDetails_ID;
        vLogIn.style.display = 'none';
        vLoged.style.display = 'block';
        localStorage.setItem('CustomerName', vCustomerName);
        this.CustomerNam = vCustomerName;
        sessionStorage.setItem('CustomerId',vCustomerDetails_ID);
        sessionStorage.setItem('CustomerNam',vCustomerName);
        this.modalService.dismissAll("Login");
      }
  
    }).catch((data: any) => {
      
    });
  
        });
       // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
       // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
        //  console.log(socialusers);
        //});
        // this.authService.authState.subscribe((user) => {
        //   this.user = user;
        //   this.loggedIn = (user != null);
        // });
      } else if (socialPlatform == "linkedin") {
        //socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
      }
  
      //this.socialAuthService.signIn(socialPlatformProvider).then(
      //  (userData) => {
      //    console.log(socialPlatform+" sign in data : " , userData);
      // Now sign-in with userData
      // ...
  
      //  }
      //);
    }  

Repeat(){
  var CustomarId= sessionStorage.getItem('CustomerId');
  var Guset =sessionStorage.getItem("GuesId");
  var value=this.http.get(environment.apiUrl +'Checkout/DeliveryAddress?Cus_Id='+CustomarId + '&Gust='+Guset).toPromise().then((data:any)=>{
    debugger;
    if(data.length !=0){
      this.EditAddress=data;
     
    }
   // this.check();
        });
}
Repeat1(){
  var CustomarId= sessionStorage.getItem('CustomerId');
  var Guset =sessionStorage.getItem("GuesId");
  var value=this.http.get(environment.apiUrl +'Checkout/DeliveryAddress?Cus_Id='+CustomarId+ '&Gust='+Guset).toPromise().then((data:any)=>{
    debugger;
    if(data.length !=0){
      this.EditAddress=data;
      this.AddressAdd();
    }
   // this.check();
        });
}
ChangeAddressClick(){
  var vFirstName = this.Name;
  var vLstName = this.AddAddLine1;
  var vEmailId = this.AddLine2;
  var vMobileNo = this.AddCity;
  var vPassword = this.AddState;
  var vConPass = this.AddZip;
 
  debugger;
  this.isShownErrorChange = true;
  this.isShownSuccessChange = true;
  this.ChangeAddErrorMsg = "";
  this.ChangeAddSuccessMsg = "";

  if (vFirstName == undefined || vFirstName == "") {
    this.isShownErrorChange = false;
    this.ChangeAddErrorMsg = "Please Enter Your Name.";
    return false;
  }
  if (vLstName == undefined || vLstName == "") {
    this.isShownErrorChange = false;
    this.ChangeAddErrorMsg = "Please Enter Your Address Line1 .";
    return false;
  }
  if (vEmailId == undefined || vEmailId == "") {
    this.isShownErrorChange = false;
    this.ChangeAddErrorMsg = "Please Enter Your Address Line2.";
    return false;
  }

  if (vMobileNo == undefined || vMobileNo == "") {
    this.isShownErrorChange = false;
    this.ChangeAddErrorMsg = "Please Enter Your City.";
    return false;
  }
 
  if (vPassword == undefined || vPassword == "") {
    this.isShownErrorChange = false;
    this.ChangeAddErrorMsg = "Please Enter Your State.";
    return false;
  }
  if (vConPass == undefined || vConPass == "") {
    this.isShownErrorChange = false;
    this.ChangeAddErrorMsg = "Please Enter Your Zip.";
    return false;
  }
  var regMobile=/^\d{5}$/;

  if (regMobile.test(vConPass) == false) {
    this.isShownErrorChange = false;
    this.AddnewErrorMsg = "Please Enter The Valid Zip code. ";
    return false;
  }
  var Customar_Id= sessionStorage.getItem('CustomerId');
  let params = new HttpParams();
  params = params.append('FirstName', vFirstName);
  params = params.append('Address1', vLstName);
  params = params.append('Address12', vEmailId);
  params = params.append('City', vMobileNo);
  params = params.append('State', vPassword);
  params = params.append('Zip', vConPass);
  var value = this.http.get(environment.apiUrl + 'Myorder/AddressUpdate?Cus_Id='+ this.Custdelivery, { params: params }).toPromise().then(
    (data: any) => {
      debugger;
      if (data.length != 0) {
        this.isShownSuccessChange = false;
        this.ChangeAddSuccessMsg = "Address Updated Success.";
        this.Repeat1();
        //this.ItemsArrayMenu=data;
      
       
      }
      else {
      };
    });


}
AddressNewClick(){
  var vFirstName = this.AddNewFirstName;
  var vLstName = this.AddNewLine1;
  var vEmailId = this.AddNewLine2;
  var vMobileNo = this.AddnewCity;
  var vPassword = this.AddNewState;
  var vConPass = this.AddNewZip;
 
  debugger;
  this.isShownErrorAddnew = true;
  this.isShownSuccessAddnew = true;
  this.AddnewErrorMsg = "";
  this.AddNewSuccessMsg = "";

  if (vFirstName == undefined || vFirstName == "") {
    this.isShownErrorAddnew = false;
    this.AddnewErrorMsg = "Please Enter Your Name.";
    return false;
  }
  if (vLstName == undefined || vLstName == "") {
    this.isShownErrorAddnew = false;
    this.AddnewErrorMsg = "Please Enter Your Address Line1 .";
    return false;
  }
  if (vEmailId == undefined || vEmailId == "") {
    this.isShownErrorAddnew = false;
    this.AddnewErrorMsg = "Please Enter Your Address Line2.";
    return false;
  }

  if (vMobileNo == undefined || vMobileNo == "") {
    this.isShownErrorAddnew = false;
    this.AddnewErrorMsg = "Please Enter Your City.";
    return false;
  }
 
  if (vPassword == undefined || vPassword == "") {
    this.isShownErrorAddnew = false;
    this.AddnewErrorMsg = "Please Enter Your State.";
    return false;
  }
  if (vConPass == undefined || vConPass == "") {
    this.isShownErrorAddnew = false;
    this.AddnewErrorMsg = "Please Enter Your Zip.";
    return false;
  }
  var regMobile=/^\d{6}$/;

    if (regMobile.test(vConPass) == false) {
      this.isShownErrorAddnew = false;
      this.AddnewErrorMsg = "Please Enter The Valid Zip code. ";
      return false;
    }
  var Customar_Id= sessionStorage.getItem('CustomerId');

  var Gust = sessionStorage.getItem('GuesId');
  let params = new HttpParams();
  params = params.append('FirstName', vFirstName);
  params = params.append('Address1', vLstName);
  params = params.append('Address12', vEmailId);
  params = params.append('City', vMobileNo);
  params = params.append('State', vPassword);
  params = params.append('Zip', vConPass);
  params=params.append('CusId',Customar_Id)
  params=params.append('Gust',Gust)
  var value = this.http.get(environment.apiUrl + 'Myorder/InsertAddress', { params: params }).toPromise().then(
    (data: any) => {
      debugger;

      if (data.length != 0) {
       this.AddNewFirstName="";
 this.AddNewLine1="";
  this.AddNewLine2="";
   this.AddnewCity="";
   this.AddNewState="";
   this.AddNewZip="";
        this.isShownSuccessAddnew = false;
        this.AddNewSuccessMsg = "Address Added Successfully . ";
        this.modalService.dismissAll("AddNewAddress");
        this.Repeat1();
        //this.ItemsArrayMenu=data;
     

      }
      else {
      };
    });


}


onSignUpMobileChange(event: any): void {
  debugger;
  var vVal=this.SignUpMobile.toString();
  var vlength=vVal.toString().length;
  var vValSub="((";
 if(vlength==3){
 this.SignUpMobile="("+vVal+")";
 var Vcheck=this.SignUpMobile.indexOf(vValSub);
 if(Vcheck !=-1){
   var vreplaceVal1=this.SignUpMobile.replace('(','');
   var vreplaceVal2=vreplaceVal1.replace('(','');
   var vreplaceVal3=vreplaceVal2.replace(')','');
   this.SignUpMobile =vreplaceVal3;
 }
}
 else if(vlength==8)
 this.SignUpMobile=vVal+"-";
}
onSignUpGustMobileChange(event: any): void {
debugger;
var vVal=this.GustMobile.toString();
  var vlength=vVal.toString().length;
  var vValSub="((";
 if(vlength==3){
 this.GustMobile="("+vVal+")";
 var Vcheck=this.GustMobile.indexOf(vValSub);
 if(Vcheck !=-1){
   var vreplaceVal1=this.GustMobile.replace('(','');
   var vreplaceVal2=vreplaceVal1.replace('(','');
   var vreplaceVal3=vreplaceVal2.replace(')','');
   this.GustMobile =vreplaceVal3;
 }
}
 else if(vlength==8)
 this.GustMobile=vVal+"-";

}


viewPassword(){
  debugger;
if ((document.getElementById('txtPassword') as HTMLInputElement).type == 'password')
{
  (document.getElementById('txtPassword') as HTMLInputElement).type='text';
  (document.getElementById('pass-status') as HTMLInputElement).className='fa fa-eye-slash';
}
else
{
  (document.getElementById('txtPassword') as HTMLInputElement).type='password';
  (document.getElementById('pass-status') as HTMLInputElement).className='fa fa-eye';
}

}

viewSignUpPassword(){
  debugger;
if ((document.getElementById('txtsignuppassword') as HTMLInputElement).type == 'password')
{
  (document.getElementById('txtsignuppassword') as HTMLInputElement).type='text';
  (document.getElementById('pass-signstatus') as HTMLInputElement).className='fa fa-eye-slash';
}
else
{
  (document.getElementById('txtsignuppassword') as HTMLInputElement).type='password';
  (document.getElementById('pass-signstatus') as HTMLInputElement).className='fa fa-eye';
}

}
viewSignupConfirm() {
  debugger;
  if ((document.getElementById('txtSignupConfirmPass') as HTMLInputElement).type == 'password') {
    (document.getElementById('txtSignupConfirmPass') as HTMLInputElement).type = 'text';
    (document.getElementById('passSignupConfirm') as HTMLInputElement).className = 'fa fa-eye-slash';
  }
  else {
    (document.getElementById('txtSignupConfirmPass') as HTMLInputElement).type = 'password';
    (document.getElementById('passSignupConfirm') as HTMLInputElement).className = 'fa fa-eye';
  }

}
}
