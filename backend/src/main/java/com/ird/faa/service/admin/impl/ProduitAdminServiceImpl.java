package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.Produit;
import com.ird.faa.bean.CategorieProduit;
import com.ird.faa.dao.ProduitDao;
import com.ird.faa.service.admin.facade.ProduitAdminService;
import com.ird.faa.service.admin.facade.CategorieProduitAdminService;

import com.ird.faa.ws.rest.provided.vo.ProduitVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class ProduitAdminServiceImpl extends AbstractServiceImpl<Produit> implements ProduitAdminService {

@Autowired
private ProduitDao produitDao;

@Autowired
private ArchivableService<Produit> archivableService;
        @Autowired
        private CategorieProduitAdminService categorieProduitService ;


@Autowired
private EntityManager entityManager;


@Override
public List<Produit> findAll(){
    String query = "SELECT o FROM Produit o where 1=1 ";
    query+= " AND o.archive != true";
    return entityManager.createQuery(query).getResultList();
}

        @Override
        public List<Produit> findByCategorieProduitReference(String reference){
        return produitDao.findByCategorieProduitReference(reference);
        }

        @Override
        @Transactional
        public int deleteByCategorieProduitReference(String reference){
        return produitDao.deleteByCategorieProduitReference(reference);
        }

        @Override
        public List<Produit> findByCategorieProduitId(Long id){
        return produitDao.findByCategorieProduitId(id);
        }

        @Override
        @Transactional
        public int deleteByCategorieProduitId(Long id){
        return produitDao.deleteByCategorieProduitId(id);
        }

    @Override
    public Produit findByReference(String reference){
    if( reference==null) return null;
    return produitDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return produitDao.deleteByReference(reference);
    }
    @Override
    public Produit findByIdOrReference(Produit produit){
        Produit resultat=null;
        if(produit != null){
            if(StringUtil.isNotEmpty(produit.getId())){
            resultat= produitDao.getOne(produit.getId());
            }else if(StringUtil.isNotEmpty(produit.getReference())) {
            resultat= produitDao.findByReference(produit.getReference());
            }
        }
    return resultat;
    }

@Override
public Produit findById(Long id){
if(id==null) return null;
return produitDao.getOne(id);
}

@Override
public Produit findByIdWithAssociatedList(Long id){
return findById(id);
}
     @Override
    public Produit archiver(Produit produit) {
        if (produit.getArchive() == null) {
        produit.setArchive(false);
        }
        produit.setArchive(true);
        produit.setDateArchivage(new Date());
        produitDao.save(produit);
        return produit;

    }

    @Override
    public Produit desarchiver(Produit produit) {
    if (produit.getArchive() == null) {
    produit.setArchive(false);
    }
    produit.setArchive(false);
    produit.setDateArchivage(null);
    produitDao.save(produit);
    return produit;
    }



@Transactional
public int deleteById(Long id){
int res=0;
if(!produitDao.findById(id).isPresent())  {
produitDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public Produit update(Produit produit){
Produit foundedProduit = findById(produit.getId());
if(foundedProduit==null) return null;
else{
    archivableService.prepare(produit);
return  produitDao.save(produit);
}
}


@Override
public Produit save (Produit produit){
Produit result =null;
    Produit foundedProduit = findByReference(produit.getReference());
   if(foundedProduit == null){


    findCategorieProduit(produit);

Produit savedProduit = produitDao.save(produit);

result = savedProduit;
   }

return result;
}

@Override
public List<Produit> save(List<Produit> produits){
List<Produit> list = new ArrayList<>();
for(Produit produit: produits){
list.add(save(produit));
}
return list;
}



@Override
@Transactional
public int delete(Produit produit){
    if(produit.getReference()==null) return -1;

    Produit foundedProduit = findByReference(produit.getReference());
    if(foundedProduit==null) return -1;
produitDao.delete(foundedProduit);
return 1;
}


public List<Produit> findByCriteria(ProduitVo produitVo){

String query = "SELECT o FROM Produit o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",produitVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",produitVo.getReference());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",produitVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "archive","=",produitVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",produitVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",produitVo.getDateArchivageMin(),produitVo.getDateArchivageMax());
    if(produitVo.getCategorieProduitVo()!=null){
        query += SearchUtil.addConstraint( "o", "categorieProduit.id","=",produitVo.getCategorieProduitVo().getId());
            query += SearchUtil.addConstraint( "o", "categorieProduit.reference","LIKE",produitVo.getCategorieProduitVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCategorieProduit(Produit produit){
        CategorieProduit loadedCategorieProduit =categorieProduitService.findByIdOrReference(produit.getCategorieProduit());

    if(loadedCategorieProduit==null ) {
        return;
    }
    produit.setCategorieProduit(loadedCategorieProduit);
    }

@Override
@Transactional
public void delete(List<Produit> produits){
        if(ListUtil.isNotEmpty(produits)){
        produits.forEach(e->produitDao.delete(e));
        }
}
@Override
public void update(List<Produit> produits){
if(ListUtil.isNotEmpty(produits)){
produits.forEach(e->produitDao.save(e));
}
}



}
