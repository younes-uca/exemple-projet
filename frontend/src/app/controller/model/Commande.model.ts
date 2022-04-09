import {PaiementVo} from './Paiement.model';
import {CommandeItemVo} from './CommandeItem.model';
import {ClientVo} from './Client.model';



export class CommandeVo {

    public id: number;

    public reference: string;
    public dateCommande: Date;
     public total: number;
     public totalPaye: number;
    public archive: boolean;
    public dateArchivage: Date;
                public dateCommandeMax: string ;
                public dateCommandeMin: string ;
                public totalMax: string ;
                public totalMin: string ;
                public totalPayeMax: string ;
                public totalPayeMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
      public clientVo: ClientVo ;
      public paiementsVo: Array<PaiementVo>;
      public commandeItemsVo: Array<CommandeItemVo>;

}
