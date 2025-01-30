import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-userrights',
  templateUrl: './userrights.component.html',
  styleUrls: ['./userrights.component.css']
})
export class UserrightsComponent implements OnInit {
  Drop = true;
  Resturants = [];
  restaurantId: string;
  UserRoles = [];
  UserRolesId: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  MenuRead: boolean = false;
  MenuWrite: boolean = false;
  ViewOrderRead: boolean = false;
  ViewOrderWrite: boolean = false;
  WaiterRead: boolean = false;
  WaiterWrite: boolean = false;
  TableRead: boolean = false;
  TableWrite: boolean = false;
  CategoryRead: boolean = false;
  CategoryWrite: boolean = false;
  SubCategoryRead: boolean = false;
  SubCategoryWrite: boolean = false;
  DiscountRead: boolean = false;
  DiscountWrite: boolean = false;
  CouponRead: boolean = false;
  CouponWrite: boolean = false;
  ResWorkHoursRead: boolean = false;
  ResWorkHoursWrite: boolean = false;
  ResHolidayRead: boolean = false;
  ResHolidayWrite: boolean = false;
  TipsRead: boolean = false;
  TipsWrite: boolean = false;
  TaxRead: boolean = false;
  TaxWrite: boolean = false;
  RatingRead: boolean = false;
  RatingWrite: boolean = false;
  ReportsRead: boolean = false;
  PrinterRead: boolean = false;
  PrinterWrite: boolean = false;
  SettingRead: boolean = false;
  SettingWrite: boolean = false;
  ExtraRead: boolean = false;
  ExtraWrite: boolean = false;
  EditedRights = [] as any;
  EditedRightsId: string;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  searchText: string;
  LoginUser:string;
  displayedColumns: string[] = ['sno', 'resturantName', 'roleName'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.BindRestaurantDDL();
    this.BindUserRoletDDL();
    this.BindUserRightsGrid("Active",1);
    this.Drop = false;

    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser=vName+" ("+vRole+")";
  }
  Show() {
    this.Drop = false;
  }

