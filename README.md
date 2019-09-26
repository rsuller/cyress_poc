# cyress_poc
Automated testing with Cypress.io https://docs.cypress.io/

### Open Cypress with
`npm run cypress:open`

### Run all tests with
`npm run test`

### Running tests in headless mode
Running tests via the command line will run in headless mode e.g.
```
./node_modules/cypress/bin/cypress run --spec "{relative_path}\{test_name}.spec.js"
```

*When tests are executed via the command line a video of the run will be recorded in the **cypress** root folder e.g.*
`C:\Users\user\cypress\videos\test_name.spec.js.mp4 `

#### Limitations
> When running tests in Cypress, Cypress will change it's host URL to match the application under test. Please see [here](https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test) for further details.
