import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as  $ from 'jquery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHomeComponent implements OnInit {
  Drop = true;
  Resturants = [] as any;
  Category = [] as any;
  SubCategory = [] as any;
  Coupons = [] as any;
  Discounts = [] as any;
  restaurant_ID: string;
  category_Id: string;
  subCategory_ID: string;
  CopounDetailsId: string;
  DiscountId: string;
  Customize: string;
  txtCustomize: string;
  ItemName: string;
  MenuVariance = [] as any;
  MenuVarianceRemove = [] as any;
  customize = [] as any;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  isShownActive: Boolean = true;
  public searchText: string;
  ErrorMsg: string;
  SuccessMsg: string;
  closeResult: string;
  public progress: number;
  public pages: number[] = [];
  activePage: number;
  MenuItems = [] as any;
  Description: string;
  EditedItem = [] as any;
  items = [];
  custome = [] as any;
  pageOfItems: Array<any>;
  config: any;
  EditedItemId: string;
  Status: boolean = false;
  StatusGrid: boolean = false;
  Customize1: string;
  Customize2: string;
  Customize3: string;
  Customize4: string;
  Customize5: string;
  userrole: string;
  Customize6: string;
  Customize7: string;
  Customize8: string;
  Customize9: string;
  PaymentToken: string;
  isShownWrite: boolean = true;
  vRead: string;
  vWrite: string;
  LoginUser: string;
  Prize1: number;
  Prize2: number;
  Prize3: number;
  Prize4: number;
  Prize5: number;
  Prize6: number;
  Prize7: number;
  Prize8: number;
  Prize9: number;
  isDisabled = true;
  Activestaus = [] as any;
  isShownSaveBtn: boolean = false;
  isShownUpdateBtn: boolean = true;
  ExtraStatus: string;
  displayedColumns: string[] = ['sno', 'name', 'categoryName', 'itemName', 'price', 'discountAmt', 'coupon', 'status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private modalService: NgbModal, private http: HttpClient) {
    // this.BindItemGrid();
    // this.config = {
    //   itemsPerPage: 5,
    //   currentPage: 1,
    //   totalItems: this.MenuItems.count
    // };
  }
  // @Input() totalRecords: number = 0;
  // @Input() recordsPerPage: number = 2;
  // @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.loadScript('../../assets/js/Alert.js');
    debugger;
    this.vRead = localStorage.getItem('Menu-Read');
    this.vWrite = localStorage.getItem('Menu-Write');
    if ((this.vRead == undefined || this.vRead == "") && (this.vWrite == undefined || this.vWrite == ""))
      window.location.href = '/AdminDashboard';
    if (this.vWrite != undefined && this.vWrite != "") {
      if (this.vWrite == "True")
        this.isShownWrite = false;
    }
    this.userrole = sessionStorage.getItem('UserRole');
    this.customizegrd();
    this.BindRestaurantDDL();
    //this.BindCategoryDDL();
    this.BindItemGrid("Active");
    this.BindItemExport("Active");
    // this.BindCouponDDL();
    // this.BindDiscountDDL();

    this.MenuVariance.push({ vName: "vName1", vPrice: "vPrice1", vImage: "vImage1", vFile: "", vDescription: "vDescription1", MenuVarianceID: "", MenuVar: "vMenuVar1" });
    // window.addEventListener('message', function(event) {
    //   debugger;
    //   var token = JSON.parse(event.data);
    //   var mytoken = document.getElementById('mytoken');
    //   ((document.getElementById('mytoken') as HTMLInputElement).value) = token.message;
    //   var vtoken= ((document.getElementById('mytoken') as HTMLInputElement).value);
    //   }, false);

    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser = vName + " (" + vRole + ")";
    if (this.isShownWrite == true) {
      this.isShownSaveBtn = true;
      this.isShownUpdateBtn = true;
      // alert("You Have No Permission To Access")
      // return false;
    }
    // var vRole = sessionStorage.getItem('UserRole');
    // if (vRole == "SuperAdmin") {
    //   this.isDisabled = false;
    // }
    // else {
    //   var vResId = sessionStorage.getItem('ResId');
    //   this.restaurant_ID = vResId;
    //   this.BindCategoryDDL(vResId);
    // this.BindDiscountDDL(vResId);
    // this.BindCouponDDL(vResId);
    // }
    this.ExtraStatus = "false";
  }
  Show() {
    // if (this.isShownWrite == true) {
    //   alert("You Have No Permission To Access")
    //   return false;
    // }

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
  payment() {
    debugger;
    var vtoken = ((document.getElementById('mytoken') as HTMLInputElement).value).toString();
    var vAmount = "5.00";
    var value = this.http.get(environment.apiUrl + 'customerdetails/FirstDataGateway?sAmount=' + vAmount + '&sTokens=' + vtoken).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Category = data;
          this.category_Id = "0";
          this.subCategory_ID = "0";
        }
        else {
        };
      });
  }
  BindItemGrid(value1) {
    debugger;
    if (this.userrole == "SuperAdmin") {
      var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetMenuItemForGrid?sStatus=' + value1).toPromise().then(
        (data: any) => {
          debugger;

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
          // this.config = {
          //   itemsPerPage: 5,
          //   currentPage: 1,
          //   totalItems: data.length
          // };
          // if (data.length != 0) {
          //   //
          //   this.items = data;

          // }
          // else {
          // };
        });
    } else {
      var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetMenuItemForGridres?sStatus=' + value1 + '&ResId=' + sessionStorage.getItem('ResId')).toPromise().then(
        (data: any) => {
          debugger;

          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
          // this.config = {
          //   itemsPerPage: 5,
          //   currentPage: 1,
          //   totalItems: data.length
          // };
          // if (data.length != 0) {
          //   //
          //   this.items = data;

          // }
          // else {
          // };
        });
    }
  }
  BindItemExport(value1) {
    if (this.userrole == "SuperAdmin") {
      var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetMenuItemForExport?sStatus=' + value1).toPromise().then(
        (data: any) => {
          debugger;
          this.MenuItems = data;

        });
    } else {
      var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetMenuItemForExportres?sStatus=' + value1 + '&ResId=' + sessionStorage.getItem('ResId')).toPromise().then(
        (data: any) => {
          debugger;
          this.MenuItems = data;

        });
    }

  }
  BindRestaurantDDL() {
    var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetResturantForDDL').toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Resturants = data;
          this.restaurant_ID = "0";
          this.category_Id = "0";
          this.subCategory_ID = "0";
          this.CopounDetailsId = "0";
          this.DiscountId = "0";
          var vRole = sessionStorage.getItem('UserRole');
          if (vRole == "SuperAdmin") {
            this.isDisabled = false;
          }
          else {
            var vResId = sessionStorage.getItem('ResId');
            this.restaurant_ID = vResId;
            this.BindCategoryDDL(vResId);
            this.BindDiscountDDL(vResId);
            this.BindCouponDDL(vResId);
          }
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

  customizegrd() {
    var vLength = this.customize.length;
    for (let i = 1; i <= 9; i++) {
      var j = i + vLength;
      this.customize.push({ vCName: "vCName" + j, vCPrice: "vCPrice" + j });

    }
  }
  BindCategoryDDL(vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Category = data;
          this.category_Id = "0";
          this.subCategory_ID = "0";
        }
        else {
        };
      });
  }

  BindDiscountDDL(vResId) {
    var vCurrentDate1 = new Date();
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetDiscountsForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        //if (data.length != 0) {
        //
        this.Discounts = data;
        this.DiscountId = "0";
        // }
        // else {
        // };
      });
  }

  BindCouponDDL(vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCouponsForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        //if (data.length != 0) {
        //
        this.Coupons = data;
        this.CopounDetailsId = "0";
        // }
        // else {
        // };
      });
  }


  onCatChange(catId: number) {
    debugger;
    var vCatId = catId;
    if (vCatId != 0) {
      var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetSubCategoryForDDL?iCatID=' + vCatId).toPromise().then(
        (data: any) => {
          debugger;
          if (data.length != 0) {
            //
            this.SubCategory = data;
            this.subCategory_ID = "0";
          }
          else {
          };
        });
    }
  }

  AddCustomize() {
    var vCust = this.Customize;
    var vtCust = this.txtCustomize;
    if (vtCust == undefined || vtCust == "") {
      return;
    }

    if (this.Customize != undefined && this.Customize != "") {
      this.Customize = vCust + "|" + vtCust;
    }
    else {
      this.Customize = vtCust;
    }
    this.txtCustomize = "";
  }

  AddMenuVariance() {
    var vLength = this.MenuVariance.length;
    var v1 = "vName" + (vLength + 1);
    var v2 = "vPrice" + (vLength + 1);
    var v3 = "vImage" + (vLength + 1);
    var v4 = "vDescription" + (vLength + 1);
    var v5 = "vMenuVar" + (vLength + 1);
    this.MenuVariance.push({ vName: v1, vPrice: v2, vImage: v3, vFile: "", vDescription: v4, MenuVarianceID: "", MenuVar: v5 });
  }
  public uploadFile = (files, item: any) => {
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

    if (strsubstring == '.pdf' || strsubstring == '.xlsx' || strsubstring == '.xls' || strsubstring == '.doc' || strsubstring == '.zip' || strsubstring == '.rar' || strsubstring == '.css' || strsubstring == '.html' || strsubstring == '.docx') {
      // debugger;
      this.isShownError = false;
      this.ErrorMsg = "Please Choose valid file Type Jpeg,Jpg,png";
      return false;
    }
    else {
      //  debugger;

    }
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(environment.apiUrl + 'AdminMenuItem/UploadContent', formData).subscribe(
      (response) => {
        debugger;
        alert(response);
      },
      (error) => {
        debugger;
        var vDataError = JSON.stringify(error.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        item.vFile = vErrorMsg1;

      }
    )
    // this.http.post(environment.apiUrl + 'AdminMenuItem/UploadContent' , formData, { reportProgress: true, observe: 'events' })
    //   . subscribe((event) => {
    //     debugger;
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       //this.message = 'Upload success.';
    //       this.onUploadFinished.emit(event.body);
    //     }
    //   },(error) => {
    //     debugger;
    //     var vCoupons = [] as any;
    //     var vCoupons=error.error;
    //     var mm=vCoupons["0"].text;

    //   });
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
  //   XLSX.writeFile(wb, "MenuItem.xlsx");

  // }
  SaveMenuItem() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurant_ID;
    var vCategory_Id = this.category_Id;
    var vSubCategory_ID = this.subCategory_ID;
    var vItemName = this.ItemName;
    var vCopounDetailsId = this.CopounDetailsId;
    var vDiscountId = this.DiscountId;

    //var vCopounDetailsId = this.CopounDetailsId;
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
    if (vSubCategory_ID == undefined || vSubCategory_ID == "" || vSubCategory_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Item SubCategory.";
      return false;
    }
    if (vItemName == undefined || vItemName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Item Name.";
      return false;
    }
    debugger;
    if (this.MenuVariance != null) {

      if (this.MenuVariance.length != 0) {
        for (var i = this.MenuVariance.length - 1; i >= 0; i--) {
          //vName: v1, vPrice: v2, vImage: v3
          var v1 = this.MenuVariance[i].vName;
          var v2 = this.MenuVariance[i].vPrice;
          var v3 = this.MenuVariance[i].vFile;
          var v4 = this.MenuVariance[i].vDescription;
          debugger;
          var vVarName = ((document.getElementById(v1) as HTMLInputElement).value);
          var vVarPrice = ((document.getElementById(v2) as HTMLInputElement).value);
          var vVarImage = v3;
          var vVarDescription = ((document.getElementById(v4) as HTMLInputElement).value);
          if (this.MenuVariance.length != 1) {
            if (vVarName == undefined || vVarName == "") {
              this.isShownError = false;
              this.ErrorMsg = "Please Enter The Item Variance Name.";
              return false;
            }
          }
          if (vVarPrice == undefined || vVarPrice == "") {
            this.isShownError = false;
            this.ErrorMsg = "Please Enter The Item Variance Price.";
            return false;
          }
          if (vVarImage == undefined || vVarImage == "") {
            this.isShownError = false;
            this.ErrorMsg = "Please Select The Item Variance Image.";
            return false;
          }
          // if (vVarDescription == undefined || vVarDescription == "") {
          //   this.isShownError = false;
          //   this.ErrorMsg = "Please Enter The Item Variance Descriptions.";
          //   return false;
          // }
        }
      }
    }
    else {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Atleast One Variance..";
      return false;
    }



    var vCustomize = "";
    // if (this.customize.length != 0) {
    //   for (let i = 0; i < this.customize.length; i++) {
    //     //vName: v1, vPrice: v2, vImage: v3
    //     var v1 = this.customize[i].vCName;
    //     var v2 = this.customize[i].vCPrice;

    //     debugger;
    //     var vVarName = ((document.getElementById(v1) as HTMLInputElement).value);
    //     var vVarPrice = ((document.getElementById(v2) as HTMLInputElement).value);

    //     if (vVarName != undefined && vVarName != "") {
    //       if (vVarPrice == undefined || vVarPrice == null || vVarPrice == "") {
    //         this.isShownError = false;
    //         this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //         return false;
    //       }
    //       if (vCustomize != "")
    //         vCustomize = vCustomize + "|" + vVarName + "," + vVarPrice;
    //       else
    //         vCustomize = vVarName + "," + vVarPrice;
    //     }


    //   }
    // }


    // if (this.Customize1 != undefined && this.Customize1 != "") {

    //   if(this.Prize1 == undefined || this.Prize1 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   vCustomize = this.Customize1 + "," + this.Prize1;
    // }
    // if (this.Customize2 != undefined && this.Customize2 != "") {
    //   if(this.Prize2 == undefined || this.Prize2 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize2 + "," + this.Prize2;
    //   else
    //     vCustomize = this.Customize2+ "," + this.Prize2;
    // }
    // if (this.Customize3 != undefined && this.Customize3 != "") {
    //   if(this.Prize3 == undefined || this.Prize3 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize3+ "," + this.Prize3;
    //   else
    //     vCustomize = this.Customize3+ "," + this.Prize3;
    // }
    // if (this.Customize4 != undefined && this.Customize4 != "") {
    //   if(this.Prize4 == undefined || this.Prize4 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize4+ "," + this.Prize4;
    //   else
    //     vCustomize = this.Customize4+ "," + this.Prize4;
    // }
    // if (this.Customize5 != undefined && this.Customize5 != "") {
    //   if(this.Prize5 == undefined || this.Prize5 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize5 + "," + this.Prize5;
    //   else
    //     vCustomize = this.Customize5 + "," + this.Prize5;
    // }
    // if (this.Customize6 != undefined && this.Customize6 != "") {
    //   if(this.Prize6 == undefined || this.Prize6 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize6 + "," + this.Prize6;
    //   else
    //     vCustomize = this.Customize6 + "," + this.Prize6;
    // }
    // if (this.Customize7 != undefined && this.Customize7 != "") {
    //   if(this.Prize7 == undefined || this.Prize7 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize7 + "," + this.Prize7;
    //   else
    //     vCustomize = this.Customize7 + "," + this.Prize7;
    // }
    // if (this.Customize8 != undefined && this.Customize8 != "") {
    //   if(this.Prize8 == undefined || this.Prize8 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize8 + "," + this.Prize8;
    //   else
    //     vCustomize = this.Customize8 + "," + this.Prize8;
    // }
    // if (this.Customize9 != undefined && this.Customize9 != "") {
    //   if(this.Prize9 == undefined || this.Prize9 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize9+ "," + this.Prize9;
    //   else
    //     vCustomize = this.Customize9 + "," + this.Prize9;
    // }
    this.Customize = vCustomize;
    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurant_ID);
    params = params.append('iCategory_ID', this.category_Id);
    params = params.append('iSubCategory_ID', this.subCategory_ID);
    params = params.append('iDiscount_ID', this.DiscountId);
    params = params.append('iCopounDetails_ID', this.CopounDetailsId);
    params = params.append('sItemName', this.ItemName);
    params = params.append('sDescription', this.Description);

    var value = this.http.get(environment.apiUrl + 'AdminMenuItem/InsertMenuItem', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        var vItemID = data;
        for (var i = this.MenuVariance.length - 1; i >= 0; i--) {
          //vName: v1, vPrice: v2, vImage: v3
          var v1 = this.MenuVariance[i].vName;
          var v2 = this.MenuVariance[i].vPrice;
          var v3 = this.MenuVariance[i].vFile;
          var v4 = this.MenuVariance[i].vDescription;

          var vVarName = ((document.getElementById(v1) as HTMLInputElement).value);
          var vVarPrice = ((document.getElementById(v2) as HTMLInputElement).value);
          //var vVarImage = ((document.getElementById(v3) as HTMLInputElement).value);
          var vVarImage = v3;
          var vVarDescription = ((document.getElementById(v4) as HTMLInputElement).value);

          let params1 = new HttpParams();
          params1 = params1.append('iMenuItem_ID', vItemID);
          params1 = params1.append('dPrice', vVarPrice);
          params1 = params1.append('sImageUrl', vVarImage);
          params1 = params1.append('sDescription', vVarDescription);
          params1 = params1.append('sVarName', vVarName);
          params1 = params1.append('sCustomize', this.Customize);
          params1 = params1.append('sExtraStatus', this.ExtraStatus);
          params1 = params1.append('iRestaurant_ID', this.restaurant_ID);
          var value = this.http.get(environment.apiUrl + 'AdminMenuItem/InsertItemVariance', { params: params1 }).toPromise().then(
            (data: any) => {
              debugger;
            }).catch((data: any) => {
              var vDataError = JSON.stringify(data.error.text);
              var vErrorMsg = vDataError.replace('"', '');
              var vErrorMsg1 = vErrorMsg.replace('"', '');
              if (vErrorMsg1 == "Success") {
                this.BindItemGrid("Active");
                this.BindItemExport("Active");
                this.isShownSuccess = false;
                this.SuccessMsg = "Menu Item Inserted Sucessfully.";

                $("#Extrastatus").prop('checked',false);
                this.restaurant_ID = "0";
                this.category_Id = "0";
                this.subCategory_ID = "0";
                this.ItemName = "";
                this.CopounDetailsId = "";
                this.DiscountId = "";
                this.Customize = "";
                this.Customize1 = "";
                this.Customize2 = "";
                this.Customize3 = "";
                this.Customize4 = "";
                this.Customize5 = "";
                this.Customize6 = "";
                this.Customize7 = "";
                this.Customize8 = "";
                this.Customize9 = "";
                this.Prize1 = null;
                this.Prize2 = null;
                this.Prize3 = null;
                this.Prize4 = null;
                this.Prize5 = null;
                this.Prize6 = null;
                this.Prize7 = null;
                this.Prize8 = null;
                this.Prize9 = null;
                this.customize = [] as any;
                this.customizegrd();

                this.MenuVariance = [] as any;
                this.MenuVariance.push({ vName: "vName1", vPrice: "vPrice1", vImage: "vImage1", vFile: "", vDescription: "vDescription1", MenuVarianceID: "", MenuVar: "vMenuVar1" });
                this.ExtraStatus = "false";
              }
              else if (vErrorMsg1 == "Failed") {
                this.isShownError = false;
                this.ErrorMsg = "Menu Item Insert Failed, Please Try Again.";
                return false;
              }
            });
        }
      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        if (vErrorMsg1 == "Exist") {
          this.isShownError = false;
          this.ErrorMsg = "Item Name Already Exist.";
          return false;
        }
        else if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Insert Failed, Please Try Again.";
          return false;
        }
        else {


        }

      });
  }
  EditItemDetail(item: any) {
    debugger;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    this.Drop = false;
    this.isShownSaveBtn = true;
    this.isShownUpdateBtn = false;
    this.isShownActive = false;
    this.EditedItem = item;
    this.Customize = "";
    if (this.isShownWrite == true) {
      this.isShownSaveBtn = true;
      this.isShownUpdateBtn = true;
      // alert("You Have No Permission To Access")
      //return false;
    }
    var vMenuItemID = this.EditedItem.menuItemId;
    this.EditedItemId = vMenuItemID;
    var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetItemForEdit?iItemId=' + vMenuItemID).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          var vData = data;
          this.ItemName = vData["0"].itemName;
          this.restaurant_ID = vData["0"].restaurantId;
          var vcategory_Id = vData["0"].categoryId;
          this.Description = vData["0"].description;
          var vCopounDetailsId = vData["0"].copounDetailsId;
          if (vCopounDetailsId == null || vCopounDetailsId == '') {
            vCopounDetailsId = "0";
          }
          var vDiscountId = vData["0"].discountId;
          var vStatus = vData["0"].status;
          var vSubCategoryId = vData["0"].subCategoryId;


          var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + this.restaurant_ID).toPromise().then(
            (data: any) => {
              debugger;
              if (data.length != 0) {
                //
                this.Category = data;
                this.category_Id = vcategory_Id;
              }
              else {
              };
            });

          var value = this.http.get(environment.apiUrl + 'AdminMenuItem/GetSubCategoryForDDL?iCatID=' + vcategory_Id).toPromise().then(
            (data: any) => {
              debugger;
              if (data.length != 0) {
                //
                this.SubCategory = data;
                this.subCategory_ID = vSubCategoryId;
              }
              else {
              };
            });


          var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetDiscountsForDDL?iResturantId=' + this.restaurant_ID).toPromise().then(
            (data: any) => {
              debugger;
              //if (data.length != 0) {
              //
              this.Discounts = data;

              if (data.length == 0)
                this.DiscountId = "0";
              else
                this.DiscountId = vDiscountId;
              // }
              // else {
              // };
            });



          var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCouponsForDDL?iResturantId=' + this.restaurant_ID).toPromise().then(
            (data: any) => {
              debugger;
              // if (data.length != 0) {
              //
              this.Coupons = data;
              if (data.length == 0)
                this.CopounDetailsId = "0";
              else
                this.CopounDetailsId = vCopounDetailsId;
              // }
              // else {
              // };
            });



        }
        else {
        };
      });


    var value1 = this.http.get(environment.apiUrl + 'AdminMenuItem/GetItemVarianceForEdit?iItemId=' + vMenuItemID).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          var vData = data;

          var vMenuVarianceID = vData["0"].menuvVarianceId;
          var vAddExtra = vData["0"].addExtra;
          if (vAddExtra == "true")
          {
            this.ExtraStatus = "true";
            $("#Extrastatus").prop('checked',true);
          }
          else{
            this.ExtraStatus = "false";
            $("#Extrastatus").prop('checked',false);
          }

          this.MenuVariance = [] as any;
          for (var i = 0; i < data.length; i++) {
            var vLength = 0;
            if (this.MenuVariance == null)
              vLength = 0;
            else
              vLength = this.MenuVariance.length;
            var v1 = "vName" + (i + 1);
            var v2 = "vPrice" + (i + 1);
            var v3 = "vImage" + (i + 1);
            var v4 = "vDescription" + (i + 1);
            var v5 = "vMenuVar" + (vLength + 1);
            var vMenuVarID = vData[i].menuvVarianceId;
            var vImageUrl11 = vData[i].imageUrl;
            this.MenuVariance.push({ vName: v1, vPrice: v2, vImage: v3, vFile: vImageUrl11, vDescription: v4, MenuVarianceID: vMenuVarID, MenuVar: v5 });

            // var value2 = this.http.get(environment.apiUrl + 'AdminMenuItem/GetItemCustomizeForEdit?iMenuvVarianceId=' + vMenuVarianceID).toPromise().then(
            //   (data: any) => {
            //     debugger;
            //     var vData1 = data;
            //     this.custome= data;
            //     if (data.length != 0) {
            //       if (data.length != 0) {
            //         if(data.length > 9){
            //           var vLength = this.customize.length;
            //       for(let i=1; i<=9;i++){
            //         var j = i+vLength;
            //        this.customize.push({ vCName: "vCName"+ j, vCPrice: "vCPrice"+ j});

            //         }
            //         }
            //         if(data.length> 18){
            //           var vLength = this.customize.length;
            //           for(let i=1; i<=9;i++){
            //             var j = i+vLength;
            //            this.customize.push({ vCName: "vCName"+ j, vCPrice: "vCPrice"+ j});

            //             }
            //         }
            //         if(data.length> 27){
            //           var vLength = this.customize.length;
            //       for(let i=1; i<=9;i++){
            //         var j = i+vLength;
            //        this.customize.push({ vCName: "vCName"+ j, vCPrice: "vCPrice"+ j});

            //         }
            //         }
            //         if(data.length> 36){
            //           var vLength = this.customize.length;
            //           for(let i=1; i<=9;i++){
            //             var j = i+vLength;
            //            this.customize.push({ vCName: "vCName"+ j, vCPrice: "vCPrice"+ j});

            //             }
            //         }

            //     }
            //     }
            //     for (var i = 0; i < data.length; i++) {
            //       var vcp1 = vData1[i].price;
            //       var vcC1 = vData1[i].customization;
            //       var vname = "vCName" + (i+1);
            //       var vprice = "vCPrice" + (i+1);
            //       if(vcC1!=null){
            //         ((document.getElementById(vname) as HTMLInputElement).value) = vcC1;
            //       }
            //       if(vcp1!=null){
            //         ((document.getElementById(vprice) as HTMLInputElement).value) = vcp1;
            //       }
            //     }
            //   });

          }
          debugger;

          setTimeout(() => {


            for (var j = 0; j < this.MenuVariance.length; j++) {
              debugger;
              //vName: v1, vPrice: v2, vImage: v3
              var v11 = this.MenuVariance[j].vName;
              var v12 = this.MenuVariance[j].vPrice;
              var v13 = this.MenuVariance[j].vFile;
              var v14 = this.MenuVariance[j].vDescription;

              var vName = vData[j].name;
              var vPrice = vData[j].price;
              var vImageUrl = vData[j].imageUrl;
              var vDescription = vData[j].description;

              if (vName != null) {
                ((document.getElementById(v11) as HTMLInputElement).value) = vName;
              }
              if (vPrice != null) {
                ((document.getElementById(v12) as HTMLInputElement).value) = vPrice;
              }
              //((document.getElementById(v13) as HTMLInputElement).value)=ImageUrl;
              if (vDescription != null) {
                ((document.getElementById(v14) as HTMLInputElement).value) = vDescription;
              }
            }

          }, 2000);


        }
        else {
        };
      });
  }

  updateItemDetails() {
    this.isShownError = true;
    this.isShownSuccess = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";

    var vRestaurant_ID = this.restaurant_ID;
    var vCategory_Id = this.category_Id;
    var vSubCategory_ID = this.subCategory_ID;
    var vItemName = this.ItemName;
    var vCopounDetailsId = this.CopounDetailsId;
    var vDiscountId = this.DiscountId;
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
    if (vSubCategory_ID == undefined || vSubCategory_ID == "" || vSubCategory_ID == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Item SubCategory.";
      return false;
    }
    if (vItemName == undefined || vItemName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Item Name.";
      return false;
    }
    if (this.MenuVariance != null) {

      if (this.MenuVariance.length != 0) {
        for (var i = this.MenuVariance.length - 1; i >= 0; i--) {
          //vName: v1, vPrice: v2, vImage: v3
          var v1 = this.MenuVariance[i].vName;
          var v2 = this.MenuVariance[i].vPrice;
          var v3 = this.MenuVariance[i].vFile;
          var v4 = this.MenuVariance[i].vDescription;

          var vVarName = ((document.getElementById(v1) as HTMLInputElement).value);
          var vVarPrice = ((document.getElementById(v2) as HTMLInputElement).value);
          var vVarImage = v3;
          var vVarDescription = ((document.getElementById(v4) as HTMLInputElement).value);
          if (this.MenuVariance.length != 1) {
            if (vVarName == undefined || vVarName == "") {
              this.isShownError = false;
              this.ErrorMsg = "Please Enter The Item Variance Name.";
              return false;
            }
          }
          if (vVarPrice == undefined || vVarPrice == "") {
            this.isShownError = false;
            this.ErrorMsg = "Please Enter The Item Variance Price.";
            return false;
          }
          if (vVarImage == undefined || vVarImage == "") {
            this.isShownError = false;
            this.ErrorMsg = "Please Select The Item Variance Image.";
            return false;
          }
          // if (vVarDescription == undefined || vVarDescription == "") {
          //   this.isShownError = false;
          //   this.ErrorMsg = "Please Enter The Item Variance Descriptions.";
          //   return false;
          // }
        }
      }
    }
    else {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Atleast One Variance..";
      return false;
    }
    var vCustomize = "";


    var vCustomize = "";
    // if (this.customize.length != 0) {
    //   for (let i = 0; i < this.customize.length; i++) {
    //     //vName: v1, vPrice: v2, vImage: v3
    //     var v1 = this.customize[i].vCName;
    //     var v2 = this.customize[i].vCPrice;

    //     debugger;
    //     var vVarName = ((document.getElementById(v1) as HTMLInputElement).value);
    //     var vVarPrice = ((document.getElementById(v2) as HTMLInputElement).value);

    //     if (vVarName != undefined && vVarName != "") {
    //       if (vVarPrice == undefined || vVarPrice == null || vVarPrice == "") {
    //         this.isShownError = false;
    //         this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //         return false;
    //       }
    //       if (vCustomize != "")
    //         vCustomize = vCustomize + "|" + vVarName + "," + vVarPrice;
    //       else
    //         vCustomize = vVarName + "," + vVarPrice;
    //     }


    //   }
    // }

    // if (this.Customize1 != undefined && this.Customize1 != "") {

    //   if(this.Prize1 == undefined || this.Prize1 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   vCustomize = this.Customize1 + "," + this.Prize1;
    // }
    // if (this.Customize2 != undefined && this.Customize2 != "") {
    //   if(this.Prize2 == undefined || this.Prize2 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize2 + "," + this.Prize2;
    //   else
    //     vCustomize = this.Customize2+ "," + this.Prize2;
    // }
    // if (this.Customize3 != undefined && this.Customize3 != "") {
    //   if(this.Prize3 == undefined || this.Prize3 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize3+ "," + this.Prize3;
    //   else
    //     vCustomize = this.Customize3+ "," + this.Prize3;
    // }
    // if (this.Customize4 != undefined && this.Customize4 != "") {
    //   if(this.Prize4 == undefined || this.Prize4 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize4+ "," + this.Prize4;
    //   else
    //     vCustomize = this.Customize4+ "," + this.Prize4;
    // }
    // if (this.Customize5 != undefined && this.Customize5 != "") {
    //   if(this.Prize5 == undefined || this.Prize5 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize5 + "," + this.Prize5;
    //   else
    //     vCustomize = this.Customize5 + "," + this.Prize5;
    // }
    // if (this.Customize6 != undefined && this.Customize6 != "") {
    //   if(this.Prize6 == undefined || this.Prize6 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize6 + "," + this.Prize6;
    //   else
    //     vCustomize = this.Customize6 + "," + this.Prize6;
    // }
    // if (this.Customize7 != undefined && this.Customize7 != "") {
    //   if(this.Prize7 == undefined || this.Prize7 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize7 + "," + this.Prize7;
    //   else
    //     vCustomize = this.Customize7 + "," + this.Prize7;
    // }
    // if (this.Customize8 != undefined && this.Customize8 != "") {
    //   if(this.Prize8 == undefined || this.Prize8 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize8 + "," + this.Prize8;
    //   else
    //     vCustomize = this.Customize8 + "," + this.Prize8;
    // }
    // if (this.Customize9 != undefined && this.Customize9 != "") {
    //   if(this.Prize9 == undefined || this.Prize9 ==null){
    //     this.isShownError = false;
    //     this.ErrorMsg = "Please Enter Customize Prize or If It's Free Enter Zero..";
    //     return false;
    //   }
    //   if (vCustomize != "")
    //     vCustomize = vCustomize + "|" + this.Customize9+ "," + this.Prize9;
    //   else
    //     vCustomize = this.Customize9 + "," + this.Prize9;
    // }
    this.Customize = vCustomize;

    let params = new HttpParams();
    params = params.append('iRestaurant_ID', this.restaurant_ID);
    params = params.append('iCategory_ID', this.category_Id);
    params = params.append('iSubCategory_ID', this.subCategory_ID);
    params = params.append('iDiscount_ID', this.DiscountId);
    params = params.append('iCopounDetails_ID', this.CopounDetailsId);
    params = params.append('sItemName', this.ItemName);
    params = params.append('sDescription', this.Description);
    params = params.append('sMenuItemId', this.EditedItemId);
    var value = this.http.get(environment.apiUrl + 'AdminMenuItem/UpdateMenuItem', { params: params }).toPromise().then(
      (data: any) => {
        debugger;


      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        if (vErrorMsg1 == "Success") {
          for (var i = this.MenuVariance.length - 1; i >= 0; i--) {
            //vName: v1, vPrice: v2, vImage: v3
            var v1 = this.MenuVariance[i].vName;
            var v2 = this.MenuVariance[i].vPrice;
            var v3 = this.MenuVariance[i].vFile;
            var v4 = this.MenuVariance[i].vDescription;
            var v5 = this.MenuVariance[i].MenuVarianceID;

            var vVarName = ((document.getElementById(v1) as HTMLInputElement).value);
            var vVarPrice = ((document.getElementById(v2) as HTMLInputElement).value);
            //var vVarImage = ((document.getElementById(v3) as HTMLInputElement).value);
            var vVarImage = v3;
            var vVarDescription = ((document.getElementById(v4) as HTMLInputElement).value);
            //  var vMenuVar = ((document.getElementById(v5) as HTMLInputElement).value);
            var vMenuVar = v5;
            let params1 = new HttpParams();
            params1 = params1.append('iMenuItem_ID', this.EditedItemId);
            params1 = params1.append('dPrice', vVarPrice);
            params1 = params1.append('sImageUrl', vVarImage);
            params1 = params1.append('sDescription', vVarDescription);
            params1 = params1.append('sVarName', vVarName);
            params1 = params1.append('sCustomize', this.Customize);
            params1 = params1.append('iVarianceId', vMenuVar);
            params1 = params1.append('sExtraStatus', this.ExtraStatus);
            params1 = params1.append('iRestaurant_ID', this.restaurant_ID);
            var value = this.http.get(environment.apiUrl + 'AdminMenuItem/UpdateItemVariance', { params: params1 }).toPromise().then(
              (data: any) => {
                debugger;
              }).catch((data: any) => {
                var vDataError = JSON.stringify(data.error.text);
                var vErrorMsg = vDataError.replace('"', '');
                var vErrorMsg1 = vErrorMsg.replace('"', '');
                if (vErrorMsg1 == "Success") {
                  this.isShownSuccess = false;
                  this.isShownSaveBtn = false;
                  this.isShownUpdateBtn = true;
                  this.isShownActive = true;
                  this.SuccessMsg = "Menu Item Updated Successfully.";

                  $("#Extrastatus").prop('checked',false);
                  this.BindItemGrid("Active");
                  this.BindItemExport("Active");
                  this.restaurant_ID = "0";
                  this.category_Id = "0";
                  this.subCategory_ID = "0";
                  this.ItemName = "";
                  this.CopounDetailsId = "";
                  this.customize = [] as any;
                  this.customizegrd();
                  this.DiscountId = "";
                  this.Customize = "";
                  this.Customize1 = "";
                  this.Customize2 = "";
                  this.Customize3 = "";
                  this.Customize4 = "";
                  this.Customize5 = "";
                  this.Customize6 = "";
                  this.Customize7 = "";
                  this.Customize8 = "";
                  this.Customize9 = "";
                  this.Prize1 = null;
                  this.Prize2 = null;
                  this.Prize3 = null;
                  this.Prize4 = null;
                  this.Prize5 = null;
                  this.Prize6 = null;
                  this.Prize7 = null;
                  this.Prize8 = null;
                  this.Prize9 = null;
                  this.MenuVariance = [] as any;
                  this.MenuVariance.push({ vName: "vName1", vPrice: "vPrice1", vImage: "vImage1", vFile: "", vDescription: "vDescription1", MenuVarianceID: "", MenuVar: "vMenuVar1" });
                }
                else if (vErrorMsg1 == "Failed") {
                  this.isShownError = false;
                  this.ErrorMsg = "Menu Item Update Failed, Please Try Again.";
                  return false;
                }
              });
          }
        }
        else if (vErrorMsg1 == "Failed") {
          this.isShownError = false;
          this.ErrorMsg = "Insert Failed, Please Try Again.";
          return false;
        }
        else {


        }

      });


  }
  UpdateStatus1(content, item: any) {
    debugger;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.Activestaus = item;
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
  UpdateStatus() {
    if (this.isShownWrite == true) {
      this.isShownSaveBtn = false;
      this.isShownUpdateBtn = false;
      // alert("You Have No Permission To Access")
      // return false;
      return;
    }
    debugger;
    this.modalService.dismissAll("Addon");
    this.EditedItem = this.Activestaus;
    var vStatus = this.EditedItem.status;
    var vStatus1 = "";

    if (vStatus == "Active") {

      vStatus1 = "InActive";
    }

    else {

      vStatus1 = "Active";
    }


    var vMenuItemID = this.EditedItem.menuItemId;

    // var c = confirm("Are you sure you want to Change The Status?");

    // if (c == true) {
    let params = new HttpParams();
    params = params.append('iMenuItemID', vMenuItemID);
    params = params.append('sStatus', vStatus1);
    var value = this.http.get(environment.apiUrl + 'AdminMenuItem/UpdteMenuStatus', { params: params }).toPromise().then(
      (data: any) => {
        debugger;

      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
        if (vErrorMsg1 == "Sucess") {
          alert("Status Changed");
          $("#ShowActve").prop('checked', true);
          this.BindItemGrid("Active");
          this.BindItemExport("Active");
        }
        else if (vErrorMsg1 == "Failed") {

        }
        return false;
      });
    return false;


  }

  RemoveVariance(item: any) {
    debugger;
    this.MenuVarianceRemove = item;

    if (this.MenuVariance != null) {

      if (this.MenuVariance.length != 0 && this.MenuVariance.length != 1) {
        for (var i = this.MenuVariance.length - 1; i >= 0; i--) {
          //vName: v1, vPrice: v2, vImage: v3
          var v1 = this.MenuVariance[i].vName;
          var vNme = this.MenuVarianceRemove.vName;

          if (v1 == vNme) {
            this.MenuVariance.splice(i, 1);
          }
        }
      }
    }
  }
  // constructor() {

  //   //Create dummy data

  //   this.config = {
  //     itemsPerPage: 5,
  //     currentPage: 1,
  //     totalItems: this.collection.count
  //   };
  // }

  // pageChange(event) {
  //   this.config.currentPage = event;
  // }
  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  // }
  Cleare() {
    $("#ShowActve").prop('checked', true);
    this.isShownSaveBtn = false;
    this.isShownUpdateBtn = true;
    this.isShownActive = true;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
    this.BindItemGrid("Active");
    if (this.userrole == "SuperAdmin") {
      this.restaurant_ID = "0";
    }
    else {

    }
    debugger;
    $("#Extrastatus").prop('checked',false);
    this.category_Id = "0";
    this.subCategory_ID = "0";
    this.ItemName = "";
    this.CopounDetailsId = "";
    this.DiscountId = "";
    this.Customize = "";
    this.Customize1 = "";
    this.Customize2 = "";
    this.Customize3 = "";
    this.Customize4 = "";
    this.Customize5 = "";
    this.Customize6 = "";
    this.Customize7 = "";
    this.Customize8 = "";
    this.Customize9 = "";
    this.Prize1 = null;
    this.Prize2 = null;
    this.Prize3 = null;
    this.Prize4 = null;
    this.Prize5 = null;
    this.Prize6 = null;
    this.Prize7 = null;
    this.Prize8 = null;
    this.Prize9 = null;
    this.customize = [] as any
    this.customizegrd();
    this.MenuVariance = [] as any;
    if (this.isShownWrite == true) {
      this.isShownSaveBtn = true;
      this.isShownUpdateBtn = true;
      // alert("You Have No Permission To Access")
      // return false;
    }
    this.MenuVariance.push({ vName: "vName1", vPrice: "vPrice1", vImage: "vImage1", vFile: "", vDescription: "vDescription1", MenuVarianceID: "", MenuVar: "vMenuVar1" });
  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ActiveCheckboxChange(event) {
    debugger;
    this.ErrorMsg = "";
    this.SuccessMsg = "";
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

    this.BindItemGrid(vStatus);
    this.BindItemExport(vStatus);
  }

  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.MenuItems);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Menu');

    /* save to file */
    XLSX.writeFile(wb, "Menu.xlsx");

  }


  toggleEditable(event) {
    debugger;
    if (event.target.checked) {
      this.ExtraStatus = "true";
    }
    else {
      this.ExtraStatus = "false";
    }
  }

}
