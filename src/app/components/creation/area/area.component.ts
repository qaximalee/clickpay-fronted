import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { CreateUpdateCityModalComponent } from './create-update-city-modal/create-update-city-modal.component';
import { CreateUpdateLocalityModalComponent } from './create-update-locality-modal/create-update-locality-modal.component';
import { CreateUpdateSubLocalityModalComponent } from './create-update-sub-locality-modal/create-update-sub-locality-modal.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  citiesList : Array<any> = [];
  localitiesList : Array<any> = [];
  subLocalitiesList : Array<any> = [];
  
  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _creationService : CreationService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getCityList();
    this.getLocalityList();
    this.getSubLocalityList();
  }

  /**
   * MODAL WORKS
   */
  createAndUpdateCityModal(cityId: any){
    const modal = this._modal.create({
      nzTitle: cityId ? 'Edit City' : 'Create City',
      nzContent: CreateUpdateCityModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : cityId ? cityId : null,
        title : 'CITY'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getCityList();
    })
  }

  createAndUpdateLocalityModal(localityId: any){
    const modal = this._modal.create({
      nzTitle: localityId ? 'Edit Locality' : 'Create Locality',
      nzContent: CreateUpdateLocalityModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : localityId ? localityId : null,
        title : 'LOCALITY'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getLocalityList();
    })
  }

  createAndUpdateSubLocalityModal(subLocalityId: any){
    const modal = this._modal.create({
      nzTitle: subLocalityId ? 'Edit Sub Locality' : 'Create Sub Locality',
      nzContent: CreateUpdateSubLocalityModalComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzComponentParams: {
        data : subLocalityId ? subLocalityId : null,
        title : 'SUB LOCALITY'
      },
      nzFooter: null,
      nzKeyboard : true,
      nzWidth : "60%",
      nzCentered : true,
      nzMaskClosable : false,
    })
    modal.afterClose.subscribe(()=> {
      this.getSubLocalityList();
    })
  }

  getCityList() {    
    this._creationService.getCityList().subscribe({
      next : (response : any) => {
        console.log("Get City List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.citiesList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Cities Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Cities Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }  

  getLocalityList() {    
    this._creationService.getLocalityList().subscribe({
      next : (response : any) => {
        console.log("Get Locality List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.localitiesList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Localities Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Localities Not Found');
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

}
