import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CollectionService } from 'src/app/core/services/collection.service';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { CreateUserCollectionsModalComponent } from './create-user-collections-modal/create-user-collections-modal.component';

@Component({
  selector: 'app-user-collections',
  templateUrl: './user-collections.component.html',
  styleUrls: ['./user-collections.component.css']
})
export class UserCollectionsComponent implements OnInit {

  selectedCustomer = null;
  private _httpConstants: HttpConstants = new HttpConstants();
  customerList : Array<any> = [];
  collectionList : Array<any> = [];
  Customer : any;
  
  pageNo : number = 0;
  pageSize : number = 6;
  totalItems : number = 0; 
  pageIndex : number = 1;

  CustomerData = {
    id : 0,
    name : null,
    internetId : null,
    amount : 0,
    connectionType : null,
  };

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _userService : UserManagementService,
    private _collectionService : CollectionService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  onChangeOfCustomer(event: any) {
    event != null ? this.selectedCustomer = this.Customer.id : this.selectedCustomer = null;
    
    if(this.Customer.id!=null){
      this.CustomerData.id = this.Customer.id;
      this.CustomerData.name = this.Customer.name;
      this.CustomerData.amount = this.Customer.amount;
      this.CustomerData.internetId = this.Customer.internetId;
      this.CustomerData.connectionType = this.Customer.connectionType;
      this.getCollectionsList();
    }
    
  }

  getCustomerList(){
    this._userService.getCustomersList().subscribe({
      next : (response : any) => {
        console.log("Get Customer List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.customerList = response?.data;
          console.log(this.customerList);
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Customers Not Found');
        }
        else{
          this._messageService.error('Error');
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Customers Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }

  getCollectionsList(){
    this._collectionService.getCollectionsListOfCustomer(this.CustomerData.id,this.pageNo,this.pageSize).subscribe({
      next : (response : any) => {
        console.log("Get Collections List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.collectionList = response?.data?.userCollections;
          this.totalItems = response?.data?.totalRows;
          this.pageNo = response?.data?.pageNo;
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Collections Not Found');
        }
        else{
          this._messageService.error('Error');
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Collections Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }

  onPageChange(page:any){
    this.pageIndex = page;
    this.pageNo = page - 1;
    this.getCollectionsList();
  }

  createAddUserCollectionModal(UserCollectionId:any){
    const modal = this._modal.create({
      nzTitle: UserCollectionId ? 'Edit User Collection' : 'Create User Collection',
      nzContent: CreateUserCollectionsModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : this.CustomerData ,
        title : 'USER COLLECTION',
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getCollectionsList();
    })
  }

}
