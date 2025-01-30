import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  Name: string;
  MobileNo: string;
  EmailId: string;
  Location: string;
  Message: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }


  SendMail() {
    var vName = this.Name;
    var vMobileNo = this.MobileNo;
    var vEmailId = this.EmailId;
    var vLocation = this.Location;
    var vMessage = this.Message;


    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    if (vName == undefined || vName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Your Name.";
      return false;
    }

    if (vMobileNo == undefined || vMobileNo == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Your MobileNo.";
      return false;
    }
    //var regMobile = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;

    if (regMobile.test(vMobileNo) == false) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valid MobileNo.";
      return false;
    }

    if (vEmailId != undefined && vEmailId != "") {
      //<--Email Validation-->
      var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if (regEmail.test(vEmailId) == false) {
        this.isShownError = false;
        this.ErrorMsg = 'EmailID is not valid';
        return false;

      }
    }

    if (vLocation == undefined || vLocation == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please enter the Location.";
      return false;
    }
    if (vMessage != vMessage) {
      this.isShownError = false;
      this.ErrorMsg = "Please enter the Message.";
      return false;
    }
    let params = new HttpParams();
    params = params.append('Name', vName);
    params = params.append('EmailId', vEmailId);
    params = params.append('MobileNo', vMobileNo);
    params = params.append('Location', vLocation);
    params = params.append('Message', vMessage);


    var value = this.http.get(environment.apiUrl + 'customerdetails/contactUsMail', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        // if (data.length != 0) {
        //   //this.ItemsArrayMenu=data;
        //   var vData = data;
        //   if (vData == "success") {
        //     this.isShownSuccess = false;
        //     this.SuccessMsg = "Mail Sent Successfully.";
        //   }
        //   else {
        //     this.isShownError = false;
        //     this.ErrorMsg = "Mail Sent Failed,Please try Again.";
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
          this.isShownSuccess = false;
          this.SuccessMsg = "Mail Sent Successfully.";
          this.Name = "";
          this.MobileNo = "";
          this.EmailId = "";
          this.Location = "";
          this.Message = "";
        }
        else {
          this.isShownError = false;
          this.ErrorMsg = "Mail Sent Failed,Please try Again.";
        }
      });

  }
  onKeypressMobileNo(event: any) {
    debugger;
    // console.log(event.target.value);
    // var vValue=event.target.value;
    // if(this.MobileNo!=undefined && this.MobileNo!=""){
    // var vlength=this.MobileNo.length;
    // if(vlength==3)
    // event.target.value="("+event.target.value+")";

    // }
  }
  onKeyUp(x) {
    debugger;
    var vv = x.key;
  }
  onChange(event: any): void {
    debugger;
    var vVal = this.MobileNo.toString();
    var vlength = vVal.toString().length;
    var vValSub = "((";
    if (vlength == 3) {
      this.MobileNo = "(" + vVal + ")";
      var vcheck=this.MobileNo.indexOf(vValSub);
      if (vcheck != -1) {
        var vreplaceVal1 = this.MobileNo.replace('(', '');
        var vreplaceVal2 = vreplaceVal1.replace('(', '');
        var vreplaceVal3 = vreplaceVal2.replace(')', '');
        this.MobileNo=vreplaceVal3;
      }
    }
    else if (vlength == 8)
      this.MobileNo = vVal + "-";
  }
}
