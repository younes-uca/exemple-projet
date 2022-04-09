package com.ird.faa.service.chercheur.facade;

import java.util.List;
import com.ird.faa.bean.CommandeItem;
import com.ird.faa.ws.rest.provided.vo.CommandeItemVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommandeItemChercheurService extends AbstractService<CommandeItem,Long,CommandeItemVo>{




/**
    * delete CommandeItem from database
    * @param id - id of CommandeItem to be deleted
    *
    */
    int deleteById(Long id);


    List<CommandeItem> findByProduitReference(String reference);

    int deleteByProduitReference(String reference);

    List<CommandeItem> findByProduitId(Long id);

    int deleteByProduitId(Long id);
    List<CommandeItem> findByCommandeReference(String reference);

    int deleteByCommandeReference(String reference);

    List<CommandeItem> findByCommandeId(Long id);

    int deleteByCommandeId(Long id);







}
