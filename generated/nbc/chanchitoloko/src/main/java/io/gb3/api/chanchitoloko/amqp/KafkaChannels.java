package io.gb3.api.chanchitoloko.amqp;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

public interface KafkaChannels {

	public static final String OUTPUT_BINDING = "chanchitoloko_output";

	public static final String INPUT_BINDING = "chanchitoloko_input";

	@Input(INPUT_BINDING)
	SubscribableChannel messageInputChannel();

	@Output(OUTPUT_BINDING)
	MessageChannel messageOutputChannel();

}
