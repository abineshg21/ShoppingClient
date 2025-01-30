import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FoodComponent implements OnInit {
  Carne = true;
  ItemID: string;
  data = [] as any;
  AddOns = [] as any;
  ItemAddOns = [] as any;
  ItemName: string;
  //ItemVariance: string;
  ItmDescription: string;
  itmPrice: number;
  itmCouponType: string;
  CouponAmt: number;
  MenuVarianceId: string;
  FacId: string;
  isShownVarianceId: boolean = true;
  isShownMenuVarianceId: boolean = true;
  isShownMenuPrice: boolean = true;
  isShownMenuDescription: boolean = true;
  isShownMenuImageUrl: boolean = true;
  isShownDiscount: boolean = true;
  isShowAddon: boolean = true;
  ItmImageURL: string;
  ItmVariance: [];
  ItemCustomization: [];
  RelatedItm: [];
  addtocartitem = [] as any;
  HouseSplDishes = [];
  TimeArray = [];
  StartTime;
  closeResult: string;
  AddonText: string;
  SpecialComments: string;
  SideOrders = [];
  //ItmVarDescription: string;
  isShownRelatedItem = true;
  isShownSideDishes = false;
  isShownHouseSpl = false;
  SplArray: [];
  DiscountQuan:number;
  ItemQty: number; 
  addoncus:string;
  VarianceName:string;
  HomeAddon: string;
  Stax:number;
  HTax:number;
  Otax:number;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient,private _storageService: StoragedetectComponent) {
    this.ItemID = this.route.snapshot.params.id;
    this.ItemQty = this.route.snapshot.params.qty;
    this.HomeAddon = this.route.snapshot.params.addon;
    if(this.HomeAddon == undefined || this.HomeAddon == 'undefined'){
      this.HomeAddon="";
    }
  }

  //ItemID: string;

  fullview() {
    this.Carne = this.Carne ? false : true;
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  ngOnInit(): void {
    debugger;
    window.scroll(0, 0);
  //  this.loadScript('../../assets/js/Alert.js');
    var vid = this.ItemID;
    //this.ItemID = this.route.snapshot.queryParamMap.get('id');
    this.bindItemDetails();
    //this.bindItemVariance();
    //this.bindItemCustomization();
    //this.bindRelatedItem();
    this.bindSideOrders();
    this.bindHouseSplDishes();
    $("#rela").css("border-bottom","3px solid  #F4650C");
    

var vQty=this.ItemQty;
((document.getElementById("myNumber") as HTMLInputElement).value) = String(vQty);
var res = localStorage.getItem('ResturntId');
    var value = this.http.get(environment.apiUrl + 'Menu/Hours?RestaruntId='+res).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.TimeArray = data;
          this.StartTime = data["0"].stHours;

        }
        else {
        };
      });
    var UserId = sessionStorage.getItem('CustomerId');
    var GustId = sessionStorage.getItem('GuesId');
    var value = this.http.get(environment.apiUrl + 'Menuitem/Items?Cus_Id=' + UserId + '&GustId=' + GustId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.SplArray = data;
        }

      });
  }

  side() {

  }
  down(min) {
    debugger;
    var Mynumber = parseInt((document.getElementById("myNumber") as HTMLInputElement).value) - 1;
    ((document.getElementById("myNumber") as HTMLInputElement).value) = String(Mynumber);
    this.ItemQty=Mynumber;
    if (parseInt((document.getElementById("myNumber") as HTMLInputElement).value) <= parseInt(min)) {
      (document.getElementById("myNumber") as HTMLInputElement).value = min;
      this.ItemQty=min;
    }
  }
  up(max) {
    debugger;
    var Mynumber = parseInt((document.getElementById("myNumber") as HTMLInputElement).value) + 1;
    ((document.getElementById("myNumber") as HTMLInputElement).value) = String(Mynumber);
    this.ItemQty=Mynumber;
    if (Number(Mynumber) >= Number(max)) {
      (document.getElementById("myNumber") as HTMLInputElement).value = max;
      this.ItemQty=max;
    }
  }
  ItemQuantChange(){
debugger;
   // var Mynumber = parseInt((document.getElementById("myNumber") as HTMLInputElement).value);
    if( this.ItemQty != 0){
      this.ItemQty= this.ItemQty ;
    }
    else{
      this.ItemQty=1;
          }
          var len = ( this.ItemQty).toString().length;
    if(len > 2){
      var numbert= Number( this.ItemQty.toString().substring(0,2));
      this.ItemQty =numbert;
    }
  }
  customOptions: OwlOptions = {
    loop: false,
    nav: true,
    margin:39,
    stagePadding:10,
    dots:true,
    navText: [
      " <img src='../../assets/Images/icon/left-slider.png' style='position:absolute;top:41%;left:-30px' />",
      " <img src='../../assets/Images/icon/right-slider.png' style='position:absolute;top:41%;left:-30px'/>"
  ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      }
    },
  }

  bindItemDetails() {
    let params = new HttpParams();
    params = params.append('ItemID', this.ItemID);
    var UserId=sessionStorage.getItem('CustomerId');
    params = params.append('Cus_Id', UserId);

    var value = this.http.get(environment.apiUrl + 'food/GetItemDetails', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //ItemName, Price ,ImageUrl, Description, MenuItemId, CouponAmt, CouponType, MenuVariance

          var vData = data;
          this.ItemName = vData["0"].itemName;
          this.ItmDescription = vData["0"].description;
          //var vItmPrce=vData["0"].price*this.ItemQty;
          this.itmPrice = vData["0"].price;
          this.itmCouponType = vData["0"].couponType;
          this.CouponAmt = vData["0"].couponAmt;
          if (this.CouponAmt != undefined && this.CouponAmt != null && this.CouponAmt != 0)
            this.isShownDiscount = false;
          else
            this.isShownDiscount = true;

            this.DiscountQuan = vData["0"].discountQuan;
          this.MenuVarianceId = vData["0"].menuVariance;
          this.ItmImageURL = vData["0"].imageUrl;
          this.Stax = vData["0"].salestax;
          this.HTax = vData["0"].hospitalitytax;
          this.Otax = vData["0"].othertax;
          this.FacId=vData["0"].favId;
          this.SpecialComments=this.HomeAddon;
          this.bindItemVariance();
          this.bindItemCustomization();
          this.isShownRelatedItem = true;
          this.bindRelatedItem();


        }
        else {
        };
      });

  }
  bindItemVariance() {
    let params = new HttpParams();
    params = params.append('ItemID', this.ItemID);

    var value = this.http.get(environment.apiUrl + 'food/GetMenuVariance', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //MenuvVariance_ID, MenuItem_ID, Name, Price, ImageUrl, Description

          this.ItmVariance = data;
          this.VarianceName=data["0"].name;
        }
        else {
        };
      });
  }
  bindItemCustomization() {
    let params = new HttpParams();
    params = params.append('ItemVarianceID', this.MenuVarianceId);

    var value = this.http.get(environment.apiUrl + 'food/GetMenuCustomization', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.isShowAddon = false;
          //MenuCustomization_ID, MenuvVariance_ID, Customization
          this.ItemCustomization = data;
          this.ItemAddOns = this.ItemCustomization;
        }
        else {
          this.isShowAddon = true;
        };
      });

  }
  Addvariance(item:any,itemvar){
    debugger;
    var demote =item.menuvariance["0"].price1;
    for(let i=0;i<item.menuvariance.length;i++ ){
     debugger;
      if(item.menuvariance[i].menuVariance==itemvar){
        item.menuvariance["0"].price1=item.menuvariance[i].price;
        item.menuvariance["0"].imageUrl1=item.menuvariance[i].imageUrl;
        item.menuvariance["0"].description1=item.menuvariance[i].description;
        item.menuvariance["0"].menuvarianceName1=item.menuvariance[i].menuvarianceName;
        item.menuvariance["0"].menuVariance1=item.menuvariance[i].menuVariance;
      }
    }
  
  }
  Addvariance1(item:any,itemvar){
    debugger;
    var demote =item.menuvariance["0"].price1;
    for(let i=0;i<item.menuvariance.length;i++ ){
     debugger;
      if(item.menuvariance[i].menuVariance==itemvar){
        item.menuvariance["0"].price1=item.menuvariance[i].price;
        item.menuvariance["0"].imageUrl1=item.menuvariance[i].imageUrl;
        item.menuvariance["0"].description1=item.menuvariance[i].description;
        item.menuvariance["0"].menuvarianceName1=item.menuvariance[i].menuvarianceName;
        item.menuvariance["0"].menuVariance1=item.menuvariance[i].menuVariance;
      }
    }
    if (this.AddOns.length != 0) {
      for (var i = this.AddOns.length - 1; i >= 0; i--) {
        item.menuvariance["0"].price1=   item.menuvariance["0"].price1 + this.AddOns[i].prize ;
      }
      }
  }
  bindRelatedItem() {
    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    let params = new HttpParams();
    params = params.append('ItemID', this.ItemID);
    params = params.append('Cus_Id', UserId);
    params = params.append('GuesId', GustId);
    var value = this.http.get(environment.apiUrl + 'food/RelatedItems', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //ItemName, Price ,ImageUrl, Description, MenuItemId, CouponAmt, CouponType, MenuVariance
          this.RelatedItm = data;
        }
        else {
        };
      });

  }

  bindSideOrders() {
    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    let params = new HttpParams();
    params = params.append('Cus_Id', UserId);
    params = params.append('GuesId', GustId);
    var value = this.http.get(environment.apiUrl + 'food/getSideOrders', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //ItemName, Price ,ImageUrl, Description, MenuItemId, CouponAmt, CouponType, MenuVariance
          this.SideOrders = data;
        }
        else {
        };
      });

  }

  bindHouseSplDishes() {
    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    let params = new HttpParams();
    params = params.append('Cus_Id', UserId);
    params = params.append('GuesId', GustId);
    var value = this.http.get(environment.apiUrl + 'food/getHouseSplDishes', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //ItemName, Price ,ImageUrl, Description, MenuItemId, CouponAmt, CouponType, MenuVariance
          this.HouseSplDishes = data;
        }
        else {
        };
      });

  }

  addtoCartClick() {
    this.data = JSON.parse(localStorage.getItem('CartItem'));
    var Quan = 1;
    var check = null;
    if (this.data != null) {

      if (this.data.length != 0) {
        for (var i = this.data.length - 1; i >= 0; i--) {
          if (this.data[i].MenuVarianceId == this.MenuVarianceId) {
            check = "entry";
            Quan = Quan + this.data[i].Quan;
            this.data.splice(i, 1);

            this.data.push({ "Addon": "", "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName  +" " +(this.VarianceName != null && this.VarianceName != "" ?  "-" +this.VarianceName :""), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": (Quan) * (this.itmPrice), "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt });
          }

        }
        if (check != "entry") {
          this.data.push({ "Addon": "", "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName  +" " +(this.VarianceName != null && this.VarianceName != "" ?  "-" +this.VarianceName :""), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": this.itmPrice, "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt });
        }


      }
      else {
        this.data.push({ "Addon": "", "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName  +" " +(this.VarianceName != null && this.VarianceName != "" ?  "-" +this.VarianceName :""), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": this.itmPrice, "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt });
      }

    }

    else {
      this.data = [{ "Addon": "", "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName   +" " +(this.VarianceName != null && this.VarianceName != "" ?  "-" +this.VarianceName :""), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": this.itmPrice, "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt }];
    }
  }

  open(content, item: any) {
    debugger;
    this.addtocartitem = item;
    this.modalService.open(content, { windowClass: 'custom-class' }).result.then((result) => {

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

      return `with: ${reason}`;

    }

  }
  Fav(item: any) {
    debugger;
    var tes = item;
    //var UserId = localStorage.getItem('CustomerId');
    //var UserId= localStorage.getItem('UserId');
    var Res = localStorage.getItem('ResturntId');
    var GustId = sessionStorage.getItem('GuesId');
    var UserId = sessionStorage.getItem('CustomerId');
    if (UserId != null && UserId != "") {
    
      } else {
        alert("Please Sign in to Add Favourites");
        return false;
      }
    
    debugger;
    // const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    // let body = new HttpParams();
    // body = body.set('MenuId', item);
    // body = body.set('CustomerId', '1');
    // body = body.set('Qty', '1');
    // body = body.set('Restaurant_ID', Res);
    // var value = this.http.get(environment.apiUrl + 'Fav/Add?MenuVariance_ID=' + item.menuVariance + '&UserId=' + GustId + '&CustomerDetails_ID=' + UserId + '&Qty=1&Restaurant_ID=' + Res).toPromise().then((data: any) => {
    //   debugger;
    //   alert("Favourites Updated Successfully");
    //   this.check();
    var value=this.http.get(environment.apiUrl +'Fav/Add?MenuVariance_ID='+item.menuVariance+'&UserId='+GustId+'&CustomerDetails_ID='+UserId+'&Qty=1&Restaurant_ID='+Res).toPromise().then((data:any)=>{
      debugger;
      
          }).catch((data: any) => {
      debugger;
      var vDataError = JSON.stringify(data.error.text);
      var vErrorMsg = vDataError.replace('"', '');
      var vErrorMsg1 = vErrorMsg.replace('"', '');
      if(vErrorMsg1 == "Success"){
        alert("Selected Item(s) added to Favourites");
        //this.check();
        this.bindRelatedItem();
        this.bindSideOrders();
        this.bindHouseSplDishes();
      }else if(vErrorMsg1 =="Update"){
        alert("Selected Item(s) removed from Favourites");
        //this.check();
        this.bindRelatedItem();
        this.bindSideOrders();
        this.bindHouseSplDishes();
      }
    });
  }

  favItemClick()
  {
    var UserId = localStorage.getItem('CustomerId');
    //var UserId= localStorage.getItem('UserId');
    var Res = localStorage.getItem('ResturntId');
    var GustId = sessionStorage.getItem('GuesId');
    if (UserId == null || UserId == "") {
      if (GustId != null && GustId != "") {

      } else {
        alert("Please Sign in to Add Favourites");
        return false;
      }
    }
    debugger;
    // const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    // let body = new HttpParams();
    // body = body.set('MenuId', this.ItemID);
    // body = body.set('CustomerId', '1');
    // body = body.set('Qty', '1');
    // body = body.set('Restaurant_ID', Res);


    var value=this.http.get(environment.apiUrl +'Fav/Add?MenuVariance_ID='+this.MenuVarianceId+'&UserId='+GustId+'&CustomerDetails_ID='+UserId+'&Qty=1&Restaurant_ID='+Res).toPromise().then((data:any)=>{
      debugger;
      
          }).catch((data: any) => {
      debugger;
      var vDataError = JSON.stringify(data.error.text);
      var vErrorMsg = vDataError.replace('"', '');
      var vErrorMsg1 = vErrorMsg.replace('"', '');
      if(vErrorMsg1 == "Success"){
        alert("Selected Item(s) added to Favourites");
        //this.check();
        this.bindItemDetails();
      }else if(vErrorMsg1 =="Update"){
        alert("Selected Item(s) removed from Favourites");
        this.bindItemDetails();
        //this.check();
      }

    // var value = this.http.get(environment.apiUrl + 'Fav/Add?MenuVariance_ID=' + this.MenuVarianceId + '&UserId=' + GustId + '&CustomerDetails_ID=' + UserId + '&Qty=1&Restaurant_ID=' + Res).toPromise().then((data: any) => {
    //   debugger;
    //   alert("Favourites Updated Successfully");
    //   this.check();
     });
  }
  check() {
    var UserId = sessionStorage.getItem('CustomerId');
    var GustId = sessionStorage.getItem('GuesId');
    var value = this.http.get(environment.apiUrl + 'Menuitem/Items?Cus_Id=' + UserId + '&GustId=' + GustId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.SplArray = data;
        }
        else {
        };
      });
  }
  AddonCartitems() {
    debugger;

    //this.modalService.dismissAll(Addon);
    //var tes = this.AddonText;
    var list = this.addtocartitem;
    var Quan = parseInt((document.getElementById("myNumber") as HTMLInputElement).value);
    //var Quan = 1;
    var AddonComment = this.SpecialComments;



if(this.SpecialComments != undefined && this.SpecialComments != "" ){
  if(this.AddOns.length == undefined || this.AddOns.length ==0){
    this.AddOns = [{ Addon: this.SpecialComments,prize : 0 }];
  }
  else{
    this.AddOns.push({ Addon: this.SpecialComments,prize : 0 });
  }
 
  }
    this.data = JSON.parse(localStorage.getItem('CartItem'));
    var check = null;
    if (this.data != null) {

      if (this.data.length != 0) {
        for (var i = this.data.length - 1; i >= 0; i--) {
          if (this.data[i].MenuVarianceId ==  this.MenuVarianceId) {
            check = "entry";
            this.data.splice(i, 1);

            this.data.push({ "Addon":   this.AddOns , "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName +" " + (this.VarianceName == "" || this.VarianceName == null? "" :"-" + this.VarianceName), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": (this.itmPrice), "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt,sTax:this.Stax,hTax:this.HTax,oTax:this.Otax,discountQuan:this.DiscountQuan });
          }

        }
        if (check != "entry") {
          this.data.push({ "Addon":   this.AddOns , "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName +" " + (this.VarianceName == "" || this.VarianceName == null? "" :"-" + this.VarianceName), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": this.itmPrice, "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt,sTax:this.Stax,hTax:this.HTax,oTax:this.Otax,discountQuan:this.DiscountQuan });
        }


      }
      else {
        this.data.push({ "Addon":   this.AddOns , "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL,"itemName": this.ItemName +" " + (this.VarianceName == "" || this.VarianceName == null? "" :"-" + this.VarianceName), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": this.itmPrice, "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt,sTax:this.Stax,hTax:this.HTax,oTax:this.Otax ,discountQuan:this.DiscountQuan});
      }

    }

    else {
      this.data = [{ "Addon":   this.AddOns , "Quan": Quan, "MenuVarianceId": this.MenuVarianceId, "ImageUrl": this.ItmImageURL, "itemName": this.ItemName +" " + (this.VarianceName == "" || this.VarianceName == null? "" :"-" + this.VarianceName), "CouponAmt": this.CouponAmt, "couponType": this.itmCouponType, "price": this.itmPrice, "orginalpric": this.itmPrice, "couponAmt": this.CouponAmt,sTax:this.Stax,hTax:this.HTax,oTax:this.Otax ,discountQuan:this.DiscountQuan}];
    }
    var resid=   localStorage.getItem('ResturntId');

  
    localStorage.clear();
    localStorage.setItem('ResturntId',resid);
    this._storageService.setItem('CartItem',JSON.stringify(this.data));
   // localStorage.setItem('CartItem', JSON.stringify(this.data));
    //localStorage.setItem('Addon', tes);
    alert("Product Added In Your Cart.");
   // window.location.reload();
    //setTimeout(() => {
    //window.location.href = "";
    //}, 2000);

    return false;
  }

  AddonCartitemsRelated(item: any) {
    debugger;
    this.addtocartitem = item;
    //this.modalService.dismissAll(Addon);
    //var tes = this.AddonText;
    var list = this.addtocartitem;
    var Quan = 1;
    if(item.adddon1 == undefined){
      this.AddOns=[];
    }
    
    if(item.adddon != undefined){
      if(this.AddOns.length == undefined || this.AddOns.length ==0){
        this.AddOns = [{ Addon: item.adddon,prize : 0 }];
      }
      else{
        this.AddOns.push({ Addon: item.adddon,prize : 0 });
      }
     
      }
    this.data = JSON.parse(localStorage.getItem('CartItem'));
    var check = null;
    if (this.data != null) {

      if (this.data.length != 0) {
        for (var i = this.data.length - 1; i >= 0; i--) {
          if (this.data[i].MenuVarianceId == this.addtocartitem.menuVariance) {
            check = "entry";
            Quan = Quan + this.data[i].Quan;
            this.data.splice(i, 1);

            this.data.push({ Addon: this.AddOns, Quan: this.addtocartitem.quan, MenuVarianceId: this.addtocartitem.menuVariance, ImageUrl: this.addtocartitem.imageUrl, itemName: this.addtocartitem.itemName, couponAmt: this.addtocartitem.discountAmt, couponType: this.addtocartitem.discountType, price: (this.addtocartitem.price), orginalpric: this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax });
          }

        }
        if (check != "entry") {
          this.data.push({ Addon:this.AddOns, Quan: this.addtocartitem.quan, MenuVarianceId: this.addtocartitem.menuVariance, ImageUrl: this.addtocartitem.imageUrl, itemName: this.addtocartitem.itemName, couponAmt: this.addtocartitem.discountAmt, couponType: this.addtocartitem.discountType, price: this.addtocartitem.price, orginalpric: this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax });
        }


      }
      else {
        this.data.push({ Addon:this.AddOns, Quan: this.addtocartitem.quan, MenuVarianceId: this.addtocartitem.menuVariance, ImageUrl: this.addtocartitem.imageUrl, itemName: this.addtocartitem.itemName, couponAmt: this.addtocartitem.discountAmt, couponType: this.addtocartitem.discountType, price: this.addtocartitem.price, orginalpric: this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax });
      }

    }

    else {
      this.data = [{ Addon: this.AddOns, Quan: this.addtocartitem.quan, MenuVarianceId: this.addtocartitem.menuVariance, ImageUrl: this.addtocartitem.imageUrl, itemName: this.addtocartitem.itemName, couponAmt: this.addtocartitem.discountAmt, couponType: this.addtocartitem.discountType, price: this.addtocartitem.price, orginalpric: this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax }];
    }


    var resid = localStorage.getItem('ResturntId');
    localStorage.clear();
    this._storageService.setItem('CartItem',JSON.stringify(this.data));
   // localStorage.setItem('CartItem', JSON.stringify(this.data));
    //localStorage.setItem('Addon', tes);
    localStorage.setItem('ResturntId', resid);
    alert("Selected Items added to Cart");
    window.location.reload();
    //window.location.href="";
    // return false;
  }
  varianceClick(varianceId, Price, imageurl,FavId,name) {
    debugger;
    this.itmPrice = Price;
    this.MenuVarianceId = varianceId;
    this.ItmImageURL = imageurl;
    this.VarianceName=name;
    if (this.AddOns.length != 0) {
      for (var i = this.AddOns.length - 1; i >= 0; i--) {
        this.itmPrice=    Number(this.itmPrice) + Number(this.AddOns[i].prize)  ;
      }
      }
   // this.FacId=FavId;
  }

  itemCatClick(type) {
    debugger;
    if (type == "Related") {
      $("#rela").css("border-bottom","3px solid  #F4650C");
      $("#rela1").css("border-bottom","unset");
      $("#rela2").css("border-bottom","unset");
      this.isShownRelatedItem = true;
      this.isShownSideDishes = false;
      this.isShownHouseSpl = false;
    }
    else if (type == "Side") {
      $("#rela1").css("border-bottom","3px solid  #F4650C");
      $("#rela").css("border-bottom","unset");
      $("#rela2").css("border-bottom","unset");
      this.isShownRelatedItem = false;
      this.isShownSideDishes = true;
      this.isShownHouseSpl = false;
    }
    else if (type == "HouseSpl") {
      
      $("#rela2").css("border-bottom","3px solid  #F4650C");
      $("#rela").css("border-bottom","unset");
      $("#rela1").css("border-bottom","unset");
      this.isShownRelatedItem = false;
      this.isShownSideDishes = false;
      this.isShownHouseSpl = true;
    }
  }
  addOnClick(customization,price) {
    debugger;
var vContain="";
    if (this.AddOns != null) {

      if (this.AddOns.length != 0) {
        for (var i = this.AddOns.length - 1; i >= 0; i--) {
          if (this.AddOns[i].Addon == customization) {
            debugger;
           this.itmPrice= Number(this.itmPrice) -Number(price);
            document.getElementById(customization).style.backgroundColor = '#F3F3F3';
            document.getElementById(customization).style.color = 'black';
            this.AddOns.splice(i, 1);
            vContain="Yes";
          }
          else {
            
          }
        }
        if(vContain=="")
        {
          this.itmPrice= Number(this.itmPrice) +Number(price);
          const element = document.getElementById(customization);
          document.getElementById(customization).style.backgroundColor = "#FF2F2F";
          element.style.backgroundColor = '#FF2F2F';
          element.style.color = 'white';
          this.AddOns.push({ Addon: customization,prize:price });
        }
      }
      else {
        this.itmPrice= Number(this.itmPrice) +Number(price);
        const element = document.getElementById(customization);
        document.getElementById(customization).style.backgroundColor = "#FF2F2F";
        element.style.backgroundColor = '#FF2F2F';
        element.style.color = 'white';
        this.AddOns = [{ Addon: customization,prize:price }];
      }
    }
    else {
      this.itmPrice= Number(this.itmPrice) +Number(price);
      const element = document.getElementById(customization);
      document.getElementById(customization).style.backgroundColor = "#FF2F2F";
      element.style.backgroundColor = '#FF2F2F';
      element.style.color = 'white';
      this.AddOns = [{ Addon: customization,prize:price }];
    }
  }
  addOnClick1(Items:any,customization,prize) {
    debugger;
  var vContain="";
  var price= Items.menuvariance["0"].price1;
    if (this.AddOns != null) {
  
      if (this.AddOns.length != 0) {
        for (var i = this.AddOns.length - 1; i >= 0; i--) {
          if (this.AddOns[i].Addon == customization) {
            debugger;
            Items.menuvariance["0"].price1= Items.menuvariance["0"].price1 -prize;
            document.getElementById(customization).style.backgroundColor = '#F3F3F3';
            document.getElementById(customization).style.color = 'black';
            this.AddOns.splice(i, 1);
            vContain="Yes";
          }
          else {
            
          }
        }
        if(vContain=="")
        {
          Items.menuvariance["0"].price1= Items.menuvariance["0"].price1 +prize;
          const element = document.getElementById(customization);
          document.getElementById(customization).style.backgroundColor = "#FF2F2F";
          element.style.backgroundColor = '#FF2F2F';
          element.style.color = 'white';
          this.AddOns.push({ Addon: customization,prize : prize });
        }
      }
      else {
        Items.menuvariance["0"].price1= Items.menuvariance["0"].price1 +prize;
        const element = document.getElementById(customization);
        document.getElementById(customization).style.backgroundColor = "#FF2F2F";
        element.style.backgroundColor = '#FF2F2F';
        element.style.color = 'white';
        this.AddOns = [{ Addon: customization,prize : prize }];
      }
    }
    else {
      const element = document.getElementById(customization);
      document.getElementById(customization).style.backgroundColor = "#FF2F2F";
      element.style.backgroundColor = '#FF2F2F';
      element.style.color = 'white';
      this.AddOns = [{ Addon: customization,prize : prize }];
      
    }
    Items.adddon1= this.AddOns;
  }
  Adddown(min,item) {
    debugger;
    if(item.quan !=1){
      item.quan=item.quan -1;
    }
   
  }
  Addup(max,item) {
    debugger;
  item.quan=item.quan +1;
  }
  AddcartQuant(item){
    debugger;
    if(item.quan != 0){
      item.quan= item.quan ;
    }
    else{
      item.quan=1;
          }
          var len = (item.quan).toString().length;
    if(len > 3){
      var numbert= Number(item.quan.toString().substring(0,3));
      item.quan =numbert;
    }
    
   
  }
  Foodlist(menu,qty,addon){
    window.location.href='/Food/'+menu +'/' + qty+'/'+addon;
  }
RelatedViewClick(item: any)
{
  var tes = item;
  this.MenuVarianceId=item.menuVariance;
  this.itmPrice = item.price;
  this.ItmImageURL = item.imageUrl;
  this.FacId=item.favId;
  this.SpecialComments=item.adddon;
  window.scroll(0, 0);
}
}
