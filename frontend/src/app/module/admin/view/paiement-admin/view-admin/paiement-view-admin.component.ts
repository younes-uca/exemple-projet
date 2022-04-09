import {Component, OnInit} from '@angular/core';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';

@Component({
  selector: 'app-paiement-view-admin',
  templateUrl: './paiement-view-admin.component.html',
  styleUrls: ['./paiement-view-admin.component.css']
})
export class PaiementViewAdminComponent implements OnInit {


constructor(private paiementService: PaiementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private commandeService :CommandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
}

hideViewDialog(){
    this.viewPaiementDialog  = false;
}

// getters and setters

get paiements(): Array<PaiementVo> {
    return this.paiementService.paiements;
       }
set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

 get selectedPaiement():PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }

   get viewPaiementDialog():boolean {
           return this.paiementService.viewPaiementDialog;

       }
    set viewPaiementDialog(value: boolean) {
        this.paiementService.viewPaiementDialog= value;
       }

       get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
      set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
       get commandes():Array<CommandeVo> {
           return this.commandeService.commandes;
       }
       set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }
       get editCommandeDialog():boolean {
           return this.commandeService.editCommandeDialog;
       }
      set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
