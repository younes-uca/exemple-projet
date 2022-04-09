package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.Paiement;
import com.ird.faa.ws.rest.provided.vo.PaiementVo;

@Component
public class PaiementConverter extends AbstractConverter<Paiement,PaiementVo>{

        @Autowired
        private CommandeConverter commandeConverter ;
    private Boolean commande;

public  PaiementConverter(){
init(true);
}

@Override
public Paiement toItem(PaiementVo vo) {
if (vo == null) {
return null;
} else {
Paiement item = new Paiement();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getReference()))
        item.setReference(vo.getReference());
        if(StringUtil.isNotEmpty(vo.getDatePaiement()))
        item.setDatePaiement(DateUtil.parse(vo.getDatePaiement()));
        if(StringUtil.isNotEmpty(vo.getMontant()))
        item.setMontant(NumberUtil.toBigDecimal(vo.getMontant()));
            if(vo.getArchive() != null)
            item.setArchive(vo.getArchive());
        if(StringUtil.isNotEmpty(vo.getDateArchivage()))
        item.setDateArchivage(DateUtil.parse(vo.getDateArchivage()));
    if(vo.getCommandeVo()!=null && this.commande)
        item.setCommande(commandeConverter.toItem(vo.getCommandeVo())) ;


return item;
}
}

@Override
public PaiementVo toVo(Paiement item) {
if (item == null) {
return null;
} else {
PaiementVo vo = new PaiementVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(StringUtil.isNotEmpty(item.getReference()))
        vo.setReference(item.getReference());

        if(item.getDatePaiement()!=null)
        vo.setDatePaiement(DateUtil.formateDate(item.getDatePaiement()));
        if(item.getMontant()!=null)
        vo.setMontant(NumberUtil.toString(item.getMontant()));

        if(item.getArchive()!=null)
        vo.setArchive(item.getArchive());
        if(item.getDateArchivage()!=null)
        vo.setDateArchivage(DateUtil.formateDate(item.getDateArchivage()));
    if(item.getCommande()!=null && this.commande) {
        vo.setCommandeVo(commandeConverter.toVo(item.getCommande())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    commande = value;
}


        public CommandeConverter getCommandeConverter(){
        return this.commandeConverter;
        }
        public void setCommandeConverter(CommandeConverter commandeConverter ){
        this.commandeConverter = commandeConverter;
        }

    public boolean  isCommande(){
    return this.commande;
    }
    public void  setCommande(boolean commande){
    this.commande = commande;
    }














}
