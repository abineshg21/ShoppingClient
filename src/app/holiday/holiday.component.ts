import { Component, OnInit, ViewChild, ElementRef,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HolidayComponent implements OnInit {
  Drop = true;
  closeResult:string;
  ResArray = [] as any;
  Activestaus=[] as any;
  Editeholiday=[] as any;
  Res_Id: number;
  Month: number;
  Day = [] as any;
  Datelist: number;
  Activebutton = false;
  Saveshow = true;
  Saveshow1=false;
  Activebutton1 = false;
  Description: string;
  fromday: number;
  ErrorMsg: string;
  isShownError: boolean = false;
  isShownSuccess: boolean = false;
  SuccessMsg: string;
  HolidayRefId: number;
  StatusActive: string;
  LoginUser: string;
  userrole:string;
  isDisabled = true;
  vRead:string;
  vWrite:string;
  hdExport = [] as any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'dateFrom', 'dateTo', 'description', 'Status'];
  dataSource: MatTableDataSource<any[]>;
  constructor(private modalService: NgbModal,private http: HttpClient) { }
  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.hdExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Holiday');

    /* save to file */
    XLSX.writeFile(wb, "Holiday.xlsx");

  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  Active(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Holiday/HolidayGrid?Active=' + value).toPromise().then((data: any) => {
      debugger;
     
        //  this.items=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      
    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Holiday/HolidayGridres?Active=' + value+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;
    
        //  this.items=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      
    });
 
  }
}

  HolidayExport(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Holiday/HolidayExport?Active=' + value).toPromise().then((data: any) => {
      debugger;
        this.hdExport = data;

      
    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Holiday/HolidayExportres?Active=' + value+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;
        this.hdExport = data;

      
    });
 
  }
}

  ngOnInit(): void {
    this.StatusActive = "Active";
    this.Month = 0;
    this.Res_Id = 0;
    this.Datelist = 0;
    this.userrole== sessionStorage.getItem('UserRole');
    this.Active("Active");
    this.HolidayExport("Active");
    this.loadScript('../../assets/js/Alert.js');
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    var ViewRes = this.http.get(environment.apiUrl + 'Holiday/Restaurent?UserId=1').toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        this.ResArray = data;

      }
    });

    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser = vName + " (" + vRole + ")";
    
    var vRole = sessionStorage.getItem('UserRole');
    if (vRole == "SuperAdmin") {
      this.isDisabled = false;
    }
    else {
      var vResId = sessionStorage.getItem('ResId');
      this.Res_Id = Number(vResId);
    }
    this.vRead = localStorage.getItem('Table-Read');
    this.vWrite = localStorage.getItem('Table-Write');
    if(this.vWrite ==null || this.vWrite == "" ){
    this.Saveshow=false;
    this.Saveshow1=false;
    }
  }
  Save() {
    debugger;
    this.isShownError = true;
    this.isShownSuccess = true;
    if (this.Res_Id == undefined || this.Res_Id == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Restaurant Name";
      return false;
    }
    if (this.Month == undefined || this.Month == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Month";
      return false;
    }
    if (this.Datelist == undefined || this.Datelist == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Date";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'Holiday/InsertHoliday?UserId=1&Resturant=' + this.Res_Id + '&cMonth=' + this.Month + '&csDate=' + this.Datelist + '&Description=' + this.Description).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Holiday Inserted Successfully";
        this.Active("Active");
        this.HolidayExport("Active");
        this.clear();
      }
      else {
        this.isShownError = false;
        this.ErrorMsg = "Holiday Insert Failed";
      }
    }).catch(function (data: any) {
      debugger;
      var tes = data.error.text;
      if (tes == "Success") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Holiday Inserted Successfully";
        this.Active("Active");
        this.HolidayExport("Active");
        this.clear();
      }
      else {
        this.isShownError = false;
        this.ErrorMsg = "Holiday Insert Failed";
      }
    });
  }

  ActiveCheckboxChange(event) {
    if (event.target.checked) {
      this.Active("Active");
      this.HolidayExport("Active");
    }
    else {
      this.Active("InActive");
      this.HolidayExport("InActive");
    }

  }
  Update() {
    debugger;
    this.isShownError = true;
    this.isShownSuccess = true;
    if (this.Res_Id == undefined || this.Res_Id == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Restaurant Name";
      return false;
    }
    if (this.Month == undefined || this.Month == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Month";
      return false;
    }
    if (this.Datelist == undefined || this.Datelist == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Date";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'Holiday/UpdateHoliday?EditHoliday=' + this.HolidayRefId + '&UserId=1&Resturant=' + this.Res_Id + '&cMonth=' + this.Month + '&csDate=' + this.Datelist + '&Description=' + this.Description + '&Status=' + this.StatusActive).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.Active("Active");
        this.HolidayExport("Active");
        this.clear();
        this.isShownSuccess = false;
        this.SuccessMsg = "Holiday Updated Successfully";
      }
      else {
        this.isShownError = false;
        this.ErrorMsg = "Holiday Updated Failed";
      }
    }).catch(function (data: any) {
      debugger;
      var tes = data.error.text;
      if (tes == "Success") {

        this.Active("Active");
        this.HolidayExport("Active");
        this.clear();
        this.isShownSuccess = false;
        this.SuccessMsg = "Holiday Updated Successfully";
      }
      else {
        this.isShownError = false;
        this.ErrorMsg = "Holiday Updated Failed";
      }
    });
  }
 

  HolidayEdit(Id) {
    var ViewRes = this.http.get(environment.apiUrl + 'Holiday/HolidayEdit?HolidayId=' + Id).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        debugger;
        this.Drop = false;
        this.Saveshow = false;
        this.Saveshow1=true;
        this.isShownError = true;
        this.isShownSuccess = true;
        this.Res_Id = data["0"].restaurantId;

        this.Month = data["0"].hmonth;
        this.Dayrange(data["0"].hmonth);
        this.Datelist = data["0"].hday;
        this.Description = data["0"].description;
        this.HolidayRefId = Id;
        //  this.Activebutton=true;
        if (data["0"].status == "Active") {
          this.Activebutton = true;
        }
        else {
          this.Activebutton1 = true;
        }
        if(this.vWrite ==null || this.vWrite == "" ){
          this.Saveshow=false;
          this.Saveshow1=false;
          }
      }
    });
  }
  ActiveCheckboxChangeHeaddr(event) {
    if (event.target.checked) {
      this.StatusActive = "Active";

    }
    else {

      this.StatusActive = "InActive";
    }
  }
  clear() {
    this.Month = 0;
    this.Datelist = 0;
    if (this.userrole == "SuperAdmin") {
      this.Res_Id = 0;
    }
    else {
    }
    this.Description = "";
    this.Saveshow = true;
    this.Activebutton = false;
    this.Activebutton1 = false;
    this.Saveshow1=false;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.Saveshow=false;
      this.Saveshow1=false;
      }
  }
  Dayrange(month) {
    debugger;
    var test = this.Month;
    let MonthNo;
    if (month == "1") {
      MonthNo = 31;
    }
    else if (month == "2") {
      MonthNo = 28;
    } else if (month == "3") {
      MonthNo = 31;
    } else if (month == "4") {
      MonthNo = 30;
    } else if (month == "5") {
      MonthNo = 31;
    } else if (month == "6") {
      MonthNo = 30;
    }
    else if (month == "7") {
      MonthNo = 31;
    }
    else if (month == "8") {
      MonthNo = 31;
    } else if (month == "9") {
      MonthNo = 30;
    } else if (month == "10") {
      MonthNo = 31;
    }
    else if (month == "11") {
      MonthNo = 30;
    }
    else if (month == "12") {
      MonthNo = 31;
    }
    let total;
    for (let i = 0; i < MonthNo; i++) {
      if (i == 0) {
        this.Day = [{ Date: i + 1 }];
      }
      else {
        this.Day.push({ Date: i + 1 });
      }

    }

  }
  Show() {
    debugger;
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
    this.Saveshow=false;
    this.Saveshow1=false;
    return;
    }
  this.modalService.dismissAll("Addon");
  this.Editeholiday =  this.Activestaus;
  var vStatus = this.Editeholiday.active;
  var vStatus1 = "";
  if (vStatus == "Active")
    vStatus1 = "InActive";
  else
    vStatus1 = "Active";

  var holidayid = this.Editeholiday.holidayMasterId;


    let params = new HttpParams();
  params = params.append('Holidayid', holidayid);
  params = params.append('sStatus', vStatus1);
  var value = this.http.get(environment.apiUrl + 'Holiday/UpdteHolidaytatus', { params: params }).toPromise().then(
    (data: any) => {
      debugger;

    }).catch((data: any) => {
      debugger;
      var vDataError = JSON.stringify(data.error.text);
      var vErrorMsg = vDataError.replace('"', '');
      var vErrorMsg1 = vErrorMsg.replace('"', '');//Exist
      if (vErrorMsg1 == "Sucess") {
        alert("Status Changed");
        this.Active("Active");
        this.HolidayExport("Active");
      }
      else if(vErrorMsg1 == "Failed"){

      }
    });
    return false;
  

}
}
