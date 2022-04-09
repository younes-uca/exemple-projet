import {Component, OnInit} from '@angular/core';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';

import { CommandeService } from '../../../../../controller/service/Commande.service';

import {CommandeVo} from '../../../../../controller/model/Commande.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
@Component({
  selector: 'app-paiement-list-chercheur',
  templateUrl: './paiement-list-chercheur.component.html',
  styleUrls: ['./paiement-list-chercheur.component.css']
})
export class PaiementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Paiement';
    yesno :any[] =[];
    commandes :Array<CommandeVo>;


    constructor(private paiementService: PaiementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
        , private commandeService: CommandeService
) { }

    ngOnInit(): void {
      this.loadPaiements();
      this.initExport();
      this.initCol();
      this.loadCommande();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadPaiements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paiementService.findByCriteria(this.searchPaiement).subscribe(paiements=>{
            
            this.paiements = paiements;
           // this.searchPaiement = new PaiementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'datePaiement', header: 'Date paiement'},
                            {field: 'montant', header: 'Montant'},
                        {field: 'commande?.reference', header: 'Commande'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }
    
    public async editPaiement(paiement:PaiementVo){
        const isPermistted = await this.roleService.isPermitted('Paiement', 'edit');
         if(isPermistted){
          this.paiementService.findByIdWithAssociatedList(paiement).subscribe(res => {
           this.selectedPaiement = res;
            this.selectedPaiement.datePaiement = new Date(paiement.datePaiement);
            this.selectedPaiement.dateArchivage = new Date(paiement.dateArchivage);
            this.editPaiementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaiement(paiement:PaiementVo){
        const isPermistted = await this.roleService.isPermitted('Paiement', 'view');
        if(isPermistted){
           this.paiementService.findByIdWithAssociatedList(paiement).subscribe(res => {
           this.selectedPaiement = res;
            this.selectedPaiement.datePaiement = new Date(paiement.datePaiement);
            this.selectedPaiement.dateArchivage = new Date(paiement.dateArchivage);
            this.viewPaiementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaiement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaiement = new PaiementVo();
            this.createPaiementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaiement(paiement:PaiementVo){
       const isPermistted = await this.roleService.isPermitted('Paiement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Paiement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paiementService.delete(paiement).subscribe(status=>{
                          if(status > 0){
                          const position = this.paiements.indexOf(paiement);
                          position > -1 ? this.paiements.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Paiement Supprimé',
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

public async loadCommande(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
    isPermistted ? this.commandeService.findAll().subscribe(commandes => this.commandes = commandes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaiement(paiement: PaiementVo) {

     this.paiementService.findByIdWithAssociatedList(paiement).subscribe(
	 res => {
	       this.initDuplicatePaiement(res);
	       this.selectedPaiement = res;
	       this.selectedPaiement.id = null;
            this.createPaiementDialog = true;

});

	}

	initDuplicatePaiement(res: PaiementVo) {


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
        {header: 'Date paiement', dataKey: 'Date paiement' },
        {header: 'Montant', dataKey: 'Montant' },
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
    this.exportData = this.paiements.map(e => {
    return {
           'Reference': e.reference ,
           'Date paiement': e.datePaiement ,
           'Montant': e.montant ,
            'Commande': e.commandeVo?.reference ,
           'Archive': e.archive ,
           'Date archivage': e.dateArchivage ,
     }
      });
      }

    // getters and setters

    get paiements(): Array<PaiementVo> {
           return this.paiementService.paiements;
       }
    set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
       }

    get paiementSelections(): Array<PaiementVo> {
           return this.paiementService.paiementSelections;
       }
    set paiementSelections(value: Array<PaiementVo>) {
        this.paiementService.paiementSelections = value;
       }
   
     


    get selectedPaiement():PaiementVo {
           return this.paiementService.selectedPaiement;
       }
    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
       }
    
    get createPaiementDialog():boolean {
           return this.paiementService.createPaiementDialog;
       }
    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog= value;
       }
    
    get editPaiementDialog():boolean {
           return this.paiementService.editPaiementDialog;
       }
    set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog= value;
       }
    get viewPaiementDialog():boolean {
           return this.paiementService.viewPaiementDialog;
       }
    set viewPaiementDialog(value: boolean) {
        this.paiementService.viewPaiementDialog = value;
       }
       
     get searchPaiement(): PaiementVo {
        return this.paiementService.searchPaiement;
       }
    set searchPaiement(value: PaiementVo) {
        this.paiementService.searchPaiement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
