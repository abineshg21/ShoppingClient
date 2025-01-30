import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tax-detail',
  templateUrl: './tax-detail.component.html',
  styleUrls: ['./tax-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaxDetailComponent implements OnInit {
  Drop = true;
  Resturants = [];
  Category = [];
  SubCategory = [];
  MenuItem = [];
  restaurantId: string;
  categoryId: string;
  subCategoryId: string;
  MenuItemId: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  SalesTax: string;
  HospitalityTax: string;
  OtherTax: string;
  Description: string;
  TaxDetails = [] as any;
  EditedTax = [] as any;
  EditedTaxId: string;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  searchText: string;
  isShownActive: Boolean = true;
  StatusGrid: boolean = false;
  LoginUser:string;
  isDisabled = true;
  userrole:string;
  displayedColumns: string[] = ['sno', 'restaurantName', 'categoryName', 'subCategoryName', 'itemName', 'salesTax', 'hospitalityTax', 'others', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.userrole = sessionStorage.getItem('UserRole');
    this.BindRestaurantDDL();
    var vResID=sessionStorage.getItem('ResId');
    this.BindTaxGrid("Active",vResID);
    this.BindTaxExport("Active",vResID);

    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser=vName+" ("+vRole+")";

    var vRole = sessionStorage.getItem('UserRole');
    if (vRole == "SuperAdmin") {
      this.isDisabled = false;
    }
    else {
      var vResId = sessionStorage.getItem('ResId');
      this.restaurantId = vResId;
      this.BindCategoryDDL(vResId);
    this.BindTaxGrid("Active",vResId);
    this.BindTaxExport("Active",vResID);
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

  BindTaxGrid(value1,ValRes) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminTax/GetTaxForGrid?sStatus=' + value1).toPromise().then(
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
        var value = this.http.get(environment.apiUrl + 'AdminTax/GetTaxForGrid?sStatus=' + value1+'&sResId=' + ValRes).toPromise().then(
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

 

  BindTaxExport(value1,ValRes) {
    var value = this.http.get(environment.apiUrl + 'AdminTax/GetTaxForExport?sStatus=' + value1+'&sResId=' + ValRes).toPromise().then(
      (data: any) => {
        debugger;       
          this.TaxDetails = data;
      });
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
          this.categoryId = "0";
          this.subCategoryId = "0";
          this.MenuItemId = "0";

        }
        else {
        };
      });
  }
  onResturantChange(restId: number) {
    this.BindCategoryDDL(restId);
    this.BindTaxGrid("Active",restId)
  }
  BindCategoryDDL(vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Category = data;
          this.categoryId = "0";
          this.subCategoryId = "0";
          this.MenuItemId = "0";
        }
        else {
        };
      });
  }
  onCatChange(catId: number) {
    debugger;
    var vCatId = catId;
    if (vCatId != 0) {
      var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetSubCategoryForDDL?iCatID=' + vCatId).toPromise().then(
        (data: any) => {
          debugger;
          if (data.length != 0) {
            //
            this.SubCategory = data;
            this.subCategoryId = "0";
          }
          else {
          };
        });
    }
  }
  onSubCatChange(subcatId: number) {
    debugger;
    var vSubCatId = subcatId;
    var vCatId = this.categoryId;
    if (vSubCatId != 0) {
      var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetItemsForDDL?iCatID=' + vCatId + '&iSubCatId=' + vSubCatId).toPromise().then(
        (data: any) => {
          debugger;
          if (data.length != 0) {
            //
            this.MenuItem = data;
            this.MenuItemId = "0";
          }
          else {
          };
        });
    }
  }

  SaveTax() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vCategory_Id = this.categoryId;
    var vSubCategory_ID = this.subCategoryId;
    var vMenuItemId = this.MenuItemId;
    var SalesTax = this.SalesTax;
    var HospitalityTax = this.HospitalityTax;
    var OtherTax = this.OtherTax;
    var vDescription = this.Description;

    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vCategory_Id == undefined || vCategory_Id == "" || vCategory_Id == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Item Category.";
      return false;
    }
    if ((SalesTax == undefined || SalesTax == "") && (HospitalityTax == undefined || HospitalityTax == "") && (OtherTax == undefined || OtherTax == "")) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Any One Tax.";
      return false;
    }

    var vSalTax;
    if (SalesTax == undefined || SalesTax == "")
      vSalTax = 0;
    else
      vSalTax = SalesTax;

    var vHospitalityTax;
    if (HospitalityTax == undefined || HospitalityTax == "")
      vHospitalityTax = 0;
    else
      vHospitalityTax = HospitalityTax;

    var vOtherTax;
    if (OtherTax == undefined || OtherTax == "")
      vOtherTax = 0;
    else
      vOtherTax = OtherTax;

      if (vDescription == undefined || vDescription == "" || vDescription == "0") {
        this.Description="";
      }

    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('dSalesTax', vSalTax);
    params = params.append('dHospitalityTax', vHospitalityTax);
    params = params.append('dOtherTax', vOtherTax);
    params = params.append('sDescription', this.Description);
    var value = this.http.get(environment.apiUrl + 'AdminTax/InsertTax', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        var vTaxId = data;
        //this.BindCouponGrid("Active");

        this.isShownSuccess = false;
        this.SuccessMsg = "Tax Details Added.";
        //return false;

        let params1 = new HttpParams();
        params1 = params1.append('iRestaurant_ID', this.restaurantId);
        params1 = params1.append('iCatId', this.categoryId);
        params1 = params1.append('iSubCatId', this.subCategoryId);
        params1 = params1.append('iItemId', this.MenuItemId);
        params1 = params1.append('iTaxId', vTaxId)


        var value11 = this.http.get(environment.apiUrl + 'AdminTax/UpdateTaxToItem', { params: params1 }).toPromise().then(
          (data: any) => {
            debugger;
            // var vcouponId = data;
          }).catch((data: any) => {
            debugger;
            var vDataError = JSON.stringify(data.error.text);
            var vErrorMsg = vDataError.replace('"', '');
            var vErrorMsg1 = vErrorMsg.replace('"', '');
            if (vErrorMsg1 == "Failed") {
              this.isShownError = false;
              this.ErrorMsg = "Insert Failed, Please Try Again.";
              return false;
            }
            else if (vErrorMsg1 == "Success") {
              //this.BindCouponGrid("Active");
              this.restaurantId = "0";
              this.categoryId = "0";
              this.subCategoryId = "0";
              this.MenuItemId = "0";
              this.SalesTax = "";
              this.HospitalityTax = "";
              this.OtherTax = "";
              this.Description = "";
              this.isShownSuccess = false;
              this.SuccessMsg = "Tax Details Added.";
              var vResID=sessionStorage.getItem('ResId');
              this.BindTaxGrid("Active",vResID);
              this.BindTaxExport("Active",vResID);
              return false;
            }
          });
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
          this.ErrorMsg = "Tax Already Exist.";
          return false;
        }
      });
  }
  TaxEdit(item: any) {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
debugger;
    this.isShownActive = false;
    this.EditedTax = item;
    var vCouponID = this.EditedTax.taxId;
    this.EditedTaxId = vCouponID;
    this.restaurantId = this.EditedTax.restaurantId;
    this.SalesTax = this.EditedTax.salesTax;
    this.HospitalityTax = this.EditedTax.hospitalityTax;
    this.OtherTax = this.EditedTax.others;
    this.Description = this.EditedTax.description;
    this.Drop = false;
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + this.restaurantId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Category = data;
          this.categoryId = this.EditedTax.categoryId;
          this.subCategoryId = "0";
          this.MenuItemId = "0";
          this.isShownSaveBtn = true;
          this.isShownUpdateBtn = false;

          var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetSubCategoryForDDL?iCatID=' + this.categoryId).toPromise().then(
            (data: any) => {
              debugger;
              if (data.length != 0) {
                //
                this.SubCategory = data;
                this.subCategoryId = this.EditedTax.subCategoryId;

                var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetItemsForDDL?iCatID=' + this.categoryId + '&iSubCatId=' + this.subCategoryId).toPromise().then(
                  (data: any) => {
                    debugger;
                    if (data.length != 0) {
                      //
                      this.MenuItem = data;
                      this.MenuItemId = this.EditedTax.menuItemId;
                    }
                    else {
                    };
                  });

              }
              else {
              };
            });
        }
        else {
        };
      });


  }

  UpdateTax() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vCategory_Id = this.categoryId;
    var vSubCategory_ID = this.subCategoryId;
    var vMenuItemId = this.MenuItemId;
    var SalesTax = this.SalesTax;
    var HospitalityTax = this.HospitalityTax;
    var OtherTax = this.OtherTax;
    var vDescription = this.Description;

    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vCategory_Id == undefined || vCategory_Id == "" || vCategory_Id == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Item Category.";
      return false;
    }
    if ((SalesTax == undefined || SalesTax == "") && (HospitalityTax == undefined || HospitalityTax == "") && (OtherTax == undefined || OtherTax == "")) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Any One Tax.";
      return false;
    }

    if (vDescription == undefined || vDescription == "" || vDescription == "0") {
      this.Description="";
    }

    var vSalTax;
    if (SalesTax == undefined || SalesTax == "")
      vSalTax = 0;
    else
      vSalTax = SalesTax;

    var vHospitalityTax;
    if (HospitalityTax == undefined || HospitalityTax == "")
      vHospitalityTax = 0;
    else
      vHospitalityTax = HospitalityTax;

    var vOtherTax;
    if (OtherTax == undefined || OtherTax == "")
      vOtherTax = 0;
    else
      vOtherTax = OtherTax;


    var vEditedTaxId = this.EditedTaxId;
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('dSalesTax', vSalTax);
    params = params.append('dHospitalityTax', vHospitalityTax);
    params = params.append('dOtherTax', vOtherTax);
    params = params.append('sDescription', this.Description);
    params = params.append('iTaxId', vEditedTaxId);
    var value = this.http.get(environment.apiUrl + 'AdminTax/UpdateTax', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        var vTaxId = data;
      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Update Failed, Please Try Again.";
          return false;
        }
        else if (vErrorMsg1 == "Success") {
          //this.BindCouponGrid("Active");
          this.isShownUpdateBtn = true;
          this.isShownSaveBtn = false;
          this.isShownActive = true;
          this.restaurantId = "0";
          this.categoryId = "0";
          this.subCategoryId = "0";
          this.MenuItemId = "0";
          this.SalesTax = "";
          this.HospitalityTax = "";
          this.OtherTax = "";
          this.Description = "";
          this.isShownSuccess = false;
          this.SuccessMsg = "Tax Details Updated.";
          var vResID=sessionStorage.getItem('ResId');
          this.BindTaxGrid("Active",vResID);
          this.BindTaxExport("Active",vResID);
          return false;
        }
      });
  }
  Clear() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    this.isShownActive = true;
    this.isShownUpdateBtn = true;
    this.isShownSaveBtn = false;
    this.restaurantId = "0";
    this.categoryId = "0";
    this.subCategoryId = "0";
    this.MenuItemId = "0";
    this.SalesTax = "";
    this.HospitalityTax = "";
    this.OtherTax = "";
    this.Description = "";
    this.isShownError = false;
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
var ValRes=0;
    this.BindTaxGrid(vStatus,ValRes);
    this.BindTaxExport(vStatus,ValRes);
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
    const workSheet = XLSX.utils.json_to_sheet(this.TaxDetails);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'TaxDetails');

    /* save to file */
    XLSX.writeFile(wb, "TaxDetails.xlsx");

  }

}
