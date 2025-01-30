import { Component, OnInit , ViewChild,ElementRef} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from  '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { interval } from 'rxjs';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css','../../assets/bootstrap.min.css','../../assets/Style.css','../../assets/datatables.min.css'],
  encapsulation: ViewEncapsulation.None
})

export class ViewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['resname','orderId', 'orderDate', 'deliveryId', 'orderAmount','orderReceived','Status','Paidtype'];
  dataSource: MatTableDataSource<any[]>;
ViewOrder=[] as any;
LoginUser: string;
config: any;
collection = [];
Name:string;
MobileNo:string;
deliverydate :string;
CancelDate:string;

Address:string;
Vieworderdate:string;
OrderId : string;
OrderDate:string;
DeliveryType :string;
Status:string;
tax:string;
ResName:string;
total :string;
Payment:string;
Monthdate:string;
DeliveryAmt :string;
false=false;
DiscountAmt:string;
Tips:string;
Coupon:string;
OrderTotal:string;
OrderGRID =[] as any;
items = [];
userrole:string;
pageOfItems: Array<any>;
DeliveryAddress =true;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
@ViewChild('TABLE') table: ElementRef;
  constructor(private modalService: NgbModal,private http:HttpClient) { 
    interval(200000).subscribe((func => {
      debugger;
      this.Vieworderscreen(this.Vieworderdate);
    }))
  }
  closeResult: string;
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
     XLSX.utils.book_append_sheet(wb, workSheet, 'Vieworders');

     /* save to file */
     XLSX.writeFile(wb, "ViewOrder.xlsx");
    
  }

  ngOnInit(): void {
    debugger;
    this.userrole=sessionStorage.getItem('UserRole');
    var vRole = sessionStorage.getItem('UserRole');
    if (vRole == "SuperAdmin") {
     
    }
    else {
      var vResId = sessionStorage.getItem('ResId');
    }
    
    this.Monthdate="";
    this.Vieworderdate="Today";
    this.Vieworderscreen(this.Vieworderdate);
   this.Timeout();
    this.loadScript('../../assets/js/Alert.js');
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    var vName = sessionStorage.getItem('UserName');
    var vRole = sessionStorage.getItem('UserRole');
    this.LoginUser = vName + " (" + vRole + ")";
   
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
  OrderStatus(OrderType,OrderId){
    debugger;
    if(OrderType == "Ordered")
    {
      alert("Order Delivery Status Cannot be changed");
      return ;
    }
    var userId=  sessionStorage.getItem('UserId');
  var role=  sessionStorage.getItem('UserRole');
  if(role=="SuperAdmin"){
    role="Admin";
  }
    var OrderStatus = this.http.get(environment.apiUrl +'ViewOrders/OrderStatus?OrderType='+OrderType+'&OrderId='+OrderId +'&UserId='+userId).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
        this.ViewOrder=data;
     //  this.ReOrder=data;
      }
     // this.check();
          }).catch(function(data:any){
            debugger;
            var tes = data.error.text;
if(tes == "Success"){
  alert("Successfully Status Updated");
}
else{
  alert("Status update Failed");
}
          });
  }
  printer() {
    debugger;
    var html="<html>";html+=document.getElementById('OrderDetail').innerHTML;html+="</html>";
	var printWin=window.open('','','left=0,top=0,width=1000,height=580,toolbar=0,scrollbars=0,status  =0');
	printWin.document.write(html);printWin.document.close();printWin.focus();
	printWin.print();
    // let printContents, popupWin;
    // printContents = document.getElementById('OrderDetail').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       <style>
    //       //........Customized style.......
    //       </style>
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();
}
Datechose(Monthdate){
debugger;
this.Vieworderdate=Monthdate;
this.Vieworderscreen(this.Vieworderdate);
}
Timeout(){
  setTimeout(function () {
    console.log('hide');
    debugger;
    var test = this.Vieworderdate;
    if(test != undefined){
      this.Vieworderscreen(this.Vieworderdate);
    }
  
    ///this.showElement = false; // here... this has different context
  }, 2000);
}
Vieworderscreen(Monthdate){
  debugger;
  var userId=  sessionStorage.getItem('UserId');
  var role=  sessionStorage.getItem('UserRole');
  if(role=="SuperAdmin"){
    role="Admin";
  }
  else {
    role="";
  }
var ViewOrder = this.http.get(environment.apiUrl +'Orders/OrderViews?UserId='+userId+'&Typeslist='+role+'&listday='+Monthdate).toPromise().then((data:any)=>{
  debugger;
  if(data.length !=0){
    this.items=data;
    this.dataSource  = new MatTableDataSource(data); 
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  this.OrderView(data["0"].orderId);
 this.dataSource.sort = this.sort;

  }
 // this.check();
      });

    }
