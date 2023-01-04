import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-update-box-media-modal',
  templateUrl: './create-update-box-media-modal.component.html',
  styleUrls: ['./create-update-box-media-modal.component.css']
})
export class CreateUpdateBoxMediaModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  @ViewChild('bmForm') bmForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  boxMediaNumber: string ='';
  nearByLocation: string ='';
  buttonName: string = 'Create';

  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
  }

  createOrUpdateBoxMedia() {
    console.log(this.boxMediaNumber,this.nearByLocation);
    this._creationService.createBoxMedia(this.boxMediaNumber,this.nearByLocation).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.data
            ? this._messageService.success('Box/Media Updated Successfully')
            : this._messageService.success('Box/Media Created Successfully')
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
