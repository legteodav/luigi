import {
  APP_INITIALIZER,
  InjectionToken,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LuigiReuseStrategy } from './route/luigiReuseStrategy';
import { LuigiPreloadComponent } from './component/luigi.preload.component';
import { LuigiContextService } from './service/luigi-context-service';
import { LuigiContextServiceImpl } from './service/luigi-context.service.impl';
import { LuigiAutoRoutingService } from './service/luigi-auto-routing.service';
import { AppInitService } from './service/app-init-service';
import { ModuleOptions } from 'webpack/declarations/WebpackOptions';

export const staticRoutes: Routes = [
  /** here an example if you want to specify that this component is a virtualThree element in Luigi Core navigation*/
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { fromVirtualTreeRoot: true }
  },
  /** here an example if you want to specify that this component it is a luigi component and u want to change the navigation in Luigi core*/
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { luigiRoute: '/home/reload' }
  },
  /** here an example if you want to reuse the component and not recreating every time you navigate to it (a singleton Component) */
  {
    path: 'luigi-client-support-preload=component',
    component: LuigiPreloadComponent,
    data: { reuse: true }
  }
];

export const NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<
  ModuleOptions
>('forRoot() NgLuigi configuration.');
export class LuigiConfig {
  public syncWithLuigiCore: boolean = true;
}

function initConfig(options?: LuigiConfig): LuigiConfig {
  const ngLuigiConfig = new LuigiConfig();
  if (!options) {
    return ngLuigiConfig;
  }
  if (typeof options.syncWithLuigiCore === 'boolean') {
    ngLuigiConfig.syncWithLuigiCore = options.syncWithLuigiCore;
  }
  return ngLuigiConfig;
}

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}

@NgModule({
  declarations: [LuigiPreloadComponent],
  imports: [RouterModule.forChild(staticRoutes)],
  providers: [
    {
      provide: LuigiContextService,
      useClass: LuigiContextServiceImpl
    },
    {
      provide: RouteReuseStrategy,
      useClass: LuigiReuseStrategy
    },
    {
      provide: NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN,
      useValue: {}
    },
    {
      provide: LuigiConfig,
      useFactory: initConfig,
      deps: [NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN]
    },
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    }
  ],
  exports: [LuigiPreloadComponent]
})
export class LuigiAngularSupportModule {
  constructor(
    navigation: LuigiAutoRoutingService,
    context: LuigiContextService
  ) {}
  static forRoot(options?: LuigiConfig): ModuleWithProviders<any> {
    return {
      ngModule: LuigiAngularSupportModule,
      providers: [
        {
          provide: NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN,
          useValue: options
        },
        {
          provide: LuigiConfig,
          useFactory: initConfig,
          deps: [NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN]
        }
      ]
    };
  }
}
