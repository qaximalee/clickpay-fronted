import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  @ViewChild('pForm') pForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  selectedCompany = null;
  buttonName: string = 'Create';
  companyList: Array<any> = [];

  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
    }
    this.getCompanyList();
  }

  createOrUpdatePackage() {
    console.log(this.packageForm);
    this._creationService.createPackage(this.packageForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.data
            ? this._messageService.success('Package Updated Successfully')
            : this._messageService.success('Package Created Successfully')
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

}
