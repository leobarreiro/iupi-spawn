package io.gb3.api.chanchitoloko.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import io.gb3.api.chanchitoloko.model.Registry;
import io.gb3.api.chanchitoloko.repository.RegistryRepository;

@Configuration
@EnableJpaRepositories(basePackageClasses = RegistryRepository.class)
@EntityScan(basePackageClasses = Registry.class)
public class JpaConfig {

}
