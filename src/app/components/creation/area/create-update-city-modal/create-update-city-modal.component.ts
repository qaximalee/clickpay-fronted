import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  @ViewChild('cityForm') cityForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  cityName: string = '';
  buttonName: string = "Create";
  
  constructor(
    private _creationService: CreationService,
    private _messageService: MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
  }

  createOrUpdateCity(){
    console.log(this.cityName);
    this._creationService.createCity(this.cityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.data
            ? this._messageService.success('City Updated Successfully')
            : this._messageService.success('City Created Successfully')
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
