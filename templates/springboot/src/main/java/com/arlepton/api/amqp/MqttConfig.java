package <%=paths.packages.amqp%>;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

	@Value("${<%=artifactId%>.messages.input-queue}")
    private String inputTopic;
    
    @Value("${<%=artifactId%>.mqtt.clientId}")
    private String clientId;

	@Value("${<%=artifactId%>.mqtt.hostname}")
	private String hostname;

	@Value("${<%=artifactId%>.mqtt.port}")
	private Integer port;

	@Autowired
	private MqttMessageListener messageListener;

	@Bean("defaultMqttConfig")
	@ConfigurationProperties(prefix = "<%=artifactId%>.mqtt")
	public MqttConnectOptions mqttConnectOptions() {
		MqttConnectOptions options = new MqttConnectOptions();
		options.setAutomaticReconnect(true);
		options.setCleanSession(true);
		options.setConnectionTimeout(10);
		options.setServerURIs(new String[] { "tcp://" + hostname + ":" + port });
		return options;
	}

	@Bean("mqttDefaultClient")
	public MqttClient mqttClient() throws MqttException {
		MqttClient mqttClient = new MqttClient("tcp://" + hostname + ":" + port, clientId);
		mqttClient.connect(mqttConnectOptions());
		mqttClient.subscribe(inputTopic, messageListener);
		return mqttClient;
	}

}