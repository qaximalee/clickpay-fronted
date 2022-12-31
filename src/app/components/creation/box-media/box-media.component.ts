import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { CreationService } from 'src/app/core/services/creation.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-box-media',
  templateUrl: './box-media.component.html',
  styleUrls: ['./box-media.component.css']
})
export class BoxMediaComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  boxMediaList : Array<any> = [];

  constructor(
    private _creationService : CreationService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getBoxMediaList();
  }

  getBoxMediaList() {    
    this._creationService.getBoxMediaList().subscribe({
      next : (response : any) => {
        console.log("Get Box-Media List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.boxMediaList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Box-Media Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Box-Media Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }

}
