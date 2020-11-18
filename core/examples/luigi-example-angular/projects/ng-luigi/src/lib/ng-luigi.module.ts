import {Injectable, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {NgLuigiDemoComponent} from './component/ng-luigi.component';
import {NgLuigiContextService} from './service/ng-luigi-context-service';
import {NgLuigiContextServiceImpl} from './service/impl/ng-luigi-context-service-impl';
import {NgLuigiAutoNavigationService} from './service/ng-luigi-auto-navigation-service';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from './component/default.component';
import {ModuleOptions} from 'webpack/declarations/WebpackOptions';
import { NgLuigiReuseStrategy } from './route/ngLuigiReuseStrategy';


export const NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>( 'forRoot() NgLuigi configuration.' );

export const staticRoutes: Routes = [
  {path: 'ng-luigi-demo', component: NgLuigiDemoComponent, data:{fromVirtualTreeRoot: true}},
  {path: '**', component: DefaultComponent }
];

@Injectable({
  providedIn: 'root'
})
export class NgLuigiConfig {
  public enableAutoNavigation: boolean;
}

function provideNgLuigiConfig( options?: NgLuigiConfig ): NgLuigiConfig {
  const ngLuigiConfig = new NgLuigiConfig();
  if (!options) {
    return ngLuigiConfig;
  }
  if (typeof (options.enableAutoNavigation) === 'boolean') {
    ngLuigiConfig.enableAutoNavigation = options.enableAutoNavigation;
  }
  return ngLuigiConfig;
}


@NgModule({
  declarations: [NgLuigiDemoComponent, DefaultComponent],
  imports: [
    RouterModule.forChild(staticRoutes)
  ],
  providers: [
    {
      provide: NgLuigiContextService,
      useClass: NgLuigiContextServiceImpl
    }
  ],
  exports: [NgLuigiDemoComponent, DefaultComponent]
})
export class NgLuigiModule {

  constructor(ngLuigiAutoNavigationService: NgLuigiAutoNavigationService, ngLuigiContextService: NgLuigiContextService) {}

  static forRoot(options?: NgLuigiConfig): ModuleWithProviders<any> {

    return({
      ngModule: NgLuigiModule,
      providers: [
        {
          provide: NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN,
          useValue: options
        },
        {
          provide: NgLuigiConfig,
          useFactory: provideNgLuigiConfig,
          deps: [ NG_LUIGI_FOR_ROOT_OPTIONS_TOKEN ]
        },
        {
          provide : RouteReuseStrategy,
          useClass: NgLuigiReuseStrategy
        }
      ]
    });
  }
}



