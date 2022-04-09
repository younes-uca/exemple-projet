import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { CategorieProduitCreateAdminComponent } from './view/categorie-produit-admin/create-admin/categorie-produit-create-admin.component';
import { CategorieProduitEditAdminComponent } from './view/categorie-produit-admin/edit-admin/categorie-produit-edit-admin.component';
import { CategorieProduitViewAdminComponent } from './view/categorie-produit-admin/view-admin/categorie-produit-view-admin.component';
import { CategorieProduitListAdminComponent } from './view/categorie-produit-admin/list-admin/categorie-produit-list-admin.component';
import { CategorieProduitAdminComponent } from './view/categorie-produit-admin/categorie-produit-admin.component';
import { ClientCreateAdminComponent } from './view/client-admin/create-admin/client-create-admin.component';
import { ClientEditAdminComponent } from './view/client-admin/edit-admin/client-edit-admin.component';
import { ClientViewAdminComponent } from './view/client-admin/view-admin/client-view-admin.component';
import { ClientListAdminComponent } from './view/client-admin/list-admin/client-list-admin.component';
import { ClientAdminComponent } from './view/client-admin/client-admin.component';
import { ProduitCreateAdminComponent } from './view/produit-admin/create-admin/produit-create-admin.component';
import { ProduitEditAdminComponent } from './view/produit-admin/edit-admin/produit-edit-admin.component';
import { ProduitViewAdminComponent } from './view/produit-admin/view-admin/produit-view-admin.component';
import { ProduitListAdminComponent } from './view/produit-admin/list-admin/produit-list-admin.component';
import { ProduitAdminComponent } from './view/produit-admin/produit-admin.component';
import { ChercheurCreateAdminComponent } from './view/chercheur-admin/create-admin/chercheur-create-admin.component';
import { ChercheurEditAdminComponent } from './view/chercheur-admin/edit-admin/chercheur-edit-admin.component';
import { ChercheurViewAdminComponent } from './view/chercheur-admin/view-admin/chercheur-view-admin.component';
import { ChercheurListAdminComponent } from './view/chercheur-admin/list-admin/chercheur-list-admin.component';
import { ChercheurAdminComponent } from './view/chercheur-admin/chercheur-admin.component';
import { CommandeCreateAdminComponent } from './view/commande-admin/create-admin/commande-create-admin.component';
import { CommandeEditAdminComponent } from './view/commande-admin/edit-admin/commande-edit-admin.component';
import { CommandeViewAdminComponent } from './view/commande-admin/view-admin/commande-view-admin.component';
import { CommandeListAdminComponent } from './view/commande-admin/list-admin/commande-list-admin.component';
import { CommandeAdminComponent } from './view/commande-admin/commande-admin.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {SwitchChercheurAdminComponent} from './view/switch_chercheur/switch-chercheur-admin.component';

@NgModule({
  declarations: [
   LoginAdminComponent,
   RegisterAdminComponent,
     SwitchChercheurAdminComponent,
    CategorieProduitCreateAdminComponent,
    CategorieProduitListAdminComponent,
    CategorieProduitViewAdminComponent,
    CategorieProduitEditAdminComponent,
    CategorieProduitAdminComponent,
    ClientCreateAdminComponent,
    ClientListAdminComponent,
    ClientViewAdminComponent,
    ClientEditAdminComponent,
    ClientAdminComponent,
    ProduitCreateAdminComponent,
    ProduitListAdminComponent,
    ProduitViewAdminComponent,
    ProduitEditAdminComponent,
    ProduitAdminComponent,
    ChercheurCreateAdminComponent,
    ChercheurListAdminComponent,
    ChercheurViewAdminComponent,
    ChercheurEditAdminComponent,
    ChercheurAdminComponent,
    CommandeCreateAdminComponent,
    CommandeListAdminComponent,
    CommandeViewAdminComponent,
    CommandeEditAdminComponent,
    CommandeAdminComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule
  ],
  exports: [
  LoginAdminComponent,
  RegisterAdminComponent,
    SwitchChercheurAdminComponent,
  CategorieProduitCreateAdminComponent,
  CategorieProduitListAdminComponent,
  CategorieProduitViewAdminComponent,
  CategorieProduitEditAdminComponent,
  CategorieProduitAdminComponent,
  ClientCreateAdminComponent,
  ClientListAdminComponent,
  ClientViewAdminComponent,
  ClientEditAdminComponent,
  ClientAdminComponent,
  ProduitCreateAdminComponent,
  ProduitListAdminComponent,
  ProduitViewAdminComponent,
  ProduitEditAdminComponent,
  ProduitAdminComponent,
  ChercheurCreateAdminComponent,
  ChercheurListAdminComponent,
  ChercheurViewAdminComponent,
  ChercheurEditAdminComponent,
  ChercheurAdminComponent,
  CommandeCreateAdminComponent,
  CommandeListAdminComponent,
  CommandeViewAdminComponent,
  CommandeEditAdminComponent,
  CommandeAdminComponent,
  ],
  entryComponents: [],
})
export class AdminModule { }
