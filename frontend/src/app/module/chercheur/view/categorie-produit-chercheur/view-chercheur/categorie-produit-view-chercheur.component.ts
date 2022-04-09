import {Component, OnInit} from '@angular/core';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categorie-produit-view-chercheur',
  templateUrl: './categorie-produit-view-chercheur.component.html',
  styleUrls: ['./categorie-produit-view-chercheur.component.css']
})
export class CategorieProduitViewChercheurComponent implements OnInit {


constructor(private categorieProduitService: CategorieProduitService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCategorieProduitDialog  = false;
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

   get viewCategorieProduitDialog():boolean {
           return this.categorieProduitService.viewCategorieProduitDialog;

       }
    set viewCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.viewCategorieProduitDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
