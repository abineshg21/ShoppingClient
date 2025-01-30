import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-sub-category',
  templateUrl: './admin-sub-category.component.html',
  styleUrls: ['./admin-sub-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSubCategoryComponent implements OnInit {
  Drop = true;
  Resturants = [];
  Views:string;
  Categorys = [];
  categoryId: string;
  restaurantId: string;
  Status: boolean = false;
  StatusGrid: boolean = false;
  isShownActive: Boolean = true;
  public searchText: string;
  EditedSubCat = [] as any;
  SubCatExport = [] as any;
  EditedSubCatId: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  SubCategoryName: string;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  isDisabled = true;
  Website: boolean = false;
  customerApp: boolean = false;
  WaiterApp: boolean = false;
  closeResult:string;
  Activestaus=[] as any;
LoginUser:string;
vRead:string;
vWrite:string;
userrole:string;
  displayedColumns: string[] = ['sno', 'restaurantName', 'categoryName', 'subCategoryName', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  toppings = new UntypedFormControl();

  toppingList: string[] = ['Web', 'Customer App', 'Waiter App'];
  constructor(private modalService: NgbModal,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    
    this.loadScript('../../assets/js/Alert.js');
    this.userrole = sessionStorage.getItem('UserRole');
    this.BindRestaurantDDL();
    //this.BindCategoryDDL();
    
    
    var vRole = sessionStorage.getItem('UserRole');
          if (vRole == "SuperAdmin") {
            this.isDisabled = false;
          }else {
            var vResId = sessionStorage.getItem('ResId');
            this.restaurantId = vResId;
          }

          var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser=vName+" ("+vRole+")";
    this.vRead = localStorage.getItem('SubCategory-Read');
    this.vWrite = localStorage.getItem('SubCategory-Write');
    if(this.vWrite ==null || this.vWrite == "" ){
    this.isShownSaveBtn=true;
    this.isShownUpdateBtn=true;
    }
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
    this.BindSubCategoryGrid("Active");
    this.BindSubCategoryExport("Active");
  }
  BindSubCategoryGrid(value1) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/GetSubCategoryForGrid?sStatus=' + value1).toPromise().then(
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
  else{
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/GetSubCategoryForGridres?sStatus=' + value1 +'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then(
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
  BindSubCategoryExport(value1) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/GetSubCategoryForGrid?sStatus=' + value1).toPromise().then(
      (data: any) => {
        debugger;       
        this.SubCatExport = data;
      
      
      });
  }
  else{
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/GetSubCategoryForExportres?sStatus=' + value1+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then(
      (data: any) => {
        debugger;       
        this.SubCatExport = data;
      
      
      });
  }
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
            //this.isDisabled = false;
            this.restaurantId = "0";
          }
          else {
            var vResId = sessionStorage.getItem('ResId');
            this.restaurantId = vResId;
            this.BindCategoryDDL(vResId);
          }
          this.categoryId = "0";
        }
        else {
        };
      });
  }
  onResturantChange(restId: number) {
    this.BindCategoryDDL(restId);
  }
  BindCategoryDDL(vResID) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + vResID).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.Categorys = data;
          this.categoryId = "0";
        }
        else {
        };
      });
  }
  InsertSubCategory() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vSubCategoryName = this.SubCategoryName;
    var vCatId = this.categoryId;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaruant.";
      return false;
    }
    if (vCatId == undefined || vCatId == "" || vCatId == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select the Category.";
      return false;
    }
    if (vSubCategoryName == undefined || vSubCategoryName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter the Sub Category.";
      return false;
    }
var Views="";
    if(this.Website == true){
      if (Views == "")
      Views = "Web";
    else
    Views = Views + ",Web";
    }
    if(this.customerApp == true){
      if (Views == "")
      Views = "Customer";
    else
    Views = Views + ",Customer";
    }
    if(this.WaiterApp == true){
      if (Views == "")
      Views = "Waiter";
    else
    Views = Views + ",Waiter";
    }
    // if(Views ==""){
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Choose any Views.";
    //   return false;
    // }
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('iCategoryId', this.categoryId);
    params = params.append('sSubCategoryName', this.SubCategoryName);
    params = params.append('Vieslist', Views);
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/InsertSubCategory', { params: params }).toPromise().then(
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
          this.ErrorMsg = "Sub Category Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Sucess") {
          $("#ShowAcive").prop('checked',true);
          this.BindSubCategoryGrid("Active");
          this.BindSubCategoryExport("Active");
          this.restaurantId = "0";
          this.categoryId = "0";
          this.SubCategoryName = "";
          this.WaiterApp=false;
          this.customerApp=false;
          this.Website=false;
          this.isShownSuccess = false;
          this.SuccessMsg = "Sub Category Added.";
          return false;
        }
      });

  }
  EditSubCategory(item: any) {
    this.Drop = false;
    this.ErrorMsg="";
    this.SuccessMsg="";
    debugger;
    this.ErrorMsg="";
    this.SuccessMsg="";
    this.Website=false;
    this.customerApp=false;
    this.WaiterApp=false;
    this.isShownSaveBtn = true;
    this.isShownUpdateBtn = false;
    this.isShownActive = false;
    this.EditedSubCat = item;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
      }
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetResturantForDDL').toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.Resturants = data;
          var vCategoryId = this.EditedSubCat.categoryId;
          var vRestaurant_ID = this.EditedSubCat.restaurantId;
          var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + vRestaurant_ID).toPromise().then(
            (data: any) => {
              debugger;
              if (data.length != 0) {
                this.Categorys = data;
                this.categoryId = vCategoryId;
              }
            });         
            debugger;
          var vSubCategoryID = this.EditedSubCat.subCategoryId;
          this.EditedSubCatId = vSubCategoryID;
          this.restaurantId = vRestaurant_ID;
        }
        else {
        };
      });
      var vSubCategoryName = this.EditedSubCat.subCategoryName;
    this.SubCategoryName = vSubCategoryName;
    if(this.EditedSubCat.status == true){
      this.Status=false;
    }
    else{
      this.Status=true;
    }
   
    var vStatus = this.EditedSubCat.status;
