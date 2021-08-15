package <%=paths.packages.amqp%>;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import <%=paths.packages.model%>.Person;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class MqttMessageSender {

	@Value("${<%=artifactId%>.mqtt.hostname}")
	private String hostname;

	@Value("${<%=artifactId%>.mqtt.port}")
	private Integer port;

	@Value("${<%=artifactId%>.mqtt.clientId}")
	private String clientId;

	@Value("${<%=artifactId%>.messages.output-queue}")
	private String outputTopic;

	@Autowired
	@Qualifier("mqttDefaultClient")
	private MqttClient client;

	@Autowired
	private ObjectMapper objectMapper;

	public void sendMessage(Person person) {
		try {
			String payload = objectMapper.writeValueAsString(person);
			MqttMessage message = new MqttMessage();
			message.setPayload(payload.getBytes());
			message.setQos(2);
			client.publish(outputTopic, message);
		} catch (JsonProcessingException e) {
			log.error(e.getMessage(), e);
		} catch (MqttPersistenceException e) {
			log.error(e.getMessage(), e);
		} catch (MqttException e) {
			log.error(e.getMessage(), e);
		}
	}

}
