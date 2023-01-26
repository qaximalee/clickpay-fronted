import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
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
  customerId : number = 0;

  constructor(
    private _userService : UserManagementService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  onChangeOfCustomer(event: any) {
    event != null ? this.selectedCustomer = event : this.selectedCustomer = null;
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



}
