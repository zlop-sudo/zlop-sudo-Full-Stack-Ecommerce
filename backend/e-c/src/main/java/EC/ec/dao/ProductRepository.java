package EC.ec.dao;

import EC.ec.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    // http://localhost:8080/api/products/search/findByCategoryId?id=
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // http://localhost:8080/api/products/search/findByNameContaining?name=
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
