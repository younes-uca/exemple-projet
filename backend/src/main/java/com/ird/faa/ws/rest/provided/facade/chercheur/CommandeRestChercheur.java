package  com.ird.faa.ws.rest.provided.facade.chercheur;

import com.ird.faa.service.chercheur.facade.CommandeChercheurService;

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
import com.ird.faa.bean.Commande;
import com.ird.faa.ws.rest.provided.converter.CommandeConverter;
import com.ird.faa.ws.rest.provided.vo.CommandeVo;

@Api("Manages commande services")
@RestController
@RequestMapping("api/chercheur/commande")
public class CommandeRestChercheur {

@Autowired
private CommandeChercheurService commandeService;

@Autowired
private CommandeConverter commandeConverter;


            @ApiOperation("Updates the specified  commande")
            @PutMapping("/")
            public  CommandeVo update(@RequestBody  CommandeVo  commandeVo){
            Commande commande = commandeConverter.toItem(commandeVo);
            commande = commandeService.update(commande);
            return commandeConverter.toVo(commande);
            }

    @ApiOperation("Finds a list of all commandes")
    @GetMapping("/")
    public List<CommandeVo> findAll(){
        return commandeConverter.toVo(commandeService.findAll());
    }

    @ApiOperation("Finds a commande with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public CommandeVo findByIdWithAssociatedList(@PathVariable Long id){
    return commandeConverter.toVo(commandeService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search commande by a specific criteria")
    @PostMapping("/search")
    public List<CommandeVo> findByCriteria(@RequestBody CommandeVo commandeVo){
        return commandeConverter.toVo(commandeService.findByCriteria(commandeVo));
        }

            @ApiOperation("Finds a commande by id")
            @GetMapping("/id/{id}")
            public CommandeVo findById(@PathVariable Long id){
            return commandeConverter.toVo(commandeService.findById(id));
            }

            @ApiOperation("Saves the specified  commande")
            @PostMapping("/")
            public CommandeVo save(@RequestBody CommandeVo commandeVo){
            Commande commande = commandeConverter.toItem(commandeVo);
            commande = commandeService.save(commande);
            return commandeConverter.toVo(commande);
            }

            @ApiOperation("Delete the specified commande")
            @DeleteMapping("/")
            public int delete(@RequestBody CommandeVo commandeVo){
            Commande commande = commandeConverter.toItem(commandeVo);
            return commandeService.delete(commande);
            }

            @ApiOperation("Deletes a commande by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return commandeService.deleteById(id);
            }
        @ApiOperation("find by client reference")
        @GetMapping("/client/reference/{reference}")
        public List<Commande> findByClientReference(@PathVariable String reference){
        return commandeService.findByClientReference(reference);
        }

        @ApiOperation("delete by client reference")
        @DeleteMapping("/client/reference/{reference}")
        public int deleteByClientReference(@PathVariable String reference){
        return commandeService.deleteByClientReference(reference);
        }

        @ApiOperation("find by client id")
        @GetMapping("/client/id/{id}")
        public List<Commande> findByClientId(@PathVariable Long id){
        return commandeService.findByClientId(id);
        }

        @ApiOperation("delete by client id")
        @DeleteMapping("/client/id/{id}")
        public int deleteByClientId(@PathVariable Long id){
        return commandeService.deleteByClientId(id);
        }



            }
