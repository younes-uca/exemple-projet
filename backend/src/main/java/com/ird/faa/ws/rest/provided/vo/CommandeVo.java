package  com.ird.faa.ws.rest.provided.vo;

    import java.util.List;
    import java.util.Date;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    import com.fasterxml.jackson.annotation.JsonFormat;
    import java.math.BigDecimal;

public class CommandeVo {

    private String id ;
    private String reference ;
    private String dateCommande ;
    private String total ;
    private String totalPaye ;
    private Boolean archive ;
    private String dateArchivage ;


            private String dateCommandeMax ;
            private String dateCommandeMin ;
            private String totalMax ;
            private String totalMin ;
            private String totalPayeMax ;
            private String totalPayeMin ;
            private String dateArchivageMax ;
            private String dateArchivageMin ;

        private ClientVo clientVo ;

    private List<PaiementVo> paiementsVo ;
    private List<CommandeItemVo> commandeItemsVo ;

    public CommandeVo(){
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
        public String getDateCommande(){
        return this.dateCommande;
        }

        public void setDateCommande(String dateCommande){
        this.dateCommande = dateCommande;
        }
        public String getTotal(){
        return this.total;
        }

        public void setTotal(String total){
        this.total = total;
        }
        public String getTotalPaye(){
        return this.totalPaye;
        }

        public void setTotalPaye(String totalPaye){
        this.totalPaye = totalPaye;
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


            public String getDateCommandeMax(){
            return this.dateCommandeMax;
            }

            public String getDateCommandeMin(){
            return this.dateCommandeMin;
            }

            public void setDateCommandeMax(String dateCommandeMax){
            this.dateCommandeMax = dateCommandeMax;
            }

            public void setDateCommandeMin(String dateCommandeMin){
            this.dateCommandeMin = dateCommandeMin;
            }

            public String getTotalMax(){
            return this.totalMax;
            }

            public String getTotalMin(){
            return this.totalMin;
            }

            public void setTotalMax(String totalMax){
            this.totalMax = totalMax;
            }

            public void setTotalMin(String totalMin){
            this.totalMin = totalMin;
            }

            public String getTotalPayeMax(){
            return this.totalPayeMax;
            }

            public String getTotalPayeMin(){
            return this.totalPayeMin;
            }

            public void setTotalPayeMax(String totalPayeMax){
            this.totalPayeMax = totalPayeMax;
            }

            public void setTotalPayeMin(String totalPayeMin){
            this.totalPayeMin = totalPayeMin;
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


        public ClientVo getClientVo(){
        return this.clientVo;
        }

        public void setClientVo(ClientVo clientVo){
        this.clientVo = clientVo;
        }


        public List<PaiementVo> getPaiementsVo(){
        return this.paiementsVo;
        }

        public void setPaiementsVo(List<PaiementVo> paiementsVo){
            this.paiementsVo = paiementsVo;
            }

        public List<CommandeItemVo> getCommandeItemsVo(){
        return this.commandeItemsVo;
        }

        public void setCommandeItemsVo(List<CommandeItemVo> commandeItemsVo){
            this.commandeItemsVo = commandeItemsVo;
            }

            }
