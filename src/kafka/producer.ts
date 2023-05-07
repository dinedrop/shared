import { Kafka } from 'kafkajs';

interface ProducerConfig {
  clientId: string;
  brokers: string[];
  maxInFlightRequests?: number;
  idempotent?: boolean;
}

class KafkaProducer {
  private producer: any;
  private isReady = false;

  constructor(private config: ProducerConfig) {}

  async connect(): Promise<void> {
    if (this.producer) return;

    const kafka = new Kafka({
      clientId: this.config.clientId,
      brokers: this.config.brokers,
    });

    this.producer = kafka.producer({
      maxInFlightRequests: this.config.maxInFlightRequests || 1,
      idempotent: this.config.idempotent ?? true,
    });

    await (this.producer as { connect(): Promise<void> }).connect();
    this.isReady = true;
  }

  async produce(topic: string, messages: any | any[]): Promise<void> {
    if (!this.isReady) {
      throw new Error('Producer is not ready. Please call connect() first.');
    }

    const payloads = Array.isArray(messages)
      ? messages.map(m => ({ value: JSON.stringify(m) }))
      : [{ value: JSON.stringify(messages) }];

    await (
      this.producer as {
        send(args: { topic: string; messages: Array<{ value: string }> }): Promise<void>;
      }
    ).send({
      topic,
      messages: payloads,
    });
  }

  async disconnect(): Promise<void> {
    if (!this.producer) return;

    await (this.producer as { disconnect(): Promise<void> }).disconnect();
    this.producer = null;
    this.isReady = false;
  }
}

export default KafkaProducer;
