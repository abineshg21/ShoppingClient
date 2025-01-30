import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  Special:boolean =true;
  Soup:boolean=true;
  DISHColor:boolean =true;
  DrinkColor:boolean =true;
  Lunch:boolean =true;
  Appetizers=true;
  Supreme=true;
  HouseSpl=true;
  Especial=true;
  closeResult:string;
  Quesad =true;
  Carne =true;
  More=true;
  Filter=true;
  Load=true;
  AddonText:string;
  SplArray:[];
  FilterData=[] as any;
  ItemsArrayMenu:[];
  addtocartitem=[] as any;
  addonitem:[];
  AllArray=[] as any;
  LunchArray:[];
  AppArray=[] as any;
  HouseArray=[] as any;
  SoupArray=[] as any;
   data=[] as any;
   pricefilter=[] as any;
   Pricesec=[] as any;
   FromPrize : any;
   ToPrize :any;
   categoryName :string;
   SupremeArray=[] as any;
   PoultryArray=[] as any;
   RemainAllArray=[] as any;
   Poul=true;
   Pork=true;
   Vegetarian=true;
   FromSea=true;
   Combin=true;
   ACarte=true;
   Dessert=true;
   AddOns=[] as any;
   Little=true;
   DessertArray= [] as any;
      discoun=[] as any;
   PorkArray=[] as any;
   QualitiesArray =[] as any;
   menuid:string;
   menuname:string;
  constructor(private modalService: NgbModal, private route: ActivatedRoute,private http:HttpClient,private _storageService: StoragedetectComponent) { 
    this.menuid=this.route.snapshot.params.id;
    this.menuname=this.route.snapshot.params.text;
  }
  Allcilick(itrm)
  {
    debugger;
    if(itrm.viewAll =="less"){
      itrm.viewAll="All";
    }
    else{
      itrm.viewAll="less";
    }

  }
  LoadDetail(){
    this.More =this.More ? false :true;
  }
  
  menuopen(menu) {
    debugger;
    var x = document.getElementById(menu);

    if (x.style.display == "block") {
        x.style.display = "none";
      
    }
    else {
        x.style.display = "block";
    }
 }

