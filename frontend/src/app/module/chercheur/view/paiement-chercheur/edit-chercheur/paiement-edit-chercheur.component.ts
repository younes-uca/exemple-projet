import {Component, OnInit} from '@angular/core';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';

import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';

@Component({
  selector: 'app-paiement-edit-chercheur',
  templateUrl: './paiement-edit-chercheur.component.html',
  styleUrls: ['./paiement-edit-chercheur.component.css']
})
export class PaiementEditChercheurComponent implements OnInit {


constructor(private paiementService: PaiementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private commandeService: CommandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPaiement.datePaiement = DateUtils.toDate(this.selectedPaiement.datePaiement);
            this.selectedPaiement.dateArchivage = DateUtils.toDate(this.selectedPaiement.dateArchivage);
    this.paiementService.edit().subscribe(paiement=>{
    const myIndex = this.paiements.findIndex(e => e.id === this.selectedPaiement.id);
    this.paiements[myIndex] = this.selectedPaiement;
    this.editPaiementDialog = false;
    this.selectedPaiement = new PaiementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecommande(commande: string) {
                      const isPermistted = await this.roleService.isPermitted('Commande', 'add');
                       if(isPermistted){
         this.selectedCommande = new CommandeVo();
        this.createCommandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaiementDialog  = false;
}

// getters and setters

get paiements(): Array<PaiementVo> {
    return this.paiementService.paiements;
       }
set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

 get selectedPaiement(): PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }

   get editPaiementDialog(): boolean {
           return this.paiementService.editPaiementDialog;

       }
    set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog = value;
       }

       get selectedCommande(): CommandeVo {
           return this.commandeService.selectedCommande;
       }
      set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
       get commandes(): Array<CommandeVo> {
           return this.commandeService.commandes;
       }
       set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }
       get createCommandeDialog(): boolean {
           return this.commandeService.createCommandeDialog;
       }
      set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
