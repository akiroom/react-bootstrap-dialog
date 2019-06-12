# Contributing to React Bootstrap Dialog Component

We welcome your help to make this component better. This document will help to streamline the contributing process and save everyone's precious time.

## Development Setup

This component has been setup with [React CDK](https://github.com/kadirahq/react-cdk). Refer [React CDK documentation](https://github.com/kadirahq/react-cdk) to get started with the development.

## Coding Style

We are going on standard.js

See [feross/standard](https://github.com/feross/standard).

## Preview on Storybook

Run `yarn storybook`.

## Deploy Storybook

We use [storybook-deployer](https://github.com/kadirahq/storybook-deployer)

Run `yarn publish-storybook` to deploy storybook on [gh-pages branch](https://pages.github.com/).

## Publish

1. Update CHANGELOG.md.
2. Run `yarn version --new-version <version>`
3. Publish:

```sh
yarn publish
```

---

## Dist on GitHub and reference in `package.json` directly from GitHub

This is in case the pull request doesn't get accepted quickly.

Fork to a separate branch so as not to polute master or others, e.g. `release/x.y.z`

Build the `dist` files

```
npm run prepublish
```

Reference the tarball for the branch from your `package.json` file

```
 "dependencies": {
   ...
   "react-bootstrap-dialog": "https://github.com/dvdsmpsn/react-bootstrap-dialog/tarball/release/v0.12.1",
   ...
 }
```
