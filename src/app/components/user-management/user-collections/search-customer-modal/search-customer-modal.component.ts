import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';

@Component({
  selector: 'app-search-customer-modal',
  templateUrl: './search-customer-modal.component.html',
  styleUrls: ['./search-customer-modal.component.css']
})
export class SearchCustomerModalComponent implements OnInit {

  @Input() data?: any;
  @Input() title?: string;
  confirmModal?: NzModalRef;
  private _httpConstants: HttpConstants = new HttpConstants();
  
  userFilterRequest = {
    connectionTypeId : null,
    customerStatus: null,
    searchInput : null,
    subLocalityId : null,
    userCollectionStatus : null,
  }

  subLocalitiesList : Array<any> = [];
  connectionTypeList: Array<any> = [];
  customerList: Array<any> = [];

  constructor(
    private _creationService : CreationService,
    private _userService : UserManagementService,
    private _messageService : MessageService,
    private _modal: NzModalService,

  ) { }

  ngOnInit(): void {
    this.getCustomersByFilter();
    this.getSubLocalityList();
    this.getConnectionTypeList();
  }

  onCustomerSelect(customer:any){
    this._userService.passFilteredCustomer(customer);
    this._modal.closeAll();
  }

  onInputChange(value: any){
    console.log(value);
    this.getCustomersByFilter();
  }

  onChangeOfCollectionStatus(event: any) {
    console.log(event);
    event != null ? this.userFilterRequest.userCollectionStatus = event : this.userFilterRequest.userCollectionStatus = null;
    this.getCustomersByFilter();
  }

  onChangeOfCustomerStatus(event: any) {
    console.log(event);
    event != null ? this.userFilterRequest.customerStatus = event : this.userFilterRequest.customerStatus = null;
    this.getCustomersByFilter();
  }

  onChangeOfSubLocality(event: any) {
    console.log(event);
    event != null ? this.userFilterRequest.subLocalityId = event : this.userFilterRequest.subLocalityId = null;
    this.getCustomersByFilter();
  }

  getSubLocalityList() {    
    this._creationService.getSubLocalityList().subscribe({
      next : (response : any) => {
        console.log("Get Sub-Locality List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.subLocalitiesList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Sub-Localities Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Sub-Localities Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }

  onChangeOfConnectionType(event: any) {
    console.log(event);
    event != null ? this.userFilterRequest.connectionTypeId = event : this.userFilterRequest.connectionTypeId = null;
    this.getCustomersByFilter();
  }

  getConnectionTypeList() {    
    this._creationService.getConnectionTypeList().subscribe({
      next : (response : any) => {
        console.log("Get Connection Type List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.connectionTypeList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Connection Types Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Connection Types Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  } 
  
  getCustomersByFilter(){
    console.log(this.userFilterRequest);
    this._userService.getCustomerByFilter(this.userFilterRequest).subscribe({
      next : (response : any) => {
        this.customerList = response?.data;
        console.log(response);
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



}
