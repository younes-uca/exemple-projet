package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.Paiement;
import com.ird.faa.bean.Commande;
import com.ird.faa.dao.PaiementDao;
import com.ird.faa.service.admin.facade.PaiementAdminService;
import com.ird.faa.service.admin.facade.CommandeAdminService;

import com.ird.faa.ws.rest.provided.vo.PaiementVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class PaiementAdminServiceImpl extends AbstractServiceImpl<Paiement> implements PaiementAdminService {

@Autowired
private PaiementDao paiementDao;

@Autowired
private ArchivableService<Paiement> archivableService;
        @Autowired
        private CommandeAdminService commandeService ;


@Autowired
private EntityManager entityManager;


@Override
public List<Paiement> findAll(){
    String query = "SELECT o FROM Paiement o where 1=1 ";
    query+= " AND o.archive != true";
    return entityManager.createQuery(query).getResultList();
}

        @Override
        public List<Paiement> findByCommandeReference(String reference){
        return paiementDao.findByCommandeReference(reference);
        }

        @Override
        @Transactional
        public int deleteByCommandeReference(String reference){
        return paiementDao.deleteByCommandeReference(reference);
        }

        @Override
        public List<Paiement> findByCommandeId(Long id){
        return paiementDao.findByCommandeId(id);
        }

        @Override
        @Transactional
        public int deleteByCommandeId(Long id){
        return paiementDao.deleteByCommandeId(id);
        }

    @Override
    public Paiement findByReference(String reference){
    if( reference==null) return null;
    return paiementDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return paiementDao.deleteByReference(reference);
    }
    @Override
    public Paiement findByIdOrReference(Paiement paiement){
        Paiement resultat=null;
        if(paiement != null){
            if(StringUtil.isNotEmpty(paiement.getId())){
            resultat= paiementDao.getOne(paiement.getId());
            }else if(StringUtil.isNotEmpty(paiement.getReference())) {
            resultat= paiementDao.findByReference(paiement.getReference());
            }
        }
    return resultat;
    }

@Override
public Paiement findById(Long id){
if(id==null) return null;
return paiementDao.getOne(id);
}

@Override
public Paiement findByIdWithAssociatedList(Long id){
return findById(id);
}
     @Override
    public Paiement archiver(Paiement paiement) {
        if (paiement.getArchive() == null) {
        paiement.setArchive(false);
        }
        paiement.setArchive(true);
        paiement.setDateArchivage(new Date());
        paiementDao.save(paiement);
        return paiement;

    }

    @Override
    public Paiement desarchiver(Paiement paiement) {
    if (paiement.getArchive() == null) {
    paiement.setArchive(false);
    }
    paiement.setArchive(false);
    paiement.setDateArchivage(null);
    paiementDao.save(paiement);
    return paiement;
    }



@Transactional
public int deleteById(Long id){
int res=0;
if(!paiementDao.findById(id).isPresent())  {
paiementDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public Paiement update(Paiement paiement){
Paiement foundedPaiement = findById(paiement.getId());
if(foundedPaiement==null) return null;
else{
    archivableService.prepare(paiement);
return  paiementDao.save(paiement);
}
}


@Override
public Paiement save (Paiement paiement){
Paiement result =null;
    Paiement foundedPaiement = findByReference(paiement.getReference());
   if(foundedPaiement == null){


    findCommande(paiement);

Paiement savedPaiement = paiementDao.save(paiement);

result = savedPaiement;
   }

return result;
}

@Override
public List<Paiement> save(List<Paiement> paiements){
List<Paiement> list = new ArrayList<>();
for(Paiement paiement: paiements){
list.add(save(paiement));
}
return list;
}



@Override
@Transactional
public int delete(Paiement paiement){
    if(paiement.getReference()==null) return -1;

    Paiement foundedPaiement = findByReference(paiement.getReference());
    if(foundedPaiement==null) return -1;
paiementDao.delete(foundedPaiement);
return 1;
}


public List<Paiement> findByCriteria(PaiementVo paiementVo){

String query = "SELECT o FROM Paiement o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",paiementVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",paiementVo.getReference());
        query += SearchUtil.addConstraintDate( "o", "datePaiement","=",paiementVo.getDatePaiement());
            query += SearchUtil.addConstraint( "o", "montant","=",paiementVo.getMontant());
            query += SearchUtil.addConstraint( "o", "archive","=",paiementVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",paiementVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","datePaiement",paiementVo.getDatePaiementMin(),paiementVo.getDatePaiementMax());
            query += SearchUtil.addConstraintMinMax("o","montant",paiementVo.getMontantMin(),paiementVo.getMontantMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",paiementVo.getDateArchivageMin(),paiementVo.getDateArchivageMax());
    if(paiementVo.getCommandeVo()!=null){
        query += SearchUtil.addConstraint( "o", "commande.id","=",paiementVo.getCommandeVo().getId());
            query += SearchUtil.addConstraint( "o", "commande.reference","LIKE",paiementVo.getCommandeVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCommande(Paiement paiement){
        Commande loadedCommande =commandeService.findByIdOrReference(paiement.getCommande());

    if(loadedCommande==null ) {
        return;
    }
    paiement.setCommande(loadedCommande);
    }

@Override
@Transactional
public void delete(List<Paiement> paiements){
        if(ListUtil.isNotEmpty(paiements)){
        paiements.forEach(e->paiementDao.delete(e));
        }
}
@Override
public void update(List<Paiement> paiements){
if(ListUtil.isNotEmpty(paiements)){
paiements.forEach(e->paiementDao.save(e));
}
}



}
