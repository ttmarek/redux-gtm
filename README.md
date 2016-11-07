# ReduxGTM

Google Tag Manager integration for Redux and ngrx/store

[![license](https://img.shields.io/github/license/rangle/redux-gtm.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/redux-gtm.svg?style=flat-square)](https://www.npmjs.com/package/redux-gtm)
[![CircleCI](https://img.shields.io/circleci/project/github/rangle/redux-gtm.svg?style=flat-square)](https://circleci.com/gh/rangle/redux-gtm)

## Getting Started

### Installation

With [npm](https://www.npmjs.com/):
```bash
npm install --save redux-gtm
```

With [yarn](https://yarnpkg.com/):
```bash
yarn add redux-gtm
```

### How it Works

```js
import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';

// 1. Import ReduxGTM
import { createMiddleware } from 'redux-gtm';

// 2. Create a mapping between you Redux actions and you Google Tag Manager events
const eventDefinitions = {
  'SOME_REDUX_ACTION_TYPE': { eventName: 'some-gtm-custom-event' },
};

// 3. Create the middleware using createMiddleware from ReduxGTM
const analyticsMiddleware = createMiddleware(eventDefinitions);

// 4. Apply the middleware when creating your Redux store
const store = createStore(reducer, applyMiddleware(analyticsMiddleware));
```

Now, whenever your application dispatches `SOME_REDUX_ACTION_TYPE`,
ReduxGTM will emit `some-gtm-custom-event` to Google Tag Manager.

#### Notes
- When mapping actions to events, each action type must be mapped to a
  valid [eventDefinition](docs/event-definition.md).

## Examples
 - [How do I track pageviews when using React Router?](docs/examples/example1.md)
 - [How do I track failure events?](docs/examples/example2.md)
 - [How to do mini surveys](docs/examples/example3.md)

## API
 - [ReduxGTM.createMiddleware(eventDefinitions, [dataLayer])](docs/create-middleware.md)
 - ReduxGTM.createMetaReducer(eventDefinitions, [dataLayer])
 - [eventDefinition](docs/event-definition.md)

## License

This project is licensed under the MIT License - see
the [LICENSE](LICENSE) file for details
