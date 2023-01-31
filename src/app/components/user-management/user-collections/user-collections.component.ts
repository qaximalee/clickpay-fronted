import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CollectionService } from 'src/app/core/services/collection.service';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';

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
  customerId : number = 0;
  pageNo : number = 0;
  pageSize : number = 6;
  totalItems : number = 0; 
  pageIndex : number = 1;

  constructor(
    private _userService : UserManagementService,
    private _collectionService : CollectionService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  onChangeOfCustomer(event: any) {
    event != null ? this.selectedCustomer = event : this.selectedCustomer = null;
    if(this.customerId!=null){
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
    this._collectionService.getCollectionsListOfCustomer(this.customerId,this.pageNo,this.pageSize).subscribe({
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

}
