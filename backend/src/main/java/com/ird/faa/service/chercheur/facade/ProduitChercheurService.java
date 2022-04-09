package com.ird.faa.service.chercheur.facade;

import java.util.List;
import com.ird.faa.bean.Produit;
import com.ird.faa.ws.rest.provided.vo.ProduitVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ProduitChercheurService extends AbstractService<Produit,Long,ProduitVo>{


    /**
    * find Produit from database by reference (reference)
    * @param reference - reference of Produit
    * @return the founded Produit , If no Produit were
    *         found in database return  null.
    */
    Produit findByReference(String reference);

    /**
    * find Produit from database by id (PK) or reference (reference)
    * @param id - id of Produit
    * @param reference - reference of Produit
    * @return the founded Produit , If no Produit were
    *         found in database return  null.
    */
    Produit findByIdOrReference(Produit produit);


/**
    * delete Produit from database
    * @param id - id of Produit to be deleted
    *
    */
    int deleteById(Long id);


    List<Produit> findByCategorieProduitReference(String reference);

    int deleteByCategorieProduitReference(String reference);

    List<Produit> findByCategorieProduitId(Long id);

    int deleteByCategorieProduitId(Long id);


    /**
    * delete Produit from database by reference (reference)
    *
    * @param reference - reference of Produit to be deleted
    * @return 1 if Produit deleted successfully
    */
    int deleteByReference(String reference);





}
