import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import{ HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrderComponent implements OnInit {
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
  OrderDetails=[] as any;
  ItemPrice=[] as any;
  OrderId : number;
  OrderDate :number;
  TotalAmt:number;
  CouponAmt:number;
  Coup:number;
  TaxAmt:number;
  TipsAmt:number;
  SubTotal:number;
  Res_Name:string;
  Ordero:string;
  DeliveryAmount:number;
  OrderTotal:number;
  NetPay:number;

  delFirstName : string;
  delMobile:string;
  delAddress1:string;
  delAddrees2:string;
  delCity:string;
  delstate:string;
  delZip :string;
  delEmail :string;
  public progress: number;
  Profilr =[] as any;
  public message: string;
  activeTab="myOrders";
  GustStrn:string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private modalService: NgbModal,private http:HttpClient,private _DomSanitizationService: DomSanitizer) { }

  ngOnInit(): void {
    debugger;
    this.SubTotal=0;
    this.Coup=0;
    this.CouponAmt=0;
    var CustomarId= sessionStorage.getItem('CustomerId');
  var Gust=  sessionStorage.getItem('GuesId');
  this.GustStrn = Gust;
    var value=this.http.get(environment.apiUrl +'Myorder/Customerdetail?Customer_ID='+CustomarId + '&Gust='+Gust).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
        this.Name = data["0"].name;
        this.EmailId=data["0"].emailId;
        this.Mobileno =data["0"].mobileNo;
        this.LastName=data["0"].endName;
        this.Profilr=data;
      }
     // this.check();
          });
          var Reorder = this.http.get(environment.apiUrl +'Myorder/Reorder?Customer_ID='+CustomarId +'&User=' +Gust ).toPromise().then((data:any)=>{
            debugger;
            if(data.length !=0){
             this.ReOrder=data;
            }
           // this.check();
                });
  }
 OrderDetailsList(){
  var CustomarId= sessionStorage.getItem('CustomerId');
  this.http.get(environment.apiUrl +'Myorder/OrderDetailsList?Customer_ID='+CustomarId  ).toPromise().then((data:any)=>{
    debugger;
    if(data.length !=0){
     this.OrderDetails=data;
    }
   // this.check();
        });
 }
  Profile(){
    var CustomarId= sessionStorage.getItem('CustomerId');
    var Gust=  sessionStorage.getItem('GuesId');
    this.GustStrn = Gust;
      var value=this.http.get(environment.apiUrl +'Myorder/Customerdetail?Customer_ID='+CustomarId + '&Gust='+Gust).toPromise().then((data:any)=>{
        debugger;
        if(data.length !=0){
          this.Name = data["0"].name;
          this.EmailId=data["0"].emailId;
          this.Mobileno =data["0"].mobileNo;
          this.LastName=data["0"].endName;
          this.Profilr=data;
        }
       // this.check();
            });
  }
  Reorder(item){
    localStorage.setItem('ReOrderId',item); 
     window.location.href='ReOrder';
    
  }

  public uploadFile = (files) => {
    debugger;
    if (files.length === 0) {
      return;
    }
    debugger;
    var cusId= sessionStorage.getItem('CustomerId');
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.http.post(environment.apiUrl +'Myorder/UploadContent?Customer_ID='+cusId, formData, {reportProgress: true, observe: 'events'})
      .subscribe(data => {
        debugger;
        this.Profile();
        // if (event.type === HttpEventType.UploadProgress)
        //   this.progress = Math.round(100 * event.loaded / event.total);
        // else if (event.type === HttpEventType.Response) {
        //   this.message = 'Upload success.';
        //   this.onUploadFinished.emit(event.body);
        // }
      });
  }

  UpdateaddressClick(){


   this.isShownErrorAddress=true;
   this.isShownSuccessAddress=true;
   var cusId= sessionStorage.getItem('CustomerId');
    var Name = this.Name;
    var LastName= this.LastName;
    var EmailId = this.EmailId;
    var MobileNo =this.Mobileno;
    if (Name == undefined || Name == "") {
      this.isShownErrorAddress = false;
      this.AddressErrorMsg = "Please Enter Your FirstName.";
      return false;
    }
    if (LastName == undefined || LastName == "") {
      this.isShownErrorAddress = false;
      this.AddressErrorMsg = "Please Enter Your LastName.";
      return false;
    }
    if (MobileNo == undefined || MobileNo == "") {
      this.isShownErrorAddress = false;
      this.AddressErrorMsg = "Please Enter Your MobileNo.";
      return false;
    }
   
    var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;
    if (regMobile.test(MobileNo) == false) {
      this.isShownErrorAddress = false;
      this.AddressErrorMsg = "Please Enter The Valid MobileNo. Format Should like (123)456-7890";
      return false;
    }
    if (EmailId != undefined && EmailId != "") {
      //<--Email Validation-->
      var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if (regEmail.test(EmailId) == false) {
        this.isShownErrorAddress = false;
        this.AddressErrorMsg = 'EmailID is not valid';
        return false;

      }
    }
    this.modalService.dismissAll("CustomerDetails");
    let params = new HttpParams();
    params = params.append('FirstName', Name);
    params = params.append('LastName', LastName);
    params = params.append('EmailId', EmailId);
    params = params.append('MobileNo', MobileNo);
    params = params.append('CustomerId', cusId);
    var value = this.http.get(environment.apiUrl + 'Myorder/Addresschange', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //this.ItemsArrayMenu=data;
          var vData = data;
          if (data["0"].name == "Success") {
            
            
         
            this.isShownSuccessAddress = false;
            this.AddressSuccessMsg = "Update Profile Successfully.";
            alert("Update Profile Successfully.");
          }
          else {
            this.isShownErrorAddress = false;
            this.AddressErrorMsg = "Update Profile Failed Please Try Again.";
            alert("Update Profile Failed Please Try Again.");
          }

        }
        else {
        };
      });

  }

  open1(content,item ) {
debugger;
var Reorder = this.http.get(environment.apiUrl +'Myorder/OrderDetails?OrderId='+item).toPromise().then((data:any)=>{
  debugger;
  if(data.length !=0){
    this.SubTotal=0;
    for(let i=0 ; i< data.length ; i++){
      this.SubTotal += (data[i].iTEMprice) * (data[i].qty);
      if(data[i].couponPer != null)
      {
this.Coup +=Number (data[i].couponPer)/100;
      }
    }
   this.ItemPrice=data;
   this.OrderId=data["0"].orderId;
   this.OrderDate=data["0"].orderDate;
   this.TotalAmt=data["0"].amountPaid;
   this.CouponAmt= data["0"].disAmt
   this.Res_Name= data["0"].resturantName;
   this.Ordero= data["0"].order;
   this.TipsAmt=data["0"].tipsAmt;
   this.SubTotal =  this.SubTotal - this.CouponAmt -this.Coup;
this.DeliveryAmount =data["0"].deliveryAmt;
this.TaxAmt= data["0"].taxAmt;
this.OrderTotal =  this.SubTotal  + this.DeliveryAmount + this.TaxAmt;
this.NetPay = this.OrderTotal + this.TipsAmt;
this.delFirstName=data["0"].name;
this.delAddress1 = data["0"].addressLine1;
this.delAddrees2=data["0"].addressLine2;
this.delEmail =data["0"].emailId;
this.delMobile=data["0"].mobileNo;
this.delZip=data["0"].zip;
this.delstate=data["0"].state;
this.delCity =data["0"].city;
  }
 // this.check();
      });

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }
  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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
  onprofileMobileChange(event: any): void {
    debugger;
    var vVal=this.Mobileno.toString();
    var vlength=vVal.toString().length;
   if(vlength==3)
   this.Mobileno="("+vVal+")";
   else if(vlength==8)
   this.Mobileno=vVal+"-";
  }
}
