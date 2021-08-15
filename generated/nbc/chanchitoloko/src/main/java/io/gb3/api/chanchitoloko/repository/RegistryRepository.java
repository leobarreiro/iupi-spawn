package io.gb3.api.chanchitoloko.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.gb3.api.chanchitoloko.model.Registry;

@Repository
public interface RegistryRepository extends JpaRepository<Registry, Long> {

}
