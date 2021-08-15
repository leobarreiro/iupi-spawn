package <%=paths.packages.repository%>;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import <%=paths.packages.model%>.Registry;

@Repository
public interface RegistryRepository extends JpaRepository<Registry, Long> {

}
