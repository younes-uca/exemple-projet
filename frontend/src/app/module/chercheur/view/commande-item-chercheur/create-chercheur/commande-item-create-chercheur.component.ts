import {Component, OnInit, Input} from '@angular/core';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../controller/service/Produit.service';
@Component({
  selector: 'app-commande-item-create-chercheur',
  templateUrl: './commande-item-create-chercheur.component.html',
  styleUrls: ['./commande-item-create-chercheur.component.css']
})
export class CommandeItemCreateChercheurComponent implements OnInit {

    _submitted = false;

constructor(private commandeItemService: CommandeItemService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private commandeService :CommandeService
,       private produitService :ProduitService
) {

}


// methods
ngOnInit(): void {

    this.selectedProduit = new ProduitVo();
    this.produitService.findAll().subscribe((data) => this.produits = data);
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
     this.commandeItemService.save().subscribe(commandeItem=>{
       this.commandeItems.push({...commandeItem});
       this.createCommandeItemDialog = false;
       this.submitted = false;
       this.selectedCommandeItem = new CommandeItemVo();


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
    this.createCommandeItemDialog  = false;
}

// getters and setters

get commandeItems(): Array<CommandeItemVo> {
    return this.commandeItemService.commandeItems;
       }
set commandeItems(value: Array<CommandeItemVo>) {
        this.commandeItemService.commandeItems = value;
       }

 get selectedCommandeItem():CommandeItemVo {
           return this.commandeItemService.selectedCommandeItem;
       }
    set selectedCommandeItem(value: CommandeItemVo) {
        this.commandeItemService.selectedCommandeItem = value;
       }

   get createCommandeItemDialog(): boolean {
           return this.commandeItemService.createCommandeItemDialog;

       }
    set createCommandeItemDialog(value: boolean) {
        this.commandeItemService.createCommandeItemDialog= value;
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