ShowHidePrice (menu) {
  debugger;
  var x = document.getElementById(menu);

  if (x.style.display == "block") {
      x.style.display = "none";
      document.getElementById("priceplus").className = "glyphicon glyphicon-plus pull-right";
  }
  else {
      x.style.display = "block";
      document.getElementById("priceplus").className = "glyphicon glyphicon-minus pull-right";
  }
}
ShowHideCategory(menu) {
  debugger;
  var x = document.getElementById(menu);

  if (x.style.display == "block") {
      x.style.display = "none";
      document.getElementById("Categoryplus").className = "glyphicon glyphicon-plus pull-right";
  }
  else {
      x.style.display = "block";
      document.getElementById("Categoryplus").className = "glyphicon glyphicon-minus pull-right";

  }
}
ShowHidePayment (menu) {
  debugger;
  var x = document.getElementById(menu);

  if (x.style.display == "block") {
      x.style.display = "none";
      document.getElementById("Paymentplus").className = "glyphicon glyphicon-plus pull-right";
  }
  else {
      x.style.display = "block";
      document.getElementById("Paymentplus").className = "glyphicon glyphicon-minus pull-right";
  }
}
  Dish(){
    debugger;
    this.DISHColor =true;
    this.DrinkColor=true;
  }

  Drink(){
    debugger;
    this.DrinkColor=false;
    this.DISHColor =false;
  }
 
  All(){
    debugger;
this.Special=this.Special ? false : true;

  }
  Soupless(){
    this.Soup= this.Soup ? false : true;
  }
  SpecialLess(){
    this.Special= this.Special ? false : true;
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
    if (this.AddOns.length != 0) {
      for (var i = this.AddOns.length - 1; i >= 0; i--) {
        item.menuvariance["0"].price1=   item.menuvariance["0"].price1 + this.AddOns[i].prize ;
      }
      }
  }
  Addtocart(item:any){
    debugger;

  }
  FirstArray(){
    var resid=  localStorage.getItem('ResturntId');
    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    var value= this.http.get(environment.apiUrl + 'Menuitem/Allitemstest?Cus_Id='+UserId +'&GustId='+GustId +'&res='+resid+'&System=Web').toPromise().then(
      (data:any)=> {
        debugger;
      if(data.length!=0 ){
        this.AllArray=data;
      }
     
      });
      var UserId=sessionStorage.getItem('CustomerId');
      var GustId= sessionStorage.getItem('GuesId');
      var value= this.http.get(environment.apiUrl + 'Menuitem/Remainingitemstest?Cus_Id='+UserId +'&GustId='+GustId +'&res='+resid +'&System=Web').toPromise().then(
        (data:any)=> {
          debugger;
        if(data.length!=0 ){
          this.RemainAllArray=data;
        }
       
        });
  }
  customOptions: OwlOptions;
  ngOnInit(): void {
 debugger;

 window.scrollTo(0, 0);
if( this.menuid != "" && this.menuid != null){
  this.Filter =true;
  if(Number (this.menuid) > Number(6))
  {
    this.More=true; 
  
   self.location.href="/#"+this.menuname;
  }
  else{
    //window.location.href="/#"+this.menuname;
   // location.assign("/#" + this.menuname);
  // parent.location.hash = "/#" + this.menuname;
 // window.open("/#" + this.menuname, "_self");
  // window.open("/#" + this.menuname);

  self.location.href="/#"+this.menuname;
  }
}
this._storageService.watchStorage().subscribe((data:string) => {
  debugger;
  this.FilterMenu();
  this.FirstArray();
 })
if(this.menuname != "" && this.menuname != undefined){
 debugger;
 this.More=false; 
}

    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
   var resid=  localStorage.getItem('ResturntId');
  this.FilterMenu();
  this.FirstArray();

  const totalItems = this.AllArray?.Menuitem?.length || 0;
  const enableLoop = totalItems > 4;
  this.customOptions = {
    loop: enableLoop, // Enable loop only if there are more than 4 items
    nav: true,
    margin: 39,
    stagePadding: 10,
    dots: true,
    navText: [
      "<img src='../../assets/Images/icon/left-slider.png' style='position:absolute;top:41%;left:-30px' />",
      "<img src='../../assets/Images/icon/right-slider.png' style='position:absolute;top:41%;left:-30px'/>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: Math.min(totalItems, 4), // Adjust the number of items to the total available
      },
    },
  };

  }
  handleoffer($event,offer){
    debugger;
    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    if ($event.target.checked === true) {



      if( offer== "Discount" )
      {

if( this.FilterData != 0){
for(let i=0;i< this.FilterData ;i++){
  if(this.FilterData[i].couponAmt  != 0){
    if(this.discoun.length != 0){
      this.discoun.push({"couponAmt":this.FilterData[i].couponAmt,"couponAmt1":this.FilterData[i].couponAmt1, "couponType":this.FilterData[i].couponType, "description":this.FilterData[i].description,"discount":this.FilterData[i].discount,"favId":this.FilterData[i].favId, "imageUrl":this.FilterData[i].imageUrl,"itemName":this.FilterData[i].itemName,"menuItemId":this.FilterData[i].menuItemId,"menuVariance":this.FilterData[i].menuVariance,"newPrice":this.FilterData[i].newPrice,"price":this.FilterData[i].price,"quan":this.FilterData[i].quan});
    }
else{
this.discoun=this.FilterData(i,1);
}
  }
}
this.FilterData = this.discoun;
}
else{
  var value= this.http.get(environment.apiUrl + 'Filter/FOffer?Type='+offer + '&Cus_Id='+UserId +'&GustId='+GustId).toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
      this.Filter=false;
      this.FilterData=data;
    }
    else{
    };
    });
}

        
      }
      else{
        this.FilterData=[];
      }
    }
    else{
      this.FilterData=this.pricefilter;
    }
  }
  handleSelected($event,item) {
    debugger;
    if ($event.target.checked === true) {
      this.FromPrize =null ;
this.ToPrize =null;
if(this.FilterData.length !=0 ){

  if(this.Pricesec.length != 0){
    this.Pricesec=[];
    this.FilterData=this.pricefilter;
  }
}
   var tet=item.categoryName;
   var UserId=sessionStorage.getItem('CustomerId');
   var GustId= sessionStorage.getItem('GuesId');
   var resid=  localStorage.getItem('ResturntId');
   var value= this.http.get(environment.apiUrl + 'Filter/FCategory?Category='+item.categoryName +'&Cus_Id='+ UserId+'&GustId='+GustId +'&ResId='+resid).toPromise().then(
    (data:any)=> {
      debugger;
      var testde =[];
    if(data.length!=0 ){
      this.Filter=false;
      var localget = localStorage.getItem('Filtercat');
      if( this.FilterData == null){
        this.FilterData=data;
        localStorage.setItem('Filtercat',JSON.stringify(data));
       
      }
      else{

        testde =this.FilterData.concat(data);
       
        this.FilterData=testde ;
      }
     
    }
    else{
    };
    });
 }
 else{
  var tet=item.categoryName;
  var UserId=sessionStorage.getItem('CustomerId');
  var GustId= sessionStorage.getItem('GuesId');
  var resid=  localStorage.getItem('ResturntId');
  var value= this.http.get(environment.apiUrl + 'Filter/FCategory?Category='+item.categoryName +'&Cus_Id='+ UserId+'&GustId='+GustId +'&ResId='+resid).toPromise().then(
   (data:any)=> {
     debugger;
     var testde =[];
   if(data.length!=0 ){
     this.Filter=false;
     var localget = localStorage.getItem('Filtercat');
     if( this.FilterData == null){
       this.FilterData=data;
       localStorage.setItem('Filtercat',JSON.stringify(data));
      
     }
     else{
      for (var i = 0; i < this.FilterData.length ; i++) {
        for(var  j=0;j < data.length;j++){
          var filvar = this.FilterData[i].menuVariance ;
          var dava = data[j].menuVariance;
          if (this.FilterData[i].menuVariance == data[j].menuVariance) {
           debugger;
            this.FilterData.splice(i, 1);
            i=i-1;
            break;
           
          }
        }
        
    }
    if(this.FilterData.length != 0){
      this.FilterData= this.FilterData;
    }
    else{
      this.Filter=true;
     this.FirstArray();
    }
     }
    
   }
   else{
   };
   });
 }
}