  BindRestaurantDDL() {
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetResturantForDDL').toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.Resturants = data;
          this.restaurantId = "0";
        }
        else {
        };
      });
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
  onResturantChange(restId: number) {
    this.BindUserRightsGrid("Active", restId);
  }
  BindUserRightsGrid(vStatus, vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminUserRights/GetUserRightsForGrid?sStatus=' + vStatus ).toPromise().then(
      (data: any) => {
        debugger;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      });
  }
  SaveUSerRights() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vUserRole = this.UserRolesId;

    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Resturant.";
      return false;
    }
    if (vUserRole == undefined || vUserRole == "" || vUserRole == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one UserRole.";
      return false;
    }
    var vPermission = "";
    if (this.MenuRead == true) {
      if (vPermission == "")
        vPermission = "Menu-Read";
      else
        vPermission = vPermission + "|Menu-Read";
    }
    if (this.MenuWrite == true) {
      if (vPermission == "")
        vPermission = "Menu-Wite";
      else
        vPermission = vPermission + "|Menu-Write";
    }
    if (this.ViewOrderRead == true) {
      if (vPermission == "")
        vPermission = "ViewOrder-Read";
      else
        vPermission = vPermission + "|ViewOrder-Read";
    }
    if (this.ViewOrderWrite == true) {
      if (vPermission == "")
        vPermission = "ViewOrder-Write";
      else
        vPermission = vPermission + "|ViewOrder-Write";
    }
    if (this.WaiterRead == true) {
      if (vPermission == "")
        vPermission = "Waiter-Read";
      else
        vPermission = vPermission + "|Waiter-Read";
    }
    if (this.WaiterWrite == true) {
      if (vPermission == "")
        vPermission = "Waiter-Write";
      else
        vPermission = vPermission + "|Waiter-Write";
    }

    if (this.TableRead == true) {
      if (vPermission == "")
        vPermission = "Table-Read";
      else
        vPermission = vPermission + "|Table-Read";
    }
    if (this.TableWrite == true) {
      if (vPermission == "")
        vPermission = "Table-Write";
      else
        vPermission = vPermission + "|Table-Write";
    }

    if (this.CategoryRead == true) {
      if (vPermission == "")
        vPermission = "Category-Read";
      else
        vPermission = vPermission + "|Category-Read";
    }
    if (this.CategoryWrite == true) {
      if (vPermission == "")
        vPermission = "Category-Write";
      else
        vPermission = vPermission + "|Category-Write";
    }

    if (this.SubCategoryRead == true) {
      if (vPermission == "")
        vPermission = "SubCategory-Read";
      else
        vPermission = vPermission + "|SubCategory-Read";
    }
    if (this.SubCategoryWrite == true) {
      if (vPermission == "")
        vPermission = "SubCategory-Write";
      else
        vPermission = vPermission + "|SubCategory-Write";
    }

    if (this.DiscountRead == true) {
      if (vPermission == "")
        vPermission = "Discount-Read";
      else
        vPermission = vPermission + "|Discount-Read";
    }
    if (this.DiscountWrite == true) {
      if (vPermission == "")
        vPermission = "Discount-Write";
      else
        vPermission = vPermission + "|Discount-Write";
    }

    if (this.CouponRead == true) {
      if (vPermission == "")
        vPermission = "Coupon-Read";
      else
        vPermission = vPermission + "|Coupon-Read";
    }
    if (this.CouponWrite == true) {
      if (vPermission == "")
        vPermission = "Coupon-Write";
      else
        vPermission = vPermission + "|Coupon-Write";
    }

    if (this.ResWorkHoursRead == true) {
      if (vPermission == "")
        vPermission = "ResWorkHours-Read";
      else
        vPermission = vPermission + "|ResWorkHours-Read";
    }
    if (this.ResWorkHoursWrite == true) {
      if (vPermission == "")
        vPermission = "ResWorkHours-Write";
      else
        vPermission = vPermission + "|ResWorkHours-Write";
    }

    if (this.ResHolidayRead == true) {
      if (vPermission == "")
        vPermission = "ResHoliday-Read";
      else
        vPermission = vPermission + "|ResHoliday-Read";
    }
    if (this.ResHolidayWrite == true) {
      if (vPermission == "")
        vPermission = "ResHoliday-Write";
      else
        vPermission = vPermission + "|ResHoliday-Write";
    }
    //
    if (this.TipsRead == true) {
      if (vPermission == "")
        vPermission = "Tips-Read";
      else
        vPermission = vPermission + "|Tips-Read";
    }
    if (this.TipsWrite == true) {
      if (vPermission == "")
        vPermission = "Tips-Write";
      else
        vPermission = vPermission + "|Tips-Write";
    }
    ///
    if (this.TaxRead == true) {
      if (vPermission == "")
        vPermission = "Tax-Read";
      else
        vPermission = vPermission + "|Tax-Read";
    }
    if (this.TaxWrite == true) {
      if (vPermission == "")
        vPermission = "Tax-Write";
      else
        vPermission = vPermission + "|Tax-Write";
    }////
    if (this.RatingRead == true) {
      if (vPermission == "")
        vPermission = "Rating-Read";
      else
        vPermission = vPermission + "|Rating-Read";
    }
    if (this.RatingWrite == true) {
      if (vPermission == "")
        vPermission = "Rating-Write";
      else
        vPermission = vPermission + "|Rating-Write";
    }
    /////
    if (this.ReportsRead == true) {
      if (vPermission == "")
        vPermission = "Reports-Read";
      else
        vPermission = vPermission + "|Reports-Read";
    }

    if (this.PrinterRead == true) {
      if (vPermission == "")
        vPermission = "Printer-Read";
      else
        vPermission = vPermission + "|Printer-Read";
    }
    if (this.PrinterWrite == true) {
      if (vPermission == "")
        vPermission = "Printer-Write";
      else
        vPermission = vPermission + "|Printer-Write";
    }

    if (this.SettingRead == true) {
      if (vPermission == "")
        vPermission = "Setting-Read";
      else
        vPermission = vPermission + "|Setting-Read";
    }
    if (this.SettingWrite == true) {
      if (vPermission == "")
        vPermission = "Setting-Write";
      else
        vPermission = vPermission + "|Setting-Write";
    }
    if (this.ExtraRead == true) {
      if (vPermission == "")
        vPermission = "Extra-Read";
      else
        vPermission = vPermission + "|Extra-Read";
    }
    if (this.ExtraWrite == true) {
      if (vPermission == "")
        vPermission = "Extra-Write";
      else
        vPermission = vPermission + "|Extra-Write";
    }

    if (vPermission == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Menu Screen.";
      return false;
    }
    


    debugger;
    //AdminUserRights
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('iUserRoleId', this.UserRolesId);
    params = params.append('sRights', vPermission);
    var value = this.http.get(environment.apiUrl + 'AdminUserRights/InsertUserRights', { params: params }).toPromise().then(
      (data: any) => {
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
          this.ErrorMsg = "Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Success") {
          this.BindUserRightsGrid("Active", 1);
          this.isShownSuccess = false;
          this.SuccessMsg = "Insert Successfully.";
          //return false;
          this.MenuRead = false;
          this.MenuWrite = false;
          this.ViewOrderRead = false;
          this.ViewOrderWrite = false;
          this.WaiterRead = false;
          this.WaiterWrite = false;
          this.TableRead = false;
          this.TableWrite = false;
          this.CategoryRead = false;
          this.CategoryWrite = false;
          this.SubCategoryRead = false;
          this.SubCategoryWrite = false;
          this.DiscountRead = false;
          this.DiscountWrite = false;
          this.CouponRead = false;
          this.CouponWrite = false;
          this.ResWorkHoursRead = false;
          this.ResWorkHoursWrite = false;
          this.ResHolidayRead = false;
          this.ResHolidayWrite = false;
          this.TipsRead = false;
          this.TipsWrite = false;
          this.TaxRead = false;
          this.TaxWrite = false;
          this.RatingRead = false;
          this.RatingWrite = false;
          this.ReportsRead = false;
          this.restaurantId = "0";
          this.UserRolesId = "0";
          this.PrinterRead = false;
          this.PrinterWrite = false;
          this.SettingRead = false;
          this.SettingWrite = false;
          this.ExtraRead=false;
          this.ExtraWrite=false;
        }
      });
  }
  UserRightEdit(item: any) {

    this.isShownSaveBtn = true;
    this.isShownUpdateBtn = false;


    this.EditedRights = item;
    var vuserRightsId = this.EditedRights.userRightsId;
    this.EditedRightsId = vuserRightsId;
    this.restaurantId = this.EditedRights.restaurantId;
    this.UserRolesId = this.EditedRights.userRoleId;
    var vRights = this.EditedRights.rights;
debugger;
    var vUR = vRights.split("|");
    for (var i = 0; i < vUR.length; i++) {
      var val = vUR[i];
      switch (val) {
        case "Menu-Read":
          this.MenuRead = true;
          break;
        case "Menu-Write":
          this.MenuWrite = true;
          break;
        case "ViewOrder-Read":
          this.ViewOrderRead = true;
          break;
        case "ViewOrder-Write":
          this.ViewOrderWrite = true;
          break;
        case "Waiter-Read":
          this.WaiterRead = true;
          break;
        case "Waiter-Write":
          this.WaiterWrite = true;
          break;
        case "Table-Read":
          this.TableRead = true;
          break;
        case "Table-Write":
          this.TableWrite = true;
          break;
        case "Category-Read":
          this.CategoryRead = true;
          break;
        case "Category-Write":
          this.CategoryWrite = true;
          break;
        case "SubCategory-Read":
          this.SubCategoryRead = true;
          break;
        case "SubCategory-Write":
          this.SubCategoryWrite = true;
          break;
        case "Discount-Read":
          this.DiscountRead = true;
          break;
        case "Discount-Write":
          this.DiscountWrite = true;
          break;
        case "Coupon-Read":
          this.CouponRead = true;
          break;
        case "Coupon-Write":
          this.CouponWrite = true;
          break;
        case "ResWorkHours-Read":
          this.ResWorkHoursRead = true;
          break;
        case "ResWorkHours-Write":
          this.ResWorkHoursWrite = true;
          break;
        case "ResHoliday-Read":
          this.ResHolidayRead = true;
          break;
        case "ResHoliday-Write":
          this.ResHolidayWrite = true;
          break;
        case "Tips-Read":
          this.TipsRead = true;
          break;
        case "Tips-Write":
          this.TipsWrite = true;
          break;
        case "Tax-Read":
          this.TaxRead = true;
          break;
        case "Tax-Write":
          this.TaxWrite = true;
          break;
        case "Rating-Read":
          this.RatingRead = true;
          break;
        case "Rating-Write":
          this.RatingWrite = true;
          break;
        case "Reports-Read":
          this.ReportsRead = true;
          break;
        case "Printer-Read":
          this.PrinterRead = true;
          break;
        case "Printer-Write":
          this.PrinterWrite = true;
          break;
        case "Setting-Read":
          this.SettingRead = true;
          break;
        case "Setting-Write":
          this.SettingWrite = true;
          break;
          case "Extra-Read":
          this.ExtraRead = true;
          break;
        case "Extra-Write":
          this.ExtraWrite = true;
          break;
      }
    }
  }

  UpdateUSerRights() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vUserRole = this.UserRolesId;

    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Resturant.";
      return false;
    }
    if (vUserRole == undefined || vUserRole == "" || vUserRole == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one UserRole.";
      return false;
    }
    var vPermission = "";
    if (this.MenuRead == true) {
      if (vPermission == "")
        vPermission = "Menu-Read";
      else
        vPermission = vPermission + "|Menu-Read";
    }
    if (this.MenuWrite == true) {
      if (vPermission == "")
        vPermission = "Menu-Wite";
      else
        vPermission = vPermission + "|Menu-Write";
    }
    if (this.ViewOrderRead == true) {
      if (vPermission == "")
        vPermission = "ViewOrder-Read";
      else
        vPermission = vPermission + "|ViewOrder-Read";
    }
    if (this.ViewOrderWrite == true) {
      if (vPermission == "")
        vPermission = "ViewOrder-Write";
      else
        vPermission = vPermission + "|ViewOrder-Write";
    }
    if (this.WaiterRead == true) {
      if (vPermission == "")
        vPermission = "Waiter-Read";
      else
        vPermission = vPermission + "|Waiter-Read";
    }
    if (this.WaiterWrite == true) {
      if (vPermission == "")
        vPermission = "Waiter-Write";
      else
        vPermission = vPermission + "|Waiter-Write";
    }

    if (this.TableRead == true) {
      if (vPermission == "")
        vPermission = "Table-Read";
      else
        vPermission = vPermission + "|Table-Read";
    }
    if (this.TableWrite == true) {
      if (vPermission == "")
        vPermission = "Table-Write";
      else
        vPermission = vPermission + "|Table-Write";
    }

    if (this.CategoryRead == true) {
      if (vPermission == "")
        vPermission = "Category-Read";
      else
        vPermission = vPermission + "|Category-Read";
    }
    if (this.CategoryWrite == true) {
      if (vPermission == "")
        vPermission = "Category-Write";
      else
        vPermission = vPermission + "|Category-Write";
    }

    if (this.SubCategoryRead == true) {
      if (vPermission == "")
        vPermission = "SubCategory-Read";
      else
        vPermission = vPermission + "|SubCategory-Read";
    }
    if (this.SubCategoryWrite == true) {
      if (vPermission == "")
        vPermission = "SubCategory-Write";
      else
        vPermission = vPermission + "|SubCategory-Write";
    }

    if (this.DiscountRead == true) {
      if (vPermission == "")
        vPermission = "Discount-Read";
      else
        vPermission = vPermission + "|Discount-Read";
    }
    if (this.DiscountWrite == true) {
      if (vPermission == "")
        vPermission = "Discount-Write";
      else
        vPermission = vPermission + "|Discount-Write";
    }

    if (this.CouponRead == true) {
      if (vPermission == "")
        vPermission = "Coupon-Read";
      else
        vPermission = vPermission + "|Coupon-Read";
    }
    if (this.CouponWrite == true) {
      if (vPermission == "")
        vPermission = "Coupon-Write";
      else
        vPermission = vPermission + "|Coupon-Write";
    }

    if (this.ResWorkHoursRead == true) {
      if (vPermission == "")
        vPermission = "ResWorkHours-Read";
      else
        vPermission = vPermission + "|ResWorkHours-Read";
    }
    if (this.ResWorkHoursWrite == true) {
      if (vPermission == "")
        vPermission = "ResWorkHours-Write";
      else
        vPermission = vPermission + "|ResWorkHours-Write";
    }

    if (this.ResHolidayRead == true) {
      if (vPermission == "")
        vPermission = "ResHoliday-Read";
      else
        vPermission = vPermission + "|ResHoliday-Read";
    }
    if (this.ResHolidayWrite == true) {
      if (vPermission == "")
        vPermission = "ResHoliday-Write";
      else
        vPermission = vPermission + "|ResHoliday-Write";
    }
    //
    if (this.TipsRead == true) {
      if (vPermission == "")
        vPermission = "Tips-Read";
      else
        vPermission = vPermission + "|Tips-Read";
    }
    if (this.TipsWrite == true) {
      if (vPermission == "")
        vPermission = "Tips-Write";
      else
        vPermission = vPermission + "|Tips-Write";
    }
    ///
    if (this.TaxRead == true) {
      if (vPermission == "")
        vPermission = "Tax-Read";
      else
        vPermission = vPermission + "|Tax-Read";
    }
    if (this.TaxWrite == true) {
      if (vPermission == "")
        vPermission = "Tax-Write";
      else
        vPermission = vPermission + "|Tax-Write";
    }////
    if (this.RatingRead == true) {
      if (vPermission == "")
        vPermission = "Rating-Read";
      else
        vPermission = vPermission + "|Rating-Read";
    }
    if (this.RatingWrite == true) {
      if (vPermission == "")
        vPermission = "Rating-Write";
      else
        vPermission = vPermission + "|Rating-Write";
    }
    /////
    if (this.ReportsRead == true) {
      if (vPermission == "")
        vPermission = "Reports-Read";
      else
        vPermission = vPermission + "|Reports-Read";
    }

    if (this.PrinterRead == true) {
      if (vPermission == "")
        vPermission = "Printer-Read";
      else
        vPermission = vPermission + "|Printer-Read";
    }
    if (this.PrinterWrite == true) {
      if (vPermission == "")
        vPermission = "Printer-Write";
      else
        vPermission = vPermission + "|Printer-Write";
    }

    if (this.SettingRead == true) {
      if (vPermission == "")
        vPermission = "Setting-Read";
      else
        vPermission = vPermission + "|Setting-Read";
    }
    if (this.SettingWrite == true) {
      if (vPermission == "")
        vPermission = "Setting-Write";
      else
        vPermission = vPermission + "|Setting-Write";
    }
    
    if (this.ExtraRead == true) {
      if (vPermission == "")
        vPermission = "Extra-Read";
      else
        vPermission = vPermission + "|Extra-Read";
    }
    if (this.ExtraWrite == true) {
      if (vPermission == "")
        vPermission = "Extra-Write";
      else
        vPermission = vPermission + "|Extra-Write";
    }

    if (vPermission == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Menu Screen.";
      return false;
    }
    var vRightsID = this.EditedRightsId;

    debugger;
    //AdminUserRights
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('iUserRoleId', this.UserRolesId);
    params = params.append('sRights', vPermission);
    params = params.append('iUserRightsId', vRightsID);
    var value = this.http.get(environment.apiUrl + 'AdminUserRights/UpdateUserRights', { params: params }).toPromise().then(
      (data: any) => {
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
        else if (vErrorMsg1 == "Exist") {
          this.isShownError = false;
          this.ErrorMsg = "Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Success") {
          this.isShownSuccess = false;
          this.SuccessMsg = "Updated Successfully.";
          this.BindUserRightsGrid("Active", 1);
          //return false;
          this.isShownSaveBtn = false;
          this.isShownUpdateBtn = true;
          this.MenuRead = false;
          this.MenuWrite = false;
          this.ViewOrderRead = false;
          this.ViewOrderWrite = false;
          this.WaiterRead = false;
          this.WaiterWrite = false;
          this.TableRead = false;
          this.TableWrite = false;
          this.CategoryRead = false;
          this.CategoryWrite = false;
          this.SubCategoryRead = false;
          this.SubCategoryWrite = false;
          this.DiscountRead = false;
          this.DiscountWrite = false;
          this.CouponRead = false;
          this.CouponWrite = false;
          this.ResWorkHoursRead = false;
          this.ResWorkHoursWrite = false;
          this.ResHolidayRead = false;
          this.ResHolidayWrite = false;
          this.TipsRead = false;
          this.TipsWrite = false;
          this.TaxRead = false;
          this.TaxWrite = false;
          this.RatingRead = false;
          this.RatingWrite = false;
          this.ReportsRead = false;
          this.restaurantId = "0";
          this.UserRolesId = "0";
          this.PrinterRead = false;
          this.PrinterWrite = false;
          this.SettingRead = false;
          this.SettingWrite = false;
          this.ExtraRead=false;
    this.ExtraWrite=false;
        }
      });
  }

  clear() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    this.isShownSaveBtn = false;
    this.isShownUpdateBtn = true;

    this.MenuRead = false;
    this.MenuWrite = false;
    this.ViewOrderRead = false;
    this.ViewOrderWrite = false;
    this.WaiterRead = false;
    this.WaiterWrite = false;
    this.TableRead = false;
    this.TableWrite = false;
    this.CategoryRead = false;
    this.CategoryWrite = false;
    this.SubCategoryRead = false;
    this.SubCategoryWrite = false;
    this.DiscountRead = false;
    this.DiscountWrite = false;
    this.CouponRead = false;
    this.CouponWrite = false;
    this.ResWorkHoursRead = false;
    this.ResWorkHoursWrite = false;
    this.ResHolidayRead = false;
    this.ResHolidayWrite = false;
    this.TipsRead = false;
    this.TipsWrite = false;
    this.TaxRead = false;
    this.TaxWrite = false;
    this.RatingRead = false;
    this.RatingWrite = false;
    this.ReportsRead = false;
    this.restaurantId = "0";
    this.UserRolesId = "0";
    this.PrinterRead = false;
    this.PrinterWrite = false;
    this.SettingRead = false;
    this.SettingWrite = false;
    this.ExtraRead=false;
    this.ExtraWrite=false;
  }
  //
  MenuReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.MenuRead = true;
    }
    else {
      this.MenuRead = false;
    }
  }

  MenuWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.MenuWrite = true;
    }
    else {
      this.MenuWrite = false;
    }
  }

  ViewOrderReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.ViewOrderRead = true;
    }
    else {
      this.ViewOrderRead = false;
    }
  }

  ViewOrderWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.ViewOrderWrite = true;
    }
    else {
      this.ViewOrderWrite = false;
    }
  }

  ViewWaiterReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.WaiterRead = true;
    }
    else {
      this.WaiterRead = false;
    }
  }

  ViewWaiterWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.WaiterWrite = true;
    }
    else {
      this.WaiterWrite = false;
    }
  }

  ViewTableReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.TableRead = true;
    }
    else {
      this.TableRead = false;
    }
  }

  ViewTableWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.TableWrite = true;
    }
    else {
      this.TableWrite = false;
    }
  }

  CategoryReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.CategoryRead = true;
    }
    else {
      this.CategoryRead = false;
    }
  }

  CategoryWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.CategoryWrite = true;
    }
    else {
      this.CategoryWrite = false;
    }
  }

  SubCategoryReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.SubCategoryRead = true;
    }
    else {
      this.SubCategoryRead = false;
    }
  }

  SubCategoryWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.SubCategoryWrite = true;
    }
    else {
      this.SubCategoryWrite = false;
    }
  }

  DiscountReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.DiscountRead = true;
    }
    else {
      this.DiscountRead = false;
    }
  }

  DiscountWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.DiscountWrite = true;
    }
    else {
      this.DiscountWrite = false;
    }
  }
  CouponReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.CouponRead = true;
    }
    else {
      this.CouponRead = false;
    }
  }

  CouponWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.CouponWrite = true;
    }
    else {
      this.CouponWrite = false;
    }
  }
  ResWorkHoursReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.ResWorkHoursRead = true;
    }
    else {
      this.ResWorkHoursRead = false;
    }
  }

  ResWorkHoursWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.ResWorkHoursWrite = true;
    }
    else {
      this.ResWorkHoursWrite = false;
    }
  }
  ResHolidayReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.ResHolidayRead = true;
    }
    else {
      this.ResHolidayRead = false;
    }
  }

  ResHolidayWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.ResHolidayWrite = true;
    }
    else {
      this.ResHolidayWrite = false;
    }
  }
  TipsReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.TipsRead = true;
    }
    else {
      this.TipsRead = false;
    }
  }

  TipsWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.TipsWrite = true;
    }
    else {
      this.TipsWrite = false;
    }
  }
  TaxReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.TaxRead = true;
    }
    else {
      this.TaxRead = false;
    }
  }

  TaxWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.TaxWrite = true;
    }
    else {
      this.TaxWrite = false;
    }
  }
  RatingReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.RatingRead = true;
    }
    else {
      this.RatingRead = false;
    }
  }

  RatingWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.RatingWrite = true;
    }
    else {
      this.RatingWrite = false;
    }
  }
  ReportsReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.ReportsRead = true;
    }
    else {
      this.ReportsRead = false;
    }
  }

  PrinterReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.PrinterRead = true;
    }
    else {
      this.PrinterRead = false;
    }
  }

  PrinterWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.PrinterWrite = true;
    }
    else {
      this.PrinterWrite = false;
    }
  }

  SettingReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.SettingRead = true;
    }
    else {
      this.SettingRead = false;
    }
  }

  SettingWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.SettingWrite = true;
    }
    else {
      this.SettingWrite = false;
    }
  }

  ExtraReadChange(event) {
    debugger;
    if (event.target.checked) {
      this.ExtraRead = true;
    }
    else {
      this.ExtraRead = false;
    }
  }

  ExtraWriteChange(event) {
    debugger;
    if (event.target.checked) {
      this.ExtraWrite = true;
    }
    else {
      this.ExtraWrite = false;
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
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'UserRights');

    /* save to file */
    XLSX.writeFile(wb, "UserRights.xlsx");

  }


}
