import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Time } from '@angular/common';
@Component({
  selector: 'app-workinghour',
  templateUrl: './workinghour.component.html',
  styleUrls: ['./workinghour.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkinghourComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['sno', 'name', 'day', 'startTime', 'endTime', 'description', 'Status'];
  dataSource: MatTableDataSource<any[]>;
  ResArray = [] as any;
  Editehours=[] as any;
  Drop = true;
  Res_Id: number;
  STime: Time;
  DayName: string;
  ETime: Time;
  Description: string;
  Activebutton = false;
  Saveshow1=false;
  StatusActive: string;
  Activebutton1 = false;
  Saveshow = true;
  ErrorMsg: string;
  isShownError: boolean = false;
  isShownSuccess: boolean = false;
  SuccessMsg: string;
  HoursRefId: string;
  LoginUser: string;
  isDisabled = true;
  userrole:string;
  vRead:string;
  vWrite:string;
  closeResult:string;
  Activestaus=[] as any;
  ExportHours = [] as any;
  constructor(private modalService: NgbModal,private http: HttpClient) { }

  Show() {
    debugger;
    this.Drop = false;
  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit(): void {
    this.StatusActive = "Active";
    this.DayName = "";
    this.Active("Active");
    this.ExptHours("Active");
    this.Res_Id = 0;
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
    this.userrole== sessionStorage.getItem('UserRole');
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
    if (this.DayName == undefined || this.DayName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select on Day";
      return false;
    }
    if (this.STime == undefined || this.STime == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Starting Time";
      return false;
    }
    if (this.ETime == undefined || this.ETime == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Ending Time";
      return false;
    }
    if (this.STime > this.ETime) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Start time  greater than end time";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'Hours/InsertHours?UserId=1&Resturant=' + this.Res_Id + '&Day=' + this.DayName + '&STTime=' + this.STime + '&EdTime=' + this.ETime + '&Description=' + this.Description).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Hours Inserted Successfully";
        this.Active("Active");
        this.ExptHours("Active");
        this.clear();
      }
      else if (data == "2") {
        this.isShownError = false;
        this.ErrorMsg = "Hours Insert Failed";
      } else if (data = "3") {
        this.isShownError = false;
        this.ErrorMsg = "Already Have data Please Update it";
      }
    }).catch(function (data: any) {

    });
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
    if (this.DayName == undefined || this.DayName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Select on Day";
      return false;
    }
    if (this.STime == undefined || this.STime == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Starting Time";
      return false;
    }
    if (this.ETime == undefined || this.ETime == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Ending Time";
      return false;
    }
    if (this.STime > this.ETime) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Start time  greater than end time";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'Hours/UpdateHours?EditHours=' + this.HoursRefId + '&day=' + this.DayName + '&UserId=1&Resturant=' + this.Res_Id + '&StTime=' + this.STime + '&SEndtime=' + this.ETime + '&Description=' + this.Description + '&Status=' + this.StatusActive).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.Active("Active");
        this.ExptHours("Active");
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
        this.ExptHours("Active");
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
  clear() {
    $("#ShowActve").prop('checked',true);
    this.STime = null;
    this.Description = "";
    this.ETime = null;
    this.DayName = "";
    if (this.userrole == "SuperAdmin") {
      this.Res_Id = 0;
    }
    else {
    }
    this.Saveshow = true;
    this.Activebutton = false;
    this.Activebutton1 = false;
    this.Saveshow1=false;
    if(this.vWrite ==null || this.vWrite == "" ){
      this.Saveshow=false;
      this.Saveshow1=false;
      }
  }
  ActiveCheckboxChangeHeaddr(event) {
    if (event.target.checked) {
      this.StatusActive = "Active";

    }
    else {

      this.StatusActive = "InActive";
    }
  }
  ActiveCheckboxChange(event) {
    if (event.target.checked) {
      this.Active("Active");
      this.ExptHours("Active");
    }
    else {
      this.Active("InActive");
      this.ExptHours("InActive");
    }

  }
  HoursEdit(id) {
    debugger;
    var ViewRes = this.http.get(environment.apiUrl + 'Hours/HourEdit?HourId=' + id).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        debugger;
        this.Drop = false;
        this.Saveshow = false;
        this.isShownError = true;
        this.isShownSuccess = true;
        this.Saveshow1=true;
        this.Res_Id = data["0"].restaurantId;
        this.DayName = data["0"].day;
        var start = data["0"].startTime.split(":");
        this.STime = (data["0"].startTime).substring(0, 5);

        this.ETime = (data["0"].endTime).substring(0, 5);
        this.Description = data["0"].description;
        this.HoursRefId = id;
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
  Active(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Hours/HoursGrid?Active=' + value).toPromise().then((data: any) => {
      debugger;
    
        //  this.items=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Hours/HoursGridres?Active=' + value+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;
    
        //  this.items=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

    });
  }
  }
  ExptHours(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Hours/HoursExport?Active=' + value).toPromise().then((data: any) => {
      debugger;
     
        //  this.items=data;
        this.ExportHours = data;

      
    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Hours/HoursExportres?Active=' + value+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;
     
        //  this.items=data;
        this.ExportHours = data;

    });
  }
  }
  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.ExportHours);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'hours');

    /* save to file */
    XLSX.writeFile(wb, "Working_Hours.xlsx");

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
  this.Editehours =  this.Activestaus;
  var vStatus = this.Editehours.active;
  var vStatus1 = "";
  if (vStatus == "Active")
    vStatus1 = "InActive";
  else
    vStatus1 = "Active";

  var hoursid = this.Editehours.workingHourMasterId;


    let params = new HttpParams();
  params = params.append('Hours', hoursid);
  params = params.append('sStatus', vStatus1);
  var value = this.http.get(environment.apiUrl + 'Hours/UpdteHourstatus', { params: params }).toPromise().then(
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
        $("#ShowActve").prop('checked',true);
       
      }
      else if(vErrorMsg1 == "Failed"){

      }
    });
    return false;
  

}
}
