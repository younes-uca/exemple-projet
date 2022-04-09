import {CommandeVo} from './Commande.model';



export class PaiementVo {

    public id: number;

    public reference: string;
    public datePaiement: Date;
     public montant: number;
    public archive: boolean;
    public dateArchivage: Date;
                public datePaiementMax: string ;
                public datePaiementMin: string ;
                public montantMax: string ;
                public montantMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
      public commandeVo: CommandeVo ;

}
