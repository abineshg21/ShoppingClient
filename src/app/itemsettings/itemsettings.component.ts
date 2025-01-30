import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-itemsettings',
  templateUrl: './itemsettings.component.html',
  styleUrls: ['./itemsettings.component.css']
})
export class ItemsettingsComponent implements OnInit {
  Resturants = [];
  Category = [];
  SubCategory = [];
  MenuItem = [];
  Discounts = [];
  CopounDetails = [];

  restaurantId: string;
  categoryId: string;
  subCategoryId: string;
  MenuItemId: string;
  discountId: string;
  copounDetailsId: string;

  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  LoginUser:string;
  isDisabled = true;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');

    this.BindRestaurantDDL();

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
    this.BindDiscountDDL(vResId);
    this.BindCouponDDL(vResId);
    }
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
  
  // Show() {
  //   this.Drop = false;
  // }
  BindRestaurantDDL() {
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetResturantForDDL').toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Resturants = data;
          this.restaurantId = "0";
          this.categoryId = "0";
          this.subCategoryId = "0";
          this.MenuItemId = "0";
          this.discountId = "0";
          this.copounDetailsId = "0";
        }
        else {
        };
      });
  }
  onResturantChange(restId: number) {
    this.BindCategoryDDL(restId);
    this.BindDiscountDDL(restId);
    this.BindCouponDDL(restId);
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

  BindDiscountDDL(vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetDiscountsForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Discounts = data;
          this.discountId = "0";
        }
        else {
        };
      });
  }

  BindCouponDDL(vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCouponsForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.CopounDetails = data;
          this.copounDetailsId = "0";
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

  Insert() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    var vCategory_Id = this.categoryId;
    var vSubCategory_ID = this.subCategoryId;
    var vMenuItemId = this.MenuItemId;
    var vCopounDetailsId = this.copounDetailsId;
    var vDiscountId = this.discountId;

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
    if (vCopounDetailsId == undefined || vCopounDetailsId == "" || vCopounDetailsId == "0") {
     this.copounDetailsId="0";
    } 
    if(vDiscountId == undefined || vDiscountId == "" || vDiscountId == "0") {
      this.discountId="0";
    }

    if (vCopounDetailsId != undefined && vCopounDetailsId != "" && vCopounDetailsId != "0") {
      let params1 = new HttpParams();
      params1 = params1.append('iRestaurant_ID', this.restaurantId);
      params1 = params1.append('iCatId', this.categoryId);
      params1 = params1.append('iSubCatId', this.subCategoryId);
      params1 = params1.append('iItemId', this.MenuItemId);
      params1 = params1.append('iCouponId', vCopounDetailsId)


      var value11 = this.http.get(environment.apiUrl + 'AdminItemSettings/UpdateCouponToItem', { params: params1 }).toPromise().then(
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
            //return false;
          }
          else if (vErrorMsg1 == "Success") {

            this.copounDetailsId = "0";
            this.isShownError = false;
            this.ErrorMsg = "Item Settings Succeded.";
            //return false;
          }
        });
    }
    if (vDiscountId != undefined && vDiscountId != "" && vDiscountId != "0") {
      let params1 = new HttpParams();
      params1 = params1.append('iRestaurant_ID', this.restaurantId);
      params1 = params1.append('iCatId', this.categoryId);
      params1 = params1.append('iSubCatId', this.subCategoryId);
      params1 = params1.append('iItemId', this.MenuItemId);
      params1 = params1.append('iDiscountId', vDiscountId)


      var value1 = this.http.get(environment.apiUrl + 'AdminItemSettings/UpdateDiscountToItem', { params: params1 }).toPromise().then(
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
            //return false;
          }
          else if (vErrorMsg1 == "Success") {
            this.discountId = "0";
            this.isShownError = false;
            this.ErrorMsg = "Coupon Added.";
            //return false;
          }
        });
    }

    this.restaurantId = "0";
    this.categoryId = "0";
    this.subCategoryId = "0";
    this.MenuItemId = "0";
  }

  OnClear(){
    this.restaurantId = "0";
    this.categoryId = "0";
    this.subCategoryId = "0";
    this.MenuItemId = "0";
    this.copounDetailsId="0";
    this.discountId="0";

    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
  }

}
