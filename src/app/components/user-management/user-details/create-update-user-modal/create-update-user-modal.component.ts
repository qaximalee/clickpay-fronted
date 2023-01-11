import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { User } from 'src/app/core/models/user.model';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';

@Component({
  selector: 'app-create-update-user-modal',
  templateUrl: './create-update-user-modal.component.html',
  styleUrls: ['./create-update-user-modal.component.css']
})
export class CreateUpdateUserModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  userDetailForm: User = new User(); 
  @ViewChild('userDetailFormView') userDetailFormView!: NgForm;
  
  discountList: Array<string> = ['HALF', 'FULL', 'QUARTER', 'SEMI', 'CUSTOM'];
  
  private _httpConstants: HttpConstants = new HttpConstants();

  buttonName: string = 'Create';

  companyList: Array<any> = [];
  packageList: Array<any> = [];
  boxMediaList: Array<any> = [];
  connectionTypeList: Array<any> = [];
  subLocalitiesList: Array<any> = [];

  isDisabled: boolean = true;

  constructor(
    private _creationService : CreationService,
    private _userManagementService : UserManagementService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
    }
    this.getPackageList();
    this.getBoxMediaList();
    this.getCompanyList();
    this.getSubLocalityList();
    this.getConnectionTypeList();
  }

  getPackageList(){
    this._creationService.getPackageList().subscribe({
      next : (response : any) => {
        console.log("Get Package List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.packageList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Packages Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Packages Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }

  getCompanyList(){
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

  getBoxMediaList(){
    this._creationService.getBoxMediaList().subscribe({
      next : (response : any) => {
        console.log("Get Box Media List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.boxMediaList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Box/Media Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Box/Media Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
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

  onChangeOfPackage(event: any){
    event != null ? this.userDetailForm.packagesId = event : this.userDetailForm.packagesId = null;
  }

  onChangeOfBoxMedia(event: any){
    event != null ? this.userDetailForm.boxMediaId = event : this.userDetailForm.boxMediaId = null;
  }

  onChangeOfConnectionType(event: any){
    event != null ? this.userDetailForm.connectionTypeId = event : this.userDetailForm.connectionTypeId = null;
  }

  onChangeOfCompany(event: any){
    event != null ? this.userDetailForm.companyId = event : this.userDetailForm.companyId = null;
  }

  onChangeOfDiscount(event: any) {
    event != null ? this.userDetailForm.discount = event : this.userDetailForm.discount = '';
    this.userDetailForm.discount != null && this.userDetailForm.discount === 'CUSTOM' ? this.isDisabled = false : this.isDisabled = true;
  }

  onChangeOfSubLocality(event: any){
    event != null ? this.userDetailForm.subLocalityId = event : this.userDetailForm.subLocalityId = null;
  }

  createOrUpdateUser(){
    console.log(this.userDetailForm);
    this._userManagementService.createUser(this.userDetailForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.data
            ? this._messageService.success('User Updated Successfully')
            : this._messageService.success('User Created Successfully')
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


}
