import {CommandeVo} from './Commande.model';
import {ProduitVo} from './Produit.model';



export class CommandeItemVo {

    public id: number;

     public prix: number;
     public quantite: number;
    public archive: boolean;
    public dateArchivage: Date;
                public prixMax: string ;
                public prixMin: string ;
                public quantiteMax: string ;
                public quantiteMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
      public produitVo: ProduitVo ;
      public commandeVo: CommandeVo ;

}
