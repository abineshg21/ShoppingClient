import { Component, OnInit, ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RatingComponent implements OnInit {
  Drop = false;
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
  userrole:string;
  isDisabled =true;
  SuccessMsg: string;
  public searchText: string;
  LoginUser:string;
  constructor(private http: HttpClient) { }
  displayedColumns: string[] = ['sno', 'restaurantName', 'customerName', 'rating', 'itemName','average', 'ratingDate'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.BindRestaurantDDL();

    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser=vName+" ("+vRole+")";
    this.userrole = sessionStorage.getItem('UserRole');
    
    var vRole = sessionStorage.getItem('UserRole');
          if (vRole == "SuperAdmin") {
            this.isDisabled = false;
          }else {
            var vResId = sessionStorage.getItem('ResId');
            this.restaurantId = vResId;
          }

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
  }
  BindCategoryDDL(vResId) {
    var value = this.http.get(environment.apiUrl + 'AdminItemSettings/GetCategoryForDDL?iResturantId=' + vResId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Category = data;
          this.categoryId = "0";

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
  ViewRatings() {
    var vRestaurantId = this.restaurantId;
    var vCategoryId = this.categoryId;
    if (vRestaurantId == undefined || vRestaurantId == "" || vRestaurantId == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vCategoryId == undefined || vCategoryId == "" ) {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Category.";
      return false;
    }
    var value = this.http.get(environment.apiUrl + 'AdminResturant/GetRating?iRestaurantId=' + vRestaurantId + '&iCatId=' + vCategoryId).toPromise().then(
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
          this.isShownError = false;
      this.ErrorMsg = "No Data To Show.";
        };
      });
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
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Rating');

    /* save to file */
    XLSX.writeFile(wb, "Rating.xlsx");

  }
}
