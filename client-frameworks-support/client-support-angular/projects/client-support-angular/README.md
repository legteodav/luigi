# ClientSupportAngular

This library provides several features to run your angular application inside Luigi Micro-Frontend framework.  
If you want to know more about Luigi Framework, please have a look on [Luigi Homepage](https://luigi-project.io/).

## How to use the library
Using the library is pretty straightforward, you need to import the library in the package.json:
```javascript
npm install @luigi-project/fundamental-ngx-sample-apps-master -s
```

Once the library is imported and saved in your angular project, you will need to import the module LuigiAngularSupportModule:

```javascript
imports: [
  ........
  ,LuigiAngularSupportModule
],
```

## Features
Here the main features provided by the library:
* LuigiContextService
* LuigiAutoRoutingService

### LuigiContextService
You can inject this service inside your Angular items in order to:
* Get the current Context (latest) that we received from Luigi Core
* Provide an Observable<Context> where through subscribing, you can get any Context change     
    
LuigiContextService is an abstract class, its implementation is in LuigiContextServiceImpl class.  
If you need to change/extend the implementation, you can easily create your a new class extending LuigiContextServiceImpl:

```javascript
export class YourContextService extends  LuigiContextServiceImpl {
    ....    
}

```
Inside your module redefine the provider:
 ```javascript
providers: [
    {
        provide: LuigiContextService,
        useClass: YourContextService
    }
]
 ```
    
### LuigiAutoRoutingService
This service you cannot directly be used, but it will provide useful features how to synchronize your angular application with Luigi navigation.  
It can happen that in your microfrontend, user can navigate through different components/pages.  
With this feature we provide an easy way how to synchronize angular route with Luigi navigation; in angular route configuration, you can now add in data these attributes:

 ```javascript
{path: 'luigi-client-support-preload',component: Sample1Component,data: { fromVirtualTreeRoot: true }}
{path: 'luigi-client-support-preload',component: Sample2Component,data: { luigiRoute: '/home/sample2' }}
 ```

with `data: { fromVirtualTreeRoot: true }`, once we load Sample1Component, we will call Luigi Client:
 ```javascript
  luigiClient.linkManager().fromVirtualTreeRoot().withoutSync().navigate({route url});
 ```
with `data: { luigiRoute: '/home/sample2'' }`, uses luigiClient API in this way:
 ```javascript
  luigiClient.linkManager().withoutSync().navigate(data.luigiRoute);
 ```
More information about linkManager can be found [here](https://docs.luigi-project.io/docs/luigi-client-api/?section=linkmanager).


## LuigiRouteStrategy
To use LuigiAutoRoutingService, this library defines a new RouteReuseStrategy named LuigiRouteStrategy.  
If you need to define your own RouteReuseStrategy, you can extend LuigiRouteStrategy by overriding it next way:

 ```javascript
export class YouRouteStrategy extends LuigiRouteStrategy {

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        super.retrieve(route);
        // Your code
    }

}
 ```
and define the provider:
 ```javascript
 {
      provide: RouteReuseStrategy,
      useClass: YouRouteStrategy
 }
 ```

We also provide an example of how to extend LuigiRouteStrategy in class LuigiReuseRouteStrategy.  
In this class we added the possibility to "reuse" a component and not init every time you load it (it could be useful to keep component state.)  
LuigiReuseRouteStrategy uses this kind of configuration:
 ```javascript
{path: 'luigi-client-support-preload',component: Sample1Component,data: { reuse: true }}
 ```

If you want to use LuigiReuseRouteStrategy (it is not enabled by default) you need to configure in your application:
 ```javascript
 {
      provide: RouteReuseStrategy,
      useClass: LuigiReuseRouteStrategy
 }
 ```




 
 