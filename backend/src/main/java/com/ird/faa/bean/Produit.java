package com.ird.faa.bean;

import java.util.Objects;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;


import javax.persistence.*;



@Entity
@Table(name = "produit")
public class Produit    implements Archivable  {

@Id
    @SequenceGenerator(name="produit_seq",sequenceName="produit_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="produit_seq")
private Long id;

            private String reference ;
            @Column(length = 500)
            private String libelle;
            @Column(columnDefinition = "boolean default false")
                 private Boolean archive;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateArchivage ;

    @ManyToOne
    private CategorieProduit categorieProduit ;


public Produit(){
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
            public String getLibelle(){
            return this.libelle;
            }
            public void setLibelle(String libelle){
            this.libelle = libelle;
            }
            public CategorieProduit getCategorieProduit(){
            return this.categorieProduit;
            }
            public void setCategorieProduit(CategorieProduit categorieProduit){
            this.categorieProduit = categorieProduit;
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
        Produit produit = (Produit) o;
        return id != null && id.equals(produit.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

