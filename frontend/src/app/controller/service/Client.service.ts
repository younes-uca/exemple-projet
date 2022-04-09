import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ClientVo} from '../model/Client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/client/';
        })
    }
     private _clients: Array<ClientVo> ;
     private _selectedClient: ClientVo;
     private _clientSelections: Array<ClientVo>;
     private _createClientDialog: boolean;
     private _editClientDialog: boolean;
     private _viewClientDialog: boolean;
     public editClient$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchClient:ClientVo ;

    // methods
    public archiver(client: ClientVo): Observable<ClientVo> {
        return this.http.put<ClientVo>(this.API + 'archiver/' ,client);
    }
    public desarchiver(client: ClientVo): Observable<ClientVo> {
    return this.http.put<ClientVo>(this.API + 'desarchiver/' ,client);
    }

    public findAll(){
     return this.http.get<Array<ClientVo>>(this.API);
    }

    public save(): Observable<ClientVo> {
           return this.http.post<ClientVo>(this.API, {...this.selectedClient,dateArchivage: moment(this.selectedClient.dateArchivage).format("YYYY-MM-DD")});
    }

    delete(client: ClientVo) {
         return this.http.delete<number>(this.API + 'id/' + client.id);
    }


    public edit(): Observable<ClientVo> {
        return this.http.put<ClientVo>(this.API, this.selectedClient);
    }


     public findByCriteria(client:ClientVo):Observable<Array<ClientVo>>{
           return this.http.post<Array<ClientVo>>(this.API +'search', client);
    }

   public findByIdWithAssociatedList(client:ClientVo):Observable<ClientVo>{
         return this.http.get<ClientVo>(this.API + 'detail/id/' +client.id);
    }

    // getters and setters


    get clients(): Array<ClientVo> {
    if(this._clients==null){
    this._clients=new Array<ClientVo>();
    }
return this._clients;
       }

    set clients(value: Array<ClientVo>) {
        this._clients = value;
       }

    get selectedClient(): ClientVo {
    if(this._selectedClient==null){
    this._selectedClient=new ClientVo();
    }
           return this._selectedClient;
       }

    set selectedClient(value: ClientVo) {
        this._selectedClient = value;
       }

    get clientSelections(): Array<ClientVo> {
    if(this._clientSelections==null){
    this._clientSelections=new Array<ClientVo>();
    }
        return this._clientSelections;
       }


    set clientSelections(value: Array<ClientVo>) {
        this._clientSelections = value;
       }

    get createClientDialog(): boolean {
        return this._createClientDialog;
       }

    set createClientDialog(value: boolean) {
        this._createClientDialog = value;
       }

    get editClientDialog(): boolean {
        return this._editClientDialog;
       }

    set editClientDialog(value: boolean) {
        this._editClientDialog = value;
       }

    get viewClientDialog(): boolean {
        return this._viewClientDialog;
       }

    set viewClientDialog(value: boolean) {
        this._viewClientDialog = value;
       }

     get searchClient(): ClientVo {
     if(this._searchClient==null){
    this._searchClient=new ClientVo();
    }
        return this._searchClient;
    }

    set searchClient(value: ClientVo) {
        this._searchClient = value;
       }

}
