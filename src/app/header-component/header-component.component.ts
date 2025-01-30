import { Component, OnInit, ChangeDetectionStrategy,ViewEncapsulation,  ViewChild,TemplateRef ,HostListener} from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpParams } from "@angular/common/http";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.Default
})

export class HeaderComponentComponent implements OnInit {
  
  ItemsArray: [];
  ItemsArrayMenu: [];
  TimeArray: [];
  StartTime;
  QuanAmount:number;
  //user: SocialUser;
  loggedIn: boolean;
  //user: SocialUser;
  tes;
  Search;
  location:string;
  Addtocart=[] as any;
  // @ViewChild('Restaurent', { static: true }) Restaurent: TemplateRef<any>;
  @ViewChild('ClearCart', { static: true }) ClearCart: TemplateRef<any>;
 constructor(private modalService: NgbModal, private http: HttpClient,private _storageService: StoragedetectComponent,private authService: SocialAuthService) {
 
  }
 
  closeResult: string;
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
  isShownErrorSignUp: boolean = true;
  isShownSuccessSignUp: boolean = true;
  isShownErrorRes:boolean=true;
  SignUpErrorMsg: string;
  ResErrorMsg:string;
  SignUpSuccessMsg: string;
  isShownErrorGuest: boolean = true;
  isShownSuccessGuest: boolean = true;
  GuestErrorMsg: string;
  GuestSuccessMsg: string;
  data=[] as any;
  //sum:decimal;
  //username = new FormControl(); 
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  passwordPattern = "(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}";
  LoginCaptha: string;
  LoginCaptha1: string;
  SignUpCaptha: string;
  SignUpCaptha1: string;
  GustFirstName: string;
  GustLastName: string;
  GustEmail: string;
  GustMobile: string;
  GustCaptha: string;
  GustCaptha1: string;

  ForgotCaptha: string;
  ForgotCaptha1: string;
  isShownErrorForgot: boolean = true;
  isShownSuccessForgot: boolean = true;
  ForgotErrorMsg: string;
  ForgotSuccessMsg: string;
  user=[] as any;
GustReset:string;
  ResetOldpass:string;
  ResetNewpass:string;
  ResetConfpass:string;
  Resturantarray=[] as any;
 
  isShownErrorReset : boolean = true;
  isShownSuccessReset:boolean =true;
  ResetErrorMsg :string;  
  ResteSuccessMsg:string;
  isShowZapataFlorence = true;
  isShowZapataHartvile = false;
  isShowElSanJoe = false
  restuarentId:number;
  Add:string;
  isMenuOpen = false;
  activeDropdownIndex: number | null = null;

  toggleDropdown(index: number, event: Event) {
    event.stopPropagation(); // Prevent closing immediately after clicking
    this.activeDropdownIndex = this.activeDropdownIndex === index ? null : index;
  }
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown')) {
      this.activeDropdownIndex = null;
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ClearTotalcart(){
    this.modalService.dismissAll(this.ClearCart);
    var resid=  localStorage.getItem('ResturntId');
    localStorage.clear();
    this._storageService.setItem('ResturntId',resid);
    alert("Cart Clear SuccessFull");
    return false;
  }
//   Flo(Res_Id,locaname,content){
//     debugger;
//     var mycart = localStorage.getItem('CartItem');
// this.restuarentId=Res_Id;
//     var cartcount = JSON.parse(mycart);
    
//     if( this.cartcount !=0  )
//     {
//       this.modalService.open(this.ClearCart);
//      // alert("please clear the cart or checkout item from the cart");
//       return false;
//     }else{
     
//     }
//      this.tes = Res_Id;
//      this.location=locaname;
//  //   localStorage.setItem('ResturntId',Res_Id);

   
//     if (locaname == "Zapata Florence") {
//       $("#ritema").prop("checked", true);
//       this.isShowZapataFlorence = true;
//       this.isShowZapataHartvile = false;
//       this.isShowElSanJoe = false;
//     }
//     else if (locaname == "Zapata Hartsville") {
//       $("#ritema1").prop("checked", true);
//       this.isShowZapataFlorence = false;
//       this.isShowZapataHartvile = true;
//       this.isShowElSanJoe = false;
//     }
//     else if (locaname == "El San Joe") {
//       $("#ritema2").prop("checked", true);
//       this.isShowZapataFlorence = false;
//       this.isShowZapataHartvile = false;
//       this.isShowElSanJoe = true;
//     }
//     this._storageService.setItem('ResturntId',Res_Id);
//     localStorage.setItem("Location",this.location);
//     this.HeaderTime();
//     this.modalService.dismissAll(this.Restaurent);
//    // this.SubCat();
//     this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {

//       this.closeResult = `Closed with: ${result}`;

//     }, (reason) => {

//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

//     });
//   }

