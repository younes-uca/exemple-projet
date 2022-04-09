package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.Produit;
import com.ird.faa.ws.rest.provided.vo.ProduitVo;

@Component
public class ProduitConverter extends AbstractConverter<Produit,ProduitVo>{

        @Autowired
        private CategorieProduitConverter categorieProduitConverter ;
    private Boolean categorieProduit;

public  ProduitConverter(){
init(true);
}

@Override
public Produit toItem(ProduitVo vo) {
if (vo == null) {
return null;
} else {
Produit item = new Produit();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getReference()))
        item.setReference(vo.getReference());
        if(StringUtil.isNotEmpty(vo.getLibelle()))
        item.setLibelle(vo.getLibelle());
            if(vo.getArchive() != null)
            item.setArchive(vo.getArchive());
        if(StringUtil.isNotEmpty(vo.getDateArchivage()))
        item.setDateArchivage(DateUtil.parse(vo.getDateArchivage()));
    if(vo.getCategorieProduitVo()!=null && this.categorieProduit)
        item.setCategorieProduit(categorieProduitConverter.toItem(vo.getCategorieProduitVo())) ;


return item;
}
}

@Override
public ProduitVo toVo(Produit item) {
if (item == null) {
return null;
} else {
ProduitVo vo = new ProduitVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(StringUtil.isNotEmpty(item.getReference()))
        vo.setReference(item.getReference());

        if(StringUtil.isNotEmpty(item.getLibelle()))
        vo.setLibelle(item.getLibelle());

        if(item.getArchive()!=null)
        vo.setArchive(item.getArchive());
        if(item.getDateArchivage()!=null)
        vo.setDateArchivage(DateUtil.formateDate(item.getDateArchivage()));
    if(item.getCategorieProduit()!=null && this.categorieProduit) {
        vo.setCategorieProduitVo(categorieProduitConverter.toVo(item.getCategorieProduit())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    categorieProduit = value;
}


        public CategorieProduitConverter getCategorieProduitConverter(){
        return this.categorieProduitConverter;
        }
        public void setCategorieProduitConverter(CategorieProduitConverter categorieProduitConverter ){
        this.categorieProduitConverter = categorieProduitConverter;
        }

    public boolean  isCategorieProduit(){
    return this.categorieProduit;
    }
    public void  setCategorieProduit(boolean categorieProduit){
    this.categorieProduit = categorieProduit;
    }












}