addOnClick(Items:any,customization,prize,customizeId) {
  debugger;
var vContain="";
var price= Items.menuvariance["0"].price1;
  if (this.AddOns != null) {

    if (this.AddOns.length != 0) {
      for (var i = this.AddOns.length - 1; i >= 0; i--) {
        if (this.AddOns[i].Addon == customization) {
          debugger;
          Items.menuvariance["0"].price1= Items.menuvariance["0"].price1 -prize;
          document.getElementById(customizeId).style.backgroundColor = '#F3F3F3';
          document.getElementById(customizeId).style.color = 'black';
          this.AddOns.splice(i, 1);
          vContain="Yes";
        }
        else {
          
        }
      }
      if(vContain=="")
      {
        Items.menuvariance["0"].price1= Items.menuvariance["0"].price1 +prize;
        const element = document.getElementById(customizeId);
        document.getElementById(customizeId).style.backgroundColor = "#FF2F2F";
        element.style.backgroundColor = '#FF2F2F';
        element.style.color = 'white';
        this.AddOns.push({ Addon: customization,prize : prize,CusId: customizeId });
      }
    }
    else {
      Items.menuvariance["0"].price1= Items.menuvariance["0"].price1 +prize;
      const element = document.getElementById(customizeId);
      document.getElementById(customizeId).style.backgroundColor = "#FF2F2F";
      element.style.backgroundColor = '#FF2F2F';
      element.style.color = 'white';
      this.AddOns = [{ Addon: customization,prize : prize,CusId: customizeId}];
    }
  }
  else {
    const element = document.getElementById(customizeId);
    document.getElementById(customizeId).style.backgroundColor = "#FF2F2F";
    element.style.backgroundColor = '#FF2F2F';
    element.style.color = 'white';
    this.AddOns = [{ Addon: customization,prize : prize,CusId: customizeId }];
    
  }
  Items.adddon1= this.AddOns;
}

FilterMenu(){
  var resid=  localStorage.getItem('ResturntId');
  var value= this.http.get(environment.apiUrl + 'Menu/Sub?RestaruntId='+resid +'&System=Web').toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
      this.ItemsArrayMenu=data;
    }
    });
}

