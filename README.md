# hacker-news-clone

Development in progress 🚧

I'm building a hacker news clone in ember.js to learn the framework. Some goals I hope to achieve:

- Familiarize myself with the basic concepts of Ember:
  - glimmer
  - routes
  - templates
  - controllers
  - helpers
  - modifiers
- Write tests. Learn:
  - QUnit stuff
  - mock/stub wherever necessary
  - setup models using Mirage
- Use Embroider for building the app. Learn:
  - route-based code splitting
- Integrate SSR using Ember Fastboot

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd hacker-news-clone`
- `npm install`

## Running / Development

- `ember s --proxy=https://hacker-news.firebaseio.com/v0`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
