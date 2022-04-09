import {Component, OnInit, Input} from '@angular/core';
import {ClientService} from '../../../../../controller/service/Client.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-client-create-chercheur',
  templateUrl: './client-create-chercheur.component.html',
  styleUrls: ['./client-create-chercheur.component.css']
})
export class ClientCreateChercheurComponent implements OnInit {

    _submitted = false;

constructor(private clientService: ClientService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}


public save(){
  this.submitted = true;
        if (this.validateForm()) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
}
private validateForm(): boolean{
    return true;
}
public saveWithShowOption(showList: boolean){
     this.clientService.save().subscribe(client=>{
       this.clients.push({...client});
       this.createClientDialog = false;
       this.submitted = false;
       this.selectedClient = new ClientVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createClientDialog  = false;
}

// getters and setters

get clients(): Array<ClientVo> {
    return this.clientService.clients;
       }
set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

 get selectedClient():ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }

   get createClientDialog(): boolean {
           return this.clientService.createClientDialog;

       }
    set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

}
