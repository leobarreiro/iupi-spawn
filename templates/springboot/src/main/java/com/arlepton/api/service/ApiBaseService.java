package <%=paths.packages.service%>;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;<% if (cache == 'redis') { %>
import org.springframework.cache.annotation.Cacheable;<% } %>
import org.springframework.stereotype.Service;

import <%=paths.packages.model%>.Person;

<% if (amqp == 'rabbit') { %>
import <%=paths.packages.amqp%>.RabbitMessageSender;<% } if (amqp == 'kafka') { %>
import <%=paths.packages.amqp%>.KafkaMessageSender;<% } if (amqp == 'mqtt') { %>
import <%=paths.packages.amqp%>.MqttMessageSender;<% } %>

@Service
public class ApiBaseService {
<% if (amqp == 'rabbit') { %>

	@Autowired
	private RabbitMessageSender rabbitSender;<% } if (amqp == 'kafka') { %>

	@Autowired
	private KafkaMessageSender kafkaSender;<% } if (amqp == 'mqtt') { %>

	@Autowired
	private MqttMessageSender mqttSender;<% } %>

<% if (cache == 'redis') { %>
	@Cacheable("date-now")<% } %>
	public String localDate() {
		return LocalDate.now().toString();
	}

	public String hello() {
		return "Hello";
	}<% if (amqp == 'rabbit') { %>
		
	public void sendMessageToRabbit(Person person) {
		rabbitSender.sendMessage(person);
	}<% } if (amqp == 'kafka') { %>
	
	public void sendMessageToKafka(Person person) {
		kafkaSender.sendMessage(person);
	}<% } if (amqp == 'mqtt') { %>

	public void sendMessageToMqtt(Person person) {
		mqttSender.sendMessage(person);
	}<% } %>

}