import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../../controller/service/Client.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-client-view-chercheur',
  templateUrl: './client-view-chercheur.component.html',
  styleUrls: ['./client-view-chercheur.component.css']
})
export class ClientViewChercheurComponent implements OnInit {


constructor(private clientService: ClientService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewClientDialog  = false;
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

   get viewClientDialog():boolean {
           return this.clientService.viewClientDialog;

       }
    set viewClientDialog(value: boolean) {
        this.clientService.viewClientDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
