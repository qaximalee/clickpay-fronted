import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateBillCreatorModalComponent } from './create-bill-creator-modal/create-bill-creator-modal.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  confirmModal?:NzModalRef
  billCreatorList: Array<any> = [];
  pageNo : number = 0;
  pageSize : number = 6;
  totalItems : number = 0; 
  pageIndex : number = 1;

  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService,
    private _viewContainerRef: ViewContainerRef,
    private _modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getBillsCreatorList();
  }
  
  onPageChange(page:any){
  this.pageIndex = page;
  this.pageNo = page - 1;
  this.getBillsCreatorList();
}

  getBillsCreatorList() {    
    this._creationService.getBillCreatorList(this.pageNo,this.pageSize).subscribe({
      next : (response : any) => {
        console.log("Get Bills Creator List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.billCreatorList = response?.data?.billsCreators;
          this.totalItems = response?.data?.totalRows;
          this.pageNo = response?.data?.pageNo;
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Bills Creator Not Found');
        }
        else{
          this._messageService.error('Error');
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Bills Creator Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  } 


  createAddBillsCreatorModal(packageId:any){
    const modal = this._modal.create({
      nzTitle: packageId ? 'Edit Bills' : 'Create Bills',
      nzContent: CreateBillCreatorModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : packageId ? packageId : null,
        title : 'BILLS'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getBillsCreatorList();
    })
  }

  showConfirmationPopupOnDelete(billCreatorId:any) : void{
    this.confirmModal = this._modal.confirm({
      nzTitle: 'Are you sure you want to delete bills?',
      nzContent: '',
      nzCentered: true,
      nzOnOk: () => this.deleteBillsCreator(billCreatorId)
    })  
  }

  deleteBillsCreator(billCreatorId:any){
    console.log(billCreatorId);
    this._creationService.deleteBillsCreator(billCreatorId).subscribe({
      next : (response : any) => {
        console.log("Delete Bill Creator Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this._messageService.success('Bills Deleted Successfully');
          this._modal.closeAll();
          this.getBillsCreatorList();
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Bill Creator Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Bill Creator Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
}



}
