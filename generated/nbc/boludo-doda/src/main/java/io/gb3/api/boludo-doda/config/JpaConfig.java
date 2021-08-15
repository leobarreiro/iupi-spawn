package io.gb3.api.boludo-doda.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import io.gb3.api.boludo-doda.model.Registry;
import io.gb3.api.boludo-doda.repository.RegistryRepository;

@Configuration
@EnableJpaRepositories(basePackageClasses = RegistryRepository.class)
@EntityScan(basePackageClasses = Registry.class)
public class JpaConfig {

}
