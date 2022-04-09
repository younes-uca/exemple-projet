import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';

@Component({
  selector: 'app-produit-view-chercheur',
  templateUrl: './produit-view-chercheur.component.html',
  styleUrls: ['./produit-view-chercheur.component.css']
})
export class ProduitViewChercheurComponent implements OnInit {


constructor(private produitService: ProduitService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private categorieProduitService :CategorieProduitService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategorieProduit = new CategorieProduitVo();
    this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
}

hideViewDialog(){
    this.viewProduitDialog  = false;
}

// getters and setters

get produits(): Array<ProduitVo> {
    return this.produitService.produits;
       }
set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

 get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }

   get viewProduitDialog():boolean {
           return this.produitService.viewProduitDialog;

       }
    set viewProduitDialog(value: boolean) {
        this.produitService.viewProduitDialog= value;
       }

       get selectedCategorieProduit():CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
      set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
       }
       get categorieProduits():Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduits;
       }
       set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }
       get editCategorieProduitDialog():boolean {
           return this.categorieProduitService.editCategorieProduitDialog;
       }
      set editCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.editCategorieProduitDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
