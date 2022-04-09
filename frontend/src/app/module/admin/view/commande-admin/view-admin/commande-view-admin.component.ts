import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';

@Component({
  selector: 'app-commande-view-admin',
  templateUrl: './commande-view-admin.component.html',
  styleUrls: ['./commande-view-admin.component.css']
})
export class CommandeViewAdminComponent implements OnInit {

        selectedPaiements: PaiementVo = new PaiementVo();
        paiementsListe: Array<PaiementVo> = [];


        selectedCommandeItems: CommandeItemVo = new CommandeItemVo();
        commandeItemsListe: Array<CommandeItemVo> = [];

        myProduits: Array<ProduitVo> = [];


constructor(private commandeService: CommandeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paiementService :PaiementService
    ,private produitService :ProduitService
    ,private commandeItemService :CommandeItemService
    ,private clientService :ClientService
) {
}

// methods
ngOnInit(): void {
                this.selectedCommandeItems.produitVo = new ProduitVo();
                this.produitService.findAll().subscribe((data) => this.produits = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
}

hideViewDialog(){
    this.viewCommandeDialog  = false;
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

   get viewCommandeDialog():boolean {
           return this.commandeService.viewCommandeDialog;

       }
    set viewCommandeDialog(value: boolean) {
        this.commandeService.viewCommandeDialog= value;
       }

       get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits():Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }
       get editProduitDialog():boolean {
           return this.produitService.editProduitDialog;
       }
      set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog= value;
       }
       get selectedClient():ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients():Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get editClientDialog():boolean {
           return this.clientService.editClientDialog;
       }
      set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
