import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-menucommon',
  templateUrl: './admin-menucommon.component.html',
  styleUrls: ['./admin-menucommon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminMenucommonComponent implements OnInit {
  isShownMenuItem: boolean = true;
  isShownViewOrder: boolean = true;
  isShownWaiter: boolean = true;
  isShownTable: boolean = true;
  isShownCategory: boolean = true;
  isShownSubCategory: boolean = true;
  isShownDiscount: boolean = true;
  isShownCoupon: boolean = true;
  isShownResWorkHours: boolean = true;
  isShownResHoliday: boolean = true;
  isShownTips: boolean = true;
  isShownTax: boolean = true;
  isShownRating: boolean = true;
  isShownReports: boolean = true;
  isShownResturant: boolean = true;
  isShownUserRights: boolean = true;
  isShownPrinter: boolean=true;
  isShownSetting:boolean=true;
  isShownExtra:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    this.ShowHideMenu();
    var vRole=sessionStorage.getItem('UserRole');
    debugger;
    if(vRole=="SuperAdmin"){
      this.isShownResturant = false;
      this.isShownUserRights = false;
    }
  //   $(".menu-item1").click(function () {
  //     debugger;
  //     $(this).find('ul').toggleClass('show');

  //  $(this).find('ul').removeClass('in');
    
  //   });
      $('[data-toggle="slideLeft"]').on('click', function() {
        debugger;
        var target = $($(this).data('target'));
        
        if ($("body").hasClass('ms-aside-left-open')) {
          $("body").removeClass('ms-aside-left-open'); // Close the sidebar
        } else {
          $("body").addClass('ms-aside-left-open'); // Open the sidebar
        }
      });
  }
  isCollapsed: boolean = true; // Menu starts collapsed by default

  // Toggle collapse state
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
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
  ShowHideMenu() {
    debugger;
    var vRead = localStorage.getItem('Menu-Read');
    var vWrite = localStorage.getItem('Menu-Write');
    if ((vRead != undefined && vRead != null && vRead != "") || (vWrite != undefined && vWrite != null && vWrite != ""))
      this.isShownMenuItem = false;

    var vViewOrderRead = localStorage.getItem('ViewOrder-Read');
    var vViewOrderWrite = localStorage.getItem('ViewOrder-Write');
    if ((vViewOrderRead != undefined && vViewOrderRead != null && vViewOrderRead != "") || (vViewOrderWrite != undefined && vViewOrderWrite != null && vViewOrderWrite == ""))
      this.isShownViewOrder = false;

    var vWaiterRead = localStorage.getItem('Waiter-Read');
    var vWaiterWrite = localStorage.getItem('Waiter-Write');
    if ((vWaiterRead != undefined && vWaiterRead != null && vWaiterRead != "") || (vWaiterWrite != undefined && vWaiterWrite != null && vWaiterWrite != ""))
      this.isShownWaiter = false;

    var vTableRead = localStorage.getItem('Table-Read');
    var vTableWrite = localStorage.getItem('Table-Write');
    if ((vTableRead != undefined && vTableRead != null && vTableRead != "") || (vTableWrite != undefined && vTableWrite != null && vTableWrite != ""))
      this.isShownTable = false;

    var vCategoryRead = localStorage.getItem('Category-Read');
    var vCategoryWrite = localStorage.getItem('Category-Write');
    if ((vCategoryRead != undefined && vCategoryRead != null && vCategoryRead != "") || (vCategoryWrite != undefined && vCategoryWrite != null && vCategoryWrite != ""))
      this.isShownCategory = false;

    var vSubCategoryRead = localStorage.getItem('SubCategory-Read');
    var vSubCategoryWrite = localStorage.getItem('SubCategory-Write');
    if ((vSubCategoryRead != undefined && vSubCategoryRead != null && vSubCategoryRead != "") || (vSubCategoryWrite != undefined && vSubCategoryWrite != null && vSubCategoryWrite != ""))
      this.isShownSubCategory = false;

    var vDiscountRead = localStorage.getItem('Discount-Read');
    var vDiscountWrite = localStorage.getItem('Discount-Write');
    if ((vDiscountRead != undefined && vDiscountRead != null && vDiscountRead != "") || (vDiscountWrite != undefined && vDiscountWrite != null && vDiscountWrite != ""))
      this.isShownDiscount = false;

    var vCouponRead = localStorage.getItem('Coupon-Read');
    var vCouponWrite = localStorage.getItem('Coupon-Write');
    if ((vCouponRead != undefined  && vCouponRead != null && vCouponRead != "") || (vCouponWrite != undefined && vCouponWrite != null && vCouponWrite != ""))
      this.isShownCoupon = false;

    var vResWorkHoursRead = localStorage.getItem('ResWorkHours-Read');
    var vResWorkHoursWrite = localStorage.getItem('ResWorkHours-Write');
    if ((vResWorkHoursRead != undefined && vResWorkHoursRead != null && vResWorkHoursRead != "") || (vResWorkHoursWrite != undefined && vResWorkHoursWrite != null && vResWorkHoursWrite != ""))
      this.isShownResWorkHours = false;

    var vResHolidayRead = localStorage.getItem('ResHoliday-Read');
    var vResHolidayWrite = localStorage.getItem('ResHoliday-Write');
    if ((vResHolidayRead != undefined && vResHolidayRead != null && vResHolidayRead != "") || (vResHolidayWrite != undefined && vResHolidayWrite != null && vResHolidayWrite != ""))
      this.isShownResHoliday = false;

    var vTipsRead = localStorage.getItem('Tips-Read');
    var vTipsWrite = localStorage.getItem('Tips-Write');
    if ((vTipsRead != undefined && vTipsRead != null && vTipsRead != "") || (vTipsWrite != undefined && vTipsWrite != null && vTipsWrite != ""))
      this.isShownTips = false;

    var vTaxRead = localStorage.getItem('Tax-Read');
    var vTaxWrite = localStorage.getItem('Tax-Write');
    if ((vTaxRead != undefined && vTaxRead != null && vTaxRead != "") || (vTaxWrite != undefined && vTaxWrite != null && vTaxWrite != ""))
      this.isShownTax = false;

    var vRatingRead = localStorage.getItem('Rating-Read');
    var vRatingWrite = localStorage.getItem('Rating-Write');
    if ((vRatingRead != undefined && vRatingRead != null && vRatingRead != "") || (vRatingWrite != undefined && vRatingWrite != null && vRatingWrite != ""))
      this.isShownRating = false;

    var vReportsRead = localStorage.getItem('Reports-Read');
    if (vReportsRead != undefined && vReportsRead != null && vReportsRead != "")
      this.isShownReports = false;

      var vPrinterRead = localStorage.getItem('Printer-Read');
    var vPrinterWrite = localStorage.getItem('Printer-Write');
    if ((vPrinterRead != undefined && vPrinterRead != null && vPrinterRead != "") || (vPrinterWrite != undefined && vPrinterWrite != null && vPrinterWrite != ""))
      this.isShownPrinter = false;

      var vSettingRead = localStorage.getItem('Setting-Read');
    var vSettingWrite = localStorage.getItem('Setting-Write');
    if ((vSettingRead != undefined && vSettingRead != null && vSettingRead != "") || (vSettingWrite != undefined && vSettingWrite != null && vSettingWrite != ""))
      this.isShownSetting = false;

      var vExtraRead = localStorage.getItem('Extra-Read');
    var vExtraWrite = localStorage.getItem('Extra-Write');
    if ((vExtraRead != undefined && vExtraRead != null && vExtraRead != "") || (vExtraWrite != undefined && vExtraWrite != null && vExtraWrite != ""))
      this.isShownExtra = false;
  }
}
