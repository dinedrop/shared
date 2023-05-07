import { Kafka, Consumer, KafkaMessage } from 'kafkajs';

interface TopicHandler {
  [topic: string]: (payload: KafkaMessage) => Promise<void>;
}

export class KafkaConsumer {
  private kafka: Kafka;
  private consumer: Consumer;
  private topicHandlers: TopicHandler;

  constructor(brokers: string[], groupId: string) {
    this.kafka = new Kafka({ brokers });
    this.consumer = this.kafka.consumer({ groupId });
    this.topicHandlers = {};
  }

  public async connect(): Promise<void> {
    await this.consumer.connect();
  }

  public async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }

  public async subscribe(topics: string[]): Promise<void> {
    await this.consumer.subscribe({ topics });
  }

  public async handleMessage(topic: string, message: KafkaMessage): Promise<void> {
    const handler = this.topicHandlers[topic];
    if (handler) {
      await handler(message);
    } else {
      void Promise.reject(new Error(`No handler for topic ${topic}`));
    }
  }

  public on(topic: string, handler: (payload: KafkaMessage) => Promise<void>): void {
    this.topicHandlers[topic] = handler;
  }

  public async run(): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        await this.handleMessage(topic, message);
      },
    });
  }
}
