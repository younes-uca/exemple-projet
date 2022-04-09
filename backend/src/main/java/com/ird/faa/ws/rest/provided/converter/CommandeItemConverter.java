package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.CommandeItem;
import com.ird.faa.ws.rest.provided.vo.CommandeItemVo;

@Component
public class CommandeItemConverter extends AbstractConverter<CommandeItem,CommandeItemVo>{

        @Autowired
        private CommandeConverter commandeConverter ;
        @Autowired
        private ProduitConverter produitConverter ;
    private Boolean produit;
    private Boolean commande;

public  CommandeItemConverter(){
init(true);
}

@Override
public CommandeItem toItem(CommandeItemVo vo) {
if (vo == null) {
return null;
} else {
CommandeItem item = new CommandeItem();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getPrix()))
        item.setPrix(NumberUtil.toBigDecimal(vo.getPrix()));
        if(StringUtil.isNotEmpty(vo.getQuantite()))
        item.setQuantite(NumberUtil.toBigDecimal(vo.getQuantite()));
            if(vo.getArchive() != null)
            item.setArchive(vo.getArchive());
        if(StringUtil.isNotEmpty(vo.getDateArchivage()))
        item.setDateArchivage(DateUtil.parse(vo.getDateArchivage()));
    if(vo.getProduitVo()!=null && this.produit)
        item.setProduit(produitConverter.toItem(vo.getProduitVo())) ;
    if(vo.getCommandeVo()!=null && this.commande)
        item.setCommande(commandeConverter.toItem(vo.getCommandeVo())) ;


return item;
}
}

@Override
public CommandeItemVo toVo(CommandeItem item) {
if (item == null) {
return null;
} else {
CommandeItemVo vo = new CommandeItemVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(item.getPrix()!=null)
        vo.setPrix(NumberUtil.toString(item.getPrix()));

        if(item.getQuantite()!=null)
        vo.setQuantite(NumberUtil.toString(item.getQuantite()));

        if(item.getArchive()!=null)
        vo.setArchive(item.getArchive());
        if(item.getDateArchivage()!=null)
        vo.setDateArchivage(DateUtil.formateDate(item.getDateArchivage()));
    if(item.getProduit()!=null && this.produit) {
        vo.setProduitVo(produitConverter.toVo(item.getProduit())) ;
    }
    if(item.getCommande()!=null && this.commande) {
        vo.setCommandeVo(commandeConverter.toVo(item.getCommande())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    produit = value;
    commande = value;
}


        public CommandeConverter getCommandeConverter(){
        return this.commandeConverter;
        }
        public void setCommandeConverter(CommandeConverter commandeConverter ){
        this.commandeConverter = commandeConverter;
        }
        public ProduitConverter getProduitConverter(){
        return this.produitConverter;
        }
        public void setProduitConverter(ProduitConverter produitConverter ){
        this.produitConverter = produitConverter;
        }

    public boolean  isProduit(){
    return this.produit;
    }
    public void  setProduit(boolean produit){
    this.produit = produit;
    }
    public boolean  isCommande(){
    return this.commande;
    }
    public void  setCommande(boolean commande){
    this.commande = commande;
    }














}
