import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  config: any = {
    nzDuration : 3000,
    nzAnimate : true,
  }

  constructor(private _message: NzMessageService) { }

  success(message : string){
    this._message.success(message,this.config);
  }

  error(message : string){
    this._message.error(message,this.config);
  }

  warning(message : string){
    this._message.warning(message,this.config);
  }

  info(message : string){
    this._message.info(message,this.config);
  }
}
