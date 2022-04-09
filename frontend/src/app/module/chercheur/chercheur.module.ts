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
import { LoginChercheurComponent } from './login-chercheur/login-chercheur.component';
import { RegisterChercheurComponent } from './register-chercheur/register-chercheur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { CategorieProduitCreateChercheurComponent } from './view/categorie-produit-chercheur/create-chercheur/categorie-produit-create-chercheur.component';
import { CategorieProduitEditChercheurComponent } from './view/categorie-produit-chercheur/edit-chercheur/categorie-produit-edit-chercheur.component';
import { CategorieProduitViewChercheurComponent } from './view/categorie-produit-chercheur/view-chercheur/categorie-produit-view-chercheur.component';
import { CategorieProduitListChercheurComponent } from './view/categorie-produit-chercheur/list-chercheur/categorie-produit-list-chercheur.component';
import { CategorieProduitChercheurComponent } from './view/categorie-produit-chercheur/categorie-produit-chercheur.component';
import { ClientCreateChercheurComponent } from './view/client-chercheur/create-chercheur/client-create-chercheur.component';
import { ClientEditChercheurComponent } from './view/client-chercheur/edit-chercheur/client-edit-chercheur.component';
import { ClientViewChercheurComponent } from './view/client-chercheur/view-chercheur/client-view-chercheur.component';
import { ClientListChercheurComponent } from './view/client-chercheur/list-chercheur/client-list-chercheur.component';
import { ClientChercheurComponent } from './view/client-chercheur/client-chercheur.component';
import { ProduitCreateChercheurComponent } from './view/produit-chercheur/create-chercheur/produit-create-chercheur.component';
import { ProduitEditChercheurComponent } from './view/produit-chercheur/edit-chercheur/produit-edit-chercheur.component';
import { ProduitViewChercheurComponent } from './view/produit-chercheur/view-chercheur/produit-view-chercheur.component';
import { ProduitListChercheurComponent } from './view/produit-chercheur/list-chercheur/produit-list-chercheur.component';
import { ProduitChercheurComponent } from './view/produit-chercheur/produit-chercheur.component';
import { ChercheurCreateChercheurComponent } from './view/chercheur-chercheur/create-chercheur/chercheur-create-chercheur.component';
import { ChercheurEditChercheurComponent } from './view/chercheur-chercheur/edit-chercheur/chercheur-edit-chercheur.component';
import { ChercheurViewChercheurComponent } from './view/chercheur-chercheur/view-chercheur/chercheur-view-chercheur.component';
import { ChercheurListChercheurComponent } from './view/chercheur-chercheur/list-chercheur/chercheur-list-chercheur.component';
import { ChercheurChercheurComponent } from './view/chercheur-chercheur/chercheur-chercheur.component';
import { CommandeCreateChercheurComponent } from './view/commande-chercheur/create-chercheur/commande-create-chercheur.component';
import { CommandeEditChercheurComponent } from './view/commande-chercheur/edit-chercheur/commande-edit-chercheur.component';
import { CommandeViewChercheurComponent } from './view/commande-chercheur/view-chercheur/commande-view-chercheur.component';
import { CommandeListChercheurComponent } from './view/commande-chercheur/list-chercheur/commande-list-chercheur.component';
import { CommandeChercheurComponent } from './view/commande-chercheur/commande-chercheur.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

@NgModule({
  declarations: [
   LoginChercheurComponent,
   RegisterChercheurComponent,
    CategorieProduitCreateChercheurComponent,
    CategorieProduitListChercheurComponent,
    CategorieProduitViewChercheurComponent,
    CategorieProduitEditChercheurComponent,
    CategorieProduitChercheurComponent,
    ClientCreateChercheurComponent,
    ClientListChercheurComponent,
    ClientViewChercheurComponent,
    ClientEditChercheurComponent,
    ClientChercheurComponent,
    ProduitCreateChercheurComponent,
    ProduitListChercheurComponent,
    ProduitViewChercheurComponent,
    ProduitEditChercheurComponent,
    ProduitChercheurComponent,
    ChercheurCreateChercheurComponent,
    ChercheurListChercheurComponent,
    ChercheurViewChercheurComponent,
    ChercheurEditChercheurComponent,
    ChercheurChercheurComponent,
    CommandeCreateChercheurComponent,
    CommandeListChercheurComponent,
    CommandeViewChercheurComponent,
    CommandeEditChercheurComponent,
    CommandeChercheurComponent,
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
  LoginChercheurComponent,
  RegisterChercheurComponent,
  CategorieProduitCreateChercheurComponent,
  CategorieProduitListChercheurComponent,
  CategorieProduitViewChercheurComponent,
  CategorieProduitEditChercheurComponent,
  CategorieProduitChercheurComponent,
  ClientCreateChercheurComponent,
  ClientListChercheurComponent,
  ClientViewChercheurComponent,
  ClientEditChercheurComponent,
  ClientChercheurComponent,
  ProduitCreateChercheurComponent,
  ProduitListChercheurComponent,
  ProduitViewChercheurComponent,
  ProduitEditChercheurComponent,
  ProduitChercheurComponent,
  ChercheurCreateChercheurComponent,
  ChercheurListChercheurComponent,
  ChercheurViewChercheurComponent,
  ChercheurEditChercheurComponent,
  ChercheurChercheurComponent,
  CommandeCreateChercheurComponent,
  CommandeListChercheurComponent,
  CommandeViewChercheurComponent,
  CommandeEditChercheurComponent,
  CommandeChercheurComponent,
  ],
  entryComponents: [],
})
export class ChercheurModule { }
