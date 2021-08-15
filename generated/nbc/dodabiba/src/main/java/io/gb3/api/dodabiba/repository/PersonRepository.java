package io.gb3.api.dodabiba.repository;

import java.util.List;

import io.gb3.api.dodabiba.model.Person;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface PersonRepository extends MongoRepository<Person, String> {

	public Person findByNameAndSurname(String name, String surname);

	public List<Person> findBySurnameLike(String surname);

}