var Device = this.EditedSubCat.deviceview;
var vUR = Device.split(",");
for (var i = 0; i < vUR.length; i++) {
  var val = vUR[i];
  switch (val) {
  
    case "Web":
      this.Website = true;
      break;
    case "Customer":
      this.customerApp = true;
      break;
    case "Waiter":
      this.WaiterApp = true;
      break;
   
  }
}
    // if (vStatus == "true")
    //   this.Status = false;
    // else
    //   this.Status = true;

    this.Drop = false;
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
    this.EditedSubCat =  this.Activestaus;
    var vStatus = this.EditedSubCat.status;
    var vStatus1 = "";
    if (vStatus == true)
      vStatus1 = "InActive";
    else
      vStatus1 = "Active";

    var vSubCategoryID = this.EditedSubCat.subCategoryId;

  
      let params = new HttpParams();
    params = params.append('iSubCategoryId', vSubCategoryID);
    params = params.append('sStatus', vStatus1);
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/UpdteSubCategoryStatus', { params: params }).toPromise().then(
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
          this.BindSubCategoryGrid("Active");
          this.BindSubCategoryExport("Active");
        }
        else if(vErrorMsg1 == "Failed"){

        }
      });
      return false;
    

  }
  UpdateSubCategory() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vSubCategoryName = this.SubCategoryName;
    var vCategoryId = this.categoryId;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaruant.";
      return false;
    }
    if (vCategoryId == undefined || vCategoryId == "" || vCategoryId == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Category.";
      return false;
    }
    if (vSubCategoryName == undefined || vSubCategoryName == null  || vSubCategoryName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Sub Category Name.";
      return false;
    }

    var vStatus = "Active";
    if (this.Status == true)
      vStatus = "InActive";
    else
      vStatus = "Active";
      var Views="";
      if(this.Website == true){
        if (Views == "")
        Views = "Web";
      else
      Views = Views + ",Web";
      }
      if(this.customerApp == true){
        if (Views == "")
        Views = "Customer";
      else
      Views = Views + ",Customer";
      }
      if(this.WaiterApp == true){
        if (Views == "")
        Views = "Waiter";
      else
      Views = Views + ",Waiter";
      }
      // if(Views ==""){
      //   this.isShownError = false;
      //   this.ErrorMsg = "Please Choose any Views.";
      //   return false;
      // }
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('sSubCategoryName', this.SubCategoryName);
    params = params.append('iCategoryId', this.categoryId);
    params = params.append('iSubCategoryId', this.EditedSubCatId);
    params = params.append('Vieslist', Views);
    params = params.append('sStatus', vStatus);
    var value = this.http.get(environment.apiUrl + 'AdminSubCategory/UpdteSubCategory', { params: params }).toPromise().then(
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
          
          this.BindSubCategoryGrid("Active");
          this.BindSubCategoryExport("Active");
          this.EditedSubCatId = "0";
          this.restaurantId = "0";
          this.categoryId = "0";
          this.SubCategoryName = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "Sub Category Updated.";
          this.isShownSaveBtn = false;
          this.WaiterApp=false;
          this.customerApp=false;
          this.Website=false;
          this.isShownUpdateBtn = true;
          this.isShownActive = true;
          $("#ShowAcive").prop('checked',true);
          return false;
        }
      });

  }
  Clear() {
    debugger;
    this.isShownError = true;
    this.isShownSuccess = true;
  
    this.BindSubCategoryGrid("Active");
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.isShownSaveBtn = false;
    this.isShownUpdateBtn = true;
    this.isShownActive = true;
this.Website=false;
this.WaiterApp=false;
this.customerApp=false;
if (this.userrole == "SuperAdmin") {
  this.restaurantId = "0";
}
else {
}
    this.categoryId = "0";
    this.SubCategoryName = "";
    $("#ShowAcive").prop('checked',true);
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
      }
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

    this.BindSubCategoryGrid(vStatus);
    this.BindSubCategoryExport(vStatus);
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
    const workSheet = XLSX.utils.json_to_sheet(this.SubCatExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Sub Category');

    /* save to file */
    XLSX.writeFile(wb, "Sub Category.xlsx");

  }
  WebsiteChange(event) {
    debugger;
    if (event.target.checked) {
      this.Website = true;
    }
    else {
      this.Website = false;
    }
  }
  customerAppChange(event) {
    debugger;
    if (event.target.checked) {
      this.customerApp = true;
    }
    else {
      this.customerApp = false;
    }
  }
  WaiterAppChange(event) {
    debugger;
    if (event.target.checked) {
      this.WaiterApp = true;
    }
    else {
      this.WaiterApp = false;
    }
  }
}
