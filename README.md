<h1 align="center">
  React-Matic
</h1>

## Table of Contents

* [Installation](#installation)
* [Server](#server)
  * [Development](#development)
  * [Production](#production)
  * [Docker](#docker)
* [Available Themes](#available-themes)
  * [light](#light)
  * [dark](#dark)
* [License](#license)

## Installation

1. [Download](../../archive/master.zip) or clone the repository.
2. Install the dependencies with `npm install`.

## Server

### Development

Run `npm run dev` and go to http://localhost:3000.

### Production

Build your React-Matic for production with `npm run build` and then start the
server with `npm start`.

### Docker

1. Build your React-Matic for production with `npm run build`
2. Build the image with `docker build -t react-matic .`
3. Start the container with `docker run -d -p 8080:3000 react-matic`
4. Go to http://localhost:8080

## Available Themes

### [light](./styles/light-theme.js)

#### Example

```javascript
import lightTheme from '../styles/light-theme'

<Page theme={lightTheme}>
  ...
</Page>
```

### [dark](./styles/dark-theme.js)

#### Example

```javascript
import darkTheme from '../styles/dark-theme'

<Page theme={darkTheme}>
  ...
</Page>
```

## License

Copyright (c) 2018 Michael Bartsch. See [LICENSE](./LICENSE.md) for details.
