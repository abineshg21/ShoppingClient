import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WaiterComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'userName', 'mobileNo', 'Status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  Drop = true;
  Res_Id: number;
  ResArray = [] as any;
  FName: string;
  LName: string;
  MobileNo: string;
  SSNNo: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Zip: string;
  Description: string;
  UserName: string;
  Password: string;
  Activebutton = false;
  Activebutton1 = false;
  Image = [] as any;
  Saveshow = true;
  Saveshow1 =false;
  ErrorMsg: string;
  isShownError: boolean = false;
  isShownSuccess: boolean = false;
  userrole :string;
  SuccessMsg: string;
  StatusActive: string;
  file = [] as any;
  vRead:string;
  vWrite:string;
  UserRefId: number;
  UserRoles = [];
  UserRolesId: string;
  LoginUser: string;
  isDisabled = true;
  ExptWaiter = [] as any;
  @ViewChild('file') document: ElementRef;
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.userrole=sessionStorage.getItem('UserRole');
    this.Active("Active");
    this.ExportWaiter("Active");
    this.StatusActive = "Active";
    this.Res_Id = 0;
    this.loadScript('../../assets/js/Alert.js');
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    var ViewRes = this.http.get(environment.apiUrl + 'Holiday/Restaurent?UserId=1').toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        this.ResArray = data;

      }
    });
    this.BindUserRoletDDL();
    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser=vName+" ("+vRole+")";

    var vRole = sessionStorage.getItem('UserRole');
    if (vRole == "SuperAdmin") {
      this.isDisabled = false;
    }
    else {
      var vResId = sessionStorage.getItem('ResId');
      this.Res_Id = Number(vResId);
    }
    this.vRead = localStorage.getItem('Waiter-Read');
    this.vWrite = localStorage.getItem('Waiter-Write');
    if(this.vWrite ==null || this.vWrite == "" ){
    this.Saveshow=false;
    this.Saveshow1=false;
    }
  }
  Show() {
    this.Drop = false;
  }
  BindUserRoletDDL() {
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetUserroleForDDL').toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.UserRoles = data;
          this.UserRolesId = "0";
        }
        else {
        };
      });
  }
  public uploadFile = (files) => {
    debugger;
    this.isShownError = true;
    if (files.length === 0) {
      return;
    }
    debugger;
    var cusId = sessionStorage.getItem('CustomerId');
    let fileToUpload = <File>files[0];
    let size = fileToUpload.size / 1024 / 1024;
    if (size > 2) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Below 2 MB";
      return false;
    }

    var index = fileToUpload.name.lastIndexOf(".");
    var strsubstring = fileToUpload.name.substring(index, fileToUpload.name.length);

    if (strsubstring == '.pdf' || strsubstring == '.xlsx' || strsubstring == '.xls' || strsubstring == '.doc' || strsubstring == '.docx') {
      // debugger;
    }
    else {
      //  debugger;
      this.isShownError = false;
      this.ErrorMsg = "Please Choose valid file Type";
      return false;
    }
    // const formData = new FormData();
    this.file = files;

    // this.http.post(environment.apiUrl +'Myorder/UploadContent?Customer_ID='+cusId, formData, {reportProgress: true, observe: 'events'})
    //   .subscribe(event => {
    //  //   if (event.type === HttpEventType.UploadProgress)
    //    //   this.progress = Math.round(100 * event.loaded / event.total);
    //     //else if (event.type === HttpEventType.Response) {
    //       //this.message = 'Upload success.';
    //       //this.onUploadFinished.emit(event.body);
    //    // }
    //   });
  }

  clear() {
    this.document.nativeElement.value = null;
    if (this.userrole == "SuperAdmin") {
    this.Res_Id = 0;
    }
    else{

    }
    this.Image=null;
    this.UserRolesId = "0";
    this.FName = "";
    this.LName = "";
    this.MobileNo = null;
    this.Password = "";
    this.UserName = "";
    this.SSNNo = null;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.Saveshow=false;
      this.Saveshow1=false;
      }
      else{
        this.Saveshow = true;
        this.Saveshow1=false;
      }
  
    this.Activebutton = false;
    this.file = null;
    this.Activebutton1 = false;
    this.Address1 = "";
    this.Address2 = "";
    this.Description = "";
    this.Zip = null;
    this.State = "";
    this.City = "";

  }
  Save() {
    this.isShownError = true;
    this.isShownSuccess = true;
    if (this.Res_Id == undefined || this.Res_Id == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Store Name";
      return false;
    }
    if (this.UserRolesId == undefined || this.UserRolesId == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose User Role";
      return false;
    }
    if (this.FName == undefined || this.FName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter First Name";
      return false;
    }
    if (this.LName == undefined || this.LName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Last Name";
      return false;
    }
    // if (this.SSNNo == undefined || this.SSNNo == "") {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Enter SSN No";
    //   return false;
    // }
    
    // var regSSN = /^\d{9}$/;
    // if (regSSN.test(this.SSNNo) == false) {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Enter The Valid SSN No. ";
    //   return false;
    // }
    if (this.MobileNo == undefined || this.MobileNo == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Mobile No";
      return false;
    }
    var regMobile = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

    if (regMobile.test(this.MobileNo) == false) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valid MobileNo.";
      return false;
    }
    if (this.Address1 == undefined || this.Address1 == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Address Line 1";
      return false;
    }
    if (this.City == undefined || this.City == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter City";
      return false;
    }
    if (this.State == undefined || this.State == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter State";
      return false;
    }
    if (this.Zip == undefined || this.Zip == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Zip";
      return false;
    }
    var regMobile = /^\d{6}$/;
    if (regMobile.test(this.Zip) == false) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valid Zip code. ";
      return false;
    }
    if (this.UserName == undefined || this.UserName == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter UserName";
      return false;
    }
    if (this.Password == undefined || this.Password == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter UserName";
      return false;
    }
    debugger;
    if (this.file == undefined || this.file.length == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose file";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'Waiter/WaiterInsert?Resid=' + this.Res_Id + '&FirstName=' + this.FName + '&LName=' + this.LName + '&ssn=' + this.SSNNo + '&Mobile=' + this.MobileNo + '&Username=' + this.UserName + '&Password=' + this.Password + '&Address1=' + this.Address1 + '&Address2=' + this.Address2 + '&city=' + this.City + '&state=' + this.State + '&zip=' + this.Zip + '&desc=' + this.Description + '&uRole=' + this.UserRolesId).toPromise().then((data: any) => {
      debugger;
      if (data == "0") {
        this.isShownError = false;
        this.ErrorMsg = "User Insert Failed";

      }
      else {
        this.isShownSuccess = false;
        this.SuccessMsg = "User Inserted Successfully";
        this.Fileupload(data);
        this.Active("Active");
        this.ExportWaiter("Active");
        this.clear();
      }
    }).catch(function (data: any) {

    });


  }
  Fileupload(id) {
    let fileToUpload = <File>this.file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(environment.apiUrl + 'Waiter/UploadContent?UserId=' + id, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        //  //   if (event.type === HttpEventType.UploadProgress)
        //    //   this.progress = Math.round(100 * event.loaded / event.total);
        //     //else if (event.type === HttpEventType.Response) {
        //       //this.message = 'Upload success.';
        //       //this.onUploadFinished.emit(event.body);
        //    // }
      });
  }
  // onMobileChange(event: any): void {
  //   debugger;
  //   var vVal = this.MobileNo.toString();
  //   var vlength = vVal.toString().length;
  //   if (vlength == 3)
  //     this.MobileNo = "(" + vVal + ")";
  //   else if (vlength == 8)
  //     this.MobileNo = vVal + "-";
  // }
  Update() {
    this.isShownError = true;
    this.isShownSuccess = true;
    if (this.Res_Id == undefined || this.Res_Id == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Store Name";
      return false;
    }
    if (this.UserRolesId == undefined || this.UserRolesId == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose User Role";
      return false;
    }
    if (this.FName == undefined || this.FName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter First Name";
      return false;
    }
    if (this.LName == undefined || this.LName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Last Name";
      return false;
    }
    // if (this.SSNNo == undefined || this.SSNNo == "") {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Enter SSN No";
    //   return false;
    // }
    if (this.MobileNo == undefined || this.MobileNo == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Mobile No";
      return false;
    }
    var regMobile = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

    if (regMobile.test(this.MobileNo) == false) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valid MobileNo.";
      return false;
    }
    if (this.Address1 == undefined || this.Address1 == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Address Line 1";
      return false;
    }
    if (this.City == undefined || this.City == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter City";
      return false;
    }
    if (this.State == undefined || this.State == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter State";
      return false;
    }
    if (this.Zip == undefined || this.Zip == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Zip";
      return false;
    }
    var regMobile = /^\d{5}$/;

    if (regMobile.test(this.Zip) == false) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valid Zip code. ";
      return false;
    }
    if (this.UserName == undefined || this.UserName == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter UserName";
      return false;
    }
    if (this.Password == undefined || this.Password == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter UserName";
      return false;
    }
    // var vStatus = "Active";
    // if (this.StatusActive == true)
    //   vStatus = "InActive";
    // else
    //   vStatus = "Active";   

    var OrderInse = this.http.get(environment.apiUrl + 'Waiter/WaiterUpdate?UserId=' + this.UserRefId + '&Resid=' + this.Res_Id + '&FirstName=' + this.FName + '&LName=' + this.LName + '&ssn=' + this.SSNNo + '&Mobile=' + this.MobileNo + '&Username=' + this.UserName + '&Password=' + this.Password + '&Address1=' + this.Address1 + '&Address2=' + this.Address2 + '&city=' + this.City + '&state=' + this.State + '&zip=' + this.Zip + '&desc=' + this.Description+'&status='+this.StatusActive + '&uRole=' + this.UserRolesId).toPromise().then((data: any) => {
      debugger;
      if (data == "0") {
        this.isShownError = false;
        this.ErrorMsg = "User Insert Failed";

      }
      else {
        this.isShownSuccess = false;
        this.SuccessMsg = "User Inserted Successfully";
        if (this.file.length != 0 && this.file != undefined) {
          this.Fileupload(data);
        }

        this.Active("Active");
        this.ExportWaiter("Active");
        this.clear();
      }
    }).catch(function (data: any) {

    });


  }
  WaiterEdit(id) {
    debugger;
    var ViewRes = this.http.get(environment.apiUrl + 'Waiter/WaiterEdit?UserId=' + id).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        debugger;
        this.Drop = false;
        if(this.vWrite ==null || this.vWrite == "" ){
          this.Saveshow=false;
          this.Saveshow1=false;
          }
          else{
            this.Saveshow = false;
            this.Saveshow1=true;
          }
       
        this.isShownError = true;
        this.isShownSuccess = true;
        this.Res_Id = data["0"].restaurantId;
        this.UserRolesId = data["0"].userRoleId;
        this.FName = data["0"].firstName;

        this.LName = (data["0"].lastName);
        this.Image = data;
        this.SSNNo = (data["0"].ssn);
        this.UserName = data["0"].userName;
        this.Password = data["0"].password;
        this.MobileNo = data["0"].mobileNo;
        this.Address1 = data["0"].addressLine1;
        this.Address2 = data["0"].addressLine2;
        this.City = data["0"].city;
        this.State = data["0"].state;
        this.Zip = data["0"].zip;
        this.Description = data["0"].description;
        this.UserRefId = id;
        //  this.Activebutton=true;
        if (data["0"].status == "Active") {
          this.Activebutton = true;
        }
        else {
          this.Activebutton1 = true;
        }
      }
    });
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
  ActiveCheckboxChangeHeaddr(event) {
    if (event.target.checked) {
      this.StatusActive = "Active";

    }
    else {

      this.StatusActive = "InActive";
    }
  }
  ActiveCheckboxChange(event) {
    if (event.target.checked) {
      this.Active("Active");
      this.ExportWaiter("Active");
    }
    else {
      this.Active("InActive");
      this.ExportWaiter("InActive");
    }

  }

  Active(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Waiter/WaiterGrid?Active=' + value).toPromise().then((data: any) => {
      debugger;

      //  this.items=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;


    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Waiter/WaiterGridRes?Active=' + value +'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;

      //  this.items=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;


    });
 
  }
  }

  ExportWaiter(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Waiter/WaiterGrid?Active=' + value).toPromise().then((data: any) => {
      debugger;

      //  this.items=data;
      this.ExptWaiter = data;

    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Waiter/WaiterExportRes?Active=' + value +'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;

      //  this.items=data;
      this.ExptWaiter = data;

    });
  }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.ExptWaiter);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Users');

    /* save to file */
    XLSX.writeFile(wb, "Users.xlsx");

  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  viewPassword() {
    debugger;
    if ((document.getElementById('txtPassword') as HTMLInputElement).type == 'password') {
      (document.getElementById('txtPassword') as HTMLInputElement).type = 'text';
      (document.getElementById('pass-status') as HTMLInputElement).className = 'fa fa-eye-slash';
    }
    else {
      (document.getElementById('txtPassword') as HTMLInputElement).type = 'password';
      (document.getElementById('pass-status') as HTMLInputElement).className = 'fa fa-eye';
    }

  }

  onMobileNoChange(event: any): void {
    debugger;
    var vVal=this.MobileNo.toString();
    var vlength=vVal.toString().length;
    var vValSub="((";
   if(vlength==3){
   this.MobileNo="("+vVal+")";
   var Vcheck=this.MobileNo.indexOf(vValSub);
   if(Vcheck !=-1){
     var vreplaceVal1=this.MobileNo.replace('(','');
     var vreplaceVal2=vreplaceVal1.replace('(','');
     var vreplaceVal3=vreplaceVal2.replace(')','');
     this.MobileNo =vreplaceVal3;
   }
  }
   else if(vlength==8)
   this.MobileNo=vVal+"-";
 }
}