PriceList(){
  debugger;
var from = this.FromPrize;
var to =this.ToPrize;
if(from ==null){
  alert("please enter from Prize");
  return false
}
if(Number(from) > Number(to)){
  alert("Please enter greater than from value to");
  return false; 
}
$("#MinIndex").val(Number(from));
$("#Maxindex").val(Number(to));
var demo=[] as any;
if(this.FilterData.length !=0 ){

  if(this.Pricesec.length != 0){
    this.Pricesec=[];
    this.FilterData=this.pricefilter;
  }
  else{
   
    this.pricefilter=this.FilterData; 
  }

for(let i=0; i<this.FilterData.length;i++ ){
  debugger;
  var tesr1=this.FilterData[i].price;
  if(Number(this.FilterData[i].price) >= Number(from) && Number(this.FilterData[i].price) <=Number(to)){
    debugger;
    //if(this.Pricesec ==undefined || this.Pricesec.length ==0){
      this.Pricesec.push({"couponAmt":this.FilterData[i].couponAmt,"couponAmt1":this.FilterData[i].couponAmt1, "couponType":this.FilterData[i].couponType, "description":this.FilterData[i].description,"discount":this.FilterData[i].discount,"favId":this.FilterData[i].favId, "imageUrl":this.FilterData[i].imageUrl,"itemName":this.FilterData[i].itemName,"menuItemId":this.FilterData[i].menuItemId,"menuVariance":this.FilterData[i].menuVariance,"newPrice":this.FilterData[i].newPrice,"price":this.FilterData[i].price,"quan":this.FilterData[i].quan});
   //  this.Pricesec = this.FilterData.slice(i,1);
    //this.Pricesec.push(this.FilterData.slice(i,1));  
  //}
}
}
this.FilterData=this.Pricesec;
}
else{
  var UserId=sessionStorage.getItem('CustomerId');
  var GustId= sessionStorage.getItem('GuesId');
  var resid=  localStorage.getItem('ResturntId');
  var value= this.http.get(environment.apiUrl + 'Filter/FPrize?Fprize='+from +'&TPrize='+ to + '&Cus_Id='+UserId +'&GustId='+GustId+'&ResId='+resid ).toPromise().then(
    (data:any)=> {
      debugger;
    if(data.length!=0 ){
      this.Filter=false;
      this.FilterData=data;
    }
    else{
    };
    });
}


}

  
  DirinkAndDish: OwlOptions = {
    loop: false,
    nav: true,
    margin:10,
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
        items: 4
      },
      940: {
        items: 7
      }
    },
  }
  AddonCartitems(Addon:any){
  debugger;
 
  this.modalService.dismissAll(Addon);
  var tes =Addon.adddon;
  var tes1 =Addon.adddon1;
     this.addtocartitem=Addon;
var Quan=Addon.quan;

if(Addon.adddon1 == undefined){
  this.AddOns=[];
}

if(Addon.adddon != undefined){
  if(this.AddOns.length == undefined || this.AddOns.length ==0){
    this.AddOns = [{ Addon: Addon.adddon,prize : 0 }];
  }
  else{
    this.AddOns.push({ Addon: Addon.adddon,prize : 0 });
  }
 
  }
    this.data=JSON.parse(localStorage.getItem('CartItem' ));
  var check=null;

  var test =Addon.menuvariance["0"].imageUrl1;
 
  if(this.data != null){
    
    if(this.data.length !=0){
      for (var i =   this.data.length - 1; i >= 0; i--) {
        var tes=Addon.menuvariance["0"].salestax;
        if (  this.data[i].MenuVarianceId == Addon.menuvariance["0"].menuVariance1) {
          check="entry";
          Quan= Quan+this.data[i].Quan;
          this.data.splice(i, 1);
          this.data.push({Addon: this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ?  "-" +Addon.menuvariance["0"].menuvarianceName1 :"") ,couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan});   
      //    this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price: (this.addtocartitem.price),orginalpric:this.addtocartitem.price});
        }
         
    }
    if(check != "entry"){
      this.data.push({Addon: this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName  +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ?  "-" +Addon.menuvariance["0"].menuvarianceName1 :""),couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan});  
      //  this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price});
    }
  

  }
  else{
    this.data.push({Addon: this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName  +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ?  "-" +Addon.menuvariance["0"].menuvarianceName1 :""),couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan});  
    //this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price});
  }

  }
  
    else{
    //  this.data=[{Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price}];
    this.data=[{Addon: this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName  +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ? "-" +Addon.menuvariance["0"].menuvarianceName1 :""),couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan}];  
  }

   
  var resid=   localStorage.getItem('ResturntId');
