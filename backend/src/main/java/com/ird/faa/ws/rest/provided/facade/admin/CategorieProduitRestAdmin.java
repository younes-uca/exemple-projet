package  com.ird.faa.ws.rest.provided.facade.admin;

import com.ird.faa.service.admin.facade.CategorieProduitAdminService;

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
import com.ird.faa.bean.CategorieProduit;
import com.ird.faa.ws.rest.provided.converter.CategorieProduitConverter;
import com.ird.faa.ws.rest.provided.vo.CategorieProduitVo;

@Api("Manages categorieProduit services")
@RestController
@RequestMapping("api/admin/categorieProduit")
public class CategorieProduitRestAdmin {

@Autowired
private CategorieProduitAdminService categorieProduitService;

@Autowired
private CategorieProduitConverter categorieProduitConverter;


            @ApiOperation("Updates the specified  categorieProduit")
            @PutMapping("/")
            public  CategorieProduitVo update(@RequestBody  CategorieProduitVo  categorieProduitVo){
            CategorieProduit categorieProduit = categorieProduitConverter.toItem(categorieProduitVo);
            categorieProduit = categorieProduitService.update(categorieProduit);
            return categorieProduitConverter.toVo(categorieProduit);
            }

    @ApiOperation("Finds a list of all categorieProduits")
    @GetMapping("/")
    public List<CategorieProduitVo> findAll(){
        return categorieProduitConverter.toVo(categorieProduitService.findAll());
    }

    @ApiOperation("Finds a categorieProduit with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public CategorieProduitVo findByIdWithAssociatedList(@PathVariable Long id){
    return categorieProduitConverter.toVo(categorieProduitService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search categorieProduit by a specific criteria")
    @PostMapping("/search")
    public List<CategorieProduitVo> findByCriteria(@RequestBody CategorieProduitVo categorieProduitVo){
        return categorieProduitConverter.toVo(categorieProduitService.findByCriteria(categorieProduitVo));
        }

            @ApiOperation("Finds a categorieProduit by id")
            @GetMapping("/id/{id}")
            public CategorieProduitVo findById(@PathVariable Long id){
            return categorieProduitConverter.toVo(categorieProduitService.findById(id));
            }

            @ApiOperation("Saves the specified  categorieProduit")
            @PostMapping("/")
            public CategorieProduitVo save(@RequestBody CategorieProduitVo categorieProduitVo){
            CategorieProduit categorieProduit = categorieProduitConverter.toItem(categorieProduitVo);
            categorieProduit = categorieProduitService.save(categorieProduit);
            return categorieProduitConverter.toVo(categorieProduit);
            }

            @ApiOperation("Delete the specified categorieProduit")
            @DeleteMapping("/")
            public int delete(@RequestBody CategorieProduitVo categorieProduitVo){
            CategorieProduit categorieProduit = categorieProduitConverter.toItem(categorieProduitVo);
            return categorieProduitService.delete(categorieProduit);
            }

            @ApiOperation("Deletes a categorieProduit by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return categorieProduitService.deleteById(id);
            }


            @PutMapping("/archiver/")
            public CategorieProduitVo archiver(@RequestBody CategorieProduitVo categorieProduitVo){
                CategorieProduit categorieProduit = categorieProduitService.archiver(categorieProduitConverter.toItem(categorieProduitVo));
                return categorieProduitConverter.toVo(categorieProduit);
                }

            @PutMapping("/desarchiver/")
            public CategorieProduitVo desarchiver(@RequestBody CategorieProduitVo categorieProduitVo){
                CategorieProduit categorieProduit = categorieProduitService.desarchiver(categorieProduitConverter.toItem(categorieProduitVo));
                return categorieProduitConverter.toVo(categorieProduit);}
            }
