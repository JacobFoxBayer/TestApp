# test

## What's in this generated project
### The basics
* .eslintrc.js
* .gitignore
* .npmignore
* .npmrc - Setup to allow the package-lock.json and default packages to ~ semver scope.  If the package-lock.json is causing you issues, set it to false in this file.
* server.js - Your main server file.  This is where everything starts from.
* bin/www.js - Script to start the server.
* src/config - Unified configuration system utilizing the [@monsantoit/config](https://npm-web.platforms.engineering/-/web/detail/@monsantoit/config) module.
* test/* - Mocha test files
* package.json - Includes dependencies and scripts:
    * ```npm run dev``` - Starts your server locally, picks up changes automatically.
    * ```npm run start``` - Starts your server in production mode. May Require ```npm run package``` to build webpack
    * ```npm run lint``` - Runs the linter.
    * ```npm run lint:fix``` - Runs the linter which will automatically fix issues.
    * ```npm run test``` - Runs the linter, then the mocha tests.
    * ```npm run clean``` - Cleans up the public folder.
    * ```npm run package``` - Runs the webpack to prepare for a deployment.

### UI
We've setup a small React.JS page for you that uses the *@monsantoit/profile-client* library to get the current user information.
The project uses the *react-router* package.  The routes are in the *src/scripts/routes.jsx* file.

This project has also been configured with webpack hotloading.  Which means when you make a change to one of the Javascript files, you should see it reflected immediately in your browser **without** reloading.

We've guessed your cookie name, but you might have to change the cookie_name property sent into the navbar wrapper in the *src/scripts/main.jsx* file.


### Local Ocelot
To get valid ping credentials while running locally, you should run a local version of [ocelot](https://npm-web.platforms.engineering/package/@monsantoit/ocelot).
```
npm i -g @monsantoit/ocelot
```

We've generated a test-ocelot.config.json file for you with a
basic configuration.  You can put this in your ~/.ocelot/routes folder, or
append the contents to your ~/.ocelot/routes file.

We've set the AuthProvider for this route to AzureAD. Make sure to edit the file
to include in your client id and secret. While you can hard code these values, it's
preferred to use vault to resolve them instead (see below).

#### Ocelot with vault

In your config, you could set:
```
"client_id": vault://secret/path/to/my/client/id
"client_secret": vault://secret/path/to/my/client/secret
```

Which will fetch the value `id`, under the vault path `secret/path/to/my/client`.
By default, this file is added to the `.gitignore`, but if you use vault for
configuration, feel free to check this file in to the project.

#### Symlink (Optional)
If using vault URIs, you can also symlink this to your routes folder. Using
symlinks will keep your local configuration in sync with the source:

Just enter the following:
``` bash
ln -s $PWD/test-ocelot-config.json ~/.ocelot/routes/test-ocelot-config.json
```



### GraphQL
A basic GraphQL endpoint has been setup, the main resolvers are at *src/api/resolvers*.  The UI GraphQL explorer has also been setup for you, when the server starts, the console.log will state the url for the GraphQL explorer.


## Next Steps


### Fargate

If you deploy to fargate, you will probably need to set up the project to deploy. There are a few helper libraries to get your application into fargate. Some of the more general use-case ones include:
* fg-deploy (https://github.platforms.engineering/Pipeline-Principal-Engineers/pipeline-aws-automation#generate-fg-deploy-nextgen-config-file)
* street-deploy (https://lab-docs.velocity-np.ag/onboarding/ci-cd.html#)
* Spectrum (https://github.platforms.engineering/acs2-foundation/spectrum-cli)




## Documentation

Full documentation for the @monsantoit/config can be found at [https://config.phoenix-tools-np.io](https://config.phoenix-tools-np.io/).
