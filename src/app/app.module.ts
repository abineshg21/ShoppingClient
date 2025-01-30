import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JwPaginationModule } from 'jw-angular-pagination';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CheckOutComponent } from './check-out/check-out.component';
import { FoodComponent } from './food/food.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { OfferComponent } from './offer/offer.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ReOrderComponent } from './re-order/re-order.component';
import { ReviewComponent } from './review/review.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TipsComponent } from './tips/tips.component';
import { WaiterComponent } from './waiter/waiter.component';
import { CouponComponent } from './coupon/coupon.component';
import { DiscountofferComponent } from './discountoffer/discountoffer.component';
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
import { TaxAdminComponent } from './tax-admin/tax-admin.component';
import { RestaruntAdminComponent } from './restarunt-admin/restarunt-admin.component';
import { PrivacyComponent } from './privacy/privacy.component';
import {UserrightsComponent} from'./userrights/userrights.component'
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomerActivationComponent } from './customer-activation/customer-activation.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import {MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table' ;
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from  '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AdminPrinterConfigComponent } from './admin-printer-config/admin-printer-config.component';
import {ItemsettingsComponent} from './itemsettings/itemsettings.component';
import { StoragedetectComponent } from './storagedetect/storagedetect.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { AdminMenucommonComponent } from './admin-menucommon/admin-menucommon.component';
import { AdminExtraComponent } from './admin-extra/admin-extra.component';
@NgModule({
  declarations: [
   
    AppComponent,
    HomePageComponent,
    CheckOutComponent,
    FoodComponent,
    SearchresultComponent,
    UserrightsComponent,
    FavouritesComponent,
    OfferComponent,
    MyOrderComponent,
    ReOrderComponent,
    ReviewComponent,
    MyAddressComponent,
    TermsConditionComponent,
    OrderdetailsComponent,
    AdminComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    AdminHomeComponent,
    TaxDetailComponent,
    TipsComponent,
    WaiterComponent,
    CouponComponent,
    DiscountofferComponent,
    TableComponent,
    ViewOrdersComponent,
    RatingComponent,
    AdminDashboardComponent,
    AdminReportComponent,
    WorkinghourComponent,
    HolidayComponent,
    ProfileComponent,
    AdminCategoryComponent,
    AdminSubCategoryComponent,
    TaxAdminComponent,
    RestaruntAdminComponent,
    PrivacyComponent,
    ContactUsComponent,
    SitemapComponent,
    CustomerActivationComponent,
    AdminPrinterConfigComponent,
    ItemsettingsComponent,
    StoragedetectComponent,
    AdminMenucommonComponent,
    AdminExtraComponent
  ],
  imports: [
    BrowserModule, JwPaginationModule,MatDialogModule ,MatTableModule,MatPaginatorModule,MatSortModule,MatDatepickerModule,MatFormFieldModule,
    NgxMaterialTimepickerModule, MatNativeDateModule, AppRoutingModule,HttpClientModule,CarouselModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule, NgbModule,
    
    SocialLoginModule
  ],
  providers: [StoragedetectComponent,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "800487178897-9i2i1qcv4um0ddsmc1f3d50ne2g20mdd.apps.googleusercontent.com"
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('334745497671187'),
          },
         
        ],
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent],

})
export class AppModule { }
