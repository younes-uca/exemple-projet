package com.ird.faa.service.chercheur.facade;

import java.util.List;
import com.ird.faa.bean.Client;
import com.ird.faa.ws.rest.provided.vo.ClientVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface ClientChercheurService extends AbstractService<Client,Long,ClientVo>{


    /**
    * find Client from database by reference (reference)
    * @param reference - reference of Client
    * @return the founded Client , If no Client were
    *         found in database return  null.
    */
    Client findByReference(String reference);

    /**
    * find Client from database by id (PK) or reference (reference)
    * @param id - id of Client
    * @param reference - reference of Client
    * @return the founded Client , If no Client were
    *         found in database return  null.
    */
    Client findByIdOrReference(Client client);


/**
    * delete Client from database
    * @param id - id of Client to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Client from database by reference (reference)
    *
    * @param reference - reference of Client to be deleted
    * @return 1 if Client deleted successfully
    */
    int deleteByReference(String reference);





}
