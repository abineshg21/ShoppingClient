import { Component, OnInit, ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCategoryComponent implements OnInit {
  Drop = true;
  Resturants = [];
  CatExport = [] as any;
  restaurantId: string;
  Status: boolean = false;
  StatusGrid: boolean = false;
  isShownActive: Boolean = true;
  public searchText: string;
  EditedCat = [] as any;
  EditedCatId: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  CategoryName: string;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  isDisabled = true;
  userrole :string;
  LoginUser: string;
  closeResult:string;
  vRead:string;
  vWrite:string;
  Activestaus=[] as any;
  displayedColumns: string[] = ['sno', 'restaurantName', 'categoryName', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private modalService: NgbModal,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.loadScript('../../assets/js/Alert.js');
    this.userrole= sessionStorage.getItem('UserRole');
    this.BindCategoryGrid("Active");
    this.BindCategoryExport("Active");
    this.BindRestaurantDDL();


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
    this.LoginUser=vName+" ("+vRole+")";
    this.vRead = localStorage.getItem('Category-Read');
    this.vWrite = localStorage.getItem('Category-Write');
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

  }

  BindCategoryGrid(value1) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminCategory/GetCategoryForGrid?sStatus=' + value1).toPromise().then(
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
      var value = this.http.get(environment.apiUrl + 'AdminCategory/GetCategoryForGridres?sStatus=' + value1 +'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then(
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
  BindCategoryExport(value1) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminCategory/GetCategoryForExport?sStatus=' + value1).toPromise().then(
      (data: any) => {
        debugger;         
        this.CatExport = data;
        
      });
  }
  else{
    var value = this.http.get(environment.apiUrl + 'AdminCategory/GetCategoryForExportres?sStatus=' + value1 +'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then(
      (data: any) => {
        debugger;         
        this.CatExport = data;
        
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
          }
          
          //this.restaurantId = "0";
        }
        else {
        };
      });
  }
  InsertCategory() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    debugger;
    var vRestaurant_ID = this.restaurantId;
    var vCategoryName = this.CategoryName;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vCategoryName == undefined || vCategoryName == null || vCategoryName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Category Name.";
      return false;
    }

    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('sCategoryName', this.CategoryName);
    var value = this.http.get(environment.apiUrl + 'AdminCategory/InsertCategory', { params: params }).toPromise().then(
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
          this.ErrorMsg = "Category Name Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Sucess") {
          this.BindCategoryGrid("Active");
          $("#ShowAcive").prop('checked',true);
          this.BindCategoryExport("Active");
          this.restaurantId = "0";
          this.CategoryName = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "Category Added.";
          return false;
        }
      });

  }
  EditCategory(item: any) {
    
    this.ErrorMsg="";
    this.SuccessMsg="";
    this.isShownSaveBtn = true;
    this.isShownUpdateBtn = false;
    this.isShownActive = false;
    this.EditedCat = item;
    var vCategoryId = this.EditedCat.categoryId;
    var vRestaurant_ID = this.EditedCat.restaurantId;
    var vCategoryName = this.EditedCat.categoryName;
    this.EditedCatId = vCategoryId;

    this.restaurantId = vRestaurant_ID;
    this.CategoryName = vCategoryName;
    var vStatus = this.EditedCat.status;
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

  UpdateCategory() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    debugger;
    var vRestaurant_ID = this.restaurantId;
    var vCategoryName = this.CategoryName;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vCategoryName == undefined || vCategoryName == null || vCategoryName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Category Name.";
      return false;
    }

    var vStatus = "Active";
    if (this.Status == true)
      vStatus = "InActive";
    else
      vStatus = "Active";

    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('sCategoryName', this.CategoryName);
    params = params.append('iCategoryId', this.EditedCatId);
    params = params.append('sStatus', vStatus);
    var value = this.http.get(environment.apiUrl + 'AdminCategory/UpdteCategory', { params: params }).toPromise().then(
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
          this.BindCategoryGrid("Active");
          this.BindCategoryExport("Active");
          this.EditedCatId = "0";
          this.restaurantId = "0";
          this.CategoryName = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "Category Updated.";
          this.isShownSaveBtn = false;
          this.isShownUpdateBtn = true;
          this.isShownActive = true;
          return false;
        }
      });

  }

  Clear() {
    this.BindCategoryGrid("Active");
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
    this.CategoryName = "";
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

    this.BindCategoryGrid(vStatus);
    this.BindCategoryExport(vStatus);
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
    this.EditedCat = this.Activestaus;
    var vStatus = this.EditedCat.status;
    var vStatus1 = "";
    if (vStatus == true)
      vStatus1 = "InActive";
    else
      vStatus1 = "Active";

    var vSubCategoryID = this.EditedCat.categoryId;

  
      let params = new HttpParams();
      params = params.append('iCategoryId', vSubCategoryID);
      params = params.append('sStatus', vStatus1);
      var value = this.http.get(environment.apiUrl + 'AdminCategory/UpdteCategoryStatus', { params: params }).toPromise().then(
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
            this.BindCategoryGrid("Active");
            this.BindCategoryExport("Active");
          }
          else if (vErrorMsg1 == "Failed") {

          }
          return false;
        });
      return false;
    

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
    const workSheet = XLSX.utils.json_to_sheet(this.CatExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Category');

    /* save to file */
    XLSX.writeFile(wb, "Category.xlsx");

  }
}
