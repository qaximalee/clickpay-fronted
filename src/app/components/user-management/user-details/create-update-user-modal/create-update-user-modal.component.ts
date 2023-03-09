import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { Discount } from 'src/app/core/models/discount';
import { User } from 'src/app/core/models/user.model';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { DomSanitizer } from '@angular/platform-browser';

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
  
  discountList: Array<string> = Object.values(Discount);
  
  private _httpConstants: HttpConstants = new HttpConstants();

  buttonName: string = 'Create';

  companyList: Array<any> = [];
  packageList: Array<any> = [];
  boxMediaList: Array<any> = [];
  connectionTypeList: Array<any> = [];
  subLocalitiesList: Array<any> = [];

  fileList : NzUploadFile[] = [];

  amount: any;
  isDisabled: boolean = true;

  constructor(
    private _creationService : CreationService,
    private _userManagementService : UserManagementService,
    private _messageService : MessageService,
    private _modal : NzModalService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
        this.getUserById(this.data);
    }
    // if(this.userDetailForm.companyId != null){
    //   this.getPackageList();
    // }
    
    this.getBoxMediaList();
    this.getCompanyList();
    this.getSubLocalityList();
    this.getConnectionTypeList();
  }

  getPackageList(){
    this._creationService.getPackageListByCompany(this.userDetailForm.companyId).subscribe({
      next : (response : any) => {
        console.log("Get Package List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.packageList = response?.data;    
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
        this.userDetailForm.packagesId = null;
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
    event != null ? this.userDetailForm.packagesId = event.id : this.userDetailForm.packagesId = null;
    this.amount = event.salePrice;
    this.userDetailForm.amount = event.salePrice;
  }

  onChangeOfBoxMedia(event: any){
    event != null ? this.userDetailForm.boxMediaId = event : this.userDetailForm.boxMediaId = null;
  }

  onChangeOfConnectionType(event: any){
    event != null ? this.userDetailForm.connectionTypeId = event : this.userDetailForm.connectionTypeId = null;
  }

  onChangeOfCompany(event: any){
    if(event != null){
      this.userDetailForm.companyId = event;
      this.userDetailForm.amount = null;
      this.getPackageList();
    }else{
      this.userDetailForm.companyId = null;
      this.userDetailForm.packagesId = null;
      this.userDetailForm.amount = null;
      this.packageList = [];
    }
  }

  onChangeOfDiscount(event: any) {
    if(event!=null){
      this.userDetailForm.discount = event;
      if(event=='HALF'){
        this.userDetailForm.amount = this.amount/2;
      }
      else if(event=='FULL'){
        this.userDetailForm.amount = 0;
      }
      else if(event=='QUARTER'){
        this.userDetailForm.amount = this.amount/4;
      }else{
        this.userDetailForm.amount = this.amount
      }
    }
    else{
      this.userDetailForm.discount = '';
    }
    this.userDetailForm.discount != null && this.userDetailForm.discount === 'CUSTOM' ? this.isDisabled = false : this.isDisabled = true;
  }

  onChangeOfSubLocality(event: any){
    event != null ? this.userDetailForm.subLocalityId = event : this.userDetailForm.subLocalityId = null;
  }

  createUser(){
    console.log(this.userDetailForm);
    this._userManagementService.createUser(this.userDetailForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this._messageService.success('User Created Successfully')
          this._modal.closeAll();
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

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false; 
  };

  uploadCustomerCNICAndCreateOrUpdateCustomer(){
    const formData = new FormData();
    
    if(this.fileList.length != 2){
      this._messageService.info("CNIC 1 Front And 1 Back Image Upload.");
    }

    this.fileList.forEach((file: any) => {
      if (file) {
        formData.append('files', file);
      }
    });
    
    this._userManagementService.uploadCustomerCNIC(formData).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.userDetailForm.cnicImageFront = response[0];
          this.userDetailForm.cnicImageBack = response[1];

          let fileName = this.userDetailForm.cnicImageFront.split('?')[1].split('&')[0].split('=')[1];
          this.getCNICImages(fileName);

          if(this.data != null){
            this.updateUser();
          }else{
            this.createUser();
          }
        }else{
          console.log('Error');
          this._messageService.info("Error");
        }
      }
    })
  }

  getCNICImages(filename: any) {
    this._userManagementService.getCNICImage(filename).subscribe({
        next: (response: any) => {
          console.log(response);
          let objectURL = URL.createObjectURL(response);
          let img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (error: any) => {
          console.log(error);
          this._messageService.error('Error');
        },
      });
  }

  getUserById(userId:any){
    this._userManagementService.getCustomerById(userId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this.userDetailForm = response?.data;
        }
        else {
          console.log('Error');
          this._messageService.info('Error');
        }
      },
      error: (error: any) => {
        console.log(error);
        if (error?.status == this._httpConstants.REQUEST_STATUS.BAD_REQUEST_400.CODE) {
          this._messageService.info(error?.error?.msg);
        }
      }
    })

  }

  updateUser() {
    console.log("update calling :"+this.userDetailForm.customerId);
    // this._creationService.updatePackage(this.userDetailForm).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
    //       this._messageService.success('User Updated Successfully');
    //       this._modal.closeAll();
    //     }else if(response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
    //       this._messageService.error('User Already Exists');
    //     }
    //     else {
    //       console.log('Error');
    //       this._messageService.info('Error');
    //     }
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //     if (error?.status == this._httpConstants.REQUEST_STATUS.BAD_REQUEST_400.CODE) {
    //       this._messageService.info(error?.error?.msg);
    //     }
    //   },
    //   complete: () => { }
    // })
  }

}
