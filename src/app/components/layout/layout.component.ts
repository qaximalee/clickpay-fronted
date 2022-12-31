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

  routeToAdminDetails(){
    this._router.navigate(['click-pay/admin-management/admin-details']);
  }

  routeToUserDetails(){
    this._router.navigate(['click-pay/user-management/user-details']);
  }

  routeToUserCollections(){
    this._router.navigate(['click-pay/user-management/user-collections']);
  }

  routeToComplainView(){
    this._router.navigate(['click-pay/user-management/complain-view']);
  }

  routeToDealerDetails(){
    this._router.navigate(['click-pay/dealer-management/dealer-details']);
  }

  routeToDealerCollections(){
    this._router.navigate(['click-pay/dealer-management/dealer-collections']);
  }

  routeToOfficerDetails(){
    this._router.navigate(['click-pay/officer-management/']);
  }

  routeToAreaAllocation(){
    this._router.navigate(['click-pay/officer-management/']);
  }

  routeToCollectionFromOfficer(){
    this._router.navigate(['click-pay/officer-management/']);
  }
}
