import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modelchercheur : any[];
  modeladmin : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService:AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modelchercheur =
      [
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/chercheur/list']
                    },
                ]
              },
              {
                label: 'Configuration',
                icon: 'pi pi-wallet',
                items:[
                ]
              },
              {
                label: 'Référentiel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Categorie produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/categorie-produit/list']
                    },
                    {
                      label: 'Client',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/client/list']
                    },
                    {
                      label: 'Paiement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/paiement/list']
                    },
                    {
                      label: 'Produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/produit/list']
                    },
                    {
                      label: 'Commande item',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/commande-item/list']
                    },
                    {
                      label: 'Commande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/commande/list']
                    },
                ]
              },
    ]
    this.modeladmin =
      [
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/chercheur/list']
                    },
                ]
              },
              {
                label: 'Configuration',
                icon: 'pi pi-wallet',
                items:[
                ]
              },
              {
                label: 'Référentiel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Categorie produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/categorie-produit/list']
                    },
                    {
                      label: 'Client',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/client/list']
                    },
                    {
                      label: 'Paiement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/paiement/list']
                    },
                    {
                      label: 'Produit',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/produit/list']
                    },
                    {
                      label: 'Commande item',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/commande-item/list']
                    },
                    {
                      label: 'Commande',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/commande/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
