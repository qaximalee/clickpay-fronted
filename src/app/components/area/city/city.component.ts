import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { AreaService } from 'src/app/core/services/area.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  
  private _httpConstants: HttpConstants = new HttpConstants();
  citiesList : Array<any> = [];

  constructor(
    private _areaService : AreaService,
    private _messageService : MessageService
    ) { }

  ngOnInit(): void {
    this.getCityList();
  }

  getCityList() {    
    this._areaService.getCityList().subscribe({
      next : (response : any) => {
        console.log("Get City List Response",response);
        if(response?.status == this._httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.citiesList = response?.data
        } 
        else if(response?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
            this._messageService.info('Cities Not Found')
        }
        else{
          this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        console.log(error);  
        if(error?.status == this._httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Cities Not Found');
        }
      },
      complete : () => {
        console.log('Complete');
      }
    })
  }  

}
