package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.Paiement;


@Repository
public interface PaiementDao extends JpaRepository<Paiement,Long> {




    Paiement findByReference(String reference);

    int deleteByReference(String reference);

    List<Paiement> findByCommandeReference(String reference);
    int deleteByCommandeReference(String reference);

    List<Paiement> findByCommandeId(Long id);

    int deleteByCommandeId(Long id);


}
