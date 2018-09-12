# CHANGEME

## Setup

### Node

1.  Install `nvm` ([Node Version Manager])
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

### IDE Setup

This project uses [EditorConfig] for IDE configuration.

See `.editorconfig` for settings.

Many popular IDEs and editors support this out of the box or with a plugin.

### AWS

1.  Install AWS CLI for your computer
2.  Setup AWS CLI with your credentials
3.  Add a configuration for `serverless` in your AWS config files

### Serverless

This project uses [Serverless] to deploy. Install `serverless` as a global:

```
npm install -g serverless
```

### Domain Name

1.  Follow the instructions at [serverless-domain-manager] for registering and setting up a domain name
    1.  Create `test-api.whatever.com` certificate
    2.  Create `api.whatever.com` certificate
2.  Change the base `custom.baseDomainName` property in `serverless.yml` to the zone name, eg `whatever.com`
3.  Then run:
    ```
    serverless create_domain
    ```

## Development

### Invoking locally

Use serverless to run the server locally:

```
serverless invoke local -f CHANGEME
```

### Invoking against test

Use serverless to run the server against the test environment:

```
serverless invoke -f CHANGEME
```

### Prettier

This project uses [Prettier], so please run it before checking in:

```
npm run pretty
```

See `.prettierrc` for settings.

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [TSLint]. Check linting before checking in:

```
npm run lint
```

See `tslint.json` for settings.

Many IDEs and editors support TSLint.

## Testing

This project uses [Jasmine] for testing. Run tests before checking in.

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

> NOTE: AWS Certificate validation requires a manual step during the first deployment.
>
> When the following is displayed, go to the AWS Certificate Manager console for the new domain name and create the record in Route 53:
>
> `CloudFormation - CREATE_IN_PROGRESS - AWS::CertificateManager::Certificate - WebAppCertificate`

### Test

```
npm run deploy:test
```

### Production

```
npm run deploy
```

### Troubleshooting

If there are errors when deploying, check the Cloudformation logs for the stack.

[editorconfig]: https://editorconfig.org/
[jasmine]: https://jasmine.github.io/
[node version manager]: https://github.com/creationix/nvm
[prettier]: https://prettier.io/
[serverless]: https://serverless.com/
[serverless-domain-manager]: https://github.com/amplify-education/serverless-domain-manager
[tslint]: https://palantir.github.io/tslint/
