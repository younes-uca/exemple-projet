import {Component, OnInit} from '@angular/core';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';

import { ProduitService } from '../../../../../controller/service/Produit.service';
import { CommandeService } from '../../../../../controller/service/Commande.service';

import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
@Component({
  selector: 'app-commande-item-list-admin',
  templateUrl: './commande-item-list-admin.component.html',
  styleUrls: ['./commande-item-list-admin.component.css']
})
export class CommandeItemListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'CommandeItem';
    yesno :any[] =[];
    produits :Array<ProduitVo>;
    commandes :Array<CommandeVo>;


    constructor(private commandeItemService: CommandeItemService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
        , private produitService: ProduitService
        , private commandeService: CommandeService
) { }

    ngOnInit(): void {
      this.loadCommandeItems();
      this.initExport();
      this.initCol();
      this.loadProduit();
      this.loadCommande();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadCommandeItems(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommandeItem', 'list');
        isPermistted ? this.commandeItemService.findAll().subscribe(commandeItems => this.commandeItems = commandeItems,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commandeItemService.findByCriteria(this.searchCommandeItem).subscribe(commandeItems=>{
            
            this.commandeItems = commandeItems;
           // this.searchCommandeItem = new CommandeItemVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'produit?.reference', header: 'Produit'},
                            {field: 'prix', header: 'Prix'},
                            {field: 'quantite', header: 'Quantite'},
                        {field: 'commande?.reference', header: 'Commande'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }
    
    public async editCommandeItem(commandeItem:CommandeItemVo){
        const isPermistted = await this.roleService.isPermitted('CommandeItem', 'edit');
         if(isPermistted){
          this.commandeItemService.findByIdWithAssociatedList(commandeItem).subscribe(res => {
           this.selectedCommandeItem = res;
            this.selectedCommandeItem.dateArchivage = new Date(commandeItem.dateArchivage);
            this.editCommandeItemDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommandeItem(commandeItem:CommandeItemVo){
        const isPermistted = await this.roleService.isPermitted('CommandeItem', 'view');
        if(isPermistted){
           this.commandeItemService.findByIdWithAssociatedList(commandeItem).subscribe(res => {
           this.selectedCommandeItem = res;
            this.selectedCommandeItem.dateArchivage = new Date(commandeItem.dateArchivage);
            this.viewCommandeItemDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommandeItem(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommandeItem = new CommandeItemVo();
            this.createCommandeItemDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCommandeItem(commandeItem:CommandeItemVo){
const isPermistted = await this.roleService.isPermitted('CommandeItem', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Commande item) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commandeItemService.archiver(commandeItem).subscribe(status=>{
const myIndex = this.commandeItems.indexOf(commandeItem);
this.commandeItems[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commande item archivé',
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

public async desarchiverCommandeItem(commandeItem:CommandeItemVo){
const isPermistted = await this.roleService.isPermitted('CommandeItem', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Commande item) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commandeItemService.desarchiver(commandeItem).subscribe(status=>{
const myIndex = this.commandeItems.indexOf(commandeItem);
this.commandeItems[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commande item désarchivé',
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


    public async deleteCommandeItem(commandeItem:CommandeItemVo){
       const isPermistted = await this.roleService.isPermitted('CommandeItem', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commande item) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commandeItemService.delete(commandeItem).subscribe(status=>{
                          if(status > 0){
                          const position = this.commandeItems.indexOf(commandeItem);
                          position > -1 ? this.commandeItems.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commande item Supprimé',
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

public async loadProduit(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommandeItem', 'list');
    isPermistted ? this.produitService.findAll().subscribe(produits => this.produits = produits,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCommande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommandeItem', 'list');
    isPermistted ? this.commandeService.findAll().subscribe(commandes => this.commandes = commandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommandeItem(commandeItem: CommandeItemVo) {

     this.commandeItemService.findByIdWithAssociatedList(commandeItem).subscribe(
	 res => {
	       this.initDuplicateCommandeItem(res);
	       this.selectedCommandeItem = res;
	       this.selectedCommandeItem.id = null;
            this.createCommandeItemDialog = true;

});

	}

	initDuplicateCommandeItem(res: CommandeItemVo) {


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
        {header: 'Produit', dataKey: 'Produit' },
        {header: 'Prix', dataKey: 'Prix' },
        {header: 'Quantite', dataKey: 'Quantite' },
        {header: 'Commande', dataKey: 'Commande' },
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
    this.exportData = this.commandeItems.map(e => {
    return {
            'Produit': e.produitVo?.reference ,
           'Prix': e.prix ,
           'Quantite': e.quantite ,
            'Commande': e.commandeVo?.reference ,
           'Archive': e.archive ,
           'Date archivage': e.dateArchivage ,
     }
      });
      }

    // getters and setters

    get commandeItems(): Array<CommandeItemVo> {
           return this.commandeItemService.commandeItems;
       }
    set commandeItems(value: Array<CommandeItemVo>) {
        this.commandeItemService.commandeItems = value;
       }

    get commandeItemSelections(): Array<CommandeItemVo> {
           return this.commandeItemService.commandeItemSelections;
       }
    set commandeItemSelections(value: Array<CommandeItemVo>) {
        this.commandeItemService.commandeItemSelections = value;
       }
   
     


    get selectedCommandeItem():CommandeItemVo {
           return this.commandeItemService.selectedCommandeItem;
       }
    set selectedCommandeItem(value: CommandeItemVo) {
        this.commandeItemService.selectedCommandeItem = value;
       }
    
    get createCommandeItemDialog():boolean {
           return this.commandeItemService.createCommandeItemDialog;
       }
    set createCommandeItemDialog(value: boolean) {
        this.commandeItemService.createCommandeItemDialog= value;
       }
    
    get editCommandeItemDialog():boolean {
           return this.commandeItemService.editCommandeItemDialog;
       }
    set editCommandeItemDialog(value: boolean) {
        this.commandeItemService.editCommandeItemDialog= value;
       }
    get viewCommandeItemDialog():boolean {
           return this.commandeItemService.viewCommandeItemDialog;
       }
    set viewCommandeItemDialog(value: boolean) {
        this.commandeItemService.viewCommandeItemDialog = value;
       }
       
     get searchCommandeItem(): CommandeItemVo {
        return this.commandeItemService.searchCommandeItem;
       }
    set searchCommandeItem(value: CommandeItemVo) {
        this.commandeItemService.searchCommandeItem = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
