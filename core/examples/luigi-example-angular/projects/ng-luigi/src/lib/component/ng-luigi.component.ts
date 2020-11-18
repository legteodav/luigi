import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ng-luigi',
  templateUrl: './ng-luigi.component.html',
  styles: [
  ]
})
export class NgLuigiDemoComponent implements OnInit {

  routeExample:string = "  {path: 'ng-luigi-demo', component: NgLuigiDemoComponent, data: {fromVirtualTreeRoot: true}}";
  constructor() { }

  ngOnInit(): void {

  }

}
