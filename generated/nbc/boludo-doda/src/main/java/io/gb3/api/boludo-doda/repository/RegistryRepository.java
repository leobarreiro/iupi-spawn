package io.gb3.api.boludo-doda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.gb3.api.boludo-doda.model.Registry;

@Repository
public interface RegistryRepository extends JpaRepository<Registry, Long> {

}
