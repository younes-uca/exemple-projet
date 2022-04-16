package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.Commande;
import com.ird.faa.bean.Client;
import com.ird.faa.dao.CommandeDao;
import com.ird.faa.service.admin.facade.CommandeAdminService;
import com.ird.faa.service.admin.facade.PaiementAdminService;
import com.ird.faa.service.admin.facade.CommandeItemAdminService;
import com.ird.faa.service.admin.facade.ClientAdminService;

import com.ird.faa.ws.rest.provided.vo.CommandeVo;
import com.ird.faa.service.util.*;
import com.ird.faa.bean.Paiement;
import com.ird.faa.service.admin.facade.PaiementAdminService;
import com.ird.faa.bean.CommandeItem;
import com.ird.faa.service.admin.facade.CommandeItemAdminService;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommandeAdminServiceImpl extends AbstractServiceImpl<Commande> implements CommandeAdminService {

@Autowired
private CommandeDao commandeDao;

@Autowired
private ArchivableService<Commande> archivableService;
        @Autowired
        private PaiementAdminService paiementService ;
        @Autowired
        private CommandeItemAdminService commandeItemService ;
        @Autowired
        private ClientAdminService clientService ;


@Autowired
private EntityManager entityManager;


@Override
public List<Commande> findAll(){
    String query = "SELECT o FROM Commande o where 1=1 ";

    return entityManager.createQuery(query).getResultList();
}

        @Override
        public List<Commande> findByClientReference(String reference){
        return commandeDao.findByClientReference(reference);
        }

        @Override
        @Transactional
        public int deleteByClientReference(String reference){
        return commandeDao.deleteByClientReference(reference);
        }

        @Override
        public List<Commande> findByClientId(Long id){
        return commandeDao.findByClientId(id);
        }

        @Override
        @Transactional
        public int deleteByClientId(Long id){
        return commandeDao.deleteByClientId(id);
        }

    @Override
    public Commande findByReference(String reference){
    if( reference==null) return null;
    return commandeDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return commandeDao.deleteByReference(reference);
    }
    @Override
    public Commande findByIdOrReference(Commande commande){
        Commande resultat=null;
        if(commande != null){
            if(StringUtil.isNotEmpty(commande.getId())){
            resultat= commandeDao.getOne(commande.getId());
            }else if(StringUtil.isNotEmpty(commande.getReference())) {
            resultat= commandeDao.findByReference(commande.getReference());
            }
        }
    return resultat;
    }

@Override
public Commande findById(Long id){
if(id==null) return null;
return commandeDao.getOne(id);
}

@Override
public Commande findByIdWithAssociatedList(Long id){
Commande commande  = findById(id);
findAssociatedLists(commande);
return commande;
}
     @Override
    public Commande archiver(Commande commande) {
        if (commande.getArchive() == null) {
        commande.setArchive(false);
        }
        commande.setArchive(true);
        commande.setDateArchivage(new Date());
        commandeDao.save(commande);
        return commande;

    }

    @Override
    public Commande desarchiver(Commande commande) {
    if (commande.getArchive() == null) {
    commande.setArchive(false);
    }
    commande.setArchive(false);
    commande.setDateArchivage(null);
    commandeDao.save(commande);
    return commande;
    }

private void findAssociatedLists(Commande commande){
if(commande!=null && commande.getId() != null) {
        List<Paiement> paiements = paiementService.findByCommandeId(commande.getId());
        commande.setPaiements(paiements);
        List<CommandeItem> commandeItems = commandeItemService.findByCommandeId(commande.getId());
        commande.setCommandeItems(commandeItems);
}
}
private void deleteAssociatedLists(Long id){
if(id != null ) {
        paiementService.deleteByCommandeId(id);
        commandeItemService.deleteByCommandeId(id);
}
}

    private void updateAssociatedLists(Commande commande){
    if(commande !=null && commande.getId() != null){
            List<List<Paiement>> resultPaiements= paiementService.getToBeSavedAndToBeDeleted(paiementService.findByCommandeId(commande.getId()),commande.getPaiements());
            paiementService.delete(resultPaiements.get(1));
            associatePaiement(commande,resultPaiements.get(0));
            paiementService.update(resultPaiements.get(0));

            List<List<CommandeItem>> resultCommandeItems= commandeItemService.getToBeSavedAndToBeDeleted(commandeItemService.findByCommandeId(commande.getId()),commande.getCommandeItems());
            commandeItemService.delete(resultCommandeItems.get(1));
            associateCommandeItem(commande,resultCommandeItems.get(0));
            commandeItemService.update(resultCommandeItems.get(0));

    }
    }

@Transactional
public int deleteById(Long id){
int res=0;
if(!commandeDao.findById(id).isPresent())  {
deleteAssociatedLists(id);
commandeDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public Commande update(Commande commande){
Commande foundedCommande = findById(commande.getId());
if(foundedCommande==null) return null;
else{
    archivableService.prepare(commande);
    updateAssociatedLists(commande);
return  commandeDao.save(commande);
}
}


@Override
public Commande save (Commande commande){
Commande result =null;
    Commande foundedCommande = findByReference(commande.getReference());
   if(foundedCommande == null){


    findClient(commande);

Commande savedCommande = commandeDao.save(commande);

       savePaiements(savedCommande,commande.getPaiements());
       saveCommandeItems(savedCommande,commande.getCommandeItems());
result = savedCommande;
   }

return result;
}

@Override
public List<Commande> save(List<Commande> commandes){
List<Commande> list = new ArrayList<>();
for(Commande commande: commandes){
list.add(save(commande));
}
return list;
}



@Override
@Transactional
public int delete(Commande commande){
    if(commande.getReference()==null) return -1;

    Commande foundedCommande = findByReference(commande.getReference());
    if(foundedCommande==null) return -1;
commandeDao.delete(foundedCommande);
return 1;
}


public List<Commande> findByCriteria(CommandeVo commandeVo){

String query = "SELECT o FROM Commande o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",commandeVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",commandeVo.getReference());
        query += SearchUtil.addConstraintDate( "o", "dateCommande","=",commandeVo.getDateCommande());
            query += SearchUtil.addConstraint( "o", "total","=",commandeVo.getTotal());
            query += SearchUtil.addConstraint( "o", "totalPaye","=",commandeVo.getTotalPaye());
            query += SearchUtil.addConstraint( "o", "archive","=",commandeVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",commandeVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","dateCommande",commandeVo.getDateCommandeMin(),commandeVo.getDateCommandeMax());
            query += SearchUtil.addConstraintMinMax("o","total",commandeVo.getTotalMin(),commandeVo.getTotalMax());
            query += SearchUtil.addConstraintMinMax("o","totalPaye",commandeVo.getTotalPayeMin(),commandeVo.getTotalPayeMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",commandeVo.getDateArchivageMin(),commandeVo.getDateArchivageMax());
    if(commandeVo.getClientVo()!=null){
        query += SearchUtil.addConstraint( "o", "client.id","=",commandeVo.getClientVo().getId());
            query += SearchUtil.addConstraint( "o", "client.reference","LIKE",commandeVo.getClientVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}
        private  void savePaiements(Commande commande,List<Paiement> paiements){

        if (ListUtil.isNotEmpty(commande.getPaiements())) {
        List<Paiement> savedPaiements = new ArrayList<>();
        paiements.forEach(element -> {
        element.setCommande(commande);
        paiementService.save(element);
        });
        commande.setPaiements(savedPaiements);
        }
        }
        private  void saveCommandeItems(Commande commande,List<CommandeItem> commandeItems){

        if (ListUtil.isNotEmpty(commande.getCommandeItems())) {
        List<CommandeItem> savedCommandeItems = new ArrayList<>();
        commandeItems.forEach(element -> {
        element.setCommande(commande);
        commandeItemService.save(element);
        });
        commande.setCommandeItems(savedCommandeItems);
        }
        }

    private void findClient(Commande commande){
        Client loadedClient =clientService.findByIdOrReference(commande.getClient());

    if(loadedClient==null ) {
        return;
    }
    commande.setClient(loadedClient);
    }

@Override
@Transactional
public void delete(List<Commande> commandes){
        if(ListUtil.isNotEmpty(commandes)){
        commandes.forEach(e->commandeDao.delete(e));
        }
}
@Override
public void update(List<Commande> commandes){
if(ListUtil.isNotEmpty(commandes)){
commandes.forEach(e->commandeDao.save(e));
}
}

private void associatePaiement(Commande commande, List<Paiement> paiement) {
    if (ListUtil.isNotEmpty(paiement)) {
        paiement.forEach(e -> e.setCommande(commande));
    }
    }
private void associateCommandeItem(Commande commande, List<CommandeItem> commandeItem) {
    if (ListUtil.isNotEmpty(commandeItem)) {
        commandeItem.forEach(e -> e.setCommande(commande));
    }
    }


}
