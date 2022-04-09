package com.ird.faa.bean;

import java.util.Objects;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;


    import java.math.BigDecimal;
import javax.persistence.*;



@Entity
@Table(name = "paiement")
public class Paiement    implements Archivable  {

@Id
    @SequenceGenerator(name="paiement_seq",sequenceName="paiement_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="paiement_seq")
private Long id;

            private String reference ;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date datePaiement ;
            private BigDecimal montant ;
            @Column(columnDefinition = "boolean default false")
                 private Boolean archive;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateArchivage ;

    @ManyToOne
    private Commande commande ;


public Paiement(){
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
            public Date getDatePaiement(){
            return this.datePaiement;
            }
            public void setDatePaiement(Date datePaiement){
            this.datePaiement = datePaiement;
            }
            public BigDecimal getMontant(){
            return this.montant;
            }
            public void setMontant(BigDecimal montant){
            this.montant = montant;
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
        Paiement paiement = (Paiement) o;
        return id != null && id.equals(paiement.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

