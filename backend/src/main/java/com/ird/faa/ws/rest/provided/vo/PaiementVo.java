package  com.ird.faa.ws.rest.provided.vo;

    import java.util.Date;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    import com.fasterxml.jackson.annotation.JsonFormat;
    import java.math.BigDecimal;

public class PaiementVo {

    private String id ;
    private String reference ;
    private String datePaiement ;
    private String montant ;
    private Boolean archive ;
    private String dateArchivage ;


            private String datePaiementMax ;
            private String datePaiementMin ;
            private String montantMax ;
            private String montantMin ;
            private String dateArchivageMax ;
            private String dateArchivageMin ;

        private CommandeVo commandeVo ;


    public PaiementVo(){
    super();
    }

        public String getId(){
        return this.id;
        }

        public void setId(String id){
        this.id = id;
        }
        public String getReference(){
        return this.reference;
        }

        public void setReference(String reference){
        this.reference = reference;
        }
        public String getDatePaiement(){
        return this.datePaiement;
        }

        public void setDatePaiement(String datePaiement){
        this.datePaiement = datePaiement;
        }
        public String getMontant(){
        return this.montant;
        }

        public void setMontant(String montant){
        this.montant = montant;
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


            public String getDatePaiementMax(){
            return this.datePaiementMax;
            }

            public String getDatePaiementMin(){
            return this.datePaiementMin;
            }

            public void setDatePaiementMax(String datePaiementMax){
            this.datePaiementMax = datePaiementMax;
            }

            public void setDatePaiementMin(String datePaiementMin){
            this.datePaiementMin = datePaiementMin;
            }

            public String getMontantMax(){
            return this.montantMax;
            }

            public String getMontantMin(){
            return this.montantMin;
            }

            public void setMontantMax(String montantMax){
            this.montantMax = montantMax;
            }

            public void setMontantMin(String montantMin){
            this.montantMin = montantMin;
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


        public CommandeVo getCommandeVo(){
        return this.commandeVo;
        }

        public void setCommandeVo(CommandeVo commandeVo){
        this.commandeVo = commandeVo;
        }


            }
