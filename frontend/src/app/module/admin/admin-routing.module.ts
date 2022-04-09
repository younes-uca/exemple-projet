
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

import { CategorieProduitAdminComponent } from './view/categorie-produit-admin/categorie-produit-admin.component';


import { ClientAdminComponent } from './view/client-admin/client-admin.component';


import { PaiementAdminComponent } from './view/paiement-admin/paiement-admin.component';


import { ProduitAdminComponent } from './view/produit-admin/produit-admin.component';


import { CommandeItemAdminComponent } from './view/commande-item-admin/commande-item-admin.component';


import { ChercheurAdminComponent } from './view/chercheur-admin/chercheur-admin.component';


import { CommandeAdminComponent } from './view/commande-admin/commande-admin.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {

                            path: 'categorie-produit',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieProduitAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'produit',
                            children: [
                                {
                                    path: 'list',
                                    component: ProduitAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'commande',
                            children: [
                                {
                                    path: 'list',
                                    component: CommandeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
