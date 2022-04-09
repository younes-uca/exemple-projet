package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.CategorieProduit;
import com.ird.faa.ws.rest.provided.vo.CategorieProduitVo;

@Component
public class CategorieProduitConverter extends AbstractConverter<CategorieProduit,CategorieProduitVo>{


public  CategorieProduitConverter(){
init(true);
}

@Override
public CategorieProduit toItem(CategorieProduitVo vo) {
if (vo == null) {
return null;
} else {
CategorieProduit item = new CategorieProduit();
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


return item;
}
}

@Override
public CategorieProduitVo toVo(CategorieProduit item) {
if (item == null) {
return null;
} else {
CategorieProduitVo vo = new CategorieProduitVo();
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

return vo;
}
}

public void init(Boolean value) {
}













}