  HeaderTime()
  {
   var res = localStorage.getItem('ResturntId');
    var value = this.http.get(environment.apiUrl + 'Menu/Hours?RestaruntId='+res).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.TimeArray = data;
        //  this.StartTime = data["0"].stHours;
        localStorage.setItem('Endtime',data["0"].endHours); 
        }
        else {
        };
      });
  }
  Favroite(){
    let UserId =sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    if(UserId != null && UserId != "" ){
      window.location.href="/Favourite";
      
    } else  if(GustId != null && GustId != "" ){
      alert("Please Login to view Favourites");
      
    }
    else{
      alert("Please Login to view Favourites");
      return false;
    }
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
SubCat(){
  //var resid=  localStorage.getItem('ResturntId');
 var resid= this._storageService.getitem('ResturntId');
  var value = this.http.get(environment.apiUrl + 'Menu/Sub?RestaruntId='+resid+'&System=Web').toPromise().then(
    (data: any) => {
      debugger;
      if (data.length != 0) {
        this.ItemsArrayMenu = data;
      }
      else {
      };
    });
}
Catergory(){
  var value = this.http.get(environment.apiUrl + 'Menu/Menu1').toPromise().then(
    (data: any) => {
      debugger;
      if (data.length != 0) {
        this.ItemsArray = data;
     //   this.StartTime = data["0"].stHours;
      }
      else {
      };
    });
}
  ngOnInit(): void {
    window.scroll(0, 0);
    window.onbeforeunload = function () {
      return "Do you really want to close?";
  };
    this.authService.authState.subscribe((user) => {
      debugger;
      this.user = user;
      this.loggedIn = (user != null);
    });
    $(".toggle-password").click(function () {
      debugger;
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $("#Old_Pas");
      //var input = $($(this).attr("toggle"));
      if (input.attr("type") != "password") {
          input.attr("type", "password");
      } else {
          input.attr("type", "text");
      }
  });
    if (window.addEventListener) {
      debugger;
      window.addEventListener("storage", this.Addtocart, false);
  }
    this.loadScript('../../assets/js/Alert.js');
debugger;


    // var resid=  localStorage.getItem('ResturntId');

    // if(resid==null){
    //   this.modalService.open(this.Restaurent);
    // }
  //  if(resid == "1"){

  //   $("#ritema").prop("checked", true);
  //   this.location="Zapata's Florence";
  //   localStorage.setItem("Location",this.location);
  //  } if(resid == "2"){
    
  //   $("#ritema1").prop("checked", true);
  //   this.location="Zapata's Hartvile";
  //   localStorage.setItem("Location",this.location);
  //  }
  //  if(resid == "3"){
   
  //   $("#ritema2").prop("checked", true);
  //   this.location="El San Joe";
  //   localStorage.setItem("Location",this.location);
  //  }
   this._storageService.watchStorage().subscribe((data:string) => {
    debugger;
this.SubCat();
this.HeaderTime();
this.CartItem();
this.Catergory();
var gust = sessionStorage.getItem('CustomerType')
this.GustReset=gust;
var name = localStorage.getItem("CustomerNam");
if( name==undefined || name ==null){
 let name1= sessionStorage.getItem('CustomerNam');
 this.CustomerNam = name1;
}
else{
  this.CustomerNam =localStorage.getItem("CustomerNam");
}
   });
    this.CartItem();
    this.HeaderTime();
  // sessionStorage.clear();
   // var vCustomerId = localStorage.getItem('CustomerId');
    var vLogIn = document.getElementById("divLogin");
    var vLoged = document.getElementById("divLoged");
   var  vCustomerId=  sessionStorage.getItem('CustomerId');
   var  vCustomerName= sessionStorage.getItem('CustomerNam');
   var GustId= sessionStorage.getItem('GuesId');
    if (vCustomerId != undefined && vCustomerId != '') {
      debugger;
      vLogIn.style.display = 'none';
      vLoged.style.display = 'block';
      this.CustomerNam=vCustomerName;
    }else if (GustId != undefined && GustId != '') {
      debugger;
      vLogIn.style.display = 'none';
      vLoged.style.display = 'block';
      this.CustomerNam=vCustomerName;
    }
    else {
      vLogIn.style.display = 'block';
      vLoged.style.display = 'none';
    }
   
   
      var value = this.http.get(environment.apiUrl + 'Menu/Restaurent').toPromise().then(
        (data: any) => {
          debugger;
          if (data.length != 0) {
            this.Resturantarray = data;
         //   this.StartTime = data["0"].stHours;
          }
          else {
          };
        });
    var Rest=  localStorage.getItem('ResturntId');

  //   var value = this.http.get(environment.apiUrl + 'Menu/Hours?RestaruntId='+Rest).toPromise().then(
  //     (data: any) => {
  //       debugger;
  //       if (data.length != 0) {
  //         this.TimeArray = data;
  //       //  this.StartTime = data["0"].stHours;
  //  localStorage.setItem('Endtime',data["0"].endHours); 
  //       }
  //       else {
  //       };
  //     });
      this.SubCat();
    $("#Login").mouseenter(function () {

      $(this).find('a').css("color", "#F4650C");
      $("#grey").css("display", "none");
      $("#green").css("display", "initial");
      $("#MenuCart").css("display", "none");
      $("#AddCart").css("display", "none");
    });
    $("#Login").mouseleave(function () {
      $(this).find('a').css("color", "black");
      $("#grey").css("display", "initial");
      $("#green").css("display", "none");
    });
    var gust = sessionStorage.getItem('CustomerType')
    this.GustReset=gust;
    $(".User").mouseenter(function () {
debugger;

  $(this).css("color", "#F4650C");
      $("#grey1").css("display", "none");
      $("#green1").css("display", "initial");
      $("#UserLogin").css("display", "initial");
      $("#MenuCart").css("display", "none");
      $("#AddCart").css("display", "none");



    
    });
    $(".User").mouseleave(function () {
      $("#User").css("color", "black");
      $("#grey1").css("display", "initial");
      $("#green1").css("display", "none");

     // $("#UserLogin").css("display", "none");
    });

    $("body").click(function () {
     // debugger;
     
       // $("#AddCart").css("display", "none");
      $("#UserLogin").css("display", "none");
      $("#MenuCart").css("display", "none");
    });
   
    $("#Cart").mouseenter(function () {
     // debugger;
     
      $(this).css("color", "#F4650C");
      $("#Grey_Cart").css("display", "none");
      $("#green_Cart").css("display", "initial");
      $("#AddCart").css("display", "initial");
      $(".items_cart").css("background", "#F4650C");
      $(".items_cart").css("color", "white");
      $("#UserLogin").css("display", "none");
      $("#MenuCart").css("display", "none");
    });
    $("#Cart").mouseleave(function () {
      //debugger;
      $(this).css("color", "black");
      $("#Grey_Cart").css("display", "initial");
      $("#green_Cart").css("display", "none");
 //     $("#AddCart").css("display", "none");
   //   $(".items_cart").css("background", "black");
     // $(".items_cart").css("color", "white");
    });
    $("#AddCart").mouseenter(function () {
     // debugger;
      $("#Cart").css("color", "#F4650C");
      $("#Grey_Cart").css("display", "none");
      $("#green_Cart").css("display", "initial");
      $("#AddCart").css("display", "initial");
    });
    $("#AddCart").click(function () {
     // debugger;
    
      $("#Cart").css("color", "#F4650C");
      $("#Grey_Cart").css("display", "none");
      $("#green_Cart").css("display", "initial");
      $("#AddCart").css("display", "initial");
    });
   $("#AddCart").mouseleave(function () {
    //  // debugger;
    //   $("#Cart").css("color", "black");
    //   $("#Grey_Cart").css("display", "initial");
    //   $("#green_Cart").css("display", "none");
       $("#AddCart").css("display", "none");
     });
    $("#Menu").mouseenter(function () {
      //debugger;
      $(this).css("color", "#F4650C");
      $("#green_meur").css("display", "none");
      $("#grey_menu").css("display", "initial");
      $("#MenuCart").css("display", "initial");
      $("#UserLogin").css("display", "none");
      $("#AddCart").css("display", "none");

    });
    $("#Menu").mouseleave(function () {
      $(this).css("color", "black");
      $("#green_meur").css("display", "initial");
      $("#grey_menu").css("display", "none");
   //   $("#MenuCart").css("display", "none");
    });
    // $("#MenuCart").mouseenter(function () {
    //   $("#Menu").css("color", "#F4650C");
    //   $("#grey_menu").css("display", "initial");
    //   $("#green_meur").css("display", "none");
    //   $("#MenuCart").css("display", "initial");
    // });
    // $("#MenuCart").mouseleave(function () {
    //   $("#Menu").css("color", "black");
    //   $("#grey_menu").css("display", "none");
    //   $("#green_meur").css("display", "initial");
    //   $("#MenuCart").css("display", "none");
    // });

    $("#offer").mouseenter(function () {
      $(this).find('a').css("color", "#F4650C");
      $("#green_offer").css("display", "none");
      $("#grey_offer").css("display", "initial");
    });
    $("#offer").mouseleave(function () {
      $(this).find('a').css("color", "black");
      $("#grey_offer").css("display", "none");
      $("#green_offer").css("display", "initial");
    });

    $("#Whish").mouseenter(function () {
      $(this).find('a').css("color", "#F4650C");
      $("#grey_wish").css("display", "none");
      $("#rose").css("display", "initial");
      $(".items_cart1").css("background", "#F4650C");
      $(".items_cart1").css("color", "white");
    });
    $("#Whish").mouseleave(function () {
      $(this).find('a').css("color", "black");
      $("#rose").css("display", "none");
      $("#grey_wish").css("display", "initial");
      $(".items_cart1").css("background", "black");
      $(".items_cart1").css("color", "white");
    });
  
    debugger;
   //  this.authService.authState.subscribe((user) => {
     //  debugger;
     //  this.user = user;
      // this.loggedIn = (user != null);
     //});
  }
  Resturantchoose(){
    debugger;
    this.isShownErrorRes=true;
    if(this.restuarentId == undefined  || this.restuarentId == null || this.restuarentId == 0){
      this.isShownErrorRes=false;
      this.ResErrorMsg="Please Choose Restaurant";
    }
    else{
      var resid=  localStorage.getItem('ResturntId');
      if(resid == "1"){

        $("#ritema").prop("checked", true);
        this.location="Zapata's Florence";
        localStorage.setItem("Location",this.location);
       } if(resid == "2"){
        
        $("#ritema1").prop("checked", true);
        this.location="Zapata's Hartvile";
        localStorage.setItem("Location",this.location);
       }
       if(resid == "3"){
       
        $("#ritema2").prop("checked", true);
        this.location="El San Joe";
        localStorage.setItem("Location",this.location);
       }
      this.modalService.dismissAll("Restaurent");
    }
  }
CartItem(){
  var count= localStorage.getItem('CartItem');
  let  myCartItem = (count);
 
 debugger;
 if (myCartItem === null) {
   this.cartcount=0;
 } else {
   debugger;
   var height=0;
       this.Addtocart=JSON.parse(myCartItem);
       this.cartcount= this.Addtocart.length;
       var AddonLength = this.Addtocart["0"].Addon.length;
       if(AddonLength > 8){

         height = Number(this.cartcount) * 250 + 160;
       }
       else{

         height = Number(this.cartcount) * 180 + 160;
       }
       if(height > 400){
         debugger;
         $("#Addtoover").css("height","400px");
       }
 }
}

  Adddown(min,item) {
    debugger;
    // var Mynumber = parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) - 1;
    // ((document.getElementById("AddNumber") as HTMLInputElement).value) = String(Mynumber);
    // if (parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) <= parseInt(min)) {
    //   (document.getElementById("AddNumber") as HTMLInputElement).value = min;
    // }
    if(item.Quan !=1){
    //  item.price= item.price -item.orginalpric;
      item.Quan=item.Quan -1;
    }
   
  }
  AddcartQuant(item){
    debugger;
    if(item.Quan != 0){
      item.Quan= item.Quan ;
    }
    else{
      item.Quan=1;
          }
          var len = (item.Quan).toString().length;
    if(len > 3){
      var numbert= Number(item.Quan.toString().substring(0,3));
      item.Quan =numbert;
    }
    
   
  }
  Addup(max,item) {
    debugger;
    // var Mynumber = parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) + 1;
    // ((document.getElementById("AddNumber") as HTMLInputElement).value) = String(Mynumber);
    // if (Number(Mynumber) >= Number(max)) {
    //   (document.getElementById("AddNumber") as HTMLInputElement).value = max;
    // }
   // item.price= item.price + item.orginalpric;
  item.Quan=item.Quan +1;
  }
  thisown(min) {
    debugger;
    var Mynumber = parseInt((document.getElementById("thisNumber") as HTMLInputElement).value) - 1;
    ((document.getElementById("thisNumber") as HTMLInputElement).value) = String(Mynumber);
    if (parseInt((document.getElementById("thisNumber") as HTMLInputElement).value) <= parseInt(min)) {
      (document.getElementById("thisNumber") as HTMLInputElement).value = min;
    }
  }
  thisup(max) {
    debugger;
    var Mynumber = parseInt((document.getElementById("thisNumber") as HTMLInputElement).value) + 1;
    ((document.getElementById("thisNumber") as HTMLInputElement).value) = String(Mynumber);
    if (Number(Mynumber) >= Number(max)) {
      (document.getElementById("thisNumber") as HTMLInputElement).value = max;
    }
  }
 
 
  SearchResult(){
   // localStorage.setItem('searchtext',this.Search);
   if(this.Search != ""){
    window.location.href='/Search/' + this.Search;
   }
   else {
     alert("Please Enter Search text");
   }
   
  }
  RemoveCart(item:any){
    debugger;
    var vCart = localStorage.getItem("CartItem");
   let CartItem = JSON.parse(vCart);
    for (var i = CartItem.length - 1; i >= 0; i--) {
        if (CartItem[i].MenuVarianceId == item.MenuVarianceId) {
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

   this.Addtocart=JSON.parse(localStorage.getItem('CartItem'));
   this.cartcount= this.Addtocart.length;
  }
  modalown(min) {
    debugger;
    var Mynumber = parseInt((document.getElementById("MOdlNumbe") as HTMLInputElement).value) - 1;
    ((document.getElementById("MOdlNumbe") as HTMLInputElement).value) = String(Mynumber);
    if (parseInt((document.getElementById("MOdlNumbe") as HTMLInputElement).value) <= parseInt(min)) {
      (document.getElementById("MOdlNumbe") as HTMLInputElement).value = min;
   
    }
  }
  modalup(max) {
    //debugger;
    var Mynumber = parseInt((document.getElementById("MOdlNumbe") as HTMLInputElement).value) + 1;
    ((document.getElementById("MOdlNumbe") as HTMLInputElement).value) = String(Mynumber);
    if (Number(Mynumber) >= Number(max)) {
      (document.getElementById("MOdlNumbe") as HTMLInputElement).value = max;
    }
  }

  ConfirmClick(content1){
   var localStorage = localStorage.getItem("CartItem");
   if(localStorage.length ==0){
    alert("Please Add some items");
   }
   else{
     window.location.href="/CheckOut";
   }
   this.modalService.dismissAll(content1);
  }
  CheckValidate(){
    debugger;
    var items = this.Addtocart;
    if(items.length == 0){
      alert("Please Add some items");
      return false;
    }
    var res=  localStorage.getItem('ResturntId');
    let params = new HttpParams();
    params = params.append('Restarunt', res);
    var value = this.http.get(environment.apiUrl + 'Checkout/HolidayValidate', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
         if(data["0"].holiday =="Holiday"){
          alert("Restaurant Holiday today");
         } 
           else {
          
             localStorage.setItem("CartItem",JSON.stringify(items) );
             var get = localStorage.getItem("CartItem");
             window.location.href="/CheckOut";
           }
         
        }
        else {
        };
      });

  }

  
  open1(content1, content) {
    //ForgotPassword Click Function
    debugger;
    if (content1 == "Forget") {
      let params = new HttpParams();
      var vEmailId = this.ForgotMailId;

      this.isShownErrorForgot = true;
      this.isShownSuccessForgot = true;

      var vForgotCaptha = this.ForgotCaptha;
      var vForgotCaptha1 = this.ForgotCaptha1;
      var vCaptchaFG = localStorage.getItem('sumForgotCaptha');
      if (vEmailId == undefined || vEmailId == "") {
        this.isShownErrorForgot = false;
        this.ForgotErrorMsg = "Please enter Your EmailId Or PhoneNo";
        return false;
      }
      if (vForgotCaptha1 == undefined || vForgotCaptha1 == "") {
        this.isShownErrorForgot = false;
        this.ForgotErrorMsg = "Please enter the Captcha Calculated value";
        return false;
      }
      if (vForgotCaptha1 != vCaptchaFG) {
        this.isShownErrorForgot = false;
        this.ForgotErrorMsg = "Please enter the Valid Captcha.";
        return false;
      }
      if (vEmailId != undefined && vEmailId != "") {

        //<--Email Validation-->
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var vtru = regEmail.test(vEmailId);
        if (vtru == true) {
          params = params.append('EmailId', vEmailId);
          var value = this.http.get(environment.apiUrl + 'customerdetails/ForgotPassword', { params: params }).toPromise().then(
            (data: any) => {
              debugger;
              // if (data.length != 0) {
              //   //this.ItemsArrayMenu=data;
              //   var vMsg = data;
              //   if (vMsg == "success") {

              //     this.modalService.dismissAll(content1);
              //     this.modalService.open(content, { windowClass: 'hwi' }).result.then((result) => {

              //       this.closeResult = `Closed with: ${result}`;

              //     }, (reason) => {

              //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

              //     });
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
                this.modalService.dismissAll(content1);
                this.isShownErrorVerCode=false;
                this.VerificationSuccessMsg="Verification code send to your Registered MailId.";
                this.modalService.open(content, { windowClass: 'hwi' }).result.then((result) => {

                  this.closeResult = `Closed with: ${result}`;

                }, (reason) => {

                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

                });
              }
              else if (vErrorMsg1 == "Not Registered") {
                this.isShownErrorForgot = false;
                this.ForgotErrorMsg = "Your EmailId Not Registered. Please Signup First.";
              }
              else {
                this.isShownErrorForgot = false;
                this.ForgotErrorMsg = "EMail send failed.";
              }
            });
        }
        else {
        
        }
      }
    }
    else {
      debugger;

      //Clear SignUp
      this.SignUpFirstName = "";
      this.SignUpLastName = "";
      this.SignUpEmail = "";
      this.SignUpMobile = "";
      this.SignUpPassword = "";
      this.SignUpConfirmPass = "";
      this.SignUpCaptha = "";
      this.SignUpCaptha1 = "";
      //Gust
      this.GustFirstName = "";
      this.GustLastName = "";
      this.GustEmail = "";
      this.GustMobile = "";
      this.GustCaptha = "";
      this.GustCaptha1 = "";
      this.CaptchaSignUp();
      this.CaptchaGust();
      this.CaptchaForgot();


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


  open2(content1, content) {
    debugger;

    this.modalService.dismissAll(content1);
    this.modalService.open(content).result.then((result) => {

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




  ResetPass(){
    this.isShownSuccessReset = true;
    this.isShownErrorReset = true;
    this.ResetErrorMsg = "";
    this.ResteSuccessMsg = "";
    if (this.ResetOldpass == undefined || this.ResetOldpass == "") {
      this.isShownErrorReset = false;
      this.ResetErrorMsg = "Please Enter Your Old Password.";
      return false;
    }
    if (this.ResetNewpass == undefined || this.ResetNewpass == "") {
      this.isShownErrorReset = false;
      this.ResetErrorMsg = "Please Enter Your New Password.";
      return false;
    }
    if (this.ResetConfpass == undefined || this.ResetConfpass == "") {
      this.isShownErrorReset = false;
      this.ResetErrorMsg = "Please Enter Your Confirm Password.";
      return false;
    }
    debugger;
    var vPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,20}$/;
    //var checkPattern=vPasswordPattern.test(vPassword);
    if (vPasswordPattern.test(this.ResetNewpass) == false) {
      this.isShownErrorReset = false;
      this.ResetErrorMsg = "Password should have, Min 8 charecter, Atleast One UpperCase, Lowercase, Number & Specia lCharecter";
      return false;

    }
    if (this.ResetNewpass !=  this.ResetConfpass) {
      this.isShownErrorReset = false;
      this.ResetErrorMsg = "Password and Confirm Password Should be Same.";
      return false;
    }
    let UserId =sessionStorage.getItem('CustomerId');
    var value = this.http.get(environment.apiUrl + 'Menu/Reset?oldPass='+this.ResetOldpass+'&password='+this.ResetNewpass +'&CustomerId='+UserId).toPromise().then(
      (data: any) => {
        debugger;

        if (data.length != 0) {
          if(data["0"].reset=="Success"){
            this.ResetNewpass="";
            this.ResetOldpass="";
           this.ResetConfpass="";
            this.isShownSuccessReset = false;
            this.ResteSuccessMsg = "Password Reset Successfully.";
          }
          else{
            this.ResetNewpass="";
            this.ResetOldpass="";
           this.ResetConfpass="";
            this.isShownErrorReset = false;
            this.ResetErrorMsg = "Please check on Your Old Password.";
          }
         
        }
        else {
        };
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
    if (vCapt1 != vCaptcha) {
      this.isShownErrorLogin = false;
      this.LoginErrorMsg = "Invalid Captcha, Please Enter The Valid Captcha.";
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

            localStorage.setItem('CustomerId', vCustomerDetails_ID);

            vLogIn.style.display = 'none';
            vLoged.style.display = 'block';
            localStorage.setItem('CustomerName', vCustomerName);
            this.CustomerNam = vCustomerName;
            sessionStorage.setItem('CustomerId',vCustomerDetails_ID);
            sessionStorage.setItem('CustomerNam',vCustomerName);
            this.modalService.dismissAll("Login");
            //window.location.href = '/Search';
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

  logOutClick() {
    debugger;
   // alert("Logout Successfully");
    var vLogIn = document.getElementById("divLogin");
    var vLoged = document.getElementById("divLoged");
    $("#UserLogin").css("display", "none");
    localStorage.setItem('CustomerId', "");
sessionStorage.setItem('CustomerId',"");
sessionStorage.setItem('CustomerType',"");
    vLogIn.style.display = 'block';
    vLoged.style.display = 'none';
    localStorage.setItem('CustomerName', "");
    sessionStorage.setItem('CustomerNam',"");
    sessionStorage.setItem('GuesId',"");
    var count= localStorage.clear();
    
    window.location.href="";
  }
  open(content) {
    debugger;
    this.UserId = "";
    this.Password = "";
    this.LoginCaptha = "";
    this.LoginCaptha1 = "";
    this.isShownErrorLogin = true;
    this.isShownSuccessLogin = true;

    this.Captcha();
    this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  changelocation(content){
    var mycart = localStorage.getItem('CartItem');

    var cartcount = JSON.parse(mycart);
    if(cartcount.length != 0)
    {
      this.modalService.open(this.ClearCart);
     // alert("please clear the cart or checkout item from the cart");
      return false;
    }else{
     
    }
    this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
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
  ValidateCheckOut(Login){
    var  vCustomerId=  sessionStorage.getItem('CustomerId');
    if(vCustomerId != undefined && vCustomerId != null && vCustomerId !="undefined"){
      if(this.cartcount==0){
        alert("Please add a product to the cart.")
      }
      else{
        window.location.href="/CheckOut";
      }
    }
    else{
      this.open(Login)
    }
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
    var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{10}$/;

    if (regMobile.test(vMobileNo) == false) {
      this.isShownErrorSignUp = false;
      this.SignUpErrorMsg = "Please Enter The Valid MobileNo.";
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
  PriceRemove(customise,Addon,customization){
    debugger;
    var vContain="";
    var price= customise.price;
    
        if (customise.Addon.length != 0) {
          for (var i = customise.Addon.length - 1; i >= 0; i--) {
            if (customise.Addon[i].Addon == customization) {
              debugger;
              customise.price= customise.price -customise.Addon[i].prize;
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
    // var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;
    // if (regMobile.test(vMobileNo) == false) {
    //   this.isShownErrorGuest = false;
    //   this.SignUpErrorMsg = "Please Enter The Valid MobileNo. Format Should like (123)456-7890";
    //   return false;
    // }

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
      //    this.GuestSuccessMsg = "Guest SignUp Successfully.";
          localStorage.setItem('CustomerType', "Gust");
          var vLogIn = document.getElementById("divLogin");
          var vLoged = document.getElementById("divLoged"); 
          localStorage.setItem('CustomerId', data["0"].customerDetails_ID);
          sessionStorage.setItem('GuesId', data["0"].customerDetails_ID);
          sessionStorage.setItem('CustomerType', "Gust");
      //    this.CustomerNam = vName;
          this.GustReset=data["0"].customerDetails_ID;
          vLogIn.style.display = 'none';
            vLoged.style.display = 'block';
      //      localStorage.setItem('CustomerNam', vName);
        //    sessionStorage.setItem('CustomerNam',vName)
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
    this.LoginCaptha = code1;
    this.LoginCaptha1 = "";
    var sum;
    //sum = parseFloat(a) + parseFloat(b);
    localStorage.setItem('sumLoginCaptha', code1);

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

//   onSignUpMobileChange(event: any): void {
//     debugger;
//     var vVal=this.SignUpMobile.toString();
//     var vlength=vVal.toString().length;
//     var vValSub="((";
//    if(vlength==3){
//    this.SignUpMobile="("+vVal+")";
//    var Vcheck=this.SignUpMobile.indexOf(vValSub);
//    if(Vcheck !=-1){
//      var vreplaceVal1=this.SignUpMobile.replace('(','');
//      var vreplaceVal2=vreplaceVal1.replace('(','');
//      var vreplaceVal3=vreplaceVal2.replace(')','');
//      this.SignUpMobile =vreplaceVal3;
//    }
//   }
//    else if(vlength==8)
//    this.SignUpMobile=vVal+"-";
//  }
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

viewPassResetOld(){
  debugger;
if ((document.getElementById('Old_Pas') as HTMLInputElement).type == 'password')
{
  (document.getElementById('Old_Pas') as HTMLInputElement).type='text';
  (document.getElementById('pass-statusOld') as HTMLInputElement).className='fa fa-eye-slash';
}
else
{
  (document.getElementById('Old_Pas') as HTMLInputElement).type='password';
  (document.getElementById('pass-statusOld') as HTMLInputElement).className='fa fa-eye';
}

}
viewPassResetNew(){
  debugger;
if ((document.getElementById('New_Pass') as HTMLInputElement).type == 'password')
{
  (document.getElementById('New_Pass') as HTMLInputElement).type='text';
  (document.getElementById('pass-statusNew') as HTMLInputElement).className='fa fa-eye-slash';
}
else
{
  (document.getElementById('New_Pass') as HTMLInputElement).type='password';
  (document.getElementById('pass-statusNew') as HTMLInputElement).className='fa fa-eye';
}

}
viewPassResetConfirm() {
  debugger;
  if ((document.getElementById('txtResetConfpass') as HTMLInputElement).type == 'password') {
    (document.getElementById('txtResetConfpass') as HTMLInputElement).type = 'text';
    (document.getElementById('passResetConfirm') as HTMLInputElement).className = 'fa fa-eye-slash';
  }
  else {
    (document.getElementById('txtResetConfpass') as HTMLInputElement).type = 'password';
    (document.getElementById('passResetConfirm') as HTMLInputElement).className = 'fa fa-eye';
  }

}


LoginpMobileChange(event: any): void {
  debugger;
  var vVal=this.UserId.toString();
    var vlength=vVal.toString().length;
    var vValSub="((";
   if(vlength==3){
   this.UserId="("+vVal+")";
   var Vcheck=this.UserId.indexOf(vValSub);
   if(Vcheck !=-1){
     var vreplaceVal1=this.UserId.replace('(','');
     var vreplaceVal2=vreplaceVal1.replace('(','');
     var vreplaceVal3=vreplaceVal2.replace(')','');
     this.UserId =vreplaceVal3;
   }
  }
   else if(vlength==8)
   this.UserId=vVal+"-";
 
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
}
