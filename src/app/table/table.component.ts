import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  Drop = true;
  Saveshow = true;
  closeResult:string;
  Saveshow1=false;
  Activebutton = false;
  isShownError: boolean = false;
  isShownSuccess: boolean = false;
  ErrorMsg: string;
  Activebutton1 = false;
  ResArray = [] as any;
  StatusActive: string;
  Res_Id: number;
  Description: string;
  TableSeat: number;
  TableNo: number;
  Tableid: number;
  SuccessMsg: string;
  LoginUser: string;
  isDisabled = true;
  Activestaus=[] as any;
  vWrite:string;
  vRead:string;
  userrole:string;
  Editetable=[] as any;
  TblExport = [] as any;
  displayedColumns: string[] = ['sno', 'name', 'tableNo', 'noofSeat', 'description', 'Status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  constructor(private modalService: NgbModal,private http: HttpClient) { }


  ngOnInit(): void {
     this.userrole = sessionStorage.getItem('UserRole');
    this.Active("Active");
    this.ExportTable("Active");
    this.StatusActive = "Active";
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

  clear() {

    this.Description = "";
    this.TableNo = null;
    this.TableSeat = null;
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
  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.TblExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Table');

    /* save to file */
    XLSX.writeFile(wb, "Table.xlsx");

  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
      this.ExportTable("Active");
    }
    else {
      this.Active("InActive");
      this.ExportTable("InActive");
    }

  }
  Active(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Table/TableGrid?Active=' + value).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        //  this.items=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      }
    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Table/TableGridres?Active=' + value +'&ResId=' +sessionStorage.getItem('ResId') ).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        //  this.items=data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      }
    });
 
  }
}
  ExportTable(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'Table/TableExport?Active=' + value).toPromise().then((data: any) => {
      debugger;

      this.TblExport = data;
    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'Table/TableExportres?Active=' + value +'&ResId=' +sessionStorage.getItem('ResId') ).toPromise().then((data: any) => {
      debugger;

      this.TblExport = data;
    });
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
    if (this.TableNo == undefined || this.TableNo == null || this.TableNo == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Table No";
      return false;
    }
    if (this.TableSeat == undefined || this.TableSeat == null || this.TableSeat == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Seat No";
      return false;
    }

    var OrderInse = this.http.get(environment.apiUrl + 'Table/InsertTables?UserId=1&Resturant=' + this.Res_Id + '&TableNo=' + this.TableNo + '&TableSeat=' + this.TableSeat + '&Description=' + this.Description).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Table Inserted Successfully";
        this.Active("Active");
        this.ExportTable("Active");
        this.clear();
      }
      else if (data == "2") {
        this.isShownError = false;
        this.ErrorMsg = "Table Insert Failed";
      } else if (data = "3") {
        this.isShownError = false;
        this.ErrorMsg = "Already Have Table,Please Update it";
      }
    }).catch(function (data: any) {
      debugger;
      var tes = data.error.text;
      if (tes == "Success") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Holiday Inserted Successfully";
        this.Active("Active");
        this.ExportTable("Active");
        this.clear();
      }
      else {
        this.isShownError = false;
        this.ErrorMsg = "Holiday Insert Failed";
      }
    });
  }
  tableEdit(id) {
    var EditTable = this.http.get(environment.apiUrl + 'Table/TableEdit?tableID=' + id).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        debugger;
        this.Drop = false;
        this.Saveshow = false;
        this.Saveshow1=true;
        this.isShownError = true;
        this.isShownSuccess = true;
        this.Res_Id = data["0"].restaurantId;
        this.TableNo = data["0"].tableNo;

        this.TableSeat = (data["0"].noofSeat);

        this.Description = data["0"].description;
        this.Tableid = id;
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
  Update() {
    debugger;
    this.isShownError = true;
    this.isShownSuccess = true;
    if (this.Res_Id == undefined || this.Res_Id == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Restaurant Name";
      return false;
    }
    if (this.TableNo == undefined || this.TableNo == null || this.TableNo == 0) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Table No";
      return false;
    }
    if (this.TableSeat == undefined || this.TableSeat == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Table Seat No";
      return false;
    }

    var TableSeat = this.http.get(environment.apiUrl + 'Table/UpdateTable?EditTableId=' + this.Tableid + '&TableNo=' + this.TableNo + '&UserId=1&Resturant=' + this.Res_Id + '&TableSeat=' + this.TableSeat + '&Description=' + this.Description + '&Status=' + this.StatusActive).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.Active("Active");
        this.ExportTable("Active");
        this.clear();
        this.isShownSuccess = false;
        this.SuccessMsg = "Table Updated Successfully";
      }
      else {
        this.isShownError = false;
        this.ErrorMsg = "Table Updated Failed";
      }
    }).catch(function (data: any) {

    });
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
  this.Editetable =  this.Activestaus;
  var vStatus = this.Editetable.active;
  var vStatus1 = "";
  if (vStatus == "Active")
    vStatus1 = "InActive";
  else
    vStatus1 = "Active";

  var tableid = this.Editetable.tableId;


    let params = new HttpParams();
  params = params.append('table', tableid);
  params = params.append('sStatus', vStatus1);
  var value = this.http.get(environment.apiUrl + 'Table/UpdteTableStatus', { params: params }).toPromise().then(
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
        this.Active("Active");
        this.ExportTable("Active");
      }
      else if(vErrorMsg1 == "Failed"){

      }
    });
    return false;
  

}
}
