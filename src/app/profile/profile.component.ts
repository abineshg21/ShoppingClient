import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
FName :string;
LName :string;
Address1:string;
Address2 :string;
City:string;
State :string;
Zip :string;
Profile:string;
isShownError: boolean = false;
ErrorMsg: string;
SuccessMsg: string;
  isShownSuccess: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScript('../../assets/framework.js');
    this.loadScript('../../assets/datatables.min.js');
    var userId=  sessionStorage.getItem('UserId');
    var value = this.http.get(environment.apiUrl + 'ProfileUpdate/ProfileName?UserId=' + userId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
         this.FName = data["0"].firstName;
         this.LName =data["0"].lastName;
         this.City=data["0"].city;
         this.Address1=data["0"].addressLine1;
         this.Address2=data["0"].addressLine2;
         this.State=data["0"].state;
         this.Zip=data["0"].zip;
         this.Profile=data["0"].profile;
        }
        else {
        };
      }).catch(function (data: any) {

      });
  }

  Profilecateory(){
    var userId=  sessionStorage.getItem('UserId');
    var value = this.http.get(environment.apiUrl + 'ProfileUpdate/ProfileName?UserId=' + userId).toPromise().then(
      (data: any) => {
        debugger;
        if (data.length != 0) {
         this.FName = data["0"].firstName;
         this.LName =data["0"].lastName;
         this.City=data["0"].city;
         this.Address1=data["0"].addressLine1;
         this.Address2=data["0"].addressLine2;
         this.State=data["0"].state;
         this.Zip=data["0"].zip;
         this.Profile=data["0"].profile;
        }
        else {
        };
      }).catch(function (data: any) {

      });
  }

  public uploadFile = (files) => {
    debugger;
    this.isShownError = true;
    if (files.length === 0) {
      return;
    }
   let fileToUpload = <File>files[0];
   
    let size = fileToUpload.size / 1024 / 1024;
    if (size > 2) {
      this.isShownError = false;
      this.ErrorMsg = "Please Choose Below 2 MB";
      return false;
    }

    var index = fileToUpload.name.lastIndexOf(".");
    var strsubstring = fileToUpload.name.substring(index, fileToUpload.name.length);

    if (strsubstring == '.png' || strsubstring == '.jpg' || strsubstring == '.jpeg' ) {
      // debugger;
    }
    else {
      //  debugger;
      this.isShownError = false;
      this.ErrorMsg = "Please Choose valid file Type png,jpg,jpeg ";
      return false;
    }
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    var userId=  sessionStorage.getItem('UserId');
    this.http.post(environment.apiUrl +'ProfileUpdate/ProfilPhote?UserId=' + userId, formData, {reportProgress: true, observe: 'events'})
      .subscribe(data => {
        debugger;
        // if (event.type === HttpEventType.UploadProgress)
        //   this.progress = Math.round(100 * event.loaded / event.total);
        // else if (event.type === HttpEventType.Response) {
        //   this.message = 'Upload success.';
        //   this.onUploadFinished.emit(event.body);
        // }
      });
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

  Update(){
    this.isShownError = true;
    this.isShownSuccess = true;
    if (this.FName == undefined || this.FName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter First Name";
      return false;
    }
    if (this.LName == undefined || this.LName == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Last Name";
      return false;
    }
    if (this.Address1 == undefined || this.Address1 == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Address Line 1";
      return false;
    }
    if (this.City == undefined || this.City == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter City";
      return false;
    }
    if (this.State == undefined || this.State == "") {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter State";
      return false;
    }
    if (this.Zip == undefined || this.Zip == null) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter Zip";
      return false;
    }
    var regMobile = /^\d{6}$/;

    if (regMobile.test(this.Zip) == false) {
      this.isShownError = false;
      this.ErrorMsg = "Please Enter The Valid Zip code. ";
      return false;
    }
    var userId=  sessionStorage.getItem('UserId');
    var OrderInse = this.http.get(environment.apiUrl + 'ProfileUpdate/ProfileDetailUpdate?FName=' + this.FName +'&LName=' + this.LName + '&Address1=' + this.Address1 + '&Address2=' + this.Address2 + '&city=' + this.City + '&State=' + this.State + '&Zip=' + this.Zip + '&UserId=' + userId).toPromise().then((data: any) => {
      debugger;
      if (data == "0") {
        this.isShownError = false;
        this.ErrorMsg = "Profile Update Failed";

      }
      else {
        this.isShownSuccess = false;
        this.SuccessMsg = "Profile Update Successfully";
        this.Profilecateory();
      }
    }).catch(function (data: any) {

    });

  }

}
