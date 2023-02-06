import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { elementAt } from 'rxjs';
import { ReceiveUserCollection } from 'src/app/core/models/receive-user-collection.model';
import { UserCollection } from 'src/app/core/models/user-collection.model';

@Component({
  selector: 'app-receive-user-collection-modal',
  templateUrl: './receive-user-collection-modal.component.html',
  styleUrls: ['./receive-user-collection-modal.component.css']
})
export class ReceiveUserCollectionModalComponent implements OnInit {

  @Input() data?: any;
  @Input() title?: string;
  confirmModal?: NzModalRef;

  receiveRequest = {
    amount : null,
    collectionIds : [this.data?.collections.length()],
    customerId : 0,
    paymentMethod : null, 
    receivingDate : new Date(),
    connectionType : null,
  }



  constructor() { }

  ngOnInit(): void {
    this.data.collections.forEach((item: any, index=0) => {
        console.log(item)
        this.receiveRequest.amount += item.amount
        this.receiveRequest.collectionIds[index] = item.id
        index++;
      }
    );
    this.receiveRequest.connectionType = this.data?.customer?.connectionType;
    this.receiveRequest.customerId = this.data?.customer?.id;
    console.log(this.data);
    console.log(this.receiveRequest);
  }


  submitRecevieCollections(){
    this.data.collections.array.forEach((element:any) => {
      this.receiveRequest.collectionIds = element?.id;
    });
    this.receiveRequest.customerId = this.data?.customer?.id;
    console.log("receiving request " +this.receiveRequest);
  }
}
