import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { Months } from 'src/app/core/models/months';
import { PaymentType } from 'src/app/core/models/payment-type';
import { UserCollection } from 'src/app/core/models/user-collection.model';
import { Years } from 'src/app/core/models/years';
import { CollectionService } from 'src/app/core/services/collection.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-user-collections-modal',
  templateUrl: './create-user-collections-modal.component.html',
  styleUrls: ['./create-user-collections-modal.component.css']
})
export class CreateUserCollectionsModalComponent implements OnInit {

  @Input() data?: any;
  @Input() title?: string;
  collectionForm: UserCollection = new UserCollection(); 
  confirmModal?: NzModalRef;  
  @ViewChild('collectionForm') userCollectionForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();
  
  selectedConnectionType = null;
  buttonName: string = 'Create';
  companyList: Array<any> = [];
  connectionTypeList: Array<any> = [];

  constructor(
    private _collectionService : CollectionService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  monthList = Object.values(Months);

  yearList = Object.values(Years).filter(value => typeof value === 'number').sort();

  paymentTypeList = Object.values(PaymentType);

  ngOnInit(): void {
    this.collectionForm.customerId = this.data?.id;
    this.collectionForm.customerName = this.data?.name;
    this.collectionForm.amount = this.data?.amount;
    this.collectionForm.internetId = this.data?.internetId;
    this.collectionForm.connectionType = this.data?.connectionType;
  }

  onChangeOfPaymentType(){
    this.collectionForm.amount = this.data?.amount;
  }

  createUserCollection(){
    console.log(this.collectionForm)
    this._collectionService.createUserCollection(this.collectionForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this._messageService.success('User Collection Created Successfully');
          this._modal.closeAll();
        }
        else {
          console.log('Error');
        }
      },
      error: (error: any) => {
        console.log(error);
        if (error?.status == this._httpConstants.REQUEST_STATUS.BAD_REQUEST_400.CODE) {
          this._messageService.info(error?.error?.msg);
        }else if (error?.status === 302) {
          this._messageService.info(error?.message);
        }
      },
      complete: () => { }
    })
  }

}
