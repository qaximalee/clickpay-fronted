import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { Package } from 'src/app/core/models/package.model';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-update-package-modal',
  templateUrl: './create-update-package-modal.component.html',
  styleUrls: ['./create-update-package-modal.component.css']
})
export class CreateUpdatePackageModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  packageForm: Package = new Package(); 
  confirmModal?: NzModalRef;
  @ViewChild('pForm') pForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  selectedCompany = null;
  selectedConnectionType = null;
  buttonName: string = 'Create';
  companyList: Array<any> = [];
  connectionTypeList: Array<any> = [];

  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
        this.getPackageById(this.data);
    }
    this.getCompanyList();
    this.getConnectionTypeList();
  }

  createPackage() {
    console.log(this.packageForm);
    this._creationService.createPackage(this.packageForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this._messageService.success('Package Created Successfully');
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

  updatePackage() {
    console.log(this.packageForm);
    this._creationService.updatePackage(this.packageForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this._messageService.success('Package Updated Successfully');
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

  showConfirmationPopup(): void {
    this.confirmModal = this._modal.confirm({
      nzTitle: 'Are you sure you want to save changes?',
      nzContent: '',
      nzCentered: true,
      nzOnOk: () => this.updatePackage()
    });
  }

  getPackageById(packageId: any) {
    this._creationService.getPackageDetails(packageId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this.packageForm = response?.data;
          this.packageForm.connectionTypeId = response?.connectionType?.type;
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

  getCompanyList() {    
    this._creationService.getCompanyList().subscribe({
      next : (response : any) => {
        console.log("Get City List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.companyList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Companies Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Companies Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }  

  onChangeOfCompany(event: any) {
    event != null ? this.selectedCompany = event : this.selectedCompany = null;
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

  onChangeOfConnectionType(event: any) {
    event != null ? this.selectedConnectionType = event : this.selectedConnectionType = null;
  }

}
