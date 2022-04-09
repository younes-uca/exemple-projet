import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../../controller/service/Client.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';


@Component({
  selector: 'app-client-edit-chercheur',
  templateUrl: './client-edit-chercheur.component.html',
  styleUrls: ['./client-edit-chercheur.component.css']
})
export class ClientEditChercheurComponent implements OnInit {


constructor(private clientService: ClientService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedClient.dateArchivage = DateUtils.toDate(this.selectedClient.dateArchivage);
    this.clientService.edit().subscribe(client=>{
    const myIndex = this.clients.findIndex(e => e.id === this.selectedClient.id);
    this.clients[myIndex] = this.selectedClient;
    this.editClientDialog = false;
    this.selectedClient = new ClientVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editClientDialog  = false;
}

// getters and setters

get clients(): Array<ClientVo> {
    return this.clientService.clients;
       }
set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }

 get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }

   get editClientDialog(): boolean {
           return this.clientService.editClientDialog;

       }
    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
