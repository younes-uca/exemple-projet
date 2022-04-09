package com.ird.faa.bean;

import java.util.Objects;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;


    import java.math.BigDecimal;
import javax.persistence.*;



@Entity
@Table(name = "commande_item")
public class CommandeItem    implements Archivable  {

@Id
    @SequenceGenerator(name="commande_item_seq",sequenceName="commande_item_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="commande_item_seq")
private Long id;

            private BigDecimal prix ;
            private BigDecimal quantite ;
            @Column(columnDefinition = "boolean default false")
                 private Boolean archive;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateArchivage ;

    @ManyToOne
    private Produit produit ;
    @ManyToOne
    private Commande commande ;


public CommandeItem(){
super();
}


            public Long getId(){
            return this.id;
            }
            public void setId(Long id){
            this.id = id;
            }
            public Produit getProduit(){
            return this.produit;
            }
            public void setProduit(Produit produit){
            this.produit = produit;
            }
            public BigDecimal getPrix(){
            return this.prix;
            }
            public void setPrix(BigDecimal prix){
            this.prix = prix;
            }
            public BigDecimal getQuantite(){
            return this.quantite;
            }
            public void setQuantite(BigDecimal quantite){
            this.quantite = quantite;
            }
            public Commande getCommande(){
            return this.commande;
            }
            public void setCommande(Commande commande){
            this.commande = commande;
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
        CommandeItem commandeItem = (CommandeItem) o;
        return id != null && id.equals(commandeItem.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

