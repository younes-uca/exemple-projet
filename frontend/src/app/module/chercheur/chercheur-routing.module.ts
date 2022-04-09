
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginChercheurComponent } from './login-chercheur/login-chercheur.component';
import { RegisterChercheurComponent } from './register-chercheur/register-chercheur.component';

import { CategorieProduitChercheurComponent } from './view/categorie-produit-chercheur/categorie-produit-chercheur.component';


import { ClientChercheurComponent } from './view/client-chercheur/client-chercheur.component';


import { PaiementChercheurComponent } from './view/paiement-chercheur/paiement-chercheur.component';


import { ProduitChercheurComponent } from './view/produit-chercheur/produit-chercheur.component';


import { CommandeItemChercheurComponent } from './view/commande-item-chercheur/commande-item-chercheur.component';


import { ChercheurChercheurComponent } from './view/chercheur-chercheur/chercheur-chercheur.component';


import { CommandeChercheurComponent } from './view/commande-chercheur/commande-chercheur.component';


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
                                    component: LoginChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {

                            path: 'categorie-produit',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieProduitChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'produit',
                            children: [
                                {
                                    path: 'list',
                                    component: ProduitChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'commande',
                            children: [
                                {
                                    path: 'list',
                                    component: CommandeChercheurComponent ,
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
export class ChercheurRoutingModule { }
