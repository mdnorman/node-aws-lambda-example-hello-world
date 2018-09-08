# Node AWS Lambda Example Hello World

## Setup

### Node

1.  Install `nvm` (Node Version Manager)
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

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
