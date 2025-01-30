import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  closeResult: String;
  Login = true;
  UserName: string;
  Password: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  constructor(private modalService: NgbModal, private http: HttpClient) { }


  ngOnInit(): void {
  }
  open(content) {
    debugger;
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
  LoginClick() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vUserName = this.UserName;
    var vPassword = this.Password;
    if (vUserName == undefined || vUserName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Username.";
      return false;
    }
    if (vPassword == undefined || vPassword == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Password.";
      return false;
    }

    var value = this.http.get(environment.apiUrl + 'AdminCategory/GetLoginDetails?sUserName=' + vUserName + '&sPassword=' + vPassword).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {

          var vData = data;
          var vUserId = vData["0"].userId;
          var vUserName = vData["0"].firstName + " " + vData["0"].lastName;
          var vRights = vData["0"].rights;
          var vUserRole=vData["0"].roleName;
          var vRestaurant_ID=vData["0"].restaurant_ID;
          localStorage.clear();
          sessionStorage.setItem('UserId', vUserId);
          sessionStorage.setItem('UserName', vUserName);
          sessionStorage.setItem('Rights', vRights);
          sessionStorage.setItem('UserRole', vUserRole);
          sessionStorage.setItem('ResId', vRestaurant_ID);
          debugger;
          var vUR = vRights.split("|");
          for (var i = 0; i < vUR.length; i++) {
            var val = vUR[i];
            switch (val) {
              case "Menu-Read":
                localStorage.setItem('Menu-Read', "True");
                break;
              case "Menu-Write":
                localStorage.setItem('Menu-Write', "True");
                break;
              case "ViewOrder-Read":
                localStorage.setItem('ViewOrder-Read', "True");
                break;
              case "ViewOrder-Write":
                localStorage.setItem('ViewOrder-Write', "True");
                break;
              case "Waiter-Read":
                localStorage.setItem('Waiter-Read', "True");
                break;
              case "Waiter-Write":
                localStorage.setItem('Waiter-Write', "True");
                break;
              case "Table-Read":
                localStorage.setItem('Table-Read', "True");
                break;
              case "Table-Write":
                localStorage.setItem('Table-Write', "True");
                break;
              case "Category-Read":
                localStorage.setItem('Category-Read', "True");
                break;
              case "Category-Write":
                localStorage.setItem('Category-Write', "True");
                break;
              case "SubCategory-Read":
                localStorage.setItem('SubCategory-Read', "True");
                break;
              case "SubCategory-Write":
                localStorage.setItem('SubCategory-Write', "True");
                break;
              case "Discount-Read":
                localStorage.setItem('Discount-Read', "True");
                break;
              case "Discount-Write":
                localStorage.setItem('Discount-Write', "True");
                break;
              case "Coupon-Read":
                localStorage.setItem('Coupon-Read', "True");
                break;
              case "Coupon-Write":
                localStorage.setItem('Coupon-Write', "True");
                break;
              case "ResWorkHours-Read":
                localStorage.setItem('ResWorkHours-Read', "True");
                break;
              case "ResWorkHours-Write":
                localStorage.setItem('ResWorkHours-Write', "True");
                break;
              case "ResHoliday-Read":
                localStorage.setItem('ResHoliday-Read', "True");
                break;
              case "ResHoliday-Write":
                localStorage.setItem('ResHoliday-Write', "True");
                break;
              case "Tips-Read":
                localStorage.setItem('Tips-Read', "True");
                break;
              case "Tips-Write":
                localStorage.setItem('Tips-Write', "True");
                break;
              case "Tax-Read":
                localStorage.setItem('Tax-Read', "True");
                break;
              case "Tax-Write":
                localStorage.setItem('Tax-Write', "True");
                break;
              case "Rating-Read":
                localStorage.setItem('Rating-Read', "True");
                break;
              case "Rating-Write":
                localStorage.setItem('Rating-Write', "True");
                break;
              case "Reports-Read":
                localStorage.setItem('Reports-Read', "True");
                break;
                case "Printer-Read":
                localStorage.setItem('Printer-Read', "True");
                break;
              case "Printer-Write":
                localStorage.setItem('Printer-Write', "True");
                break;
                case "Printer-Read":
                localStorage.setItem('Setting-Read', "True");
                break;
              case "Setting-Write":
                localStorage.setItem('Setting-Write', "True");
                break;
                case "Extra-Write":
                localStorage.setItem('Extra-Write', "True");
                break;
                case "Extra-Read":
                localStorage.setItem('Extra-Read', "True");
                break;
            }
          }

          //localStorage.setItem('')
          window.location.href = '/AdminHome';
        }
        else {
          //window.location.href = '/AdminHome';
          this.isShownError = false;
          this.ErrorMsg = "Please Enter the Correct Username And Password.";
          return false;
        }

      });
  }
  viewPassword(){
    debugger;
    //var passwordInput = document.getElementById('txtPassword');
  //var passStatus = document.getElementById('pass-status');
  if ((document.getElementById('txtPassword') as HTMLInputElement).type == 'password')
  {
    (document.getElementById('txtPassword') as HTMLInputElement).type='text';
    (document.getElementById('pass-status') as HTMLInputElement).className='fa fa-eye-slash';
    //passStatus.className='fa fa-eye-slash';
  }
  else
  {
    (document.getElementById('txtPassword') as HTMLInputElement).type='password';
    (document.getElementById('pass-status') as HTMLInputElement).className='fa fa-eye';
    // passwordInput.type='password';
    // passStatus.className='fa fa-eye';
  }

  }

  Forgot() {
    this.Login = false;
  }
  login() {
    this.Login = true;
  }
}
