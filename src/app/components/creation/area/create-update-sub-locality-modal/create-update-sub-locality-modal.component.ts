import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-create-update-sub-locality-modal',
  templateUrl: './create-update-sub-locality-modal.component.html',
  styleUrls: ['./create-update-sub-locality-modal.component.css']
})
export class CreateUpdateSubLocalityModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  @ViewChild('subLocalityForm') subLocalityForm!: NgForm;
  
  private _httpConstants: HttpConstants = new HttpConstants();

  selectedLocality : any;
  subLocalityName: string = '';
  localityId: any;
  buttonName: string = "Create";
  localityList: Array<any> = [];
  
  constructor(
    private _creationService: CreationService,
    private _messageService: MessageService,
    private _modal : NzModalService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
    }
    this.getLocalityList();
  }

  createOrUpdateSubLocality(){
    console.log(this.subLocalityName);
    this._creationService.createSubLocality(this.localityId, this.subLocalityName).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this.data
            ? this._messageService.success('Sub Locality Updated Successfully')
            : this._messageService.success('Sub Locality Created Successfully')
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

  getLocalityList() {    
    this._creationService.getLocalityList().subscribe({
      next : (response : any) => {
        console.log("Get Locality List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.localityList = response?.data
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

  onChangeOfLocality(event: any) {
    event != null ? this.selectedLocality = event : this.selectedLocality = null;
  }

}
