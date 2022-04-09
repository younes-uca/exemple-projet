import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';

import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';

@Component({
  selector: 'app-produit-edit-admin',
  templateUrl: './produit-edit-admin.component.html',
  styleUrls: ['./produit-edit-admin.component.css']
})
export class ProduitEditAdminComponent implements OnInit {


constructor(private produitService: ProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private categorieProduitService: CategorieProduitService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategorieProduit = new CategorieProduitVo();
    this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedProduit.dateArchivage = DateUtils.toDate(this.selectedProduit.dateArchivage);
    this.produitService.edit().subscribe(produit=>{
    const myIndex = this.produits.findIndex(e => e.id === this.selectedProduit.id);
    this.produits[myIndex] = this.selectedProduit;
    this.editProduitDialog = false;
    this.selectedProduit = new ProduitVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecategorieProduit(categorieProduit: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'add');
                       if(isPermistted){
         this.selectedCategorieProduit = new CategorieProduitVo();
        this.createCategorieProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editProduitDialog  = false;
}

// getters and setters

get produits(): Array<ProduitVo> {
    return this.produitService.produits;
       }
set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

 get selectedProduit(): ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }

   get editProduitDialog(): boolean {
           return this.produitService.editProduitDialog;

       }
    set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog = value;
       }

       get selectedCategorieProduit(): CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
      set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
       }
       get categorieProduits(): Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduits;
       }
       set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }
       get createCategorieProduitDialog(): boolean {
           return this.categorieProduitService.createCategorieProduitDialog;
       }
      set createCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.createCategorieProduitDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
