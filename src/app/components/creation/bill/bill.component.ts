import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();

  billCreatorList: Array<any> = [];
  
  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getBillsCreatorList();
  }

  getBillsCreatorList() {    
    this._creationService.getBillCreatorList().subscribe({
      next : (response : any) => {
        console.log("Get Bills Creator List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.billCreatorList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Bills Creator Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Bills Creator Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  } 

}
