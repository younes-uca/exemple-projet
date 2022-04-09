package com.ird.faa.bean;

import java.util.Objects;
import java.util.List;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;


    import java.math.BigDecimal;
import javax.persistence.*;



@Entity
@Table(name = "commande")
public class Commande    implements Archivable  {

@Id
    @SequenceGenerator(name="commande_seq",sequenceName="commande_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="commande_seq")
private Long id;

            private String reference ;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateCommande ;
            private BigDecimal total ;
            private BigDecimal totalPaye ;
            @Column(columnDefinition = "boolean default false")
                 private Boolean archive;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateArchivage ;

    @ManyToOne
    private Client client ;

                @OneToMany(mappedBy = "commande")
            private List<Paiement> paiements ;
                @OneToMany(mappedBy = "commande")
            private List<CommandeItem> commandeItems ;

public Commande(){
super();
}


            public Long getId(){
            return this.id;
            }
            public void setId(Long id){
            this.id = id;
            }
            public String getReference(){
            return this.reference;
            }
            public void setReference(String reference){
            this.reference = reference;
            }
            public Date getDateCommande(){
            return this.dateCommande;
            }
            public void setDateCommande(Date dateCommande){
            this.dateCommande = dateCommande;
            }
            public BigDecimal getTotal(){
            return this.total;
            }
            public void setTotal(BigDecimal total){
            this.total = total;
            }
            public BigDecimal getTotalPaye(){
            return this.totalPaye;
            }
            public void setTotalPaye(BigDecimal totalPaye){
            this.totalPaye = totalPaye;
            }
            public Client getClient(){
            return this.client;
            }
            public void setClient(Client client){
            this.client = client;
            }
            public List<Paiement> getPaiements(){
            return this.paiements;
            }
            public void setPaiements(List<Paiement> paiements){
            this.paiements = paiements;
            }
            public List<CommandeItem> getCommandeItems(){
            return this.commandeItems;
            }
            public void setCommandeItems(List<CommandeItem> commandeItems){
            this.commandeItems = commandeItems;
            }
        public Boolean getArchive(){
        return this.archive;
        }
        public void setArchive(Boolean archive){
        this.archive = archive;
        }
            public Date getDateArchivage(){
            return this.dateArchivage;
            }
            public void setDateArchivage(Date dateArchivage){
            this.dateArchivage = dateArchivage;
            }

        @Override
        public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Commande commande = (Commande) o;
        return id != null && id.equals(commande.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

