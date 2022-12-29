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
   this._router.navigate(['bill'],{ relativeTo: this._activatedRoute});
  }

  routeToPackage(){
    this._router.navigate(['creation/package'],{ relativeTo: this._activatedRoute});
  }

  routeToArea(){

  }

  routeToBoxMedia(){

  }

}
