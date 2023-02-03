import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { MessageService } from 'src/app/core/services/message.service';
import { OfficerManagementService } from 'src/app/core/services/officer-managment.service';
import { CreateUpdateOfficerModalComponent } from './create-update-officer-modal/create-update-officer-modal.component';

@Component({
  selector: 'app-officer-details',
  templateUrl: './officer-details.component.html',
  styleUrls: ['./officer-details.component.css']
})
export class OfficerDetailsComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  officerList: Array<any> = [];

  pageNo : number = 0;
  pageSize : number = 6;
  totalItems : number = 0; 
  pageIndex : number = 1;

  requestData = {
    status: null,
    pageNo: 0,
    pageSize: 0
  };

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _officerManagmentService : OfficerManagementService,
    private _messageService : MessageService) { }

  ngOnInit(): void {
    this.getOfficerList();
  }

  getOfficerList() {   
    this.requestData.status = null;
    this.requestData.pageNo = this.pageNo;
    this.requestData.pageSize = this.pageSize;
    this._officerManagmentService.getAllRecoveryOfficerByPagination(this.requestData).subscribe({
      next : (response : any) => {
        console.log("Get Recovery Officer List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.officerList = response?.data?.officers;
          this.totalItems = response?.data?.totalRows;
          this.pageNo = response?.data?.pageNo;
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Recovery Officer(s) Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Recovery Officer(s) Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  } 

  createAddOrUpdateOfficerModal(officerId:any){
    const modal = this._modal.create({
      nzTitle: officerId ? 'Edit Officer' : 'Create Officer',
      nzContent: CreateUpdateOfficerModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : officerId ? officerId : null,
        title : 'OFFICER'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getOfficerList();
    })
  }

  onPageChange(page:any){
    this.pageIndex = page;
    this.pageNo = page - 1;
    this.getOfficerList();
  }
}
