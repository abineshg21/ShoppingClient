import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-activation',
  templateUrl: './customer-activation.component.html',
  styleUrls: ['./customer-activation.component.css']
})
export class CustomerActivationComponent implements OnInit {
  VerifyStatus: string;
  EmailID: string;
  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.EmailID = this.route.snapshot.params.mail;
   }

  ngOnInit(): void {
    debugger;
    var vEmailId=this.EmailID;
    let params = new HttpParams();
    params = params.append('EmailId', vEmailId);
    var value = this.http.get(environment.apiUrl + 'customerdetails/CustVerrification', { params: params }).toPromise().then(
      (data: any) => {
        debugger;
        
      }).catch((data: any) => {
        debugger;
        var vDataError = JSON.stringify(data.error.text);
        var vErrorMsg = vDataError.replace('"', '');
        var vErrorMsg1 = vErrorMsg.replace('"', '');
        if (vErrorMsg1 == "Success") {
          this.VerifyStatus="Your Mail Id Verified Successfully.";
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
        else{
          this.VerifyStatus="Your Mail Id Verified Failed, Please try again.";
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      });
  }

}
