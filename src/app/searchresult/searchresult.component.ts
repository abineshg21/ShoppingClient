import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StoragedetectComponent } from '../storagedetect/storagedetect.component';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css'],
  
  encapsulation: ViewEncapsulation.None
})
export class SearchresultComponent implements OnInit {
  
  MoreDetails=true;
  SplArray:[];
  FromPrize : number;
   ToPrize :number;
  Search:string;
  AddOns= [] as any;
  pricefilter=[] as any;
  addtocartitem=[] as any;
  Pricesec=[] as any;
  closeResult:string;
  AddonText:string;
  data=[] as any;
  FilterData=[] as any;
  Filter=true;
  ItemsArrayMenu=[] as any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute,private http:HttpClient,private _storageService: StoragedetectComponent)  {
    this.Search=this.route.snapshot.params.searchtext;
   }
  LoadDetail(){
    this.MoreDetails=false;
  }
  FilterMenu(){
    var resid=  localStorage.getItem('ResturntId');
    var value= this.http.get(environment.apiUrl + 'Menu/Sub?RestaruntId='+resid).toPromise().then(
      (data:any)=> {
        debugger;
      if(data.length!=0 ){
        this.ItemsArrayMenu=data;
      }
      else{
      };
      });
  }
  AddonCartitems(Addon:any){
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
  
    var test =Addon.menuvariance["0"].imageUrl1;
   
    if(this.data != null){
      
      if(this.data.length !=0){
        for (var i =   this.data.length - 1; i >= 0; i--) {
          var tes=Addon.menuvariance["0"].salestax;
          if (  this.data[i].MenuVarianceId == Addon.menuvariance["0"].menuVariance1) {
            check="entry";
            Quan= Quan+this.data[i].Quan;
            this.data.splice(i, 1);
            this.data.push({Addon:this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ?  "-" +Addon.menuvariance["0"].menuvarianceName1 :"") ,couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan});   
        //    this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price: (this.addtocartitem.price),orginalpric:this.addtocartitem.price});
          }
           
      }
      if(check != "entry"){
        this.data.push({Addon:this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName  +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ?  "-" +Addon.menuvariance["0"].menuvarianceName1 :""),couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan});  
        //  this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price});
      }
    
  
    }
    else{
      this.data.push({Addon:this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName  +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ?  "-" +Addon.menuvariance["0"].menuvarianceName1 :""),couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan});  
      //this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price});
    }
  
    }
    
      else{
      //  this.data=[{Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName,couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price}];
      this.data=[{Addon:this.AddOns,Quan:Quan, MenuVarianceId:Addon.menuvariance["0"].menuVariance1, ImageUrl:Addon.menuvariance["0"].imageUrl1,itemName:Addon.itemName  +" " +(Addon.menuvariance["0"].menuvarianceName1 != null && Addon.menuvariance["0"].menuvarianceName1 != "" ? "-" +Addon.menuvariance["0"].menuvarianceName1 :""),couponAmt:this.addtocartitem.discountAmt,couponType:this.addtocartitem.discountType,price:Addon.menuvariance["0"].price1,orginalpric:Addon.menuvariance["0"].price1,sTax:Addon.salestax,hTax:Addon.hospitalitytax,oTax:Addon.othertax,discountQuan:Addon.discountQuan}];  
    }
  
     
    var resid=   localStorage.getItem('ResturntId');
  localStorage.clear();
  localStorage.setItem('ResturntId',resid);
  this._storageService.setItem('CartItem',JSON.stringify(this.data));
    //  localStorage.setItem('CartItem',JSON.stringify(this.data) );
      localStorage.setItem('Addon',tes);
      this.check();
      alert("Selected Items added to Cart");
    //  window.location.href="";s
     // return false;
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

    addOnClick(Items:any,customization,prize) {
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
    
  Fav(item:any){
    debugger;
    var tes = item;
       var UserId= sessionStorage.getItem('CustomerId');
       var Res=localStorage.getItem('ResturntId');
       var GustId= sessionStorage.getItem('GuesId');
       if(UserId ==null || UserId =="" ){
        if(GustId != null && GustId != ""){
         
        }else{
         alert("Please Sign in to Add Favuroite");
         return false;
        }
      }
       debugger;
       
        var value=this.http.get(environment.apiUrl +'Fav/Add?MenuVariance_ID='+item.menuVariance+'&UserId='+GustId+'&CustomerDetails_ID='+UserId+'&Qty='+item.quan+'&Restaurant_ID='+Res).toPromise().then((data:any)=>{
    debugger;
 
        }).catch((data: any) => {
          debugger;
          var vDataError = JSON.stringify(data.error.text);
          var vErrorMsg = vDataError.replace('"', '');
          var vErrorMsg1 = vErrorMsg.replace('"', '');
          if(vErrorMsg1 == "Success"){
            alert("Selected Item(s) added to Favourites");
            this.check();
          }else if(vErrorMsg1 =="Update"){
            alert("Selected Item(s) removed from Favourites");
            this.check();
          }
          
              });
      }
      debugger;
    
      check(){
        var Res= localStorage.getItem('ResturntId');
 var UserId=sessionStorage.getItem('CustomerId');
 var GustId= sessionStorage.getItem('GuesId');
    var value=this.http.get(environment.apiUrl +'MenuItem/Searchresult?search='+this.Search +'&ResId='+Res +'&User='+UserId +'&Gust='+GustId+'&System=Web').toPromise().then((data:any)=>{
debugger;  
if(data.length!=0 ){
  this.SplArray=data;
}
else{
  alert("No Product in Search Result");
};
    });
      }
  ngOnInit(): void {

    this.FilterMenu();
    var Res= localStorage.getItem('ResturntId');
 var UserId=sessionStorage.getItem('CustomerId');
 var GustId= sessionStorage.getItem('GuesId');
    var value=this.http.get(environment.apiUrl +'MenuItem/Searchresult?search='+this.Search +'&ResId='+Res +'&User='+UserId +'&Gust='+GustId+'&System=Web').toPromise().then((data:any)=>{
debugger;  
if(data.length!=0 ){
  this.SplArray=data;
}
else{
  alert("No Product in Search Result");
};
    });
    var vmenuShow1 = document.getElementById("Filter");
vmenuShow1.style.display = 'none';
var vCategoryShow = document.getElementById("menuCategory");
vCategoryShow.style.display = 'none';
var vmenuShow = document.getElementById("PriceShow");
vmenuShow.style.display = 'none';
var vmenuShow = document.getElementById("Payment");
vmenuShow.style.display = 'none';
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
   var value= this.http.get(environment.apiUrl + 'Filter/FCategory?Category='+item.categoryName +'&Cus_Id='+ UserId+'&GustId='+GustId).toPromise().then(
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
  var value= this.http.get(environment.apiUrl + 'Filter/FCategory?Category='+item.categoryName +'&Cus_Id='+ UserId+'&GustId='+GustId).toPromise().then(
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
      var Res= localStorage.getItem('ResturntId');
      var UserId=sessionStorage.getItem('CustomerId');
      var GustId= sessionStorage.getItem('GuesId');
         var value=this.http.get(environment.apiUrl +'MenuItem/Searchresult?search='+this.Search +'&ResId='+Res +'&User='+UserId +'&Gust='+GustId).toPromise().then((data:any)=>{
     debugger;  
     if(data.length!=0 ){
       this.SplArray=data;
     }
     else{
       alert("No Product in Search Result");
     };
         });
    }
   
     }
    
   }
   else{
   };
   });
 }
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
  this.debugger;
  
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
      else{
       
      
    //   var  demo1=(this.FilterData.splice(i,1));
       //  this.Pricesec.concat((demo1));
      
     
    }
  }
  this.FilterData=this.Pricesec;
  }
  else{
    var UserId=sessionStorage.getItem('CustomerId');
    var GustId= sessionStorage.getItem('GuesId');
    var value= this.http.get(environment.apiUrl + 'Filter/FPrize?Fprize='+from +'&TPrize='+ to + '&Cus_Id='+UserId +'&GustId='+GustId ).toPromise().then(
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
      this.data.push({Addon:Addon.adddon,Quan:Quan, MenuVarianceId:this.addtocartitem.menuVariance, ImageUrl:this.addtocartitem.imageUrl,itemName:this.addtocartitem.itemName  +" " +(this.addtocartitem.varianceName != null && this.addtocartitem.varianceName != "" ?  "-" +this.addtocartitem.varianceName :""),couponAmt:this.addtocartitem.couponAmt,couponType:this.addtocartitem.couponType,price:this.addtocartitem.price,orginalpric:this.addtocartitem.price,sTax:this.addtocartitem.salestax,hTax:this.addtocartitem.hospitalitytax,oTax:this.addtocartitem.othertax,discountQuan:this.addtocartitem.discountQuan});
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
    //     item.quan= 1 ;
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
