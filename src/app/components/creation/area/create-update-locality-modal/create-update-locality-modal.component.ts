import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  @ViewChild('localityForm') localityForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  localityName: string = '';
  cityId: number = 1;
  buttonName: string = "Create";
  
  constructor(
    private _creationService: CreationService,
    private _messageService: MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
  }

  createOrUpdateLocality(){
    console.log(this.localityName);
    this._creationService.createLocality(this.cityId, this.localityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.data
            ? this._messageService.success('Locality Updated Successfully')
            : this._messageService.success('Locality Created Successfully')
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
