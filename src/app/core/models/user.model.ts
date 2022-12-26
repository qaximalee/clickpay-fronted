export class User{

    id : any = null;
    email : string = '';
    name : string = '';
    password : string = '';
    confirmPassword : string = '';
    city : string = '';
    phoneNumber : string = '';
    employeeId : string = '';
    profileImage : string = '';
    role : string = '';
    plantSaleGroups : Array<any> = [{
        plantId : null,
        salesGroup : [],
        saleGroupIds: []
    }];
    status : boolean = true;
}


