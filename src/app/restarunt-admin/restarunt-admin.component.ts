import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-restarunt-admin',
  templateUrl: './restarunt-admin.component.html',
  styleUrls: ['./restarunt-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RestaruntAdminComponent implements OnInit {
  Drop = true;
  Status: boolean = false;
  StatusGrid: boolean = false;
  isShownActive: Boolean = true;
  public searchText: string;
  EditedResturant = [] as any;
  EditedResturantId: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  ResName: string;
  SSN: string;
  MobileNo: string;
  PhoneNo: string="";
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  State: string;
  Zip: string;
  EmailId: string;
  Location: string="";
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  LoginUser:string;
  ResDetails = [] as any;

  displayedColumns: string[] = ['sno', 'name', 'emailId', 'mobileNo', 'phoneNo', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');

    this.BindResturantGrid("Active");
    this.BindResturantExport("Active");

    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser=vName+" ("+vRole+")";
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  Show() {
    this.Drop = false;
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

  BindResturantGrid(value1) {
    var value = this.http.get(environment.apiUrl + 'AdminResturant/GetResturantsForGrid?sStatus=' + value1).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //this.items = data;          
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
        }
        else {
        };
      });
  }
  BindResturantExport(value1) {
    var value = this.http.get(environment.apiUrl + 'AdminResturant/GetResturantsForExport?sStatus=' + value1).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //this.items = data;          
          this.ResDetails = data;
        }
        else {
        };
      });
  }
  InsertResturant() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    var vResName = this.ResName;
    var vSSN = this.SSN;
    var vMobileNo = this.MobileNo;
    var vPhoneNo = this.PhoneNo;
    var vAddressLine1 = this.AddressLine1;
    var vAddressLine2 = this.AddressLine2;
    var vCity = this.City;
    var vState = this.State;
    var vZip = this.Zip;
    var vEmailId = this.EmailId;
