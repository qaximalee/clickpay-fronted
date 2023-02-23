import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-update-locality-modal',
  templateUrl: './create-update-locality-modal.component.html',
  styleUrls: ['./create-update-locality-modal.component.css']
})
export class CreateUpdateLocalityModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  confirmModal?: NzModalRef;
  @ViewChild('localityForm') localityForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  localityId: number = 0;
  localityName: string = '';
  cityId: any;
  buttonName: string = "Create";
  selectedCity: any;
  cityList: Array<any> = [];

  constructor(
    private _creationService: CreationService,
    private _messageService: MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
      this.getLocalityById(this.data);
    }
    this.getCityList();
  }

  createLocality(){
    console.log(this.localityName);
    this._creationService.createLocality(this.cityId, this.localityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this._messageService.success('Locality Created Successfully')
          this._modal.closeAll();
        }else if(response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
          this._messageService.error('Locality Already Created');
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

  updateLocality(){
    console.log(this.localityId,this.cityId,this.localityName);
    this._creationService.updateLocality(this.cityId,this.localityId,this.localityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this._messageService.success('Locality Updated Successfully');
          this._modal.closeAll();
        }else if(response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
          this._messageService.error('Locality Already Exists');
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
      nzOnOk: () => this.updateLocality()
    });
  }

  getLocalityById(localityId: any) {
    this._creationService.getLocalityDetails(localityId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this.localityId = response?.data?.id;  
          this.localityName = response?.data?.name;
          this.cityId = response?.data?.city?.id;
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

  getCityList() {    
    this._creationService.getCityList().subscribe({
      next : (response : any) => {
        console.log("Get City List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.cityList = response?.data
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

  onChangeOfCity(event: any) {
    event != null ? this.selectedCity = event : this.selectedCity = null;
  }

}
