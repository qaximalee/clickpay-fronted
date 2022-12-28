import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { AreaService } from 'src/app/core/services/area.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-sub-locality',
  templateUrl: './sub-locality.component.html',
  styleUrls: ['./sub-locality.component.css']
})
export class SubLocalityComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  subLocalitiesList : Array<any> = [];

  constructor(
    private _areaService : AreaService,
    private _messageService : MessageService,

  ) { }

  ngOnInit(): void {
    this.getSubLocalityList();
  }

  getSubLocalityList() {    
    this._areaService.getSubLocalityList().subscribe({
      next : (response : any) => {
        console.log("Get Sub-Locality List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.subLocalitiesList = response?.data
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

}
