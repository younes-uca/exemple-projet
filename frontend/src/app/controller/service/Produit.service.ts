import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProduitVo} from '../model/Produit.model';
import {CategorieProduitVo} from '../model/CategorieProduit.model';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/produit/';
        })
    }
     private _produits: Array<ProduitVo> ;
     private _selectedProduit: ProduitVo;
     private _produitSelections: Array<ProduitVo>;
     private _createProduitDialog: boolean;
     private _editProduitDialog: boolean;
     private _viewProduitDialog: boolean;
     public editProduit$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProduit:ProduitVo ;

    // methods
    public archiver(produit: ProduitVo): Observable<ProduitVo> {
        return this.http.put<ProduitVo>(this.API + 'archiver/' ,produit);
    }
    public desarchiver(produit: ProduitVo): Observable<ProduitVo> {
    return this.http.put<ProduitVo>(this.API + 'desarchiver/' ,produit);
    }

    public findAll(){
     return this.http.get<Array<ProduitVo>>(this.API);
    }

    public save(): Observable<ProduitVo> {
           return this.http.post<ProduitVo>(this.API, {...this.selectedProduit,dateArchivage: moment(this.selectedProduit.dateArchivage).format("YYYY-MM-DD")});
    }

    delete(produit: ProduitVo) {
         return this.http.delete<number>(this.API + 'id/' + produit.id);
    }


    public edit(): Observable<ProduitVo> {
        return this.http.put<ProduitVo>(this.API, this.selectedProduit);
    }


     public findByCriteria(produit:ProduitVo):Observable<Array<ProduitVo>>{
           return this.http.post<Array<ProduitVo>>(this.API +'search', produit);
    }

   public findByIdWithAssociatedList(produit:ProduitVo):Observable<ProduitVo>{
         return this.http.get<ProduitVo>(this.API + 'detail/id/' +produit.id);
    }

    // getters and setters


    get produits(): Array<ProduitVo> {
    if(this._produits==null){
    this._produits=new Array<ProduitVo>();
    }
return this._produits;
       }

    set produits(value: Array<ProduitVo>) {
        this._produits = value;
       }

    get selectedProduit(): ProduitVo {
    if(this._selectedProduit==null){
    this._selectedProduit=new ProduitVo();
    }
           return this._selectedProduit;
       }

    set selectedProduit(value: ProduitVo) {
        this._selectedProduit = value;
       }

    get produitSelections(): Array<ProduitVo> {
    if(this._produitSelections==null){
    this._produitSelections=new Array<ProduitVo>();
    }
        return this._produitSelections;
       }


    set produitSelections(value: Array<ProduitVo>) {
        this._produitSelections = value;
       }

    get createProduitDialog(): boolean {
        return this._createProduitDialog;
       }

    set createProduitDialog(value: boolean) {
        this._createProduitDialog = value;
       }

    get editProduitDialog(): boolean {
        return this._editProduitDialog;
       }

    set editProduitDialog(value: boolean) {
        this._editProduitDialog = value;
       }

    get viewProduitDialog(): boolean {
        return this._viewProduitDialog;
       }

    set viewProduitDialog(value: boolean) {
        this._viewProduitDialog = value;
       }

     get searchProduit(): ProduitVo {
     if(this._searchProduit==null){
    this._searchProduit=new ProduitVo();
    }
        return this._searchProduit;
    }

    set searchProduit(value: ProduitVo) {
        this._searchProduit = value;
       }

}
