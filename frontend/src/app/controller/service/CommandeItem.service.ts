import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommandeItemVo} from '../model/CommandeItem.model';
import {CommandeVo} from '../model/Commande.model';
import {ProduitVo} from '../model/Produit.model';


@Injectable({
  providedIn: 'root'
})
export class CommandeItemService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/commandeItem/';
        })
    }
     private _commandeItems: Array<CommandeItemVo> ;
     private _selectedCommandeItem: CommandeItemVo;
     private _commandeItemSelections: Array<CommandeItemVo>;
     private _createCommandeItemDialog: boolean;
     private _editCommandeItemDialog: boolean;
     private _viewCommandeItemDialog: boolean;
     public editCommandeItem$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommandeItem:CommandeItemVo ;

    // methods
    public archiver(commandeItem: CommandeItemVo): Observable<CommandeItemVo> {
        return this.http.put<CommandeItemVo>(this.API + 'archiver/' ,commandeItem);
    }
    public desarchiver(commandeItem: CommandeItemVo): Observable<CommandeItemVo> {
    return this.http.put<CommandeItemVo>(this.API + 'desarchiver/' ,commandeItem);
    }

    public findAll(){
     return this.http.get<Array<CommandeItemVo>>(this.API);
    }

    public save(): Observable<CommandeItemVo> {
           return this.http.post<CommandeItemVo>(this.API, {...this.selectedCommandeItem,dateArchivage: moment(this.selectedCommandeItem.dateArchivage).format("YYYY-MM-DD")});
    }

    delete(commandeItem: CommandeItemVo) {
         return this.http.delete<number>(this.API + 'id/' + commandeItem.id);
    }


    public edit(): Observable<CommandeItemVo> {
        return this.http.put<CommandeItemVo>(this.API, this.selectedCommandeItem);
    }


     public findByCriteria(commandeItem:CommandeItemVo):Observable<Array<CommandeItemVo>>{
           return this.http.post<Array<CommandeItemVo>>(this.API +'search', commandeItem);
    }

   public findByIdWithAssociatedList(commandeItem:CommandeItemVo):Observable<CommandeItemVo>{
         return this.http.get<CommandeItemVo>(this.API + 'detail/id/' +commandeItem.id);
    }

    // getters and setters


    get commandeItems(): Array<CommandeItemVo> {
    if(this._commandeItems==null){
    this._commandeItems=new Array<CommandeItemVo>();
    }
return this._commandeItems;
       }

    set commandeItems(value: Array<CommandeItemVo>) {
        this._commandeItems = value;
       }

    get selectedCommandeItem(): CommandeItemVo {
    if(this._selectedCommandeItem==null){
    this._selectedCommandeItem=new CommandeItemVo();
    }
           return this._selectedCommandeItem;
       }

    set selectedCommandeItem(value: CommandeItemVo) {
        this._selectedCommandeItem = value;
       }

    get commandeItemSelections(): Array<CommandeItemVo> {
    if(this._commandeItemSelections==null){
    this._commandeItemSelections=new Array<CommandeItemVo>();
    }
        return this._commandeItemSelections;
       }


    set commandeItemSelections(value: Array<CommandeItemVo>) {
        this._commandeItemSelections = value;
       }

    get createCommandeItemDialog(): boolean {
        return this._createCommandeItemDialog;
       }

    set createCommandeItemDialog(value: boolean) {
        this._createCommandeItemDialog = value;
       }

    get editCommandeItemDialog(): boolean {
        return this._editCommandeItemDialog;
       }

    set editCommandeItemDialog(value: boolean) {
        this._editCommandeItemDialog = value;
       }

    get viewCommandeItemDialog(): boolean {
        return this._viewCommandeItemDialog;
       }

    set viewCommandeItemDialog(value: boolean) {
        this._viewCommandeItemDialog = value;
       }

     get searchCommandeItem(): CommandeItemVo {
     if(this._searchCommandeItem==null){
    this._searchCommandeItem=new CommandeItemVo();
    }
        return this._searchCommandeItem;
    }

    set searchCommandeItem(value: CommandeItemVo) {
        this._searchCommandeItem = value;
       }

}
