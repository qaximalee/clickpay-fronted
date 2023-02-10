import { Component, Input, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { UserCollection } from 'src/app/core/models/user-collection.model';
import { CollectionService } from 'src/app/core/services/collection.service';
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
  userCollection : UserCollection | any;

  constructor(
    private _userCollection : CollectionService,
    private _messageService : MessageService,
  ) { }

  ngOnInit(): void {
    this.getUserCollectionDetails(this.data.collectionId,this.data.customerId);
  }

  getUserCollectionDetails(userCollectionId:number,customerId:number){
    console.log(userCollectionId);
    console.log(customerId);
    this._userCollection.getUserCollectionById(userCollectionId,customerId).subscribe({
      next: (response : any) => {
        console.log(response);
        if(response?.status == this.httpConstants.REQUEST_STATUS.SUCCESS_200.CODE){
          this.userCollection = response?.data;
          this.userCollection.connectionType = response?.data?.customer?.connectionType?.type;
          console.log("collection response in details : ");
          console.log(this.userCollection);
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
