import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { BillCreator } from 'src/app/core/models/bill-creator.model';
import { Months } from 'src/app/core/models/months';
import { Years } from 'src/app/core/models/years';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-bill-creator-modal',
  templateUrl: './create-bill-creator-modal.component.html',
  styleUrls: ['./create-bill-creator-modal.component.css']
})
export class CreateBillCreatorModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  billForm: BillCreator = new BillCreator(); 
  confirmModal?: NzModalRef;
  @ViewChild('billForm') billCreatorForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();
  
  selectedConnectionType = null;
  selectedSubLocality = null;
  buttonName: string = 'Create';
  companyList: Array<any> = [];
  connectionTypeList: Array<any> = [];
  subLocalitiesList: Array<any> = [];
  
  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  monthList = Object.values(Months);

  yearList = Object.values(Years).filter(value => typeof value === 'number').sort();

  ngOnInit(): void {
    console.log(this.yearList)
    this.getConnectionTypeList();
    this.getSubLocalityList();
  }


  createBillCreator() {
    console.log(this.billForm);
    this._creationService.createBillsCreator(this.billForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this._messageService.success('Bills Created Successfully');
          this._modal.closeAll();
        }
        if (response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE) {
          this._messageService.error('Bills Already Created');
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

  getSubLocalityList() {    
    this._creationService.getSubLocalityList().subscribe({
      next : (response : any) => {
        console.log("Get Sub-Locality List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.subLocalitiesList = response?.data
          this.subLocalitiesList.push({
            id: null,
            subLocalityName : 'All',

          })
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


  onChangeOfConnectionType(event: any) {
    event != null ? this.selectedConnectionType = event : this.selectedConnectionType = null;
  }

  onChangeOfSubLocality(event: any) {
    event != null ? this.selectedSubLocality = event : this.selectedSubLocality = null;
  }

}
