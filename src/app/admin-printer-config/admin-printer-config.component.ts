import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-admin-printer-config',
  templateUrl: './admin-printer-config.component.html',
  styleUrls: ['./admin-printer-config.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPrinterConfigComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'Printer', 'PrinterBrand', 'Printerloc', 'description', 'Status'];
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  Drop = true;
  Res_Id: number;
  Saveshow = true;
  ErrorMsg: string;
  printerConfid: number;
  categoryId:number;
  isShownError: boolean = false;
  isShownSuccess: boolean = false;
  SuccessMsg: string;
  Activebutton: boolean = false;
  Activebutton1: boolean = false;
  PrinterBrand: string;
  PrinterName: string;
  ResArray = [] as any;
  Editeprinter= [] as any;
  PrinterDetails = [] as any;
  CategoryArray=[] as any;
  Printerloc: string;
  StatusActive: string;
  Description: string;
  LoginUser: string;
  isDisabled = true;
  Saveshow1=false;
  userrole:string;
  vRead:string;
  vWrite:string;
  closeResult:string;
  Activestaus=[] as any;
  @ViewChild('file') document: ElementRef;
  constructor(private modalService: NgbModal,private http: HttpClient) { }

  ngOnInit(): void {
    this.Active("Active");
    this.PrinterExport("Active");
    this.StatusActive = "Active";
    this.Res_Id = 0;
    this.categoryId=0;
    var UserId= sessionStorage.getItem('UserId');
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    var ViewRes = this.http.get(environment.apiUrl + 'Holiday/Restaurent?UserId='+UserId).toPromise().then((data: any) => {
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
      var resid = sessionStorage.getItem('ResId');
      this.Res_Id = Number(resid);
    }
    this.vRead = localStorage.getItem('Table-Read');
    this.vWrite = localStorage.getItem('Table-Write');
    if(this.vWrite ==null || this.vWrite == "" ){
    this.Saveshow=false;
    this.Saveshow1=false;
    }
  }
  onResturantChange(restId: number) {
    this.BindCategoryDDL(restId);
    debugger;
  }
  BindCategoryDDL(restId){
    var ViewRes = this.http.get(environment.apiUrl + 'AdminPrinter/GetCategoryForDDL?restId='+restId).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        this.CategoryArray = data;

      }
    });
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
    if(this.categoryId ==undefined || this.categoryId ==0){
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Category Name";
      return false;
    }
    if (this.PrinterName == undefined || this.PrinterName == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Printer Name";
      return false;
    }
    if (this.PrinterBrand == undefined || this.PrinterBrand == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Printer Brand Name";
      return false;
    }
    if (this.Printerloc == undefined || this.Printerloc == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Printer Location";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'AdminPrinter/Inserprinter?UserId=1&Resturant=' + this.Res_Id + '&PName=' + this.PrinterName + '&PBrand=' + this.PrinterBrand + '&PLocation=' + this.Printerloc + '&PDesc=' + this.Description +'&SubCat='+ this.categoryId).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Printer Inserted Successfully";
        this.Active("Active");
        this.PrinterExport("Active");
        this.clear();
      }
      else if (data == "2") {
        this.isShownError = false;
        this.ErrorMsg = "Printer Insert Failed";
      }
      else if (data == "3") {
        this.isShownError = false;
        this.ErrorMsg = "Printer Already have this location";
      }
    }).catch(function (data: any) {
      debugger;

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
    if (this.PrinterName == undefined || this.PrinterName == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Printer Name";
      return false;
    }
    if(this.categoryId ==undefined || this.categoryId ==0){
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Category Name";
      return false;
    }
    if (this.PrinterBrand == undefined || this.PrinterBrand == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Printer Brand Name";
      return false;
    }
    if (this.Printerloc == undefined || this.Printerloc == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Printer Location";
      return false;
    }
    var OrderInse = this.http.get(environment.apiUrl + 'AdminPrinter/Updateprinter?UserId=1&Resturant=' + this.Res_Id + '&PName=' + this.PrinterName + '&PBrand=' + this.PrinterBrand + '&PLocation=' + this.Printerloc + '&PDesc=' + this.Description + '&PrinterId=' + this.printerConfid + '&Status=' + this.StatusActive  +'&SubCat='+ this.categoryId).toPromise().then((data: any) => {
      debugger;
      if (data == "1") {
        this.isShownSuccess = false;
        this.SuccessMsg = "Printer Updateded Successfully";
        this.Active("Active");
        this.PrinterExport("Active");
        this.clear();
      }
      else if (data == "2") {
        this.isShownError = false;
        this.ErrorMsg = "Printer Updateded Failed";
      }
      else if (data == "3") {
        this.isShownError = false;
        this.ErrorMsg = "Printer Already have this location";
      }
    }).catch(function (data: any) {
      debugger;

    });
  }

  printerEdit(id) {
    var EditPrin = this.http.get(environment.apiUrl + 'AdminPrinter/PrinterEdit?id=' + id).toPromise().then((data: any) => {
      debugger;
      if (data.length != 0) {
        debugger;
        this.Drop = false;
        this.Saveshow = false;
        this.Saveshow1=true;
        this.isShownError = true;
        this.isShownSuccess = true;
        this.Res_Id = data["0"].restaruntId;
        this.BindCategoryDDL(this.Res_Id);
        this.categoryId=data["0"].subCategoryId;
        this.PrinterName = data["0"].printerName;
        this.Printerloc = data["0"].printerlocation;
        this.PrinterBrand = data["0"].printerBrand;
        this.Description = data["0"].description;
        this.printerConfid = id;
        //  this.Activebutton=true;
        if (data["0"].status == "Active") {
          this.Activebutton = true;
        }
        else {
          this.Activebutton1 = true;
        }
      }
    });
  }
  clear() {
    this.Description = "";
    this.PrinterName = "";
    this.Printerloc = "";
    this.categoryId=0;
    this.PrinterBrand = "";
    this.Saveshow = true;
    if (this.userrole == "SuperAdmin") {
      this.Res_Id = 0;
    }
    else {
    }
    this.Activebutton = false;
    this.Saveshow1=false;

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
      this.PrinterExport("Active");
    }
    else {
      this.Active("InActive");
      this.PrinterExport("InActive");
    }

  }
  Active(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'AdminPrinter/PrinterGrid?Active=' + value).toPromise().then((data: any) => {
      debugger;

      //  this.items=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;


    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'AdminPrinter/PrinterGridres?Active=' + value+'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;

      //  this.items=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;


    });
  }
  }

  PrinterExport(value) {
    if (this.userrole == "SuperAdmin") {
    var ViewGrid = this.http.get(environment.apiUrl + 'AdminPrinter/PrinterExport?Active=' + value).toPromise().then((data: any) => {
      debugger;

      this.PrinterDetails = data;
     

    });
  }
  else{
    var ViewGrid = this.http.get(environment.apiUrl + 'AdminPrinter/PrinterExportres?Active=' + value +'&ResId=' +sessionStorage.getItem('ResId')).toPromise().then((data: any) => {
      debugger;

      this.PrinterDetails = data;
     

    });
  }
}

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  exportexcel(): void {
    debugger;
    /* table id is passed over here */
    const workSheet = XLSX.utils.json_to_sheet(this.PrinterDetails);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    //let element = document.getElementById('data-table-5'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, 'Waiter');

    /* save to file */
    XLSX.writeFile(wb, "Waiter.xlsx");

  }
  applyFilter(filterValue: string) {
    debugger;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
  this.Editeprinter =  this.Activestaus;
  var vStatus = this.Editeprinter.active;
  var vStatus1 = "";
  if (vStatus == "Active")
    vStatus1 = "InActive";
  else
    vStatus1 = "Active";

  var printerid = this.Editeprinter.printerConfigId;


    let params = new HttpParams();
  params = params.append('printerid', printerid);
  params = params.append('sStatus', vStatus1);
  var value = this.http.get(environment.apiUrl + 'AdminPrinter/UpdtePrintertatus', { params: params }).toPromise().then(
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
        this.PrinterExport("Active");
      }
      else if(vErrorMsg1 == "Failed"){

      }
    });
    return false;
  

}
}
