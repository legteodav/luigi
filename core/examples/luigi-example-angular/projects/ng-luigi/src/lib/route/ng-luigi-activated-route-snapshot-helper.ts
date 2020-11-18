import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NgLuigiActivatedRouteSnapshotHelper {

  private _current: ActivatedRouteSnapshot
  private static _instance: NgLuigiActivatedRouteSnapshotHelper;

  private static instance(): NgLuigiActivatedRouteSnapshotHelper{
     if (!this._instance){
       this._instance=new NgLuigiActivatedRouteSnapshotHelper();
     }
     return this._instance;
  }

  static getCurrent(): ActivatedRouteSnapshot {
    return this.instance()._current;
  }

  static setCurrent(current: ActivatedRouteSnapshot) {
    this.instance()._current = current;
  }
}
