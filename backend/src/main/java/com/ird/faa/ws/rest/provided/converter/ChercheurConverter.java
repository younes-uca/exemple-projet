package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.Chercheur;
import com.ird.faa.ws.rest.provided.vo.ChercheurVo;

@Component
public class ChercheurConverter extends AbstractConverter<Chercheur,ChercheurVo>{


public  ChercheurConverter(){
init(true);
}

@Override
public Chercheur toItem(ChercheurVo vo) {
if (vo == null) {
return null;
} else {
Chercheur item = new Chercheur();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getNumeroMatricule()))
        item.setNumeroMatricule(vo.getNumeroMatricule());
        if(StringUtil.isNotEmpty(vo.getEmailPrincipale()))
        item.setEmailPrincipale(vo.getEmailPrincipale());
        if(StringUtil.isNotEmpty(vo.getResume()))
        item.setResume(vo.getResume());
            if(vo.getFormationEnManagement() != null)
            item.setFormationEnManagement(vo.getFormationEnManagement());
            item.setCredentialsNonExpired(vo.getCredentialsNonExpired());
            item.setEnabled(vo.getEnabled());
            item.setAccountNonExpired(vo.getAccountNonExpired());
            item.setAccountNonLocked(vo.getAccountNonLocked());
            item.setPasswordChanged(vo.getPasswordChanged());
        if(StringUtil.isNotEmpty(vo.getCreatedAt()))
        item.setCreatedAt(DateUtil.parse(vo.getCreatedAt()));
        if(StringUtil.isNotEmpty(vo.getUpdatedAt()))
        item.setUpdatedAt(DateUtil.parse(vo.getUpdatedAt()));
        if(StringUtil.isNotEmpty(vo.getUsername()))
        item.setUsername(vo.getUsername());
        if(StringUtil.isNotEmpty(vo.getPassword()))
        item.setPassword(vo.getPassword());
        if(StringUtil.isNotEmpty(vo.getPrenom()))
        item.setPrenom(vo.getPrenom());
        if(StringUtil.isNotEmpty(vo.getNom()))
        item.setNom(vo.getNom());
        if(StringUtil.isNotEmpty(vo.getEquivalenceAvecPanelErc()))
        item.setEquivalenceAvecPanelErc(vo.getEquivalenceAvecPanelErc());
        if(StringUtil.isNotEmpty(vo.getBaseHorizon()))
        item.setBaseHorizon(vo.getBaseHorizon());
        if(StringUtil.isNotEmpty(vo.getRole()))
        item.setRole(vo.getRole());


return item;
}
}

@Override
public ChercheurVo toVo(Chercheur item) {
if (item == null) {
return null;
} else {
ChercheurVo vo = new ChercheurVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(StringUtil.isNotEmpty(item.getNumeroMatricule()))
        vo.setNumeroMatricule(item.getNumeroMatricule());

        if(StringUtil.isNotEmpty(item.getEmailPrincipale()))
        vo.setEmailPrincipale(item.getEmailPrincipale());

        if(StringUtil.isNotEmpty(item.getResume()))
        vo.setResume(item.getResume());

        if(item.getFormationEnManagement()!=null)
        vo.setFormationEnManagement(item.getFormationEnManagement());
        vo.setCredentialsNonExpired(item.getCredentialsNonExpired());
        vo.setEnabled(item.getEnabled());
        vo.setAccountNonExpired(item.getAccountNonExpired());
        vo.setAccountNonLocked(item.getAccountNonLocked());
        vo.setPasswordChanged(item.getPasswordChanged());
        if(item.getCreatedAt()!=null)
        vo.setCreatedAt(DateUtil.formateDate(item.getCreatedAt()));
        if(item.getUpdatedAt()!=null)
        vo.setUpdatedAt(DateUtil.formateDate(item.getUpdatedAt()));
        if(StringUtil.isNotEmpty(item.getUsername()))
        vo.setUsername(item.getUsername());

        if(StringUtil.isNotEmpty(item.getPassword()))
        vo.setPassword(item.getPassword());

        if(StringUtil.isNotEmpty(item.getPrenom()))
        vo.setPrenom(item.getPrenom());

        if(StringUtil.isNotEmpty(item.getNom()))
        vo.setNom(item.getNom());

        if(StringUtil.isNotEmpty(item.getEquivalenceAvecPanelErc()))
        vo.setEquivalenceAvecPanelErc(item.getEquivalenceAvecPanelErc());

        if(StringUtil.isNotEmpty(item.getBaseHorizon()))
        vo.setBaseHorizon(item.getBaseHorizon());

        if(StringUtil.isNotEmpty(item.getRole()))
        vo.setRole(item.getRole());


return vo;
}
}

public void init(Boolean value) {
}









































}
