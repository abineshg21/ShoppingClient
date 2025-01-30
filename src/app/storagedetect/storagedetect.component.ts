import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {Subject,Observable} from 'rxjs'
@Component({
  selector: 'app-storagedetect',
  templateUrl: './storagedetect.component.html',
  styleUrls: ['./storagedetect.component.css']
})
@Injectable()
export class StoragedetectComponent implements OnInit {
  private _localItem: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  private storageSub= new Subject<string>();
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  setItem(key: string, data: any) {
    debugger;
    localStorage.setItem(key, data);
    this.storageSub.next('added');
  }

  // set localItem(key: string, data: any) {
  //   this._localItem = data;
  //   localStorage.setItem(key, data);
  // }

  getitem (key: string) {
    debugger;
    return this._localItem = localStorage.getItem(key)
  }

}
