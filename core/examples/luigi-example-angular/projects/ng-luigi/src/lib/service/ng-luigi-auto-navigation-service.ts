import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {linkManager} from '@luigi-project/client';
import {NgLuigiConfig} from '../ng-luigi.module';
import {Injectable} from '@angular/core';
import { NgLuigiActivatedRouteSnapshotHelper } from '../route/ng-luigi-activated-route-snapshot-helper';

@Injectable({
  providedIn: 'root',
})
export class NgLuigiAutoNavigationService {

  subscriptions: Subscription;
  constructor(config: NgLuigiConfig, private router: Router) {
    if (!config.enableAutoNavigation){
      return;
    }

    this.subscriptions = new Subscription();
    this.subscriptions.add(this.router.events
      .pipe(this.doFilter())
      .subscribe(this.doSubscription));
  }

  doSubscription(event:NavigationEnd){
      let current = NgLuigiActivatedRouteSnapshotHelper.getCurrent();
      if (current.data.fromVirtualTreeRoot){
        console.debug("Calling fromVirtualTreeRoot for ulr ==> "+event.url);
        linkManager()
          .fromVirtualTreeRoot()  //  Sets the current navigation base to the parent node that is defined as virtualTree. This method works only when the currently active micro frontend is inside a virtualTree.
          .withoutSync()          //  It prevents Luigi Core from handling url change after `navigate()
          .navigate(event.url);   //  Navigate To..
      }
  }

  doFilter(){
    return filter(event => {
          return event instanceof NavigationEnd
            && event.url && event.url.length > 0
            && event.url.indexOf('preload') === -1;
       });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
