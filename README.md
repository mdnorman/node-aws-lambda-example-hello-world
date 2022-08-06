# Node AWS Lambda Example Hello World

## Setup

### Node

1.  Install `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm))
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

### IDE Setup

This project uses [EditorConfig](https://editorconfig.org/) for IDE configuration.

See `.editorconfig` for settings.

Many popular IDEs and editors support this out of the box or with a plugin.

### AWS

1.  Install AWS CLI for your computer
2.  Setup AWS CLI with your credentials
3.  Add a configuration for `serverless` in your AWS config files

### Domain Name

1.  Follow the instructions at [serverless-domain-manager](https://github.com/amplify-education/serverless-domain-manager) for registering and setting up a domain name
    1.  Create `test-api.whatever.com` certificate
    2.  Create `api.whatever.com` certificate
2.  Change the base `custom.baseDomainName` property in `serverless.yml` to the zone name, eg `whatever.com`
3.  Then run:
    ```
    npx serverless create_domain --stage test
    ```

## Development

### Invoking locally

Use serverless to run the server locally:

```
npx serverless invoke local -f helloWorld -p examples/invoke-data/queryHello.json
```

### Running as a server

```
AWS_SDK_LOAD_CONFIG=true npx serverless offline
```

### Invoking against test

Use serverless to run the server against the test environment:

```
npx serverless invoke --stage test -f helloWorld -p examples/invoke-data/postHello.json
```

### Prettier

This project uses [Prettier](https://prettier.io/), so please run it before checking in:

```
npm run pretty
```

See `.prettierrc` for settings.

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [ESLint](https://eslint.org/). Check linting before checking in:

```
npm run lint
```

See `tslint.json` for settings.

Many IDEs and editors support TSLint.

## Testing

This project uses [Jest](https://jestjs.io/) for testing. Run tests before checking in.

```
npm test
```

## Building

```
npm run build
```

## Deploy

> NOTE: AWS Certificate validation requires a manual step during the first deployment.
>
> When the following is displayed, go to the AWS Certificate Manager console for the new domain name and create the record in Route 53:
>
> `CloudFormation - CREATE_IN_PROGRESS - AWS::CertificateManager::Certificate - WebAppCertificate`

### Test

```
npm run deploy
```

#### Checking logs

```
npx serverless logs --stage test -t -f helloWorld
```

### Production

```
npm run deploy:prod
```

#### Checking logs

```
npx serverless logs --stage prod -t -f helloWorld
```

### Troubleshooting

If there are errors when deploying, check the Cloudformation logs for the stack.
