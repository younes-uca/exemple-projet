import {Component, OnInit} from '@angular/core';
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
  selector: 'app-commande-item-view-chercheur',
  templateUrl: './commande-item-view-chercheur.component.html',
  styleUrls: ['./commande-item-view-chercheur.component.css']
})
export class CommandeItemViewChercheurComponent implements OnInit {


constructor(private commandeItemService: CommandeItemService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private commandeService :CommandeService
    ,private produitService :ProduitService
) {
}

// methods
ngOnInit(): void {
    this.selectedProduit = new ProduitVo();
    this.produitService.findAll().subscribe((data) => this.produits = data);
    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
}

hideViewDialog(){
    this.viewCommandeItemDialog  = false;
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

   get viewCommandeItemDialog():boolean {
           return this.commandeItemService.viewCommandeItemDialog;

       }
    set viewCommandeItemDialog(value: boolean) {
        this.commandeItemService.viewCommandeItemDialog= value;
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