localStorage.clear();

localStorage.setItem('ResturntId',resid);
this._storageService.setItem('CartItem',JSON.stringify(this.data));

  //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
  //  localStorage.setItem('Addon',tes);
   // localStorage.setItem('ResturntId',resid);

    alert("Selected Items added to Cart");
    this.FirstArray();
  //  window.location.href="";
   // return false;
  }

  AddonCartitemsFilter(Addon:any){
    debugger;
   
    this.modalService.dismissAll(Addon);
    var tes =Addon.adddon;
       this.addtocartitem=Addon;
  var Quan=Addon.quan;
  if(Addon.adddon1 == undefined){
    this.AddOns=[];
  }
  
  if(Addon.adddon != undefined){
    if(this.AddOns.length == undefined || this.AddOns.length ==0){
      this.AddOns = [{ Addon: Addon.adddon,prize : 0 }];
    }
    else{
      this.AddOns.push({ Addon: Addon.adddon,prize : 0 });
    }
   
    }
      this.data=JSON.parse(localStorage.getItem('CartItem' ));
    var check=null;
  
//    var test =Addon.menuvariance["0"].imageUrl1;
   
    if(this.data != null){
      
      if(this.data.length !=0){
        for (var i =   this.data.length - 1; i >= 0; i--) {
          if (  this.data[i].MenuVarianceId == Addon.menuvariance) {
            check="entry";
            Quan= Quan+this.data[i].Quan;
            this.data.splice(i, 1);
        //    this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName +"-" + Addon.menuvariance["0"].menuvarianceName1,couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1});   
           this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName  +" " +(this.addtocartitem.varianceName != null && this.addtocartitem.varianceName != "" ?  "-" +this.addtocartitem.varianceName :""),couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price: (this.addtocartitem.price),orginalpric:this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
          }
           
      }
      if(check != "entry"){
       // this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName +"-" + Addon.menuvariance["0"].menuvarianceName1,couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1});  
          this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName +" " +(this.addtocartitem.varianceName != null && this.addtocartitem.varianceName != "" ?  "-" +this.addtocartitem.varianceName :""),couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
      }
    
  
    }
    else{
     // this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName +"-" + Addon.menuvariance["0"].menuvarianceName1,couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1});  
      this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName +" " +(this.addtocartitem.varianceName != null && this.addtocartitem.varianceName != "" ?  "-" +this.addtocartitem.varianceName :""),couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
    }
  
    }
    
      else{
      this.data=[{Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName +" " +(this.addtocartitem.varianceName != null && this.addtocartitem.varianceName != "" ?  "-" +this.addtocartitem.varianceName :""),couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan}];
    //  this.data=[{Addon:Addon.adddon,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName +"-" + Addon.menuvariance["0"].menuvarianceName1,couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1}];  
    }
  
     
    var resid=   localStorage.getItem('ResturntId');
  localStorage.clear();
  localStorage.setItem('ResturntId',resid);
this._storageService.setItem('CartItem',JSON.stringify(this.data));
    //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
      //localStorage.setItem('Addon',tes);
      //localStorage.setItem('ResturntId',resid);
      this.AddOns=[];
      alert("Selected Items added to Cart");
     // window.location.href="";
     // return false;
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
    
    Adddown(min,item) {
      debugger;
      // var Mynumber = parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) - 1;
      // ((document.getElementById("AddNumber") as HTMLInputElement).value) = String(Mynumber);
      // if (parseInt((document.getElementById("AddNumber") as HTMLInputElement).value) <= parseInt(min)) {
      //   (document.getElementById("AddNumber") as HTMLInputElement).value = min;
      // }
      if(item.quan !=1){
      //  item.price= item.price -item.orginalpric;
        item.quan=item.quan -1;
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
    item.quan=item.quan +1;
    }
    // AddcartQuant(item){
    //   debugger;
    //   if(item.quan != 0){
    //     item.quan= item.quan ;
    //   }
    //   else{
    //     item.quan=1;      
    //   }
    // }
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
  
}
