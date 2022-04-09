import {User} from './User.model';



export class ChercheurVo  extends User{


    public numeroMatricule: string;
    public emailPrincipale: string;
    public resume: string;
    public formationEnManagement: boolean;
    public credentialsNonExpired: boolean;
    public enabled: boolean;
    public accountNonExpired: boolean;
    public accountNonLocked: boolean;
    public passwordChanged: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public password: string;
    public prenom: string;
    public nom: string;
    public equivalenceAvecPanelErc: string;
    public baseHorizon: string;
    public role: string;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;

}
