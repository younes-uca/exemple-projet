package  com.ird.faa.ws.rest.provided.vo;

    import java.util.Date;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    import com.fasterxml.jackson.annotation.JsonFormat;
    import java.math.BigDecimal;

public class CommandeItemVo {

    private String id ;
    private String prix ;
    private String quantite ;
    private Boolean archive ;
    private String dateArchivage ;


            private String prixMax ;
            private String prixMin ;
            private String quantiteMax ;
            private String quantiteMin ;
            private String dateArchivageMax ;
            private String dateArchivageMin ;

        private ProduitVo produitVo ;
        private CommandeVo commandeVo ;


    public CommandeItemVo(){
    super();
    }

        public String getId(){
        return this.id;
        }

        public void setId(String id){
        this.id = id;
        }
        public String getPrix(){
        return this.prix;
        }

        public void setPrix(String prix){
        this.prix = prix;
        }
        public String getQuantite(){
        return this.quantite;
        }

        public void setQuantite(String quantite){
        this.quantite = quantite;
        }
        public Boolean getArchive(){
        return this.archive;
        }

        public void setArchive(Boolean archive){
        this.archive = archive;
        }
        public String getDateArchivage(){
        return this.dateArchivage;
        }

        public void setDateArchivage(String dateArchivage){
        this.dateArchivage = dateArchivage;
        }


            public String getPrixMax(){
            return this.prixMax;
            }

            public String getPrixMin(){
            return this.prixMin;
            }

            public void setPrixMax(String prixMax){
            this.prixMax = prixMax;
            }

            public void setPrixMin(String prixMin){
            this.prixMin = prixMin;
            }

            public String getQuantiteMax(){
            return this.quantiteMax;
            }

            public String getQuantiteMin(){
            return this.quantiteMin;
            }

            public void setQuantiteMax(String quantiteMax){
            this.quantiteMax = quantiteMax;
            }

            public void setQuantiteMin(String quantiteMin){
            this.quantiteMin = quantiteMin;
            }

            public String getDateArchivageMax(){
            return this.dateArchivageMax;
            }

            public String getDateArchivageMin(){
            return this.dateArchivageMin;
            }

            public void setDateArchivageMax(String dateArchivageMax){
            this.dateArchivageMax = dateArchivageMax;
            }

            public void setDateArchivageMin(String dateArchivageMin){
            this.dateArchivageMin = dateArchivageMin;
            }


        public ProduitVo getProduitVo(){
        return this.produitVo;
        }

        public void setProduitVo(ProduitVo produitVo){
        this.produitVo = produitVo;
        }
        public CommandeVo getCommandeVo(){
        return this.commandeVo;
        }

        public void setCommandeVo(CommandeVo commandeVo){
        this.commandeVo = commandeVo;
        }


            }
