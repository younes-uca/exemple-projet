import {Component, OnInit} from '@angular/core';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
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
  selector: 'app-chercheur-list-chercheur',
  templateUrl: './chercheur-list-chercheur.component.html',
  styleUrls: ['./chercheur-list-chercheur.component.css']
})
export class ChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Chercheur';
    yesno :any[] =[];


    constructor(private chercheurService: ChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
) { }

    ngOnInit(): void {
      this.loadChercheurs();
      this.initExport();
      this.initCol();
      this.yesno =  [{label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.chercheurService.findByCriteria(this.searchChercheur).subscribe(chercheurs=>{
            
            this.chercheurs = chercheurs;
           // this.searchChercheur = new ChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numeroMatricule', header: 'Numero matricule'},
                            {field: 'emailPrincipale', header: 'Email principale'},
                            {field: 'formationEnManagement', header: 'Formation en management'},
                            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
                            {field: 'enabled', header: 'Enabled'},
                            {field: 'accountNonExpired', header: 'Account non expired'},
                            {field: 'accountNonLocked', header: 'Account non locked'},
                            {field: 'passwordChanged', header: 'Password changed'},
                            {field: 'createdAt', header: 'Created at'},
                            {field: 'updatedAt', header: 'Updated at'},
                            {field: 'username', header: 'Username'},
                            {field: 'password', header: 'Password'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'equivalenceAvecPanelErc', header: 'Equivalence avec panel erc'},
                            {field: 'baseHorizon', header: 'Base horizon'},
                            {field: 'role', header: 'Role'},
        ];
    }
    
    public async editChercheur(chercheur:ChercheurVo){
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'edit');
         if(isPermistted){
          this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(res => {
           this.selectedChercheur = res;
            this.selectedChercheur.createdAt = new Date(chercheur.createdAt);
            this.selectedChercheur.updatedAt = new Date(chercheur.updatedAt);
            this.editChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewChercheur(chercheur:ChercheurVo){
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'view');
        if(isPermistted){
           this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(res => {
           this.selectedChercheur = res;
            this.selectedChercheur.createdAt = new Date(chercheur.createdAt);
            this.selectedChercheur.updatedAt = new Date(chercheur.updatedAt);
            this.viewChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
            this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteChercheur(chercheur:ChercheurVo){
       const isPermistted = await this.roleService.isPermitted('Chercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.chercheurService.delete(chercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.chercheurs.indexOf(chercheur);
                          position > -1 ? this.chercheurs.splice(position, 1) : false;
                                     }
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Chercheur Supprimé',
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


public async duplicateChercheur(chercheur: ChercheurVo) {

     this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(
	 res => {
	       this.initDuplicateChercheur(res);
	       this.selectedChercheur = res;
	       this.selectedChercheur.id = null;
            this.createChercheurDialog = true;

});

	}

	initDuplicateChercheur(res: ChercheurVo) {


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
        {header: 'Numero matricule', dataKey: 'Numero matricule' },
        {header: 'Email principale', dataKey: 'Email principale' },
        {header: 'Resume', dataKey: 'Resume' },
        {header: 'Formation en management', dataKey: 'Formation en management' },
        {header: 'Credentials non expired', dataKey: 'Credentials non expired' },
        {header: 'Enabled', dataKey: 'Enabled' },
        {header: 'Account non expired', dataKey: 'Account non expired' },
        {header: 'Account non locked', dataKey: 'Account non locked' },
        {header: 'Password changed', dataKey: 'Password changed' },
        {header: 'Created at', dataKey: 'Created at' },
        {header: 'Updated at', dataKey: 'Updated at' },
        {header: 'Username', dataKey: 'Username' },
        {header: 'Password', dataKey: 'Password' },
        {header: 'Prenom', dataKey: 'Prenom' },
        {header: 'Nom', dataKey: 'Nom' },
        {header: 'Equivalence avec panel erc', dataKey: 'Equivalence avec panel erc' },
        {header: 'Base horizon', dataKey: 'Base horizon' },
        {header: 'Role', dataKey: 'Role' },
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
    this.exportData = this.chercheurs.map(e => {
    return {
           'Numero matricule': e.numeroMatricule ,
           'Email principale': e.emailPrincipale ,
           'Resume': e.resume ,
           'Formation en management': e.formationEnManagement ,
           'Credentials non expired': e.credentialsNonExpired ,
           'Enabled': e.enabled ,
           'Account non expired': e.accountNonExpired ,
           'Account non locked': e.accountNonLocked ,
           'Password changed': e.passwordChanged ,
           'Created at': e.createdAt ,
           'Updated at': e.updatedAt ,
           'Username': e.username ,
           'Password': e.password ,
           'Prenom': e.prenom ,
           'Nom': e.nom ,
           'Equivalence avec panel erc': e.equivalenceAvecPanelErc ,
           'Base horizon': e.baseHorizon ,
           'Role': e.role ,
     }
      });
      }

    // getters and setters

    get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

    get chercheurSelections(): Array<ChercheurVo> {
           return this.chercheurService.chercheurSelections;
       }
    set chercheurSelections(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurSelections = value;
       }
   
     


    get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
    
    get createChercheurDialog():boolean {
           return this.chercheurService.createChercheurDialog;
       }
    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }
    
    get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
    set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }
    get viewChercheurDialog():boolean {
           return this.chercheurService.viewChercheurDialog;
       }
    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog = value;
       }
       
     get searchChercheur(): ChercheurVo {
        return this.chercheurService.searchChercheur;
       }
    set searchChercheur(value: ChercheurVo) {
        this.chercheurService.searchChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
