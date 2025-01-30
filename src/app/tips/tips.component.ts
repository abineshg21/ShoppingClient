import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TipsComponent implements OnInit {
  Drop = false;
  Resturants = [];
  Waiter = [];
  restaurantId: string;
  waiterId: string;
  isShownError: boolean = true;
  isShownSuccess: boolean = true;
  ErrorMsg: string;
  SuccessMsg: string;
  DateFrom: Date;
  DateTo: Date;
  public searchText: string;
  LoginUser:string;
  isDisabled = true;
  displayedColumns: string[] = ['orderId', 'orderAmount', 'orderDate', 'tipsAmount'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
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

      var value = this.http.get(environment.apiUrl + 'AdminTips/GetWaitersForDDL?Restaurant_ID=' + vResId).toPromise().then(
        (data: any) => {
          debugger;
          if (data.length != 0) {
            //
            this.Waiter = data;
            this.waiterId = "0";
          }
          else {
          };
        });
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
          this.waiterId = "0";
        }
        else {
        };
      });
  }
  onResturantChange(resId: number) {
    var value = this.http.get(environment.apiUrl + 'AdminTips/GetWaitersForDDL?Restaurant_ID=' + resId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
          //
          this.Waiter = data;
          this.waiterId = "0";
        }
        else {
        };
      });
  }

  ViewTips() {
    var vResId = this.restaurantId;
    var vWaiterId = this.waiterId;
    var vDateFrom = this.DateFrom;
    var vDateTo = this.DateTo;
    if (vResId == undefined || vResId == "" || vResId == "0") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Restaurant.";
      return false;
    }
    if (vWaiterId == undefined || vWaiterId == "" ) {
      this.isShownError = false;
      this.ErrorMsg = "Please Select any one Waiter.";
      return false;
    }
    if (vDateFrom == undefined || vDateFrom == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valitity From.";
      return false;
    }
    if (vDateTo == undefined || vDateTo == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valitity To.";
      return false;
    }
    var vCurrentDate1 = new Date();
    var vFrom1 = new Date(vDateFrom);
    var vTo1 = new Date(vDateTo);
    if ((vFrom1) > (vCurrentDate1)) {
      this.isShownError = false;
      this.ErrorMsg = "From Date Should Greater then or equal to Current Date.";
      return false;
    }
    if ((vTo1) > (vCurrentDate1)) {
      this.isShownError = false;
      this.ErrorMsg = "To Date Should Greater then or equal to Current Date.";
      return false;
    }
    if ((vTo1) < (vFrom1)) {
      this.isShownError = false;
      this.ErrorMsg = "To date should be grater then From date.";
      return false;
    }

    let params = new HttpParams();
    params = params.append('Restaurant_ID', this.restaurantId);
    params = params.append('iWaiterId', this.waiterId);
    params = params.append('dtFrom', this.DateFrom.toString());
    params = params.append('dtTo', this.DateTo.toString());

    var value = this.http.get(environment.apiUrl + 'AdminTips/GetTipsForGrid', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        //if (data.length != 0) {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
        //}
        //else {
        //};
      });
     

  }

  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  exportexcel(): void 
  {
    debugger;
     /* table id is passed over here */   
     const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
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
}
