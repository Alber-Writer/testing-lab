# Lemoncode Testing Laboratory

This deliverable is aimed to test the following capabilities:
- Unit Testing (common JS functions, components and Hooks).
- E2E Testing with Cypress.
- Use of Continuous Integration pipelines with Github Actions for both tests types.

Test cases are based on an already existing project from LemonCode, named *"Origin"*.


## Mandatory exercises

Initially located at branch: *feature/laboratorio-testing-obligatorio*
### ***Mapper*** tests
> The function `mapEmployeeSummaryListFromApiToVm()` from `project.mapper.ts` has been set as an `export`,
to test its functionality.
```
npm run test project\.mapper\.spec
```

### ***SearchBar*** component tests
```
npm run test search-bar\.component\.spec
```

### ***useSearchBarMapper*** hook tests
```
npm run test search-bar\.hook\.spec
```

## Optional exercises
Located at branch: *feature/laboratorio-testing-opcional*
### ***SpinnerComponent*** tests
```
npm run test spinner\.component\.spec
```

### Login scene E2E with cypress
```
npm run test:e2e
```
