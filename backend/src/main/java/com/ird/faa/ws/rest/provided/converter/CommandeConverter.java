package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.Commande;
import com.ird.faa.ws.rest.provided.vo.CommandeVo;

@Component
public class CommandeConverter extends AbstractConverter<Commande,CommandeVo>{

        @Autowired
        private PaiementConverter paiementConverter ;
        @Autowired
        private CommandeItemConverter commandeItemConverter ;
        @Autowired
        private ClientConverter clientConverter ;
    private Boolean client;
        private Boolean paiements;
        private Boolean commandeItems;

public  CommandeConverter(){
init(true);
}

@Override
public Commande toItem(CommandeVo vo) {
if (vo == null) {
return null;
} else {
Commande item = new Commande();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
        if(StringUtil.isNotEmpty(vo.getReference()))
        item.setReference(vo.getReference());
        if(StringUtil.isNotEmpty(vo.getDateCommande()))
        item.setDateCommande(DateUtil.parse(vo.getDateCommande()));
        if(StringUtil.isNotEmpty(vo.getTotal()))
        item.setTotal(NumberUtil.toBigDecimal(vo.getTotal()));
        if(StringUtil.isNotEmpty(vo.getTotalPaye()))
        item.setTotalPaye(NumberUtil.toBigDecimal(vo.getTotalPaye()));
            if(vo.getArchive() != null)
            item.setArchive(vo.getArchive());
        if(StringUtil.isNotEmpty(vo.getDateArchivage()))
        item.setDateArchivage(DateUtil.parse(vo.getDateArchivage()));
    if(vo.getClientVo()!=null && this.client)
        item.setClient(clientConverter.toItem(vo.getClientVo())) ;

    if(ListUtil.isNotEmpty(vo.getPaiementsVo()) && this.paiements)
        item.setPaiements(paiementConverter.toItem(vo.getPaiementsVo()));
    if(ListUtil.isNotEmpty(vo.getCommandeItemsVo()) && this.commandeItems)
        item.setCommandeItems(commandeItemConverter.toItem(vo.getCommandeItemsVo()));

return item;
}
}

@Override
public CommandeVo toVo(Commande item) {
if (item == null) {
return null;
} else {
CommandeVo vo = new CommandeVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(StringUtil.isNotEmpty(item.getReference()))
        vo.setReference(item.getReference());

        if(item.getDateCommande()!=null)
        vo.setDateCommande(DateUtil.formateDate(item.getDateCommande()));
        if(item.getTotal()!=null)
        vo.setTotal(NumberUtil.toString(item.getTotal()));

        if(item.getTotalPaye()!=null)
        vo.setTotalPaye(NumberUtil.toString(item.getTotalPaye()));

        if(item.getArchive()!=null)
        vo.setArchive(item.getArchive());
        if(item.getDateArchivage()!=null)
        vo.setDateArchivage(DateUtil.formateDate(item.getDateArchivage()));
    if(item.getClient()!=null && this.client) {
        vo.setClientVo(clientConverter.toVo(item.getClient())) ;
    }
        if(ListUtil.isNotEmpty(item.getPaiements()) && this.paiements){
        paiementConverter.init(true);
        paiementConverter.setCommande(false);
        vo.setPaiementsVo(paiementConverter.toVo(item.getPaiements()));
        paiementConverter.setCommande(true);
        }
        if(ListUtil.isNotEmpty(item.getCommandeItems()) && this.commandeItems){
        commandeItemConverter.init(true);
        commandeItemConverter.setCommande(false);
        vo.setCommandeItemsVo(commandeItemConverter.toVo(item.getCommandeItems()));
        commandeItemConverter.setCommande(true);
        }

return vo;
}
}

public void init(Boolean value) {
    client = value;
        paiements = value;
        commandeItems = value;
}


        public PaiementConverter getPaiementConverter(){
        return this.paiementConverter;
        }
        public void setPaiementConverter(PaiementConverter paiementConverter ){
        this.paiementConverter = paiementConverter;
        }
        public CommandeItemConverter getCommandeItemConverter(){
        return this.commandeItemConverter;
        }
        public void setCommandeItemConverter(CommandeItemConverter commandeItemConverter ){
        this.commandeItemConverter = commandeItemConverter;
        }
        public ClientConverter getClientConverter(){
        return this.clientConverter;
        }
        public void setClientConverter(ClientConverter clientConverter ){
        this.clientConverter = clientConverter;
        }

    public boolean  isClient(){
    return this.client;
    }
    public void  setClient(boolean client){
    this.client = client;
    }













        public Boolean  isPaiements(){
        return this.paiements ;
        }
        public void  setPaiements(Boolean paiements ){
        this.paiements  = paiements ;
        }



        public Boolean  isCommandeItems(){
        return this.commandeItems ;
        }
        public void  setCommandeItems(Boolean commandeItems ){
        this.commandeItems  = commandeItems ;
        }






}
