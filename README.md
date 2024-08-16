# @ngrok/gen-x

Generate package.json#exports from src

## Installation

Install `@ngrok/gen-x` to your `devDependencies` with your preferred package manager:

| package manager | command                      |
| --------------- | ---------------------------- |
| npm             | npm install -DE @ngrok/gen-x |
| yarn            | yarn add -DE @ngrok/gen-x    |
| pnpm            | pnpm add -DE @ngrok/gen-x    |
| bun             | bun add -DE @ngrok/gen-x     |

## Development

Prerequisites required:

- [Node 20](https://nodejs.org/en/download)
- [pnpm 9](https://pnpm.io/installation#using-npm)
- [nvm](https://github.com/nvm-sh/nvm)

We use [direnv](https://direnv.net/) to assist you with setting up all of the required tooling.

<details>
  <summary>Prefer to install and manage the tooling yourself?</summary>

1. Install [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) or your node version manager of choice.
2. Ensure that `node 20` is installed. With `nvm`, run `nvm install`.
3. Enable `pnpm` with `corepack`: `corepack enable pnpm`
4. Install `pnpm` with `corepack`: `corepack install`
5. Install project dependencies with `pnpm`: `pnpm install`
</details>

First, install `direnv`:

| OS     | command                 |
| ------ | ----------------------- |
| macOS  | brew install direnv     |
| ubuntu | sudo apt install direnv |

For all other OSes, see the [direnv installation guide](https://direnv.net/docs/installation.html).

Don't forget to [set up direnv integration with your shell](https://direnv.net/docs/hook.html).

Next, clone the repo and move into the directory:

```sh
git clone https://github.com/ngrok-oss/gen-x.git
cd gen-x
```

Next, run:

```sh
direnv allow
```

This will install `nvm` (if not already installed) as well as set the correct `node` and `pnpm` versions for you.
It will also run `pnpm install` at the end to install all `node_modules`.
