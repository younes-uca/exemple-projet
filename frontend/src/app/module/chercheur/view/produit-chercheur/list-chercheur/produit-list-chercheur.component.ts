import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';

import { CategorieProduitService } from '../../../../../controller/service/CategorieProduit.service';

import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
@Component({
  selector: 'app-produit-list-chercheur',
  templateUrl: './produit-list-chercheur.component.html',
  styleUrls: ['./produit-list-chercheur.component.css']
})
export class ProduitListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Produit';
    yesno :any[] =[];
    categorieProduits :Array<CategorieProduitVo>;


    constructor(private produitService: ProduitService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
        , private categorieProduitService: CategorieProduitService
) { }

    ngOnInit(): void {
      this.loadProduits();
      this.initExport();
      this.initCol();
      this.loadCategorieProduit();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadProduits(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Produit', 'list');
        isPermistted ? this.produitService.findAll().subscribe(produits => this.produits = produits,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.produitService.findByCriteria(this.searchProduit).subscribe(produits=>{
            
            this.produits = produits;
           // this.searchProduit = new ProduitVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'categorieProduit?.libelle', header: 'Categorie produit'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }
    
    public async editProduit(produit:ProduitVo){
        const isPermistted = await this.roleService.isPermitted('Produit', 'edit');
         if(isPermistted){
          this.produitService.findByIdWithAssociatedList(produit).subscribe(res => {
           this.selectedProduit = res;
            this.selectedProduit.dateArchivage = new Date(produit.dateArchivage);
            this.editProduitDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProduit(produit:ProduitVo){
        const isPermistted = await this.roleService.isPermitted('Produit', 'view');
        if(isPermistted){
           this.produitService.findByIdWithAssociatedList(produit).subscribe(res => {
           this.selectedProduit = res;
            this.selectedProduit.dateArchivage = new Date(produit.dateArchivage);
            this.viewProduitDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProduit(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProduit = new ProduitVo();
            this.createProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProduit(produit:ProduitVo){
       const isPermistted = await this.roleService.isPermitted('Produit', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Produit) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.produitService.delete(produit).subscribe(status=>{
                          if(status > 0){
                          const position = this.produits.indexOf(produit);
                          position > -1 ? this.produits.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Produit Supprimé',
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

public async loadCategorieProduit(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Produit', 'list');
    isPermistted ? this.categorieProduitService.findAll().subscribe(categorieProduits => this.categorieProduits = categorieProduits,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProduit(produit: ProduitVo) {

     this.produitService.findByIdWithAssociatedList(produit).subscribe(
	 res => {
	       this.initDuplicateProduit(res);
	       this.selectedProduit = res;
	       this.selectedProduit.id = null;
            this.createProduitDialog = true;

});

	}

	initDuplicateProduit(res: ProduitVo) {


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
        {header: 'Libelle', dataKey: 'Libelle' },
        {header: 'Categorie produit', dataKey: 'Categorie produit' },
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
    this.exportData = this.produits.map(e => {
    return {
           'Reference': e.reference ,
           'Libelle': e.libelle ,
            'Categorie produit': e.categorieProduitVo?.libelle ,
           'Archive': e.archive ,
           'Date archivage': e.dateArchivage ,
     }
      });
      }

    // getters and setters

    get produits(): Array<ProduitVo> {
           return this.produitService.produits;
       }
    set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

    get produitSelections(): Array<ProduitVo> {
           return this.produitService.produitSelections;
       }
    set produitSelections(value: Array<ProduitVo>) {
        this.produitService.produitSelections = value;
       }
   
     


    get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
    
    get createProduitDialog():boolean {
           return this.produitService.createProduitDialog;
       }
    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
       }
    
    get editProduitDialog():boolean {
           return this.produitService.editProduitDialog;
       }
    set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog= value;
       }
    get viewProduitDialog():boolean {
           return this.produitService.viewProduitDialog;
       }
    set viewProduitDialog(value: boolean) {
        this.produitService.viewProduitDialog = value;
       }
       
     get searchProduit(): ProduitVo {
        return this.produitService.searchProduit;
       }
    set searchProduit(value: ProduitVo) {
        this.produitService.searchProduit = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
