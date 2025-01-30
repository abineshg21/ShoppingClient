import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import{ HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyAddressComponent implements OnInit {

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
  EditAddress = [] as any;
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
  AddFirstName:string;
  AddAddLine1:string;
  AddLine2:string;
  AddCity:string;
  AddState:string;
  AddZip:string;
  AddMobile:string;
  Profilr= [] as any;
  Custdelivery:number;
  ChangeAddErrorMsg:string;
  ChangeAddSuccessMsg:string;
  GustStrn:string;
Repeat(){
  var CustomarId= sessionStorage.getItem('CustomerId');
  var Gust=  sessionStorage.getItem('GuesId');
  var value=this.http.get(environment.apiUrl +'Myorder/EditAddressDetail?Customer_ID='+CustomarId+'&Gust='+Gust).toPromise().then((data:any)=>{
    debugger;
    if(data.length !=0){
      this.EditAddress=data;
    }
   // this.check();
        });
}
  ngOnInit(): void {
    this.Repeat();
    var Gust=  sessionStorage.getItem('GuesId');
    this.GustStrn = Gust;
    var CustomarId= sessionStorage.getItem('CustomerId');
    var value=this.http.get(environment.apiUrl +'Myorder/Customerdetail?Customer_ID='+CustomarId+ '&Gust='+Gust).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
        this.Name = data["0"].name;
        this.EmailId=data["0"].emailId;
        this.Mobileno =data["0"].mobileNo;
        this.LastName=data["0"].endName;
        this.Profilr= data;
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
  open1(content,item ) {
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
      open(content) {
        this.AddNewFirstName="";
        this.AddNewLine1="";
        this.AddNewLine2="";
         this.AddnewCity="";
        this.AddNewState="";
        this.AddNewZip="";
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

       Delete(itemId){
        var value = this.http.get(environment.apiUrl + 'Myorder/DeleteAddress?Cus_Id='+ itemId).toPromise().then(
          (data: any) => {
            debugger;
            if (data.length != 0) {
              if(data["0"].name =="Success"){
                this.Repeat();
                alert("Address Removed Successfully");
              }
            }
            else{
              alert("Address Removed Failure");
            }
          
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
        this.modalService.dismissAll("ChangeAddress");
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
              if(data["0"].name =="Success"){
                this.Repeat();
                var vFirstName = "";
                var vLstName ="";
                var vEmailId = "";
                var vMobileNo = "";
                var vPassword ="";
                var vConPass = "";
                alert("Address Updated Successfully");
              }
            }
            else{
              var vFirstName = "";
              var vLstName ="";
              var vEmailId = "";
              var vMobileNo = "";
              var vPassword ="";
              var vConPass = "";
              alert("Address Updated Failure");
            }
          
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
        var regMobile=/^\d{5}$/;

        if (regMobile.test(vConPass) == false) {
          this.isShownErrorAddnew = false;
          this.AddnewErrorMsg = "Please Enter The Valid Zip code. ";
          return false;
        }
        this.modalService.dismissAll("AddNewAddress");
        var Customar_Id= sessionStorage.getItem('CustomerId');
        let params = new HttpParams();
        params = params.append('FirstName', vFirstName);
        params = params.append('Address1', vLstName);
        params = params.append('Address12', vEmailId);
        params = params.append('City', vMobileNo);
        params = params.append('State', vPassword);
        params = params.append('Zip', vConPass);
        params=params.append('CusId',Customar_Id)
        var value = this.http.get(environment.apiUrl + 'Myorder/InsertAddress', { params: params }).toPromise().then(
          (data: any) => {
            debugger;

            if (data.length != 0) {
              if(data["0"].name =="Success"){
               this.AddNewFirstName="";
                this.AddNewLine1="";
                this.AddNewLine2="";
                 this.AddnewCity="";
                this.AddNewState="";
                this.AddNewZip="";
                this.Repeat();
                alert("Address Added Successfully");
              }
            }
            else{
              this.AddNewFirstName="";
              this.AddNewLine1="";
              this.AddNewLine2="";
               this.AddnewCity="";
              this.AddNewState="";
              this.AddNewZip="";
              alert("Address Added Failed");
            }
          
          });
      
      
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
