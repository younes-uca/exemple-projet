package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Commande;


@Repository
public interface CommandeDao extends JpaRepository<Commande,Long> {




    Commande findByReference(String reference);

    int deleteByReference(String reference);

    List<Commande> findByClientReference(String reference);
    int deleteByClientReference(String reference);

    List<Commande> findByClientId(Long id);

    int deleteByClientId(Long id);


}
