package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.CommandeItem;
import com.ird.faa.bean.Produit;
import com.ird.faa.bean.Commande;
import com.ird.faa.dao.CommandeItemDao;
import com.ird.faa.service.admin.facade.CommandeItemAdminService;
import com.ird.faa.service.admin.facade.CommandeAdminService;
import com.ird.faa.service.admin.facade.ProduitAdminService;

import com.ird.faa.ws.rest.provided.vo.CommandeItemVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommandeItemAdminServiceImpl extends AbstractServiceImpl<CommandeItem> implements CommandeItemAdminService {

@Autowired
private CommandeItemDao commandeItemDao;

@Autowired
private ArchivableService<CommandeItem> archivableService;
        @Autowired
        private CommandeAdminService commandeService ;
        @Autowired
        private ProduitAdminService produitService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommandeItem> findAll(){
    String query = "SELECT o FROM CommandeItem o where 1=1 ";

    return entityManager.createQuery(query).getResultList();
}

        @Override
        public List<CommandeItem> findByProduitReference(String reference){
        return commandeItemDao.findByProduitReference(reference);
        }

        @Override
        @Transactional
        public int deleteByProduitReference(String reference){
        return commandeItemDao.deleteByProduitReference(reference);
        }

        @Override
        public List<CommandeItem> findByProduitId(Long id){
        return commandeItemDao.findByProduitId(id);
        }

        @Override
        @Transactional
        public int deleteByProduitId(Long id){
        return commandeItemDao.deleteByProduitId(id);
        }


        @Override
        public List<CommandeItem> findByCommandeReference(String reference){
        return commandeItemDao.findByCommandeReference(reference);
        }

        @Override
        @Transactional
        public int deleteByCommandeReference(String reference){
        return commandeItemDao.deleteByCommandeReference(reference);
        }

        @Override
        public List<CommandeItem> findByCommandeId(Long id){
        return commandeItemDao.findByCommandeId(id);
        }

        @Override
        @Transactional
        public int deleteByCommandeId(Long id){
        return commandeItemDao.deleteByCommandeId(id);
        }


@Override
public CommandeItem findById(Long id){
if(id==null) return null;
return commandeItemDao.getOne(id);
}

@Override
public CommandeItem findByIdWithAssociatedList(Long id){
return findById(id);
}
     @Override
    public CommandeItem archiver(CommandeItem commandeItem) {
        if (commandeItem.getArchive() == null) {
        commandeItem.setArchive(false);
        }
        commandeItem.setArchive(true);
        commandeItem.setDateArchivage(new Date());
        commandeItemDao.save(commandeItem);
        return commandeItem;

    }

    @Override
    public CommandeItem desarchiver(CommandeItem commandeItem) {
    if (commandeItem.getArchive() == null) {
    commandeItem.setArchive(false);
    }
    commandeItem.setArchive(false);
    commandeItem.setDateArchivage(null);
    commandeItemDao.save(commandeItem);
    return commandeItem;
    }



@Transactional
public int deleteById(Long id){
int res=0;
if(!commandeItemDao.findById(id).isPresent())  {
commandeItemDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public CommandeItem update(CommandeItem commandeItem){
CommandeItem foundedCommandeItem = findById(commandeItem.getId());
if(foundedCommandeItem==null) return null;
else{
    archivableService.prepare(commandeItem);
return  commandeItemDao.save(commandeItem);
}
}


@Override
public CommandeItem save (CommandeItem commandeItem){


    findProduit(commandeItem);
    findCommande(commandeItem);

return commandeItemDao.save(commandeItem);


}

@Override
public List<CommandeItem> save(List<CommandeItem> commandeItems){
List<CommandeItem> list = new ArrayList<>();
for(CommandeItem commandeItem: commandeItems){
list.add(save(commandeItem));
}
return list;
}



@Override
@Transactional
public int delete(CommandeItem commandeItem){
    if(commandeItem.getId()==null) return -1;
    CommandeItem foundedCommandeItem = findById(commandeItem.getId());
    if(foundedCommandeItem==null) return -1;
commandeItemDao.delete(foundedCommandeItem);
return 1;
}


public List<CommandeItem> findByCriteria(CommandeItemVo commandeItemVo){

String query = "SELECT o FROM CommandeItem o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",commandeItemVo.getId());
            query += SearchUtil.addConstraint( "o", "prix","=",commandeItemVo.getPrix());
            query += SearchUtil.addConstraint( "o", "quantite","=",commandeItemVo.getQuantite());
            query += SearchUtil.addConstraint( "o", "archive","=",commandeItemVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",commandeItemVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMax("o","prix",commandeItemVo.getPrixMin(),commandeItemVo.getPrixMax());
            query += SearchUtil.addConstraintMinMax("o","quantite",commandeItemVo.getQuantiteMin(),commandeItemVo.getQuantiteMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",commandeItemVo.getDateArchivageMin(),commandeItemVo.getDateArchivageMax());
    if(commandeItemVo.getProduitVo()!=null){
        query += SearchUtil.addConstraint( "o", "produit.id","=",commandeItemVo.getProduitVo().getId());
            query += SearchUtil.addConstraint( "o", "produit.reference","LIKE",commandeItemVo.getProduitVo().getReference());
    }

    if(commandeItemVo.getCommandeVo()!=null){
        query += SearchUtil.addConstraint( "o", "commande.id","=",commandeItemVo.getCommandeVo().getId());
            query += SearchUtil.addConstraint( "o", "commande.reference","LIKE",commandeItemVo.getCommandeVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findProduit(CommandeItem commandeItem){
        Produit loadedProduit =produitService.findByIdOrReference(commandeItem.getProduit());

    if(loadedProduit==null ) {
        return;
    }
    commandeItem.setProduit(loadedProduit);
    }
    private void findCommande(CommandeItem commandeItem){
        Commande loadedCommande =commandeService.findByIdOrReference(commandeItem.getCommande());

    if(loadedCommande==null ) {
        return;
    }
    commandeItem.setCommande(loadedCommande);
    }

@Override
@Transactional
public void delete(List<CommandeItem> commandeItems){
        if(ListUtil.isNotEmpty(commandeItems)){
        commandeItems.forEach(e->commandeItemDao.delete(e));
        }
}
@Override
public void update(List<CommandeItem> commandeItems){
if(ListUtil.isNotEmpty(commandeItems)){
commandeItems.forEach(e->commandeItemDao.save(e));
}
}



}
