import {Component, OnInit} from '@angular/core';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';


@Component({
  selector: 'app-categorie-produit-edit-chercheur',
  templateUrl: './categorie-produit-edit-chercheur.component.html',
  styleUrls: ['./categorie-produit-edit-chercheur.component.css']
})
export class CategorieProduitEditChercheurComponent implements OnInit {


constructor(private categorieProduitService: CategorieProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCategorieProduit.dateArchivage = DateUtils.toDate(this.selectedCategorieProduit.dateArchivage);
    this.categorieProduitService.edit().subscribe(categorieProduit=>{
    const myIndex = this.categorieProduits.findIndex(e => e.id === this.selectedCategorieProduit.id);
    this.categorieProduits[myIndex] = this.selectedCategorieProduit;
    this.editCategorieProduitDialog = false;
    this.selectedCategorieProduit = new CategorieProduitVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCategorieProduitDialog  = false;
}

// getters and setters

get categorieProduits(): Array<CategorieProduitVo> {
    return this.categorieProduitService.categorieProduits;
       }
set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }

 get selectedCategorieProduit(): CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
    set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
       }

   get editCategorieProduitDialog(): boolean {
           return this.categorieProduitService.editCategorieProduitDialog;

       }
    set editCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.editCategorieProduitDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
