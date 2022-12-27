import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/core/constants/app.constants';
import { DataHolderConstants } from 'src/app/core/constants/dataHolder.constants';
import { HttpConstants } from 'src/app/core/constants/http.constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { CacheService } from 'src/app/core/services/cache.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService : AuthService,
    private _cacheService : CacheService,
    private _messageService : MessageService
  ) { }

  loginForm!: FormGroup;
  private _appConstants: AppConstants = new AppConstants();
  private _cacheKeysConstants : DataHolderConstants = new DataHolderConstants();
  private _httpConstants : HttpConstants = new HttpConstants();

  eyeType = "eye-invisible";
  fieldTextType : boolean = false;

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {    
    const body = {
      'grant_type' : 'password',
      'username' : form.value.email,
      'password' : form.value.password
    }
    this._authService.login(body).subscribe({
      next : (response : any) => {
        console.log("Login Response",response);
        if(response){
          this._cacheService.clearCache();
          this._cacheService.saveInCache(this._cacheKeysConstants.CACHE_KEYS.TOKEN,response?.access_token);
          this._cacheService.saveInCache(this._cacheKeysConstants.CACHE_KEYS.EXPIRY_TIME,response?.expires_in);
          this._cacheService.saveInCache(this._cacheKeysConstants.CACHE_KEYS.REFRESH_TOKEN,response?.refresh_token);
          this._cacheService.saveInCache(this._cacheKeysConstants.CACHE_KEYS.TOKEN_TYPE,response?.token_type);
          this._cacheService.saveInCache(this._cacheKeysConstants.CACHE_KEYS.IS_LOGGEDIN,'true');
          this._router.navigate(['click-pay']);
          this._messageService.success('Successfully Login');
        }
        else{
          // this._messageService.error('Error')
        }
      },
      error : (error : any) => {
        if(error?.status == this._httpConstants.REQUEST_STATUS.BAD_REQUEST_400.CODE){
          // this._messageService.error('Email or Password is Incorrect');  
        }
        else if(error?.status == this._httpConstants.REQUEST_STATUS.UNAUTHORIZED_401.CODE){
          // this._messageService.error('User inactive or unauthorized');
        }
      },
      complete : () => {}
    })
  }  

  toggle() {
    if (this.fieldTextType == true) {
      this.fieldTextType = false;
      this.eyeType = 'eye-invisible';
    } 
    else {
      this.fieldTextType = true;
      this.eyeType = 'eye';
    }
  }

}
