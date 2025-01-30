import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewComponent implements OnInit {

  constructor(private modalService: NgbModal,private http:HttpClient) { }
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
  Reviewdata = [] as any;
  ReviewHistory= [] as any;
  Profilr= [] as any;
  GustStrn:string;
  ngOnInit(): void {
    var CustomarId= sessionStorage.getItem('CustomerId');
    var Gust=  sessionStorage.getItem('GuesId');
    this.GustStrn = Gust;
    var value=this.http.get(environment.apiUrl +'Myorder/Customerdetail?Customer_ID='+CustomarId+ '&Gust='+Gust).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
        this.Name = data["0"].name;
        this.EmailId=data["0"].emailId;
        this.Mobileno =data["0"].mobileNo;
        this.LastName=data["0"].endName;
        this.Profilr = data;
      }
     // this.check();
          });
          var value=this.http.get(environment.apiUrl +'Myorder/Review?customar_Id='+CustomarId+ '&Gust='+Gust).toPromise().then((data:any)=>{
            debugger;
            if(data.length !=0){
            this.Reviewdata= data;
            }
           // this.check();
                });

                var value=this.http.get(environment.apiUrl +'Myorder/ReviewHistory?customar_Id='+CustomarId+ '&Gust='+Gust).toPromise().then((data:any)=>{
                  debugger;
                  if(data.length !=0){
                  this.ReviewHistory= data;
                  }
                 // this.check();
                      });
              
    $("#History").click(function(){
      debugger;
    //  $(this).css("color","#9ed3c2");
$("#His").css("border-bottom", "3px solid #9ed3c2");
$("#His").css("color", "#9ed3c2");
$("#Reviw").css("border-bottom", "unset");
$("#Reviw").css("color", "black");
$("#Histoy1").css("display","none");
$("#Histoy").css("display","none");
$("#Revs").css("display","initial");
    });
    $("#Rev").click(function(){
      debugger;
    //  $(this).css("color","#9ed3c2");
$("#Reviw").css("border-bottom", "3px solid #9ed3c2");
$("#Reviw").css("color", "#9ed3c2");
$("#His").css("border-bottom", "unset");
$("#His").css("color", "black");
$("#Revs").css("display","none");
$("#Histoy").css("display","initial");
$("#Histoy1").css("display","initial");
    });
    $("#Revs").css("display","none");
    $("#Reviw").css("border-bottom", "3px solid #9ed3c2");
$("#Reviw").css("color", "#9ed3c2");
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
           if (vData == "Success") {
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


   reviewandrating(){
    var CustomarId= sessionStorage.getItem('CustomerId');
    var Gust=  sessionStorage.getItem('GuesId');
    var value=this.http.get(environment.apiUrl +'Myorder/Review?customar_Id='+CustomarId+ '&Gust='+Gust).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
      this.Reviewdata= data;
      }
     // this.check();
          });

          var value=this.http.get(environment.apiUrl +'Myorder/ReviewHistory?customar_Id='+CustomarId+ '&Gust='+Gust).toPromise().then((data:any)=>{
            debugger;
            if(data.length !=0){
            this.ReviewHistory= data;
            }
           // this.check();
                });
   }
 
   Ratings(ratingcount,varianceId){
     var Cus_Id =sessionStorage.getItem('CustomerId');
     var Gust=  sessionStorage.getItem('GuesId');
     var value=this.http.get(environment.apiUrl +'Myorder/Ratings?customar_Id='+Cus_Id + '&RatingCount='+ratingcount +'&ManuVariance='+varianceId +'&Gust='+Gust ).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
      this.Reviewdata= data;
      }
     // this.check();
          }).catch(function(data){
            debugger;
if(data == "Success"){
this.reviewandrating();
  alert("Rating Added SuccessFull");
  return;
}
else {
  alert("Rating Added Failed");
}
          });
   }

   open1(content,item ) {
 debugger;
 
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
