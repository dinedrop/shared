# DineDrop Shared Module

The DineDrop Shared Module is a collection of reusable code that can be shared across multiple microservices in a DineDrop application. This module includes common functionalities such as error handling, logging, and database connections, which can help reduce code duplication and improve maintainability.

## Features

The DineDrop Shared Module provides the following features:

- **Error handling**: Provides a standardized error handling mechanism that can be used across all microservices. This module includes a custom error class that can be used to throw errors with specific error codes and messages.

- **Logging**: Provides a logging mechanism that can be used to log errors, warnings, and information messages. This module includes a logger class that supports different log levels and can write logs to different outputs (e.g., console, file, database).

- **Database connection**: Provides a database connection mechanism that can be used to connect to different databases (e.g., MySQL, MongoDB). This module includes a database connection class that supports different database drivers and can be configured with different connection parameters.

- **Utilities**: Provides a collection of utility functions that can be used across all microservices. These functions include data validation, string manipulation, and date/time formatting.

## Usage

To use the DineDrop Shared Module in your microservice, you can install it as a dependency using npm or yarn:

```bash
npm install @dinedrop/shared
```

or

```bash
yarn add @dinedrop/shared
```

Then, you can import the desired functionality from the module into your code:

```javascript
const { DineDropError, logger, connectToDatabase, validateData } = require('@dinedrop/shared');
```

or

```typescript
import { DineDropError, logger, connectToDatabase, validateData } from '@dinedrop/shared';
```

You can also customize the behavior of the shared module by setting environment variables or configuration files. For example, you can set the log level or log output directory by defining the following variables:

```bash
LOG_LEVEL=debug
LOG_OUTPUT_DIR=/var/log/dinedrop
```

## kafka

### consumer

```
import { KafkaConsumer, ConsumerConfig } from "@dinedrop/shared";

const consumerConfig: ConsumerConfig = {
  brokers: ["localhost:9092"],
  groupId: "100",
};

const consumer = new KafkaConsumer(consumerConfig);

consumer.on("quickstart", async (result) => {
  console.log("message: ", result.value?.toString());
});

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe(["quickstart"]);
  await consumer.run();
}

runConsumer().catch(console.error);

```

### producer

```
import { KafkaProducer, ProducerConfig } from "@dinedrop/shared";

const producerConfig: ProducerConfig = {
  clientId: "dinedrop-kafka",
  brokers: ["localhost:9092"],
  maxInFlightRequests: 1,
  idempotent: true,
};

async function runProducer() {
  const producer = new KafkaProducer(producerConfig);
  await producer.connect();

  const message = { _id: "w09u9032u90f0909j90", name: "Rhythm Shandlya" };

  await producer.produce("quickstart", message);

  await producer.disconnect();
}

runProducer().catch((error) => console.error(error));

```

## Contributing

If you want to contribute to the DineDrop Shared Module, you can submit pull requests or issues on the GitHub repository. Before submitting a pull request, please make sure to follow the coding style and testing guidelines specified in the CONTRIBUTING.md file.

## License

The DineDrop Shared Module is licensed under the MIT License. See the LICENSE.md file for more details.