debugger;
    if (vResName == undefined || vResName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Restaurant Name.";
      return false;
    }
    if (vSSN == undefined || vSSN == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Licence No.";
      return false;
    }
    if (vMobileNo == undefined || vMobileNo == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Mobile No.";
      return false;
    }
    // var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;

    // if (regMobile.test(vMobileNo) == false) {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Enter The Valid MobileNo. Format Should like (123)456-7890";
    //   return false;
    // }
    if (vEmailId == undefined || vEmailId == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Email Id.";
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
    if (vAddressLine1 == undefined || vAddressLine1 == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Address Line1.";
      return false;
    }
    if (vCity == undefined || vCity == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The City.";
      return false;
    }
    if (vState == undefined || vState == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The State.";
      return false;
    }
    if (vZip == undefined || vZip == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Zip.";
      return false;
    }

    let params = new HttpParams();
    params = params.append('sName', this.ResName);
    params = params.append('sAddressLine1', this.AddressLine1);
    params = params.append('sAddressLine2', this.AddressLine2);
    params = params.append('sCity', this.City);
    params = params.append('sState', this.State);
    params = params.append('sZip', this.Zip);
    params = params.append('sLocation', this.Location);
    params = params.append('sEmailId', this.EmailId);
    params = params.append('sPhoneNo', this.PhoneNo);
    params = params.append('sMobileNo', this.MobileNo);
    params = params.append('sSSN', this.SSN);
    var value = this.http.get(environment.apiUrl + 'AdminResturant/InsertResturants', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
        if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Insert Failed, Please Try Again.";
          return false;
        }
        else if (vErrorMsg1 == "Exist") {
          this.isShownError = false;
          this.ErrorMsg = "Restaurant Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Success") {
          this.BindResturantGrid("Active");
          this.BindResturantExport("Active");
          this.ResName = "";
          this.SSN = "";
          this.MobileNo = "";
          this.PhoneNo = "";
          this.AddressLine1 = "";
          this.AddressLine2 = "";
          this.City = "";
          this.State = "";
          this.Zip = "";
          this.EmailId = "";
          this.Location = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "Restaurant Added Successfully.";
          return false;
        }
      });
  }

  onMobileChange(event: any): void {
    debugger;
    // var vVal = this.MobileNo.toString();
    // var vlength = vVal.toString().length;
    // if (vlength == 3)
    //   this.MobileNo = "(" + vVal + ")";
    // else if (vlength == 8)
    //   this.MobileNo = vVal + "-";


//       var vVal=this.MobileNo.toString();
//   var vlength=vVal.toString().length;
//   var vValSub="((";
//  if(vlength==3){
//  this.MobileNo="("+vVal+")";
//  var Vcheck=this.MobileNo.indexOf(vValSub);
//  if(Vcheck !=-1){
//    var vreplaceVal1=this.MobileNo.replace('(','');
//    var vreplaceVal2=vreplaceVal1.replace('(','');
//    var vreplaceVal3=vreplaceVal2.replace(')','');
//    this.MobileNo =vreplaceVal3;
//  }
// }
//  else if(vlength==8)
//  this.MobileNo=vVal+"-";

  }

  EditResturant(item: any) {
    this.EditedResturant = item;
    var vResturantID = this.EditedResturant.restaurantId;
    this.EditedResturantId = vResturantID;

    var value = this.http.get(environment.apiUrl + 'AdminResturant/GetRestuarentForEdit?iRestaurantId=' + vResturantID).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {

          this.isShownSaveBtn = true;
          this.isShownUpdateBtn = false;
          this.isShownActive = false;
          var vData = data;
          this.ResName = vData["0"].name;
          this.SSN = vData["0"].ssn;
          this.MobileNo = vData["0"].mobileNo;
          this.PhoneNo = (vData["0"].phoneNo == "undefined"?'':vData["0"].phoneNo);
          this.AddressLine1 = vData["0"].addressLine1;
          this.AddressLine2 = vData["0"].addressLine2;
          this.City = vData["0"].city;
          this.State = vData["0"].state;
          this.Zip = vData["0"].zip;
          this.EmailId = vData["0"].emailId;
          this.Location = (vData["0"].location == "undefined"?'':vData["0"].location);
          var vStatus = vData["0"].status;
          if (vStatus == "Active")
            this.Status = false;
          else
            this.Status = true;
          this.Drop = false;
        }
        else {
        };
      });
  }

  UpdateResturant() {

    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    var vResName = this.ResName;
    var vSSN = this.SSN;
    var vMobileNo = this.MobileNo;
    var vPhoneNo = this.PhoneNo;
    var vAddressLine1 = this.AddressLine1;
    var vAddressLine2 = this.AddressLine2;
    var vCity = this.City;
    var vState = this.State;
    var vZip = this.Zip;
    var vEmailId = this.EmailId;

    if (vResName == undefined || vResName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Restaurant Name.";
      return false;
    }
    if (vSSN == undefined || vSSN == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Licence No.";
      return false;
    }
    if (vMobileNo == undefined || vMobileNo == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Mobile No.";
      return false;
    }
    // var regMobile = /^[\(]\d{3}[\)]\d{3}[\-]\d{4}$/;

    // if (regMobile.test(vMobileNo) == false) {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Enter The Valid MobileNo. Format Should like (123)456-7890";
    //   return false;
    // }
    if (vEmailId == undefined || vEmailId == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Email Id.";
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
    if (vAddressLine1 == undefined || vAddressLine1 == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Address Line1.";
      return false;
    }
    if (vCity == undefined || vCity == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The City.";
      return false;
    }
    if (vState == undefined || vState == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The State.";
      return false;
    }
    if (vZip == undefined || vZip == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Zip.";
      return false;
    }
    var vStatus = "Active";
    if (this.Status == true)
      vStatus = "InActive";
    else
      vStatus = "Active";

    let params = new HttpParams();
    params = params.append('sName', this.ResName);
    params = params.append('sAddressLine1', this.AddressLine1);
    params = params.append('sAddressLine2', this.AddressLine2);
    params = params.append('sCity', this.City);
    params = params.append('sState', this.State);
    params = params.append('sZip', this.Zip);
    params = params.append('sLocation', this.Location);
    params = params.append('sEmailId', this.EmailId);
    params = params.append('sPhoneNo', this.PhoneNo);
    params = params.append('sMobileNo', this.MobileNo);
    params = params.append('sSSN', this.SSN);
    params = params.append('sStatus', vStatus);
    params = params.append('iRestaurantId', this.EditedResturantId);
    var value = this.http.get(environment.apiUrl + 'AdminResturant/UpdateResturant', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
        if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Insert Failed, Please Try Again.";
          return false;
        }
        else if (vErrorMsg1 == "Success") {
          this.BindResturantGrid("Active");
          this.BindResturantExport("Active");
          this.ResName = "";
          this.SSN = "";
          this.MobileNo = "";
          this.PhoneNo = "";
          this.AddressLine1 = "";
          this.AddressLine2 = "";
          this.City = "";
          this.State = "";
          this.Zip = "";
          this.EmailId = "";
          this.Location = "";
          this.isShownSuccess = false;
          this.EditedResturantId = null;
          this.SuccessMsg = "Restaurant Added Successfully.";
          return false;
        }
      });
  }
  Clear() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.ResName = "";
    this.SSN = "";
    this.MobileNo = "";
    this.PhoneNo = "";
    this.AddressLine1 = "";
    this.AddressLine2 = "";
    this.City = "";
    this.State = "";
    this.Zip = "";
    this.EmailId = "";
    this.Location = "";
    this.isShownSuccess = false;
    this.EditedResturantId = null;
  }

  toggleEditable(event) {
    debugger;
    if (event.target.checked) {
      this.Status = true;
    }
    else {
      this.Status = false;
    }
  }
  ActiveCheckboxChange(event) {
    debugger;
    if (event.target.checked) {
      this.StatusGrid = true;
    }
    else {
      this.StatusGrid = false;
    }
    var vStatus = "Active";
    if (this.Status == true)
      vStatus = "InActive";
    else
      vStatus = "Active";

    this.BindResturantGrid(vStatus);
    this.BindResturantExport(vStatus);
  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.ResDetails);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Category');

    /* save to file */
    XLSX.writeFile(wb, "Category.xlsx");

  }

}
