import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateUpdatePackageModalComponent } from './create-update-package-modal/create-update-package-modal.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  packageList : Array<any> = [];

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _creationService : CreationService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getPackageList();
  }

  getPackageList() {    
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

  createAddOrUpdatePackageModal(packageId:any){
    const modal = this._modal.create({
      nzTitle: packageId ? 'Edit Package' : 'Create Package',
      nzContent: CreateUpdatePackageModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : packageId ? packageId : null,
        title : 'PACKAGE'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getPackageList();
    })
  }

}
