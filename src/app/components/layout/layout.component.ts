import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  isCollapsed = false;
  
  constructor(
    private _router : Router,
    private _activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  routeToBill(){
   this._router.navigate(['click-pay/creation/bill']);
  }

  routeToPackage(){
    this._router.navigate(['click-pay/creation/package']);
  }

  routeToArea(){
    this._router.navigate(['click-pay/creation/area']);
  }

  routeToBoxMedia(){
    this._router.navigate(['click-pay/creation/box-media']);
  }

}
