package com.ird.faa.service.admin.facade;

import java.util.List;
import com.ird.faa.bean.Commande;
import com.ird.faa.ws.rest.provided.vo.CommandeVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommandeAdminService extends AbstractService<Commande,Long,CommandeVo>{


    /**
    * find Commande from database by reference (reference)
    * @param reference - reference of Commande
    * @return the founded Commande , If no Commande were
    *         found in database return  null.
    */
    Commande findByReference(String reference);

    /**
    * find Commande from database by id (PK) or reference (reference)
    * @param id - id of Commande
    * @param reference - reference of Commande
    * @return the founded Commande , If no Commande were
    *         found in database return  null.
    */
    Commande findByIdOrReference(Commande commande);


/**
    * delete Commande from database
    * @param id - id of Commande to be deleted
    *
    */
    int deleteById(Long id);


    List<Commande> findByClientReference(String reference);

    int deleteByClientReference(String reference);

    List<Commande> findByClientId(Long id);

    int deleteByClientId(Long id);


    /**
    * delete Commande from database by reference (reference)
    *
    * @param reference - reference of Commande to be deleted
    * @return 1 if Commande deleted successfully
    */
    int deleteByReference(String reference);




    Commande archiver(Commande commande) ;
    Commande desarchiver(Commande commande);

}
