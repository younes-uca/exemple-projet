import {Component, OnInit, Input} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
@Component({
  selector: 'app-commande-create-chercheur',
  templateUrl: './commande-create-chercheur.component.html',
  styleUrls: ['./commande-create-chercheur.component.css']
})
export class CommandeCreateChercheurComponent implements OnInit {

        selectedPaiements: PaiementVo = new PaiementVo();
        paiementsListe: Array<PaiementVo> = [];


        selectedCommandeItems: CommandeItemVo = new CommandeItemVo();
        commandeItemsListe: Array<CommandeItemVo> = [];

        myProduits: Array<ProduitVo> = [];

    _submitted = false;

constructor(private commandeService: CommandeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private clientService :ClientService
,       private commandeItemService :CommandeItemService
,       private produitService :ProduitService
,       private paiementService :PaiementService
) {

}


// methods
ngOnInit(): void {

                this.selectedCommandeItems.produitVo = new ProduitVo();
                this.produitService.findAll().subscribe((data) => this.produits = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
}

        addPaiements() {
        if( this.selectedCommande.paiementsVo == null ){
            this.selectedCommande.paiementsVo = new Array<PaiementVo>();
        }
        this.selectedCommande.paiementsVo.push(this.selectedPaiements);
        this.selectedPaiements = new PaiementVo();
        }

        deletePaiements(p: PaiementVo) {
        this.paiementsListe.forEach((element, index) => {
            if (element === p) { this.paiementsListe.splice(index, 1); }
        });
    }
        addCommandeItems() {
        if( this.selectedCommande.commandeItemsVo == null ){
            this.selectedCommande.commandeItemsVo = new Array<CommandeItemVo>();
        }
        this.selectedCommande.commandeItemsVo.push(this.selectedCommandeItems);
        this.selectedCommandeItems = new CommandeItemVo();
        }

        deleteCommandeItems(p: CommandeItemVo) {
        this.commandeItemsListe.forEach((element, index) => {
            if (element === p) { this.commandeItemsListe.splice(index, 1); }
        });
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
     this.commandeService.save().subscribe(commande=>{
       this.commandes.push({...commande});
       this.createCommandeDialog = false;
       this.submitted = false;
       this.selectedCommande = new CommandeVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
              public async openCreateproduit(produit: string) {
                      const isPermistted = await this.roleService.isPermitted('Produit', 'add');
                       if(isPermistted){
         this.selectedProduit = new ProduitVo();
        this.createProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCommandeDialog  = false;
}

// getters and setters

get commandes(): Array<CommandeVo> {
    return this.commandeService.commandes;
       }
set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }

 get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }

   get createCommandeDialog(): boolean {
           return this.commandeService.createCommandeDialog;

       }
    set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
       }

       get selectedProduit(): ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits(): Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }
       get createProduitDialog(): boolean {
           return this.produitService.createProduitDialog;
       }
      set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
       }
       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
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
