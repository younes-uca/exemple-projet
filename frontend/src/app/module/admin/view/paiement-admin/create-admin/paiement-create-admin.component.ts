import {Component, OnInit, Input} from '@angular/core';
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
  selector: 'app-paiement-create-admin',
  templateUrl: './paiement-create-admin.component.html',
  styleUrls: ['./paiement-create-admin.component.css']
})
export class PaiementCreateAdminComponent implements OnInit {

    _submitted = false;

constructor(private paiementService: PaiementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private commandeService :CommandeService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
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
     this.paiementService.save().subscribe(paiement=>{
       this.paiements.push({...paiement});
       this.createPaiementDialog = false;
       this.submitted = false;
       this.selectedPaiement = new PaiementVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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

hideCreateDialog(){
    this.createPaiementDialog  = false;
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

   get createPaiementDialog(): boolean {
           return this.paiementService.createPaiementDialog;

       }
    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog= value;
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
