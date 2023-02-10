import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { PaymentMethod } from 'src/app/core/models/payment-method';
import { CollectionService } from 'src/app/core/services/collection.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-receive-user-collection-modal',
  templateUrl: './receive-user-collection-modal.component.html',
  styleUrls: ['./receive-user-collection-modal.component.css']
})
export class ReceiveUserCollectionModalComponent implements OnInit {

  @Input() data?: any;
  @Input() title?: string;
  confirmModal?: NzModalRef;
  private _httpConstants: HttpConstants = new HttpConstants();

  receiveRequest = {
    amount : null,
    collectionIds : [this.data?.collections.length()],
    customerId : 0,
    paymentMethod : null, 
    receivingDate : new Date(),
    connectionType : null,
  }

  paymentMethodList = Object.values(PaymentMethod);

  constructor(
    private _modal: NzModalService,
    private _collectionService : CollectionService,
    private _messageService : MessageService
  ) { }

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


  receiveUserCollection(){
    console.log(this.receiveRequest);
    this._collectionService.paidUserCollection(this.receiveRequest).subscribe({
      next : (response : any) => {
        console.log("Get Paid User Collection Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this._messageService.success('User Collection Received Successfully');
            this._modal.closeAll();
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('User Collection Receiving Failed');
        }
        else{
          this._messageService.error('Error');
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('User Collection Receiving Failed');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }

}
