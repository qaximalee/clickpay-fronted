import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-area-allocation',
  templateUrl: './area-allocation.component.html',
  styleUrls: ['./area-allocation.component.css']
})
export class AreaAllocationComponent implements OnInit {

  subLocalitiesList : Array<any> = [];
  private _httpConstants: HttpConstants = new HttpConstants();

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _creationService : CreationService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getSubLocalityList();
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

}
