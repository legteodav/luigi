import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'

})
export class DefaultComponent implements OnInit {

  currentUrl:String;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("DefaultComponent --> ngOnInit");
    this.currentUrl = this.router.url;
  }


}
