import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from'./home-page/home-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { FoodComponent } from './food/food.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { OfferComponent } from './offer/offer.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ReOrderComponent } from './re-order/re-order.component';
import { ReviewComponent } from './review/review.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TipsComponent } from './tips/tips.component';
import { WaiterComponent } from './waiter/waiter.component';
import { DiscountofferComponent } from './discountoffer/discountoffer.component';
import { CouponComponent } from './coupon/coupon.component';
import { TableComponent } from './table/table.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { RatingComponent } from './rating/rating.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { WorkinghourComponent } from './workinghour/workinghour.component';
import { HolidayComponent } from './holiday/holiday.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminSubCategoryComponent } from './admin-sub-category/admin-sub-category.component';
import { RestaruntAdminComponent } from './restarunt-admin/restarunt-admin.component';
import { TaxAdminComponent } from './tax-admin/tax-admin.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyComponent } from './privacy/privacy.component';
import{AboutComponent} from './about/about.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import{SitemapComponent} from './sitemap/sitemap.component';
import{UserrightsComponent} from './userrights/userrights.component';
import { CustomerActivationComponent } from './customer-activation/customer-activation.component';
import{AdminPrinterConfigComponent} from './admin-printer-config/admin-printer-config.component';
import { ItemsettingsComponent } from './itemsettings/itemsettings.component';
import { AdminExtraComponent } from './admin-extra/admin-extra.component';
const routes: Routes = [{
  path:'',component:HomePageComponent
},
{path:'home',component:HomePageComponent},
{path:'Menu/:id/:text',component:HomePageComponent},
{path:'CheckOut',component:CheckOutComponent},
{path:'Food/:id/:qty/:addon',component:FoodComponent},
{path:'Search/:searchtext',component:SearchresultComponent},
{path:'Favourite',component:FavouritesComponent},
{path:'Offer',component:OfferComponent},
{path:'MyOrder',component:MyOrderComponent},
{path:'ReOrder',component:ReOrderComponent},
{path:'Review',component:ReviewComponent},
{path:'MyAddress',component:MyAddressComponent},
{path:'OrderDetail',component:OrderdetailsComponent},
{path:'TermsCondition',component:TermsConditionComponent},
{path:'Privacy',component:PrivacyComponent},
{path:'SiteMap',component:SitemapComponent},
{path:'Admin',component:AdminComponent},
{path:'AdminHome',component:AdminHomeComponent},
{path:'AdminTax',component:TaxDetailComponent},
{path:'AdminTips',component:TipsComponent},
{path:'AdminWaiter',component:WaiterComponent},
{path:'AdminCoupon',component:CouponComponent},
{path:'AdminOffer',component:DiscountofferComponent},
{path:'AdminTable',component:TableComponent},
{path:'AdminViewOrder',component:ViewOrdersComponent},
{path:'AdminRating',component:RatingComponent},
{path:'AdminDashboard',component:AdminDashboardComponent},
{path:'AdminReports',component:AdminReportComponent},
{path:'Adminworking',component:WorkinghourComponent},
{path:'AdminHoliday',component:HolidayComponent},
{path:'Adminprofile',component:ProfileComponent},
{path:'AdminPrinter',component:AdminPrinterConfigComponent},
{path:'AdminCategory',component:AdminCategoryComponent},
{path:'AdminSubCategory',component:AdminSubCategoryComponent},
{path:'SuperAdminTax',component:TaxAdminComponent},
{path:'SuperAdminRestarunt',component:RestaruntAdminComponent},
{path:'About',component:AboutComponent},
{path:'ContactUs',component:ContactUsComponent},
{path:'CustomerActivation/:mail',component:CustomerActivationComponent},
{path:'ItemSettings',component:ItemsettingsComponent},
{path:'UserRights',component:UserrightsComponent},
{path:'SiteMap',component:SitemapComponent},
{path:'Extra',component:AdminExtraComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
