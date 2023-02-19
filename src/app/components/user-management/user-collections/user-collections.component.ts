import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CollectionService } from 'src/app/core/services/collection.service';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { CreateUserCollectionsModalComponent } from './create-user-collections-modal/create-user-collections-modal.component';
import { DetailUserCollectionModalComponent } from './detail-user-collection-modal/detail-user-collection-modal.component';
import { ReceiveUserCollectionModalComponent } from './receive-user-collection-modal/receive-user-collection-modal.component';
import { SearchCustomerModalComponent } from './search-customer-modal/search-customer-modal.component';

@Component({
  selector: 'app-user-collections',
  templateUrl: './user-collections.component.html',
  styleUrls: ['./user-collections.component.css']
})
export class UserCollectionsComponent implements OnInit {

  selectedCustomer = null;
  confirmModal?:NzModalRef
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

  ReceiveCollections={
    collections: [Array],
    customer: null, 
  }

  DetailUserCollectionRequest = {
    collectionId: 0,
    customerId: null, 
  }

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _userService : UserManagementService,
    private _collectionService : CollectionService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
    this._userService.$customer.subscribe((res:any)=> {
      console.log(res);
      this.CustomerData.id = res?.id;
      this.CustomerData.name = res?.name;
      this.CustomerData.amount = res?.amount;
      this.CustomerData.internetId = res?.internetId;
      this.CustomerData.connectionType = res?.connectionType;
    })
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

  showConfirmationPopupOnDelete(collectionId:any) : void{
    this.confirmModal = this._modal.confirm({
      nzTitle: 'Are you sure you want to delete collection?',
      nzContent: '',
      nzCentered: true,
      nzOnOk: () => this.deleteUserCollection(collectionId,this.Customer.id)
    })
  }

  deleteUserCollection(collectionId:number,customerId:number){
    console.log(collectionId+"  "+customerId);
    
      this._collectionService.deleteUserCollection(collectionId,customerId).subscribe({
        next : (response : any) => {
          console.log("Delete User Collection Response",response);
          if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
            this._messageService.success('User Collection Deleted Successfully');
            this._modal.closeAll();
            this.getCollectionsList();
          } 
          else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
              this._messageService.info('User Collection Not Found')
          }
          else{
            this._messageService.error('Error')
          }
        },
        error : (error : any) => {
          console.log(error);  
          if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('User Collection Not Found');
          }
        },
        complete : () => {
          console.log('Complete');
        }
      })

  }


  receiveUserCollectionModal(collection:any){
    if(collection!=null){
      this.ReceiveCollections.collections[0] = collection;
    }else{
      console.log(this.collectionList)
      this.ReceiveCollections.collections = this.collectionList.filter(collection => collection.collectionStatus == 'UNPAID');
    }
    this.ReceiveCollections.customer = this.Customer;
    
    const modal = this._modal.create({
      nzTitle: 'Receive User Collection',
      nzContent: ReceiveUserCollectionModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : this.ReceiveCollections,
        title : 'RECEIVE USER COLLECTION',
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.ReceiveCollections.collections=[];
      this.ReceiveCollections.customer=null;
      this.getCollectionsList();
    })
  }

  showConfirmationPopupOnUnpaid(billNumber:number) : void{
    this.confirmModal = this._modal.confirm({
      nzTitle: 'Are you sure you want to UnPaid collection?',
      nzContent: '',
      nzCentered: true,
      nzOnOk: () => this.userCollectionUnPaid(billNumber)
    })
  }

  userCollectionUnPaid(billNumber:number){
    console.log(billNumber)
    this._collectionService.unPaidUserCollection(billNumber).subscribe({
      next : (response : any) => {
        console.log("UnPaid User Collection Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this._messageService.success('User Collection UnPaid Successfully');
          this._modal.closeAll();
          this.getCollectionsList();
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('User Collection UnPaid Failed')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('User Collection UnPaid Failed');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })

  }

  detailUserCollectionModal(collectionId:number){
    
    this.DetailUserCollectionRequest.collectionId = collectionId;
    this.DetailUserCollectionRequest.customerId = this.Customer.id;
    
    const modal = this._modal.create({
      nzTitle: 'User Collection Details',
      nzContent: DetailUserCollectionModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : this.DetailUserCollectionRequest,
        title : 'USER COLLECTION DETAILS'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "50%",
    })
  }

  createSearchCustomerModal(){
    const modal = this._modal.create({
      nzTitle: 'Search Customer',
      nzContent: SearchCustomerModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : null ,
        title : 'SEARCH CUSTOMER',
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
