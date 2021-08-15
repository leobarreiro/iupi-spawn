package io.gb3.api.dodabiba.amqp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.stereotype.Component;

import io.gb3.api.dodabiba.model.Person;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@EnableBinding(value = { KafkaChannels.class })
public class KafkaMessageSender {

	@Autowired
	private KafkaChannels channels;

	public void sendMessage(Person person) {
		channels.messageOutputChannel().send(MessageBuilder.withPayload(person).build());
		log.info("Message sent to Kafka: {}", person.toString());
	}

}
