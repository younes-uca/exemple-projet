import {Component, OnInit, Input} from '@angular/core';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categorie-produit-create-chercheur',
  templateUrl: './categorie-produit-create-chercheur.component.html',
  styleUrls: ['./categorie-produit-create-chercheur.component.css']
})
export class CategorieProduitCreateChercheurComponent implements OnInit {

    _submitted = false;

constructor(private categorieProduitService: CategorieProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

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
     this.categorieProduitService.save().subscribe(categorieProduit=>{
       this.categorieProduits.push({...categorieProduit});
       this.createCategorieProduitDialog = false;
       this.submitted = false;
       this.selectedCategorieProduit = new CategorieProduitVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
// methods

hideCreateDialog(){
    this.createCategorieProduitDialog  = false;
}

// getters and setters

get categorieProduits(): Array<CategorieProduitVo> {
    return this.categorieProduitService.categorieProduits;
       }
set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }

 get selectedCategorieProduit():CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
    set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
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
