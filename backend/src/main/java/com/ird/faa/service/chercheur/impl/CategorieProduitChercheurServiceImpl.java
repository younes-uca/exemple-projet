package com.ird.faa.service.chercheur.impl;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.CategorieProduit;
import com.ird.faa.dao.CategorieProduitDao;
import com.ird.faa.service.chercheur.facade.CategorieProduitChercheurService;

import com.ird.faa.ws.rest.provided.vo.CategorieProduitVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CategorieProduitChercheurServiceImpl extends AbstractServiceImpl<CategorieProduit> implements CategorieProduitChercheurService {

@Autowired
private CategorieProduitDao categorieProduitDao;

@Autowired
private ArchivableService<CategorieProduit> archivableService;


@Autowired
private EntityManager entityManager;


@Override
public List<CategorieProduit> findAll(){
return categorieProduitDao.findAll();
}
    @Override
    public CategorieProduit findByReference(String reference){
    if( reference==null) return null;
    return categorieProduitDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return categorieProduitDao.deleteByReference(reference);
    }
    @Override
    public CategorieProduit findByIdOrReference(CategorieProduit categorieProduit){
        CategorieProduit resultat=null;
        if(categorieProduit != null){
            if(StringUtil.isNotEmpty(categorieProduit.getId())){
            resultat= categorieProduitDao.getOne(categorieProduit.getId());
            }else if(StringUtil.isNotEmpty(categorieProduit.getReference())) {
            resultat= categorieProduitDao.findByReference(categorieProduit.getReference());
            }
        }
    return resultat;
    }

@Override
public CategorieProduit findById(Long id){
if(id==null) return null;
return categorieProduitDao.getOne(id);
}

@Override
public CategorieProduit findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(!categorieProduitDao.findById(id).isPresent())  {
categorieProduitDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public CategorieProduit update(CategorieProduit categorieProduit){
CategorieProduit foundedCategorieProduit = findById(categorieProduit.getId());
if(foundedCategorieProduit==null) return null;
else{
    archivableService.prepare(categorieProduit);
return  categorieProduitDao.save(categorieProduit);
}
}


@Override
public CategorieProduit save (CategorieProduit categorieProduit){
CategorieProduit result =null;
    CategorieProduit foundedCategorieProduit = findByReference(categorieProduit.getReference());
   if(foundedCategorieProduit == null){



CategorieProduit savedCategorieProduit = categorieProduitDao.save(categorieProduit);

result = savedCategorieProduit;
   }

return result;
}

@Override
public List<CategorieProduit> save(List<CategorieProduit> categorieProduits){
List<CategorieProduit> list = new ArrayList<>();
for(CategorieProduit categorieProduit: categorieProduits){
list.add(save(categorieProduit));
}
return list;
}



@Override
@Transactional
public int delete(CategorieProduit categorieProduit){
    if(categorieProduit.getReference()==null) return -1;

    CategorieProduit foundedCategorieProduit = findByReference(categorieProduit.getReference());
    if(foundedCategorieProduit==null) return -1;
categorieProduitDao.delete(foundedCategorieProduit);
return 1;
}


public List<CategorieProduit> findByCriteria(CategorieProduitVo categorieProduitVo){

String query = "SELECT o FROM CategorieProduit o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",categorieProduitVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",categorieProduitVo.getReference());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",categorieProduitVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "archive","=",categorieProduitVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",categorieProduitVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",categorieProduitVo.getDateArchivageMin(),categorieProduitVo.getDateArchivageMax());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<CategorieProduit> categorieProduits){
        if(ListUtil.isNotEmpty(categorieProduits)){
        categorieProduits.forEach(e->categorieProduitDao.delete(e));
        }
}
@Override
public void update(List<CategorieProduit> categorieProduits){
if(ListUtil.isNotEmpty(categorieProduits)){
categorieProduits.forEach(e->categorieProduitDao.save(e));
}
}



}
