package  com.ird.faa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.util.*;
import java.util.stream.Stream;

import com.ird.faa.security.common.AuthoritiesConstants;
import com.ird.faa.security.bean.User;
import com.ird.faa.security.bean.Permission;
import com.ird.faa.security.bean.Role;
import com.ird.faa.security.service.facade.UserService;
import com.ird.faa.security.service.facade.RoleService;
import com.ird.faa.bean.Chercheur;


@SpringBootApplication
public class FaaApplication {
public static ConfigurableApplicationContext ctx;

public static void main(String[] args) {
ctx=SpringApplication.run(FaaApplication.class, args);
}

public static ConfigurableApplicationContext getCtx() {
return ctx;
}

@Bean
public CommandLineRunner demo(UserService userService, RoleService roleService
) {
return (args) -> {
if(false){
    Map<String,String> etats=new HashMap<>();
    etats.put("Initialisé","initialise");
    etats.put("En cours","encours");
    etats.put("Terminé","termine");


    // Role chercheur
        Chercheur userForChercheur = new Chercheur("chercheur");

    Role roleForChercheur = new Role();
    roleForChercheur.setAuthority(AuthoritiesConstants.CHERCHEUR);
    List<Permission> permissionsForChercheur = new ArrayList<>();
    addPermissionForChercheur(permissionsForChercheur);
    roleForChercheur.setPermissions(permissionsForChercheur);
    if(userForChercheur.getRoles()==null)
    userForChercheur.setRoles(new ArrayList<>());

    userForChercheur.getRoles().add(roleForChercheur);
    userService.save(userForChercheur);


    // Role admin
        User userForAdmin = new User("admin");

    Role roleForAdmin = new Role();
    roleForAdmin.setAuthority(AuthoritiesConstants.ADMIN);
    List<Permission> permissionsForAdmin = new ArrayList<>();
    addPermissionForAdmin(permissionsForAdmin);
    roleForAdmin.setPermissions(permissionsForAdmin);
    if(userForAdmin.getRoles()==null)
    userForAdmin.setRoles(new ArrayList<>());

    userForAdmin.getRoles().add(roleForAdmin);
    userService.save(userForAdmin);
    }
        };
        }

        private static void addPermissionForChercheur(List
        <Permission> permissions){
                permissions.add(new Permission("CategorieProduit.edit"));
                permissions.add(new Permission("CategorieProduit.list"));
                permissions.add(new Permission("CategorieProduit.view"));
                permissions.add(new Permission("CategorieProduit.add"));
                permissions.add(new Permission("CategorieProduit.delete"));
                permissions.add(new Permission("Client.edit"));
                permissions.add(new Permission("Client.list"));
                permissions.add(new Permission("Client.view"));
                permissions.add(new Permission("Client.add"));
                permissions.add(new Permission("Client.delete"));
                permissions.add(new Permission("Paiement.edit"));
                permissions.add(new Permission("Paiement.list"));
                permissions.add(new Permission("Paiement.view"));
                permissions.add(new Permission("Paiement.add"));
                permissions.add(new Permission("Paiement.delete"));
                permissions.add(new Permission("Produit.edit"));
                permissions.add(new Permission("Produit.list"));
                permissions.add(new Permission("Produit.view"));
                permissions.add(new Permission("Produit.add"));
                permissions.add(new Permission("Produit.delete"));
                permissions.add(new Permission("CommandeItem.edit"));
                permissions.add(new Permission("CommandeItem.list"));
                permissions.add(new Permission("CommandeItem.view"));
                permissions.add(new Permission("CommandeItem.add"));
                permissions.add(new Permission("CommandeItem.delete"));
                permissions.add(new Permission("Chercheur.edit"));
                permissions.add(new Permission("Chercheur.list"));
                permissions.add(new Permission("Chercheur.view"));
                permissions.add(new Permission("Chercheur.add"));
                permissions.add(new Permission("Chercheur.delete"));
                permissions.add(new Permission("Commande.edit"));
                permissions.add(new Permission("Commande.list"));
                permissions.add(new Permission("Commande.view"));
                permissions.add(new Permission("Commande.add"));
                permissions.add(new Permission("Commande.delete"));
            }
        private static void addPermissionForAdmin(List
        <Permission> permissions){
                permissions.add(new Permission("CategorieProduit.edit"));
                permissions.add(new Permission("CategorieProduit.list"));
                permissions.add(new Permission("CategorieProduit.view"));
                permissions.add(new Permission("CategorieProduit.add"));
                permissions.add(new Permission("CategorieProduit.delete"));
                permissions.add(new Permission("Client.edit"));
                permissions.add(new Permission("Client.list"));
                permissions.add(new Permission("Client.view"));
                permissions.add(new Permission("Client.add"));
                permissions.add(new Permission("Client.delete"));
                permissions.add(new Permission("Paiement.edit"));
                permissions.add(new Permission("Paiement.list"));
                permissions.add(new Permission("Paiement.view"));
                permissions.add(new Permission("Paiement.add"));
                permissions.add(new Permission("Paiement.delete"));
                permissions.add(new Permission("Produit.edit"));
                permissions.add(new Permission("Produit.list"));
                permissions.add(new Permission("Produit.view"));
                permissions.add(new Permission("Produit.add"));
                permissions.add(new Permission("Produit.delete"));
                permissions.add(new Permission("CommandeItem.edit"));
                permissions.add(new Permission("CommandeItem.list"));
                permissions.add(new Permission("CommandeItem.view"));
                permissions.add(new Permission("CommandeItem.add"));
                permissions.add(new Permission("CommandeItem.delete"));
                permissions.add(new Permission("Chercheur.edit"));
                permissions.add(new Permission("Chercheur.list"));
                permissions.add(new Permission("Chercheur.view"));
                permissions.add(new Permission("Chercheur.add"));
                permissions.add(new Permission("Chercheur.delete"));
                permissions.add(new Permission("Commande.edit"));
                permissions.add(new Permission("Commande.list"));
                permissions.add(new Permission("Commande.view"));
                permissions.add(new Permission("Commande.add"));
                permissions.add(new Permission("Commande.delete"));
            }


            }


