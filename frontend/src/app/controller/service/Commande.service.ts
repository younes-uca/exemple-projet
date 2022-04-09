import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommandeVo} from '../model/Commande.model';
import {PaiementVo} from '../model/Paiement.model';
import {CommandeItemVo} from '../model/CommandeItem.model';
import {ClientVo} from '../model/Client.model';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/commande/';
        })
    }
     private _commandes: Array<CommandeVo> ;
     private _selectedCommande: CommandeVo;
     private _commandeSelections: Array<CommandeVo>;
     private _createCommandeDialog: boolean;
     private _editCommandeDialog: boolean;
     private _viewCommandeDialog: boolean;
     public editCommande$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommande:CommandeVo ;

    // methods
    public archiver(commande: CommandeVo): Observable<CommandeVo> {
        return this.http.put<CommandeVo>(this.API + 'archiver/' ,commande);
    }
    public desarchiver(commande: CommandeVo): Observable<CommandeVo> {
    return this.http.put<CommandeVo>(this.API + 'desarchiver/' ,commande);
    }

    public findAll(){
     return this.http.get<Array<CommandeVo>>(this.API);
    }

    public save(): Observable<CommandeVo> {
           return this.http.post<CommandeVo>(this.API, {...this.selectedCommande,dateArchivage: moment(this.selectedCommande.dateArchivage).format("YYYY-MM-DD")});
    }

    delete(commande: CommandeVo) {
         return this.http.delete<number>(this.API + 'id/' + commande.id);
    }


    public edit(): Observable<CommandeVo> {
        return this.http.put<CommandeVo>(this.API, this.selectedCommande);
    }


     public findByCriteria(commande:CommandeVo):Observable<Array<CommandeVo>>{
           return this.http.post<Array<CommandeVo>>(this.API +'search', commande);
    }

   public findByIdWithAssociatedList(commande:CommandeVo):Observable<CommandeVo>{
         return this.http.get<CommandeVo>(this.API + 'detail/id/' +commande.id);
    }

    // getters and setters


    get commandes(): Array<CommandeVo> {
    if(this._commandes==null){
    this._commandes=new Array<CommandeVo>();
    }
return this._commandes;
       }

    set commandes(value: Array<CommandeVo>) {
        this._commandes = value;
       }

    get selectedCommande(): CommandeVo {
    if(this._selectedCommande==null){
    this._selectedCommande=new CommandeVo();
    }
           return this._selectedCommande;
       }

    set selectedCommande(value: CommandeVo) {
        this._selectedCommande = value;
       }

    get commandeSelections(): Array<CommandeVo> {
    if(this._commandeSelections==null){
    this._commandeSelections=new Array<CommandeVo>();
    }
        return this._commandeSelections;
       }


    set commandeSelections(value: Array<CommandeVo>) {
        this._commandeSelections = value;
       }

    get createCommandeDialog(): boolean {
        return this._createCommandeDialog;
       }

    set createCommandeDialog(value: boolean) {
        this._createCommandeDialog = value;
       }

    get editCommandeDialog(): boolean {
        return this._editCommandeDialog;
       }

    set editCommandeDialog(value: boolean) {
        this._editCommandeDialog = value;
       }

    get viewCommandeDialog(): boolean {
        return this._viewCommandeDialog;
       }

    set viewCommandeDialog(value: boolean) {
        this._viewCommandeDialog = value;
       }

     get searchCommande(): CommandeVo {
     if(this._searchCommande==null){
    this._searchCommande=new CommandeVo();
    }
        return this._searchCommande;
    }

    set searchCommande(value: CommandeVo) {
        this._searchCommande = value;
       }

}
