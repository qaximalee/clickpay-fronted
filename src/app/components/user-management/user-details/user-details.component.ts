import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { CreateUpdateUserModalComponent } from './create-update-user-modal/create-update-user-modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  userList: Array<any> = [];

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _userManagmentService : UserManagementService,
    private _messageService : MessageService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {    
    this._userManagmentService.getAllUserByPagination().subscribe({
      next : (response : any) => {
        console.log("Get City List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.userList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Users Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Users Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  } 

  createAddOrUpdateUserModal(userId:any){
    const modal = this._modal.create({
      nzTitle: userId ? 'Edit Package' : 'Create Package',
      nzContent: CreateUpdateUserModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : userId ? userId : null,
        title : 'USER'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "50%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getUserList();
    })
  }

}
