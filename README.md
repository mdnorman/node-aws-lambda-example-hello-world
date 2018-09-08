# CHANGEME

## Setup

### Node

1.  Install `nvm` (Node Version Manager)
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

### IDE Setup

This project uses [EditorConfig](https://editorconfig.org/) for IDE configuration. Many popular IDEs and editors
support this out of the box or with a plugin.

### AWS

1.  Install AWS CLI for your computer
2.  Setup AWS CLI with your credentials
3.  Add a configuration for `serverless` in your AWS config files

### Serverless

1.  Install `serverless` as a global
    ```
    npm install -g serverless
    ```

### Domain Name

1.  Follow the instructions at [serverless-domain-manager] for registering and setting up a domain name
    1.  Create `test-api.whatever.com`
    2.  Create `api.whatever.com`
2.  Change the base `custom.baseDomainName` property in `serverless.yml` to the zone name, eg `whatever.com`
3.  Then run:
    ```
    serverless create_domain
    ```

## Development

### Prettier

This project uses [Prettier](https://prettier.io/), so please run it before checking in:

```
npm run pretty
```

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [TSLint](https://palantir.github.io/tslint/). Check linting before checking in:

```
npm run lint
```

Many IDEs and editors support TSLint

## Testing

This project uses [Jasmine](https://jasmine.github.io/) for testing. Run tests before checking in.

### Unit Tests

```
npm test
```

### Integration Tests

```
npm run test:integration
```

## Building

```
npm run build
```

## Deploy

### Test

```
npm run deploy:test
```

### Production

```
npm run deploy
```

[serverless-domain-manager]: https://github.com/amplify-education/serverless-domain-manager
