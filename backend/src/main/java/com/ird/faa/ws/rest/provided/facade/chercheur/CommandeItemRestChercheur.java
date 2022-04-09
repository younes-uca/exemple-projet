package  com.ird.faa.ws.rest.provided.facade.chercheur;

import com.ird.faa.service.chercheur.facade.CommandeItemChercheurService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.ird.faa.bean.CommandeItem;
import com.ird.faa.ws.rest.provided.converter.CommandeItemConverter;
import com.ird.faa.ws.rest.provided.vo.CommandeItemVo;

@Api("Manages commandeItem services")
@RestController
@RequestMapping("api/chercheur/commandeItem")
public class CommandeItemRestChercheur {

@Autowired
private CommandeItemChercheurService commandeItemService;

@Autowired
private CommandeItemConverter commandeItemConverter;


            @ApiOperation("Updates the specified  commandeItem")
            @PutMapping("/")
            public  CommandeItemVo update(@RequestBody  CommandeItemVo  commandeItemVo){
            CommandeItem commandeItem = commandeItemConverter.toItem(commandeItemVo);
            commandeItem = commandeItemService.update(commandeItem);
            return commandeItemConverter.toVo(commandeItem);
            }

    @ApiOperation("Finds a list of all commandeItems")
    @GetMapping("/")
    public List<CommandeItemVo> findAll(){
        return commandeItemConverter.toVo(commandeItemService.findAll());
    }

    @ApiOperation("Finds a commandeItem with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public CommandeItemVo findByIdWithAssociatedList(@PathVariable Long id){
    return commandeItemConverter.toVo(commandeItemService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search commandeItem by a specific criteria")
    @PostMapping("/search")
    public List<CommandeItemVo> findByCriteria(@RequestBody CommandeItemVo commandeItemVo){
        return commandeItemConverter.toVo(commandeItemService.findByCriteria(commandeItemVo));
        }

            @ApiOperation("Finds a commandeItem by id")
            @GetMapping("/id/{id}")
            public CommandeItemVo findById(@PathVariable Long id){
            return commandeItemConverter.toVo(commandeItemService.findById(id));
            }

            @ApiOperation("Saves the specified  commandeItem")
            @PostMapping("/")
            public CommandeItemVo save(@RequestBody CommandeItemVo commandeItemVo){
            CommandeItem commandeItem = commandeItemConverter.toItem(commandeItemVo);
            commandeItem = commandeItemService.save(commandeItem);
            return commandeItemConverter.toVo(commandeItem);
            }

            @ApiOperation("Delete the specified commandeItem")
            @DeleteMapping("/")
            public int delete(@RequestBody CommandeItemVo commandeItemVo){
            CommandeItem commandeItem = commandeItemConverter.toItem(commandeItemVo);
            return commandeItemService.delete(commandeItem);
            }

            @ApiOperation("Deletes a commandeItem by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return commandeItemService.deleteById(id);
            }
        @ApiOperation("find by produit reference")
        @GetMapping("/produit/reference/{reference}")
        public List<CommandeItem> findByProduitReference(@PathVariable String reference){
        return commandeItemService.findByProduitReference(reference);
        }

        @ApiOperation("delete by produit reference")
        @DeleteMapping("/produit/reference/{reference}")
        public int deleteByProduitReference(@PathVariable String reference){
        return commandeItemService.deleteByProduitReference(reference);
        }

        @ApiOperation("find by produit id")
        @GetMapping("/produit/id/{id}")
        public List<CommandeItem> findByProduitId(@PathVariable Long id){
        return commandeItemService.findByProduitId(id);
        }

        @ApiOperation("delete by produit id")
        @DeleteMapping("/produit/id/{id}")
        public int deleteByProduitId(@PathVariable Long id){
        return commandeItemService.deleteByProduitId(id);
        }

        @ApiOperation("find by commande reference")
        @GetMapping("/commande/reference/{reference}")
        public List<CommandeItem> findByCommandeReference(@PathVariable String reference){
        return commandeItemService.findByCommandeReference(reference);
        }

        @ApiOperation("delete by commande reference")
        @DeleteMapping("/commande/reference/{reference}")
        public int deleteByCommandeReference(@PathVariable String reference){
        return commandeItemService.deleteByCommandeReference(reference);
        }

        @ApiOperation("find by commande id")
        @GetMapping("/commande/id/{id}")
        public List<CommandeItem> findByCommandeId(@PathVariable Long id){
        return commandeItemService.findByCommandeId(id);
        }

        @ApiOperation("delete by commande id")
        @DeleteMapping("/commande/id/{id}")
        public int deleteByCommandeId(@PathVariable Long id){
        return commandeItemService.deleteByCommandeId(id);
        }



            }
