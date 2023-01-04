import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateUpdateBoxMediaModalComponent } from './create-update-box-media-modal/create-update-box-media-modal.component';

@Component({
  selector: 'app-box-media',
  templateUrl: './box-media.component.html',
  styleUrls: ['./box-media.component.css']
})
export class BoxMediaComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();

  boxMediaList : Array<any> = [];

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _creationService : CreationService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getBoxMediaList();
  }

  getBoxMediaList() {    
    this._creationService.getBoxMediaList().subscribe({
      next : (response : any) => {
        console.log("Get Box-Media List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.boxMediaList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Box-Media Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Box-Media Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }


  createAddOrUpdateBoxMediaModal(boxMediaId:any){
    const modal = this._modal.create({
      nzTitle: boxMediaId ? 'Edit Box/Media' : 'Create Box/Media',
      nzContent: CreateUpdateBoxMediaModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : boxMediaId ? boxMediaId : null,
        title : 'BOX/MEDIA'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getBoxMediaList();
    })
  }

}
