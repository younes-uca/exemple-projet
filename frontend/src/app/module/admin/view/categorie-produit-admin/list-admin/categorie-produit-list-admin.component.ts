import {Component, OnInit} from '@angular/core';
import {CategorieProduitService} from '../../../../../controller/service/CategorieProduit.service';
import {CategorieProduitVo} from '../../../../../controller/model/CategorieProduit.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
@Component({
  selector: 'app-categorie-produit-list-admin',
  templateUrl: './categorie-produit-list-admin.component.html',
  styleUrls: ['./categorie-produit-list-admin.component.css']
})
export class CategorieProduitListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'CategorieProduit';
    yesno :any[] =[];


    constructor(private categorieProduitService: CategorieProduitService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
) { }

    ngOnInit(): void {
      this.loadCategorieProduits();
      this.initExport();
      this.initCol();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadCategorieProduits(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'list');
        isPermistted ? this.categorieProduitService.findAll().subscribe(categorieProduits => this.categorieProduits = categorieProduits,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categorieProduitService.findByCriteria(this.searchCategorieProduit).subscribe(categorieProduits=>{
            
            this.categorieProduits = categorieProduits;
           // this.searchCategorieProduit = new CategorieProduitVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }
    
    public async editCategorieProduit(categorieProduit:CategorieProduitVo){
        const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'edit');
         if(isPermistted){
          this.categorieProduitService.findByIdWithAssociatedList(categorieProduit).subscribe(res => {
           this.selectedCategorieProduit = res;
            this.selectedCategorieProduit.dateArchivage = new Date(categorieProduit.dateArchivage);
            this.editCategorieProduitDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategorieProduit(categorieProduit:CategorieProduitVo){
        const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'view');
        if(isPermistted){
           this.categorieProduitService.findByIdWithAssociatedList(categorieProduit).subscribe(res => {
           this.selectedCategorieProduit = res;
            this.selectedCategorieProduit.dateArchivage = new Date(categorieProduit.dateArchivage);
            this.viewCategorieProduitDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategorieProduit(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategorieProduit = new CategorieProduitVo();
            this.createCategorieProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCategorieProduit(categorieProduit:CategorieProduitVo){
const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Categorie produit) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.categorieProduitService.archiver(categorieProduit).subscribe(status=>{
const myIndex = this.categorieProduits.indexOf(categorieProduit);
this.categorieProduits[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Categorie produit archivé',
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

public async desarchiverCategorieProduit(categorieProduit:CategorieProduitVo){
const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Categorie produit) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.categorieProduitService.desarchiver(categorieProduit).subscribe(status=>{
const myIndex = this.categorieProduits.indexOf(categorieProduit);
this.categorieProduits[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Categorie produit désarchivé',
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


    public async deleteCategorieProduit(categorieProduit:CategorieProduitVo){
       const isPermistted = await this.roleService.isPermitted('CategorieProduit', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie produit) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categorieProduitService.delete(categorieProduit).subscribe(status=>{
                          if(status > 0){
                          const position = this.categorieProduits.indexOf(categorieProduit);
                          position > -1 ? this.categorieProduits.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie produit Supprimé',
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


public async duplicateCategorieProduit(categorieProduit: CategorieProduitVo) {

     this.categorieProduitService.findByIdWithAssociatedList(categorieProduit).subscribe(
	 res => {
	       this.initDuplicateCategorieProduit(res);
	       this.selectedCategorieProduit = res;
	       this.selectedCategorieProduit.id = null;
            this.createCategorieProduitDialog = true;

});

	}

	initDuplicateCategorieProduit(res: CategorieProduitVo) {


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
    this.exportData = this.categorieProduits.map(e => {
    return {
           'Reference': e.reference ,
           'Libelle': e.libelle ,
           'Archive': e.archive ,
           'Date archivage': e.dateArchivage ,
     }
      });
      }

    // getters and setters

    get categorieProduits(): Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduits;
       }
    set categorieProduits(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduits = value;
       }

    get categorieProduitSelections(): Array<CategorieProduitVo> {
           return this.categorieProduitService.categorieProduitSelections;
       }
    set categorieProduitSelections(value: Array<CategorieProduitVo>) {
        this.categorieProduitService.categorieProduitSelections = value;
       }
   
     


    get selectedCategorieProduit():CategorieProduitVo {
           return this.categorieProduitService.selectedCategorieProduit;
       }
    set selectedCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.selectedCategorieProduit = value;
       }
    
    get createCategorieProduitDialog():boolean {
           return this.categorieProduitService.createCategorieProduitDialog;
       }
    set createCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.createCategorieProduitDialog= value;
       }
    
    get editCategorieProduitDialog():boolean {
           return this.categorieProduitService.editCategorieProduitDialog;
       }
    set editCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.editCategorieProduitDialog= value;
       }
    get viewCategorieProduitDialog():boolean {
           return this.categorieProduitService.viewCategorieProduitDialog;
       }
    set viewCategorieProduitDialog(value: boolean) {
        this.categorieProduitService.viewCategorieProduitDialog = value;
       }
       
     get searchCategorieProduit(): CategorieProduitVo {
        return this.categorieProduitService.searchCategorieProduit;
       }
    set searchCategorieProduit(value: CategorieProduitVo) {
        this.categorieProduitService.searchCategorieProduit = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
