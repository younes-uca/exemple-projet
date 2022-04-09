import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategorieProduitVo} from '../model/CategorieProduit.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieProduitService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categorieProduit/';
        })
    }
     private _categorieProduits: Array<CategorieProduitVo> ;
     private _selectedCategorieProduit: CategorieProduitVo;
     private _categorieProduitSelections: Array<CategorieProduitVo>;
     private _createCategorieProduitDialog: boolean;
     private _editCategorieProduitDialog: boolean;
     private _viewCategorieProduitDialog: boolean;
     public editCategorieProduit$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieProduit:CategorieProduitVo ;

    // methods
    public archiver(categorieProduit: CategorieProduitVo): Observable<CategorieProduitVo> {
        return this.http.put<CategorieProduitVo>(this.API + 'archiver/' ,categorieProduit);
    }
    public desarchiver(categorieProduit: CategorieProduitVo): Observable<CategorieProduitVo> {
    return this.http.put<CategorieProduitVo>(this.API + 'desarchiver/' ,categorieProduit);
    }

    public findAll(){
     return this.http.get<Array<CategorieProduitVo>>(this.API);
    }

    public save(): Observable<CategorieProduitVo> {
           return this.http.post<CategorieProduitVo>(this.API, {...this.selectedCategorieProduit,dateArchivage: moment(this.selectedCategorieProduit.dateArchivage).format("YYYY-MM-DD")});
    }

    delete(categorieProduit: CategorieProduitVo) {
         return this.http.delete<number>(this.API + 'id/' + categorieProduit.id);
    }


    public edit(): Observable<CategorieProduitVo> {
        return this.http.put<CategorieProduitVo>(this.API, this.selectedCategorieProduit);
    }


     public findByCriteria(categorieProduit:CategorieProduitVo):Observable<Array<CategorieProduitVo>>{
           return this.http.post<Array<CategorieProduitVo>>(this.API +'search', categorieProduit);
    }

   public findByIdWithAssociatedList(categorieProduit:CategorieProduitVo):Observable<CategorieProduitVo>{
         return this.http.get<CategorieProduitVo>(this.API + 'detail/id/' +categorieProduit.id);
    }

    // getters and setters


    get categorieProduits(): Array<CategorieProduitVo> {
    if(this._categorieProduits==null){
    this._categorieProduits=new Array<CategorieProduitVo>();
    }
return this._categorieProduits;
       }

    set categorieProduits(value: Array<CategorieProduitVo>) {
        this._categorieProduits = value;
       }

    get selectedCategorieProduit(): CategorieProduitVo {
    if(this._selectedCategorieProduit==null){
    this._selectedCategorieProduit=new CategorieProduitVo();
    }
           return this._selectedCategorieProduit;
       }

    set selectedCategorieProduit(value: CategorieProduitVo) {
        this._selectedCategorieProduit = value;
       }

    get categorieProduitSelections(): Array<CategorieProduitVo> {
    if(this._categorieProduitSelections==null){
    this._categorieProduitSelections=new Array<CategorieProduitVo>();
    }
        return this._categorieProduitSelections;
       }


    set categorieProduitSelections(value: Array<CategorieProduitVo>) {
        this._categorieProduitSelections = value;
       }

    get createCategorieProduitDialog(): boolean {
        return this._createCategorieProduitDialog;
       }

    set createCategorieProduitDialog(value: boolean) {
        this._createCategorieProduitDialog = value;
       }

    get editCategorieProduitDialog(): boolean {
        return this._editCategorieProduitDialog;
       }

    set editCategorieProduitDialog(value: boolean) {
        this._editCategorieProduitDialog = value;
       }

    get viewCategorieProduitDialog(): boolean {
        return this._viewCategorieProduitDialog;
       }

    set viewCategorieProduitDialog(value: boolean) {
        this._viewCategorieProduitDialog = value;
       }

     get searchCategorieProduit(): CategorieProduitVo {
     if(this._searchCategorieProduit==null){
    this._searchCategorieProduit=new CategorieProduitVo();
    }
        return this._searchCategorieProduit;
    }

    set searchCategorieProduit(value: CategorieProduitVo) {
        this._searchCategorieProduit = value;
       }

}