OrderView(itemId){
  var OrderView = this.http.get(environment.apiUrl +'ViewOrders/OrdersView?OrderId=' +itemId).toPromise().then((data:any)=>{
    debugger;
    if(data.length !=0){
      this.OrderGRID=(data) ;

      if(data["0"].deliveryAddressId != 0){
        
        this.Address=data["0"].addressLine1 + " " +data["0"].addressLine2 + " " + (data["0"].City !=  null ? data["0"].City :"") + " " +  (data["0"].State !=  null ? data["0"].State :"")  + " " +  (data["0"].Zip !=  null ? data["0"].Zip :"")   ;
       this.DeliveryAddress=true;
      }
      else{
        this.DeliveryAddress=false;
      }
      this.Name = data["0"].firstName + "-" + (data["0"].lastName != null ? data["0"].lastName : "")  ;
        this.MobileNo=data["0"].mObile;
      this.ResName=data["0"].resName ;
    
     this.DeliveryAmt=data["0"].deliveryAmount ;
     this.Tips=data["0"].tipsAmount ;
     this.tax=data["0"].taxAmount ;
     this.DiscountAmt=data["0"].discountAmount ;
     this.DeliveryType=data["0"].deliveryType ;
     this.OrderDate=data["0"].orderDate ;
     this.OrderId=data["0"].orderId ;
     this.OrderTotal=data["0"].orderAmount ;
     this.Status=data["0"].type ;
     this.Payment= (data["0"].type!= "Delivered" ? (data["0"].paymentMethod  == "Online" ? "Paid" :"Total Due") :"Paid");
     this.deliverydate =data["0"].deliveredDate;
     this.CancelDate =data["0"].cancelDate;
    //  this.ViewOrder=data;
   //  this.ReOrder=data;
    }
   // this.check();
        });
}
  open(content,itemId) {
    debugger;
    var OrderView = this.http.get(environment.apiUrl +'ViewOrders/OrdersView?OrderId=' +itemId).toPromise().then((data:any)=>{
      debugger;
      if(data.length !=0){
        this.OrderGRID=(data) ;

        if(data["0"].deliveryAddressId != 0){
          this.Name = data["0"].firstName + "-" + (data["0"].lastName != null ? data["0"].lastName : "")  ;
          this.MobileNo=data["0"].mObile;
          this.Address=data["0"].addressLine1 + " " +data["0"].addressLine2 + " " + (data["0"].City !=  null ? data["0"].City :"") + " " +  (data["0"].State !=  null ? data["0"].State :"")  + " " +  (data["0"].Zip !=  null ? data["0"].Zip :"")   ;
         this.DeliveryAddress=true;
        }
        else{
          this.DeliveryAddress=false;
        }
      
       this.DeliveryAmt=data["0"].deliveryAmount ;
       this.Tips=data["0"].tipsAmount ;
       this.tax=data["0"].taxAmount ;
       this.DiscountAmt=data["0"].discountAmount ;
       this.DeliveryType=data["0"].deliveryType ;
       this.OrderDate=data["0"].orderDate ;
       this.OrderId=data["0"].orderId ;
       this.OrderTotal=data["0"].orderAmount ;
       this.Status=data["0"].type ;
       this.Payment=(data["0"].Payment  == "Online" ? "Paid" :"Total Due");
      //  this.ViewOrder=data;
     //  this.ReOrder=data;
      }
     // this.check();
          });
    this.modalService.open(content, {windowClass: 'OrderPop',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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

      public loadScript(url: string) {
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
      }
}
