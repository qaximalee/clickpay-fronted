import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { Officer } from 'src/app/core/models/officer.model';
import { User } from 'src/app/core/models/user.model';
import { MessageService } from 'src/app/core/services/message.service';
import { OfficerManagementService } from 'src/app/core/services/officer-managment.service';

@Component({
  selector: 'app-create-update-officer-modal',
  templateUrl: './create-update-officer-modal.component.html',
  styleUrls: ['./create-update-officer-modal.component.css']
})
export class CreateUpdateOfficerModalComponent implements OnInit {

  @Input() data?: Array<any>;
  @Input() title?: string;
  officerDetailForm: Officer = new Officer(); 
  @ViewChild('officerFormView') officerFormView!: NgForm;

  private _httpConstants: HttpConstants = new HttpConstants();

  buttonName: string = 'Create';
  eyeType1 = "eye-invisible";
  eyeType2 = "eye-invisible";
  fieldTextType1: boolean = false;
  fieldTextType2: boolean = false;


  constructor(
    private _officerService : OfficerManagementService,
    private _messageService : MessageService,
    private _modal : NzModalService) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.buttonName = 'Update';
        this.getRecoveryOfficerById(this.data);
    }
  }

  togglePassword() {
    if (this.fieldTextType1 == true) {
      this.fieldTextType1 = false;
      this.eyeType1 = 'eye-invisible';
    }
    else {
      this.fieldTextType1 = true;
      this.eyeType1 = 'eye';
    }
  }

  toggleConfirmPassword() {
    if (this.fieldTextType2 == true) {
      this.fieldTextType2 = false;
      this.eyeType2 = 'eye-invisible';
    }
    else {
      this.fieldTextType2 = true;
      this.eyeType2 = 'eye';
    }
  }

  createRecoveryOfficer(){
    console.log(this.officerDetailForm);
    this._officerService.createRecoveryOfficer(this.officerDetailForm).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.CREATED_201.CODE) {
          this._messageService.success('Recovery Officer Created Successfully');
          this._modal.closeAll();
        }else if (response?.status == this._httpConstants.REQUEST_STATUS.ALREADY_EXIST_302.CODE){
          this._messageService.info('Recovery Officer Already Exist');
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

  getRecoveryOfficerById(officerId:any){
    this._officerService.getRecoveryOfficerById(officerId).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE) {
          this.officerDetailForm = response?.data;
          this.officerDetailForm.confirmPassword = response?.data?.password;
        }
        else {
          console.log('Error');
          this._messageService.info('Error');
        }
      },
      error: (error: any) => {
        console.log(error);
        if (error?.status == this._httpConstants.REQUEST_STATUS.BAD_REQUEST_400.CODE) {
          this._messageService.info(error?.error?.msg);
        }
      }
    })

  }

  showConfirmationPopup(){
    
  }

}
