import { Injectable } from '@angular/core';
import { LuigiContextService } from './luigi-context-service';
import { LuigiConfig } from '../luigi.angular.support.module';

@Injectable()
export class AppInitService {
  syncWithLuigiCore: boolean;

  constructor(
    private contextService: LuigiContextService,
    luigiConfig: LuigiConfig
  ) {
    this.syncWithLuigiCore = luigiConfig.syncWithLuigiCore;
  }

  Init() {
    return new Promise<void>((resolve, reject) => {
      if (!this.syncWithLuigiCore) {
        resolve();
        return;
      }
      const context = this.contextService.getContext();
      if (context) {
        console.log(
          "Luigi Context had been already initialized, we don't need to wait for it"
        );
        resolve();
        return;
      }

      //Let's wait for Context Init event
      this.contextService.contextObservable().subscribe(context => {
        resolve();
      });
    });
  }
}
