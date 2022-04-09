package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Produit;


@Repository
public interface ProduitDao extends JpaRepository<Produit,Long> {




    Produit findByReference(String reference);

    int deleteByReference(String reference);

    List<Produit> findByCategorieProduitReference(String reference);
    int deleteByCategorieProduitReference(String reference);

    List<Produit> findByCategorieProduitId(Long id);

    int deleteByCategorieProduitId(Long id);


}
