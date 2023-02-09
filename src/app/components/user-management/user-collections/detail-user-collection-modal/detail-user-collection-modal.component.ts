import { Component, Input, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-detail-user-collection-modal',
  templateUrl: './detail-user-collection-modal.component.html',
  styleUrls: ['./detail-user-collection-modal.component.css']
})
export class DetailUserCollectionModalComponent implements OnInit {

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() data?: any;
  
  httpConstants : HttpConstants = new HttpConstants();
  userCollection : User | undefined;

  constructor(
    private _messageService : MessageService,
  ) { }

  ngOnInit(): void {
  }

  getUserDetails(userId:any){
    this._userService.getUserDetails(userId).subscribe({
      next: (response : any) => {
        console.log(response);
        if(response?.status == this.httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.user = response?.data;
          console.log(this.user);
          if(this.user?.plantSaleGroups != null){
            this.mapPlantAndItsSalesGroup(this.user?.plantSaleGroups)
          }
          this._messageService.success('Success');
        }
        else if(response?.status == this.httpConstants.REQUEST_STATUS.REQUEST_NOT_FOUND_404.CODE){
          this._messageService.info('Data Not Found');
        }
        else{
          this._messageService.error('Error');
        }
      },
      error: (error : any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      }
    })
  }

}
