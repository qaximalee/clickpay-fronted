import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-update-modal',
  templateUrl: './create-update-modal.component.html',
  styleUrls: ['./create-update-modal.component.css']
})
export class CreateUpdateModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  confirmModal?: NzModalRef;
  @ViewChild('cForm') cForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  companyId: number = 0;
  companyName: string ='';
  buttonName: string = 'Create';

  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
      this.getCompanyById(this.data);
    }
  }

  createOrUpdateCompany() {
    console.log(this.companyName);
    this._creationService.createCompany(this.companyName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this._messageService.success('Company Created Successfully');
          this._modal.closeAll();
        }else if(response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
          this._messageService.error('Compnay Already Created');
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

  showConfirmationPopup(): void {
    this.confirmModal = this._modal.confirm({
      nzTitle: 'Are you sure you want to save changes?',
      nzContent: '',
      nzCentered: true,
      nzOnOk: () => this.updateCompany()
    });
  }

  updateCompany() {
    console.log(this.companyName);
    this._creationService.updateCompany(this.companyId,this.companyName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this._messageService.success('Company Updated Successfully');
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

  getCompanyById(companyId: any) {
    this._creationService.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this.companyId = response?.data?.id;
          this.companyName = response?.data?.name;
        }
        else {
          console.log('Error');
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => { }
    })
  }

}
