import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { AreaService } from 'src/app/core/services/area.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.css']
})
export class LocalityComponent implements OnInit {

  private _httpConstants: HttpConstants = new HttpConstants();
  localitiesList : Array<any> = [];

  constructor(
    private _areaService : AreaService,
    private _messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getLocalityList();
  }

  getLocalityList() {    
    this._areaService.getLocalityList().subscribe({
      next : (response : any) => {
        console.log("Get Locality List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.localitiesList = response?.data
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

}
