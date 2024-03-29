package <%=paths.packages.amqp%>;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.stereotype.Component;

import <%=packageDomain%>.Person;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@EnableBinding(value = { RabbitChannels.class })
public class RabbitMessageSender {

	@Autowired
	private RabbitChannels channels;

	public void sendMessage(Person person) {
		channels.messageOutputChannel().send(MessageBuilder.withPayload(person).build());
		log.info("Message sent to RabbitMQ: {}", person.toString());
	}

}
