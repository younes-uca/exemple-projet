import {Component, OnInit, Input} from '@angular/core';
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
  selector: 'app-produit-create-admin',
  templateUrl: './produit-create-admin.component.html',
  styleUrls: ['./produit-create-admin.component.css']
})
export class ProduitCreateAdminComponent implements OnInit {

    _submitted = false;

constructor(private produitService: ProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private categorieProduitService :CategorieProduitService
) {

}


// methods
ngOnInit(): void {

    this.selectedCategorieProduit = new CategorieProduitVo();
    this.categorieProduitService.findAll().subscribe((data) => this.categorieProduits = data);
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
     this.produitService.save().subscribe(produit=>{
       this.produits.push({...produit});
       this.createProduitDialog = false;
       this.submitted = false;
       this.selectedProduit = new ProduitVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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

hideCreateDialog(){
    this.createProduitDialog  = false;
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

   get createProduitDialog(): boolean {
           return this.produitService.createProduitDialog;

       }
    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
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
