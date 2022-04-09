import {CategorieProduitVo} from './CategorieProduit.model';



export class ProduitVo {

    public id: number;

    public reference: string;
    public libelle: string;
    public archive: boolean;
    public dateArchivage: Date;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
      public categorieProduitVo: CategorieProduitVo ;

}
