# 3WC Web

The website serving the 3 Digit World Cup.

## Prerequisites

- **Node.js**: Version >=24.1.0
- **pnpm**: Latest stable version
- **Docker**: Required for containerized development
- **Git**: For cloning the repository

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shdewz/3wc-web.git
   cd 3wc-web
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

## Development

### Running the Development Server

You can run the app in two ways:

- **Using Docker** (recommended for full environment):

  ```bash
  pnpm dev
  # Or with rebuild:
  pnpm dev:build
  ```

- **Locally** (requires Node.js and pnpm):

  ```bash
  pnpm dev:local
  ```

The app will be available at `http://localhost:5173` (default Vite port).

### Troubleshooting

- Ensure port 5173 is free.
- Ensure the backend is available locally (default at `http://localhost:4000`).

## Building for Production

1. Build the app:

   ```bash
   pnpm build
   ```

2. Preview the build:

   ```bash
   pnpm preview
   ```

## Linting and Formatting

- Lint and fix code:

  ```bash
  pnpm lint
  ```

- Format code:

  ```bash
  pnpm format
  ```

## Deployment

Use the provided deployment script for production:

```bash
./scripts/deploy.sh
```

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and run `pnpm lint` and `pnpm format`.
4. Test your changes.
5. Submit a pull request.

## License

Licensed under the [Apache 2.0 License](/LICENSE). See the license file for more information.
