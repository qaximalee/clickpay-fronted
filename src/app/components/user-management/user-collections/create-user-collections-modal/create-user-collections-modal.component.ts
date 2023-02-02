import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { UserCollection } from 'src/app/core/models/user-collection.model';
import { CollectionService } from 'src/app/core/services/collection.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-user-collections-modal',
  templateUrl: './create-user-collections-modal.component.html',
  styleUrls: ['./create-user-collections-modal.component.css']
})
export class CreateUserCollectionsModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  @Input() customerId?: number;
  @Input() amount?: number;
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

  monthList = [ "Jan", "Feb", "Mar", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];

  yearList = [ 2020, 2021, 2022, 2023, 2024, 2025];

  paymentTypeList = [ "Monthly", "Installment", "Other"];

  ngOnInit(): void {
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
        }
      },
      complete: () => { }
    })
  }

}
