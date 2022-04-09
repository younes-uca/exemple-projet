import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';

import { ClientService } from '../../../../../controller/service/Client.service';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {ClientVo} from '../../../../../controller/model/Client.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
@Component({
  selector: 'app-commande-list-admin',
  templateUrl: './commande-list-admin.component.html',
  styleUrls: ['./commande-list-admin.component.css']
})
export class CommandeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Commande';
    yesno :any[] =[];
    clients :Array<ClientVo>;


    constructor(private commandeService: CommandeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
        , private clientService: ClientService
) { }

    ngOnInit(): void {
      this.loadCommandes();
      this.initExport();
      this.initCol();
      this.loadClient();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadCommandes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Commande', 'list');
        isPermistted ? this.commandeService.findAll().subscribe(commandes => this.commandes = commandes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commandeService.findByCriteria(this.searchCommande).subscribe(commandes=>{
            
            this.commandes = commandes;
           // this.searchCommande = new CommandeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'dateCommande', header: 'Date commande'},
                            {field: 'total', header: 'Total'},
                            {field: 'totalPaye', header: 'Total paye'},
                        {field: 'client?.cin', header: 'Client'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }
    
    public async editCommande(commande:CommandeVo){
        const isPermistted = await this.roleService.isPermitted('Commande', 'edit');
         if(isPermistted){
          this.commandeService.findByIdWithAssociatedList(commande).subscribe(res => {
           this.selectedCommande = res;
            this.selectedCommande.dateCommande = new Date(commande.dateCommande);
            this.selectedCommande.dateArchivage = new Date(commande.dateArchivage);
            this.editCommandeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommande(commande:CommandeVo){
        const isPermistted = await this.roleService.isPermitted('Commande', 'view');
        if(isPermistted){
           this.commandeService.findByIdWithAssociatedList(commande).subscribe(res => {
           this.selectedCommande = res;
            this.selectedCommande.dateCommande = new Date(commande.dateCommande);
            this.selectedCommande.dateArchivage = new Date(commande.dateArchivage);
            this.viewCommandeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommande(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommande = new CommandeVo();
            this.createCommandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCommande(commande:CommandeVo){
const isPermistted = await this.roleService.isPermitted('Commande', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Commande) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commandeService.archiver(commande).subscribe(status=>{
const myIndex = this.commandes.indexOf(commande);
this.commandes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commande archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverCommande(commande:CommandeVo){
const isPermistted = await this.roleService.isPermitted('Commande', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Commande) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commandeService.desarchiver(commande).subscribe(status=>{
const myIndex = this.commandes.indexOf(commande);
this.commandes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commande désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteCommande(commande:CommandeVo){
       const isPermistted = await this.roleService.isPermitted('Commande', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commande) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commandeService.delete(commande).subscribe(status=>{
                          if(status > 0){
                          const position = this.commandes.indexOf(commande);
                          position > -1 ? this.commandes.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commande Supprimé',
                        life: 3000
                    });
                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadClient(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Commande', 'list');
    isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommande(commande: CommandeVo) {

     this.commandeService.findByIdWithAssociatedList(commande).subscribe(
	 res => {
	       this.initDuplicateCommande(res);
	       this.selectedCommande = res;
	       this.selectedCommande.id = null;
            this.createCommandeDialog = true;

});

	}

	initDuplicateCommande(res: CommandeVo) {
        if (res.paiementsVo != null) {
             res.paiementsVo.forEach(d => { d.commandeVo = null; d.id = null; });
                }
        if (res.commandeItemsVo != null) {
             res.commandeItemsVo.forEach(d => { d.commandeVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.exportCSV();}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.exportExcel();}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.exportPdf();}}
    ];
  }

    exportExcel(): void {
        import('xlsx').then(async xlsx => {this.prepareColumnExport();
        const worksheet = xlsx.utils.json_to_sheet(this.exportData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.fileName);
     });
 }

    saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '.xlsx');
    });
     }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF();
        autoTable(doc, {columns: [
        {header: 'Reference', dataKey: 'Reference' },
        {header: 'Date commande', dataKey: 'Date commande' },
        {header: 'Total', dataKey: 'Total' },
        {header: 'Total paye', dataKey: 'Total paye' },
        {header: 'Client', dataKey: 'Client' },
        {header: 'Archive', dataKey: 'Archive' },
        {header: 'Date archivage', dataKey: 'Date archivage' },
        ],
        body: this.exportData,styles : {fontSize: 5}});
        doc.save(this.fileName + '.pdf');
    }

    exportCSV() {
    this.prepareColumnExport();
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.exportData[0]);
    let csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    csv.unshift(header.join(';'));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, this.fileName+".csv");
  }

    prepareColumnExport(): void {
    this.exportData = this.commandes.map(e => {
    return {
           'Reference': e.reference ,
           'Date commande': e.dateCommande ,
           'Total': e.total ,
           'Total paye': e.totalPaye ,
            'Client': e.clientVo?.cin ,
           'Archive': e.archive ,
           'Date archivage': e.dateArchivage ,
     }
      });
      }

    // getters and setters

    get commandes(): Array<CommandeVo> {
           return this.commandeService.commandes;
       }
    set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }

    get commandeSelections(): Array<CommandeVo> {
           return this.commandeService.commandeSelections;
       }
    set commandeSelections(value: Array<CommandeVo>) {
        this.commandeService.commandeSelections = value;
       }
   
     


    get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
    
    get createCommandeDialog():boolean {
           return this.commandeService.createCommandeDialog;
       }
    set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
       }
    
    get editCommandeDialog():boolean {
           return this.commandeService.editCommandeDialog;
       }
    set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog= value;
       }
    get viewCommandeDialog():boolean {
           return this.commandeService.viewCommandeDialog;
       }
    set viewCommandeDialog(value: boolean) {
        this.commandeService.viewCommandeDialog = value;
       }
       
     get searchCommande(): CommandeVo {
        return this.commandeService.searchCommande;
       }
    set searchCommande(value: CommandeVo) {
        this.commandeService.searchCommande = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
