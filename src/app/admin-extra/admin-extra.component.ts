import { Component, OnInit, ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-extra',
  templateUrl: './admin-extra.component.html',
  styleUrls: ['./admin-extra.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminExtraComponent implements OnInit {
  searchText:string;

  Drop = true;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  LoginUser: string;
  isDisabled = true;
  userrole: string;
  restaurantId: string;
  ExtraName: string;
  ExtraAmount: string;
  isShownActive: Boolean = true;
  Status: boolean = false;
  Resturants = [];
  ExtraExport = [] as any;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  EditedExtra=[]as any;
  EditedExtraId:string;
  vRead:string;
  vWrite:string;
  StatusGrid: boolean = false;
  Activestaus=[] as any;
  closeResult:string;
  ExtraStatus:boolean=false;

  displayedColumns: string[] = ['sno', 'restaurantName', 'extraName', 'extraAmount', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {

    var vRole = sessionStorage.getItem('UserRole');
    if (vRole == "SuperAdmin") {
      this.isDisabled = false;
    }
    else {
      var vResId = sessionStorage.getItem('ResId');
      this.restaurantId = vResId;
    }
    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser = vName + " (" + vRole + ")";

    this.BindRestaurantDDL();
    this.BindExtraGrid("Active");

    this.vRead = localStorage.getItem('Extra-Read');
    this.vWrite = localStorage.getItem('Extra-Write');
    if(this.vWrite ==null || this.vWrite == "" ){
    this.isShownSaveBtn=true;
    this.isShownUpdateBtn=true;
    }
  }

Show() {
    this.Drop = false;
  }
  BindRestaurantDDL() {
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetResturantForDDL').toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Resturants = data;
          var vRole = sessionStorage.getItem('UserRole');
          if (vRole == "SuperAdmin") {
            this.restaurantId = "0";
          }
          else {
            var vResId = sessionStorage.getItem('ResId');
            this.restaurantId = vResId;
          }

        }
        else {
        };
      });
  }
  BindExtraGrid(value1) {
    if (this.userrole == "SuperAdmin") {
      var value = this.http.get(environment.apiUrl + 'AdmnExtra/GetExtraForGrid?sStatus=' + value1).toPromise().then(
        (data: any) => {
          debugger;
          //if (data.length != 0) {
          //this.items = data;          
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
          // }
          // else {
          // };
        });
    }
    else {
      var value = this.http.get(environment.apiUrl + 'AdmnExtra/GetExtraForGridrSA?sStatus=' + value1 + '&ResId=' + sessionStorage.getItem('ResId')).toPromise().then(
        (data: any) => {
          debugger;
          //if (data.length != 0) {
          //this.items = data;          
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
          // }
          // else {
          // };
        });

    }
  }
  BindExtraExport(value1) {
    if (this.userrole == "SuperAdmin") {
      var value = this.http.get(environment.apiUrl + 'AdmnExtra/GetExtraForExport?sStatus=' + value1).toPromise().then(
        (data: any) => {
          debugger;
          this.ExtraExport = data;

        });
    }
    else {
      var value = this.http.get(environment.apiUrl + 'AdmnExtra/GetExtraForExportSA?sStatus=' + value1 + '&ResId=' + sessionStorage.getItem('ResId')).toPromise().then(
        (data: any) => {
          debugger;
          this.ExtraExport = data;

        });

    }
  }

  InsertMenuExtra() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    debugger;
    var vRestaurant_ID = this.restaurantId;
    var vExtraName = this.ExtraName;
    var vExtraAmount = this.ExtraAmount;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vExtraName == undefined || vExtraName == null || vExtraName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The MenuExtra Name.";
      return false;
    }
    if (vExtraAmount == undefined || vExtraAmount == null || vExtraAmount == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The MenuExtra Amount.";
      return false;
    }

    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('sExtraName', this.ExtraName);
    params = params.append('dExtraAmount', this.ExtraAmount);
    var value = this.http.get(environment.apiUrl + 'AdmnExtra/InsertExtra', { params: params }).toPromise().then(
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
          this.ErrorMsg = "MenuExtra Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Sucess") {
          this.BindExtraGrid("Active");
          $("#ShowAcive").prop('checked', true);
          this.BindExtraExport("Active");
          this.restaurantId = "0";
          this.ExtraName = "";
          this.ExtraAmount = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "MenuExtra Added.";
          return false;
        }
      });

  }

  EditMenuExtra(item: any) {
    
    this.ErrorMsg="";
    this.SuccessMsg="";
    this.isShownSaveBtn = true;
    this.isShownUpdateBtn = false;
    this.isShownActive = false;
    this.EditedExtra = item;
    var vmenuExtraId = this.EditedExtra.menuExtraId;
    var vRestaurant_ID = this.EditedExtra.restaurantId;
    var vExtraName = this.EditedExtra.extraName;
    this.EditedExtraId = vmenuExtraId;

    this.restaurantId = vRestaurant_ID;
    this.ExtraName = vExtraName;
    this.ExtraAmount = this.EditedExtra.extraAmount;
    var vStatus = this.EditedExtra.status;
    if (vStatus == "Active"){
      $("#Activestatus").prop('checked',false);
      this.Status = false;
    }
    else{
      $("#Activestatus").prop('checked',true);
      this.Status = true;
    }
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
    
      }
    this.Drop = false;
  }

  UpdateMenuExtra() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    debugger;
    var vRestaurant_ID = this.restaurantId;
    var vExtraName = this.ExtraName;
    var vExtraAmount = this.ExtraAmount;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vExtraName == undefined || vExtraName == null || vExtraName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The MenuExtra Name.";
      return false;
    }
    if (vExtraAmount == undefined || vExtraAmount == null || vExtraAmount == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Extra Amount.";
      return false;
    }


    var vStatus = "Active";
    if (this.Status == true)
      vStatus = "InActive";
    else
      vStatus = "Active";

    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('sExtraName', this.ExtraName);
    params = params.append('iMenuExtraId', this.EditedExtraId);
    params = params.append('sStatus', vStatus);
    params = params.append('dExtraAmount', vExtraAmount);
    var value = this.http.get(environment.apiUrl + 'AdmnExtra/UpdateExtra', { params: params }).toPromise().then(
      (data: any) => {
        debugger;

      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
        if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Update Failed, Please Try Again.";
          return false;
        }
        else if (vErrorMsg1 == "Sucess") {
          $("#ShowAcive").prop('checked',true);
          this.BindExtraGrid("Active");
          this.BindExtraExport("Active");
          this.EditedExtraId = "0";
          this.restaurantId = "0";
          this.ExtraName = "";
          this.ExtraAmount = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "MenuExtra Updated.";
          this.isShownSaveBtn = false;
          this.isShownUpdateBtn = true;
          this.isShownActive = true;
          return false;
        }
      });

  }
  Clear() {
    this.BindExtraGrid("Active");
    $("#ShowAcive").prop('checked',true);
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.isShownSaveBtn = false;
    this.isShownUpdateBtn = true;
    this.isShownActive = true;
    if (this.userrole == "SuperAdmin") {
      this.restaurantId = "0";
    }
    else {
    }
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
      }
    this.ExtraName = "";
    this.ExtraAmount = "";
  }
  ActiveCheckboxChange(event) {
    debugger;
    this.ErrorMsg="";
    this.SuccessMsg="";
    if (event.target.checked) {
      this.StatusGrid = true;
    }
    else {
      this.StatusGrid = false;
    }
    var vStatus = "Active";
    if (this.StatusGrid == true)
      vStatus = "Active";
    else
      vStatus = "InActive";

    this.BindExtraGrid(vStatus);
    this.BindExtraExport(vStatus);
  }

  UpdateStatus1(content,item:any) {
    debugger;
    this.ErrorMsg="";
    this.SuccessMsg="";
    this.Activestaus=item;
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
  UpdateStatus() {
    debugger;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
      return;
      }
    this.modalService.dismissAll("Addon");
    this.EditedExtra = this.Activestaus;
    var vStatus = this.EditedExtra.status;
    var vStatus1 = "";
    if (vStatus == "Active")
      vStatus1 = "InActive";
    else
      vStatus1 = "Active";

    var vmenuExtraId = this.EditedExtra.menuExtraId;

  
      let params = new HttpParams();
      params = params.append('iMenuExtraId', vmenuExtraId);
      params = params.append('sStatus', vStatus1);
      var value = this.http.get(environment.apiUrl + 'AdmnExtra/UpdteExtraStatus', { params: params }).toPromise().then(
        (data: any) => {
          debugger;

        }).catch((data: any) => {
          debugger;
          var vDataError = JSON.stringify(data.error.text);
          var vErrorMsg = vDataError.replace('"', '');
          var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
          if (vErrorMsg1 == "Sucess") {
            alert("Status Changed");
            $("#ShowAcive").prop('checked',true);
            this.BindExtraGrid("Active");
            this.BindExtraExport("Active");
          }
          else if (vErrorMsg1 == "Failed") {

          }
          return false;
        });
      return false;
    

  }

  toggleEditable(event) {
    debugger;
    if (event.target.checked) {
      this.ExtraStatus = true;
    }
    else {
      this.ExtraStatus = false;
    }
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
    const workSheet = XLSX.utils.json_to_sheet(this.ExtraExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'MenuExtra');

    /* save to file */
    XLSX.writeFile(wb, "MenuExtra.xlsx");

  }

}
