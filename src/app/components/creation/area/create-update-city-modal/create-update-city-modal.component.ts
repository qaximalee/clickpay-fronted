import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { Package } from 'src/app/core/models/package.model';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-update-city-modal',
  templateUrl: './create-update-city-modal.component.html',
  styleUrls: ['./create-update-city-modal.component.css']
})
export class CreateUpdateCityModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  confirmModal?: NzModalRef;
  @ViewChild('cityForm') cityForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  cityId: number = 0;
  cityName: string = '';
  buttonName: string = "Create";
  
  constructor(
    private _creationService: CreationService,
    private _messageService: MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if(this.data != null){
      this.buttonName = 'Update';
      this.getCityById(this.data);
    }
  }

  createCity(){
    console.log(this.cityName);
    this._creationService.createCity(this.cityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this._messageService.success('City Created Successfully')
          this._modal.closeAll();
        }else if(response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
          this._messageService.error('City Already Created');
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

  updateCity(){
    console.log(this.cityId,this.cityName);
    this._creationService.updateCity(this.cityId,this.cityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this._messageService.success('City Updated Successfully');
          this._modal.closeAll();
        }else if(response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
          this._messageService.error('City Already Exists');
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
      nzOnOk: () => this.updateCity()
    });
  }

  getCityById(cityId: any) {
    this._creationService.getCityDetails(cityId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this.cityId = response?.data?.id;
          this.cityName = response?.data?.name;
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


}
