import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  startDate: string;
  randomNumber: number;
  staticComponent: boolean;

  ngOnInit(): void {
    let current = this.route.snapshot
    console.log('data => ',current.data);
    this.staticComponent= current.data.reuse? true: false;
    this.randomNumber = Math.random();
    this.startDate = new Date().toISOString();
  }


  doGoTo(url){
    this.router.navigate([url]);
  }

}
