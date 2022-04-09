package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.CommandeItem;


@Repository
public interface CommandeItemDao extends JpaRepository<CommandeItem,Long> {





    List<CommandeItem> findByProduitReference(String reference);
    int deleteByProduitReference(String reference);

    List<CommandeItem> findByProduitId(Long id);

    int deleteByProduitId(Long id);
    List<CommandeItem> findByCommandeReference(String reference);
    int deleteByCommandeReference(String reference);

    List<CommandeItem> findByCommandeId(Long id);

    int deleteByCommandeId(Long id);


}
