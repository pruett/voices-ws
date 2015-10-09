Voices Websocket Server
=======================

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This small server synchronizes connected clients with realtime updates from the UI. It sits between the user and
external servers/services/databases etc.

![architecture](https://cloud.githubusercontent.com/assets/794809/10407193/8922e2e8-6eb5-11e5-8de9-3122a0ad3755.png)

## Getting Started

**Install dependencies**
- `npm i`

**Run tests**
- `npm run test:watch`
- *Note*: *This will run the [standard](https://github.com/feross/standard) javascript style linter.*

## Architecture/Technology

We are using [redux](https://github.com/rackt/redux/) to manage application state, here on the server, as well as on the client.
