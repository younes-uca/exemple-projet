package com.ird.faa.service.chercheur.impl;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.Client;
import com.ird.faa.dao.ClientDao;
import com.ird.faa.service.chercheur.facade.ClientChercheurService;

import com.ird.faa.ws.rest.provided.vo.ClientVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ClientChercheurServiceImpl extends AbstractServiceImpl<Client> implements ClientChercheurService {

@Autowired
private ClientDao clientDao;

@Autowired
private ArchivableService<Client> archivableService;


@Autowired
private EntityManager entityManager;


@Override
public List<Client> findAll(){
return clientDao.findAll();
}
    @Override
    public Client findByReference(String reference){
    if( reference==null) return null;
    return clientDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return clientDao.deleteByReference(reference);
    }
    @Override
    public Client findByIdOrReference(Client client){
        Client resultat=null;
        if(client != null){
            if(StringUtil.isNotEmpty(client.getId())){
            resultat= clientDao.getOne(client.getId());
            }else if(StringUtil.isNotEmpty(client.getReference())) {
            resultat= clientDao.findByReference(client.getReference());
            }
        }
    return resultat;
    }

@Override
public Client findById(Long id){
if(id==null) return null;
return clientDao.getOne(id);
}

@Override
public Client findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(!clientDao.findById(id).isPresent())  {
clientDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public Client update(Client client){
Client foundedClient = findById(client.getId());
if(foundedClient==null) return null;
else{
    archivableService.prepare(client);
return  clientDao.save(client);
}
}


@Override
public Client save (Client client){
Client result =null;
    Client foundedClient = findByReference(client.getReference());
   if(foundedClient == null){



Client savedClient = clientDao.save(client);

result = savedClient;
   }

return result;
}

@Override
public List<Client> save(List<Client> clients){
List<Client> list = new ArrayList<>();
for(Client client: clients){
list.add(save(client));
}
return list;
}



@Override
@Transactional
public int delete(Client client){
    if(client.getReference()==null) return -1;

    Client foundedClient = findByReference(client.getReference());
    if(foundedClient==null) return -1;
clientDao.delete(foundedClient);
return 1;
}


public List<Client> findByCriteria(ClientVo clientVo){

String query = "SELECT o FROM Client o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",clientVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",clientVo.getReference());
            query += SearchUtil.addConstraint( "o", "cin","LIKE",clientVo.getCin());
            query += SearchUtil.addConstraint( "o", "nom","LIKE",clientVo.getNom());
            query += SearchUtil.addConstraint( "o", "prenom","LIKE",clientVo.getPrenom());
            query += SearchUtil.addConstraint( "o", "archive","=",clientVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",clientVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",clientVo.getDateArchivageMin(),clientVo.getDateArchivageMax());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<Client> clients){
        if(ListUtil.isNotEmpty(clients)){
        clients.forEach(e->clientDao.delete(e));
        }
}
@Override
public void update(List<Client> clients){
if(ListUtil.isNotEmpty(clients)){
clients.forEach(e->clientDao.save(e));
}
}



}
