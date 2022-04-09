package  com.ird.faa.ws.rest.provided.facade.admin;

import com.ird.faa.service.admin.facade.ProduitAdminService;

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
import com.ird.faa.bean.Produit;
import com.ird.faa.ws.rest.provided.converter.ProduitConverter;
import com.ird.faa.ws.rest.provided.vo.ProduitVo;

@Api("Manages produit services")
@RestController
@RequestMapping("api/admin/produit")
public class ProduitRestAdmin {

@Autowired
private ProduitAdminService produitService;

@Autowired
private ProduitConverter produitConverter;


            @ApiOperation("Updates the specified  produit")
            @PutMapping("/")
            public  ProduitVo update(@RequestBody  ProduitVo  produitVo){
            Produit produit = produitConverter.toItem(produitVo);
            produit = produitService.update(produit);
            return produitConverter.toVo(produit);
            }

    @ApiOperation("Finds a list of all produits")
    @GetMapping("/")
    public List<ProduitVo> findAll(){
        return produitConverter.toVo(produitService.findAll());
    }

    @ApiOperation("Finds a produit with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public ProduitVo findByIdWithAssociatedList(@PathVariable Long id){
    return produitConverter.toVo(produitService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search produit by a specific criteria")
    @PostMapping("/search")
    public List<ProduitVo> findByCriteria(@RequestBody ProduitVo produitVo){
        return produitConverter.toVo(produitService.findByCriteria(produitVo));
        }

            @ApiOperation("Finds a produit by id")
            @GetMapping("/id/{id}")
            public ProduitVo findById(@PathVariable Long id){
            return produitConverter.toVo(produitService.findById(id));
            }

            @ApiOperation("Saves the specified  produit")
            @PostMapping("/")
            public ProduitVo save(@RequestBody ProduitVo produitVo){
            Produit produit = produitConverter.toItem(produitVo);
            produit = produitService.save(produit);
            return produitConverter.toVo(produit);
            }

            @ApiOperation("Delete the specified produit")
            @DeleteMapping("/")
            public int delete(@RequestBody ProduitVo produitVo){
            Produit produit = produitConverter.toItem(produitVo);
            return produitService.delete(produit);
            }

            @ApiOperation("Deletes a produit by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return produitService.deleteById(id);
            }
        @ApiOperation("find by categorieProduit reference")
        @GetMapping("/categorieProduit/reference/{reference}")
        public List<Produit> findByCategorieProduitReference(@PathVariable String reference){
        return produitService.findByCategorieProduitReference(reference);
        }

        @ApiOperation("delete by categorieProduit reference")
        @DeleteMapping("/categorieProduit/reference/{reference}")
        public int deleteByCategorieProduitReference(@PathVariable String reference){
        return produitService.deleteByCategorieProduitReference(reference);
        }

        @ApiOperation("find by categorieProduit id")
        @GetMapping("/categorieProduit/id/{id}")
        public List<Produit> findByCategorieProduitId(@PathVariable Long id){
        return produitService.findByCategorieProduitId(id);
        }

        @ApiOperation("delete by categorieProduit id")
        @DeleteMapping("/categorieProduit/id/{id}")
        public int deleteByCategorieProduitId(@PathVariable Long id){
        return produitService.deleteByCategorieProduitId(id);
        }



            @PutMapping("/archiver/")
            public ProduitVo archiver(@RequestBody ProduitVo produitVo){
                Produit produit = produitService.archiver(produitConverter.toItem(produitVo));
                return produitConverter.toVo(produit);
                }

            @PutMapping("/desarchiver/")
            public ProduitVo desarchiver(@RequestBody ProduitVo produitVo){
                Produit produit = produitService.desarchiver(produitConverter.toItem(produitVo));
                return produitConverter.toVo(produit);}
            }
