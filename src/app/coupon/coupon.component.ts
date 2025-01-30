import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CouponComponent implements OnInit {
  Drop = true;
  items = [];
  Coupons = [];
  Resturants = [];
  //Category = [];
  //SubCategory = [];
  //MenuItem = [];
  restaurantId: string;
  //categoryId: string;
  //subCategoryId: string;
  //MenuItemId: string;
  CouponCode: string;
  CouponDiscount: string;
  ValitityFrom: string;
  ValitityTo: string;
  Description: string;
  CopounType: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  pageOfItems: Array<any>;
  public searchText: string;
  EditedCoupon = [] as any;
  EditedCouponId: string;
  //EditedItemId: string;
  //isDisabled = false;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  Status: boolean = false;
  StatusGrid: boolean = false;
  isShownActive: Boolean = true;
  lblDiscountType:string;
  LoginUser:string;
  vRead:string;
  isDisabled = true;
  vWrite:string;
  userrole:string;
  closeResult:string;
  Activestaus=[] as any;
  displayedColumns: string[] = ['sno','restaurantName','copounCode', 'discount', 'validityFrom', 'validityTo', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private modalService: NgbModal,private http: HttpClient) { }

  ngOnInit(): void {

    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.loadScript('../../assets/js/Alert.js');
    this.CopounType="P";
    this.userrole = sessionStorage.getItem('UserRole');
    this.BindCouponGrid("Active");
    this.BindCouponExport("Active");
    this.BindRestaurantDDL();
    //this.BindCategoryDDL();
    this.lblDiscountType="Coupon Discount %";

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
    }
  
    this.vRead = localStorage.getItem('Coupon-Read');
    this.vWrite = localStorage.getItem('Coupon-Write');
    if(this.vWrite ==null || this.vWrite == "" ){
    this.isShownSaveBtn=true;
    this.isShownUpdateBtn=true;
    }
debugger;
    
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

  BindCouponGrid(value1) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetCouponsForGrid?sStatus=' + value1).toPromise().then(
      (data: any) => {
        debugger;
      
          //this.items = data;          
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
       
      });
  }
  else{
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetCouponsForGridres?sStatus=' + value1+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then(
      (data: any) => {
        debugger;
      
          //this.items = data;          
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
       
      });
 
  }
}

  BindCouponExport(value1) {
    if (this.userrole == "SuperAdmin") {
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetCouponsForExport?sStatus=' + value1).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //this.items = data;          
          this.Coupons = data;          
        }
        else {
        };
      });
  }else{
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetCouponsForExportres?sStatus=' + value1+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //this.items = data;          
          this.Coupons = data;          
        }
        else {
        };
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
        }
        else {
        };
      });
  }
  // BindCategoryDDL() {
  //   var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetCategoryForDDL').toPromise().then(
  //     (data: any) => {
  //       debugger;
  //       if (data.length != 0) {
  //         //
  //         this.Category = data;
  //         this.categoryId = "0";
  //         this.subCategoryId = "0";
  //         this.MenuItemId = "0";
  //       }
  //       else {
  //       };
  //     });
  // }

  // onCatChange(catId: number) {
  //   debugger;
  //   var vCatId = catId;
  //   if (vCatId != 0) {
  //     var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetSubCategoryForDDL?iCatID=' + vCatId).toPromise().then(
  //       (data: any) => {
  //         debugger;
  //         if (data.length != 0) {
  //           //
  //           this.SubCategory = data;
  //           this.subCategoryId = "0";
  //         }
  //         else {
  //         };
  //       });
  //   }
  // }
  // onSubCatChange(subcatId: number) {
  //   debugger;
  //   var vSubCatId = subcatId;
  //   var vCatId = this.categoryId;
  //   if (vSubCatId != 0) {
  //     var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetItemsForDDL?iCatID=' + vCatId + '&iSubCatId=' + vSubCatId).toPromise().then(
  //       (data: any) => {
  //         debugger;
  //         if (data.length != 0) {
  //           //
  //           this.MenuItem = data;
  //           this.MenuItemId = "0";
  //         }
  //         else {
  //         };
  //       });
  //   }
  // }

  InsertCoupon() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    // var vCategory_Id = this.categoryId;
    // var vSubCategory_ID = this.subCategoryId;
    // var vMenuItemId = this.MenuItemId;
    var vCouponCode = this.CouponCode;
    var vDescription = this.Description;
    var vCouponDiscount = this.CouponDiscount;
    var vValitityFrom = this.ValitityFrom;
    var vValitityTo = this.ValitityTo;
    //var vCopounDetailsId = this.CopounDetailsId;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    // if (vCategory_Id == undefined || vCategory_Id == "" || vCategory_Id == "0") {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Select any one Item Category.";
    //   return false;
    // }
    if (vCouponCode == undefined || vCouponCode == "" || vCouponCode == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter the Copoun Code.";
      return false;
    }
   
    if (vCouponDiscount == undefined || vCouponDiscount == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Discount.";
      return false;
    }
    if (vValitityFrom == undefined || vValitityFrom == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Select Validity From Date.";
      return false;
    }
    if (vValitityTo == undefined || vValitityTo == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Select Validity To Date.";
      return false;
    }
    if (vDescription == undefined || vDescription == "") {
      this.Description="";
    }
    var vCurrentDate1 = new Date();
    var vFrom1 = new Date(vValitityFrom);
    var vTo1 = new Date(vValitityTo);
    if ((vFrom1) <= (vCurrentDate1)) {
      this.isShownError = false;
      this.ErrorMsg = "Validity From Date Should Greater then or equal to Current Date.";
      return false;
    }
    if ((vTo1) < (vCurrentDate1)) {
      this.isShownError = false;
      this.ErrorMsg = "Validity To Date Should Greater then or equal to Current Date.";
      return false;
    }
    if ((vTo1) < (vFrom1)) {
      this.isShownError = false;
      this.ErrorMsg = "Validity To date should be grater then Valitity From date.";
      return false;
    }
    
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('dDiscount', this.CouponDiscount);
    params = params.append('sCopounCode', this.CouponCode);
    params = params.append('dtValidityFrom', this.ValitityFrom.toString());
    params = params.append('dtValidityTo', this.ValitityTo.toString());
    params = params.append('sDescription', this.Description);
    params = params.append('sCopounType', this.CopounType);
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/InsertCoupon', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        var vcouponId = data;
        this.BindCouponGrid("Active");
        this.BindCouponExport("Active");
        $("#ShowActive").prop('checked',true);
        this.restaurantId = "0";
        // this.categoryId = "0";
        // this.subCategoryId = "0";
        // this.MenuItemId = "0";
        this.CouponCode = "";
        this.CouponDiscount = "";
        this.ValitityFrom = null;
        this.ValitityTo = null;
        this.Description = "";
        this.isShownSuccess = false;
        this.SuccessMsg = "Coupon Added.";
        return false;

        // let params1 = new HttpParams();
        // params1 = params1.append('iRestaurant_ID', this.restaurantId);
        // params1 = params1.append('iCatId', this.categoryId);
        // params1 = params1.append('iSubCatId', this.subCategoryId);
        // params1 = params1.append('iItemId', this.MenuItemId);
        // params1 = params1.append('iCouponId', vcouponId)


        // var value11 = this.http.get(environment.apiUrl + 'AdminCopoun/UpdateCouponToItem', { params: params1 }).toPromise().then(
        //   (data: any) => {
        //     debugger;
        //     // var vcouponId = data;
        //   }).catch((data: any) => {
        //     debugger;
        //     var vDataError = JSON.stringify(data.error.text);
        //     var vErrorMsg = vDataError.replace('"', '');
        //     var vErrorMsg1 = vErrorMsg.replace('"', '');
        //     if (vErrorMsg1 == "Failed") {
        //       this.isShownError = false;
        //       this.ErrorMsg = "Insert Failed, Please Try Again.";
        //       return false;
        //     }
        //     else if (vErrorMsg1 == "Success") {
        //       this.BindCouponGrid("Active");
        //       this.restaurantId = "0";
        //       this.categoryId = "0";
        //       this.subCategoryId = "0";
        //       this.MenuItemId = "0";
        //       this.CouponCode = "";
        //       this.CouponDiscount = "";
        //       this.ValitityFrom = null;
        //       this.ValitityTo = null;
        //       this.Description = "";
        //       this.isShownError = false;
        //       this.ErrorMsg = "Coupon Added.";
        //       return false;
        //     }
        //   });



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
          this.ErrorMsg = "Copoun Code Already Exist.";
          return false;
        }
      });

  }

  CouponEdit(item: any) {
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.EditedCoupon = item;
    var vCouponID = this.EditedCoupon.copounDetailsId;
    this.EditedCouponId = vCouponID;
    // var vMenuItemId = this.EditedCoupon.menuItemId;
    // this.EditedItemId = vMenuItemId;
    //iMenuItemId
    var vStatus = this.EditedCoupon.status;
    debugger;
    if(vStatus == "Active")
    {
      this.Status =false;
    }
    else
    {
      this.Status=true;
    }
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetCouponForEdit?iCouponID=' + vCouponID).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          this.Drop = false;
          //this.isDisabled = true;
          this.isShownSaveBtn = true;
          this.isShownUpdateBtn = false;
          this.isShownActive = false;
          if(this.vWrite ==null || this.vWrite == "" ){
            this.isShownSaveBtn=true;
            this.isShownUpdateBtn=true;
            }
          var vData = data;
          this.restaurantId = vData["0"].restaurantId;
          //this.categoryId = vData["0"].categoryId;
          this.CouponCode = vData["0"].copounCode;
          this.Description = vData["0"].description;
          this.CouponDiscount = vData["0"].discount;
          var vfrm=vData["0"].validityFrom ;
          var vVTo=vData["0"].validityTo ;
          var fromdate =new Date(vfrm);
var dat=fromdate.setDate(fromdate.getDate() +1).toString();

          this.ValitityFrom=new Date(new Date(vfrm).setDate(new Date(vfrm).getDate() + 1)).toISOString().split('T')[0];
          

          this.ValitityTo = new Date(new Date(vVTo).setDate(new Date(vVTo).getDate() + 1)).toISOString().split('T')[0];
          //this.subCategoryId;
          //this.MenuItemId;

        //   var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetSubCategoryForDDL?iCatID=' + this.categoryId).toPromise().then(
        //     (data: any) => {
        //       debugger;
        //       if (data.length != 0) {
        //         //
        //         this.SubCategory = data;
        //         this.subCategoryId = vData["0"].subCategoryId;


        //         var value = this.http.get(environment.apiUrl + 'AdminCopoun/GetItemsForDDL?iCatID=' + this.categoryId + '&iSubCatId=' + this.subCategoryId).toPromise().then(
        //           (data: any) => {
        //             debugger;
        //             if (data.length != 0) {
        //               //
        //               this.MenuItem = data;
        //               this.MenuItemId = vData["0"].menuItemId;
        //             }
        //             else {
        //             };
        //           });

        //       }
        //       else {
        //       };
        //     });


         }
         else {
         };
      });
  }

  UpdateCoupon() {
    this.modalService.dismissAll("Addon");
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurantId;
    // var vCategory_Id = this.categoryId;
    // var vSubCategory_ID = this.subCategoryId;
    // var vMenuItemId = this.MenuItemId;
    var vCouponCode = this.CouponCode;
    var vDescription = this.Description;
    var vCouponDiscount = this.CouponDiscount;
    var vValitityFrom = this.ValitityFrom;
    var vValitityTo = this.ValitityTo;
    debugger;
    var vStatus = "Active";
    if (this.Status == true)
      vStatus = "InActive";
    else
      vStatus = "Active";


    //var vCopounDetailsId = this.CopounDetailsId;
    if (vRestaurant_ID == undefined || vRestaurant_ID == "" || vRestaurant_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    // if (vCategory_Id == undefined || vCategory_Id == "" || vCategory_Id == "0") {
    //   this.isShownError = false;
    //   this.ErrorMsg = "Please Select any one Item Category.";
    //   return false;
    // }
    if (vCouponCode == undefined || vCouponCode == "" || vCouponCode == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter the Coupon Code.";
      return false;
    }
    if (vDescription == undefined || vDescription == "") {
     this.Description="";
    }
    if (vCouponDiscount == undefined || vCouponDiscount == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter the Discount.";
      return false;
    }
    if (vValitityFrom == undefined || vValitityFrom == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Select Validity From Date.";
      return false;
    }
    if (vValitityTo == undefined || vValitityTo == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Select Validity To Date.";
      return false;
    }
    var vCurrentDate1 = new Date();
    var vFrom1 = new Date(vValitityFrom);
    var vTo1 = new Date(vValitityTo);
    if ((vFrom1) <= (vCurrentDate1)) {
      this.isShownError = false;
      this.ErrorMsg = "Validity From Date Should Greater then or equal to Current Date.";
      return false;
    }
    if ((vTo1) < (vCurrentDate1)) {
      this.isShownError = false;
      this.ErrorMsg = "Validity To Date Should Greater then or equal to Current Date.";
      return false;
    }
    if ((vTo1) < (vFrom1)) {
      this.isShownError = false;
      this.ErrorMsg = "Validity To date should be grater then Valitity From date.";
      return false;
    }


    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurantId);
    params = params.append('dDiscount', this.CouponDiscount);
    params = params.append('sCopounCode', this.CouponCode);
    params = params.append('dtValidityFrom', this.ValitityFrom.toString());
    params = params.append('dtValidityTo', this.ValitityTo.toString());
    params = params.append('sDescription', this.Description);
    params = params.append('sCopounType', this.CopounType);
    params = params.append('sStatus', vStatus);
    params = params.append('iCopounDetailsId', this.EditedCouponId);
    var value = this.http.get(environment.apiUrl + 'AdminCopoun/UpdateCoupon', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        //var vcouponId = data;

      }).catch((data: any) => {
        debugger;
        //this.isDisabled = false;
        this.isShownSaveBtn = false;
        this.isShownUpdateBtn = true;
        this.isShownActive = true;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Update Failed, Please Try Again.";
          return false;
        }
        else if (vErrorMsg1 == "Success") {
          this.isShownSuccess = false;
          this.SuccessMsg = "Update Successfully.";
          $("#ShowActive").prop('checked',true);
          this.restaurantId = "0";
          // this.categoryId = "0";
          // this.subCategoryId = "0";
          // this.MenuItemId = "0";
          this.CouponCode = "";
          this.CouponDiscount = "";
          this.ValitityFrom = null;
          this.ValitityTo = null;
          this.Description = "";
          this.BindCouponGrid("Active");
          this.BindCouponExport("Active");
          return false;
        }
      });

  }

  OnClear() {
    $("#ShowActive").prop('checked',true);
    this.BindCouponGrid("Active");
    if (this.userrole == "SuperAdmin") {
      this.restaurantId = "0";
    }
    else {
    }
    // this.categoryId = "0";
    // this.subCategoryId = "0";
    // this.MenuItemId = "0";
    this.CouponCode = "";
    this.CouponDiscount = "";
    this.ValitityFrom = null;
    this.ValitityTo = null;
    this.Description = "";
    this.isShownActive = true;

    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.isShownSaveBtn = false;
    this.isShownUpdateBtn = true;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
      }
    //this.isDisabled = false;
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

    this.BindCouponGrid(vStatus);
    this.BindCouponExport(vStatus);
  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  UpdateStatus1(content,item:any) {
    debugger;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.isShownSaveBtn=true;
      this.isShownUpdateBtn=true;
      return;
      }
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
      this.modalService.dismissAll("Addon");
    this.EditedCoupon = this.Activestaus;
    var vStatus = this.EditedCoupon.status;
    var vStatus1 = "";
    if (vStatus == "Active")
      vStatus1 = "InActive";
    else
      vStatus1 = "Active";


    var vCopounDetailsId = this.EditedCoupon.copounDetailsId;

      let params = new HttpParams();
      params = params.append('iCouponId', vCopounDetailsId);
      params = params.append('sStatus', vStatus1);
      var value = this.http.get(environment.apiUrl + 'AdminCopoun/UpdteCouponStatus', { params: params }).toPromise().then(
        (data: any) => {
          debugger;

        }).catch((data: any) => {
          debugger;
          var vDataError = JSON.stringify(data.error.text);
          var vErrorMsg = vDataError.replace('"', '');
          var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
          if (vErrorMsg1 == "Sucess") {
            alert("Status Changed");
            this.BindCouponGrid("Active");
            $("#ShowActive").prop('checked',true);
            this.BindCouponExport("Active");
          }
          else if (vErrorMsg1 == "Failed") {

          }
          return false;
        });
      return false;
   

  }

  //export code
  // exportexcel(): void {
  //   debugger;
  //   /* table id is passed over here */
  //   let element = document.getElementById('data-table-5');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, "CouponDetails.xlsx");

  // }

  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.Coupons);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'CouponDetails');

    /* save to file */
    XLSX.writeFile(wb, "CouponDetails.xlsx");

  }

  onTypeChange(disType: string) {
    if (disType == "P")
      this.lblDiscountType = "Coupon Discount %";
    else if (disType == "D")
      this.lblDiscountType = "Coupon Discount $";
  }

}
