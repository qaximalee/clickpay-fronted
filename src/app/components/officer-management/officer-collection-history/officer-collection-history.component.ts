import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-officer-collection-history',
  templateUrl: './officer-collection-history.component.html',
  styleUrls: ['./officer-collection-history.component.css']
})
export class OfficerCollectionHistoryComponent implements OnInit {

  officerList: any = []
  
  constructor() { }

  ngOnInit(): void {
  }

}
