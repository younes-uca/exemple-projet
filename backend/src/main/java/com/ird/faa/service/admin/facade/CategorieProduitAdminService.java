package com.ird.faa.service.admin.facade;

import java.util.List;
import com.ird.faa.bean.CategorieProduit;
import com.ird.faa.ws.rest.provided.vo.CategorieProduitVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CategorieProduitAdminService extends AbstractService<CategorieProduit,Long,CategorieProduitVo>{


    /**
    * find CategorieProduit from database by reference (reference)
    * @param reference - reference of CategorieProduit
    * @return the founded CategorieProduit , If no CategorieProduit were
    *         found in database return  null.
    */
    CategorieProduit findByReference(String reference);

    /**
    * find CategorieProduit from database by id (PK) or reference (reference)
    * @param id - id of CategorieProduit
    * @param reference - reference of CategorieProduit
    * @return the founded CategorieProduit , If no CategorieProduit were
    *         found in database return  null.
    */
    CategorieProduit findByIdOrReference(CategorieProduit categorieProduit);


/**
    * delete CategorieProduit from database
    * @param id - id of CategorieProduit to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete CategorieProduit from database by reference (reference)
    *
    * @param reference - reference of CategorieProduit to be deleted
    * @return 1 if CategorieProduit deleted successfully
    */
    int deleteByReference(String reference);




    CategorieProduit archiver(CategorieProduit categorieProduit) ;
    CategorieProduit desarchiver(CategorieProduit categorieProduit);

}
