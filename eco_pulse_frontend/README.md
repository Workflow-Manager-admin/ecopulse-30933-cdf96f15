# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

### Project Folder Structure

This project follows a scalable React architecture, with these main directories in `src/`:

- `components/` - Reusable UI components (buttons, cards, charts, etc.)
- `features/` - Feature-based folders for main app modules
- `hooks/` - Custom React hooks
- `contexts/` - React context providers and shared app state
- `services/` - API service utilities (e.g. HTTP clients, Firebase logic)
- `utils/` - Utility/helper functions
- `assets/` - Static files (images, icons, etc)
- `styles/` - Global, theme, or utility styles
- `constants/` - App-wide constant values

### Dependencies

Installed core dependencies:
- **axios** – HTTP client for API calls
- **dotenv** – Environment variable handling
- **@react-google-maps/api** – Google Maps integration for React
- **firebase** – For database/realtime features if used
- **react-toastify** – User notifications
- **react**/**react-dom**/**react-scripts** – Core React ecosystem

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run test:coverage`

Runs tests and generates a coverage report using Jest and React Testing Library. The coverage output is available in the `coverage/` folder and a summary is shown in the terminal.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment Variables & API Keys

### Setup

To run the application, you need to provide several API keys and configuration variables. 

1. **Copy `.env.example` to `.env`:**

   ```sh
   cp .env.example .env
   ```

2. **Edit `.env` and fill in the values** for each key with your actual secrets (never commit real secrets to version control!).

#### Required Variables

| Key | Description |
|-----|-------------|
| `REACT_APP_OPENWEATHERMAP_API_KEY` | API key for [OpenWeatherMap](https://openweathermap.org/api) (air, weather data) |
| `REACT_APP_NASA_API_KEY`           | API key for [NASA APIs](https://api.nasa.gov/) (satellite/deforestation data) |
| `REACT_APP_GOOGLE_MAPS_API_KEY`    | API key for [Google Maps](https://developers.google.com/maps) (map display) |
| `REACT_APP_FIREBASE_API_KEY`       | Firebase web API key (find in Firebase Console) |
| `REACT_APP_FIREBASE_AUTH_DOMAIN`   | Firebase Auth Domain |
| `REACT_APP_FIREBASE_PROJECT_ID`    | Firebase Project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET`| Firebase Storage Bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `REACT_APP_FIREBASE_APP_ID`        | Firebase App ID |

> **Tip:** If you lack an API key, register for each provider (free tiers are available).

### Security Best Practices

- **Never commit your real `.env` to source control.** Only commit `.env.example`.
- Treat your API keys as secrets—do not expose them in public repositories.
- The app may not function if any variables are missing; startup warnings/errors are displayed for missing keys.

### How Environment Variables are Loaded

- All environment variables are read securely in [`src/config.js`](src/config.js).
- If any variable is missing, a warning/error will be logged in the developer console on startup.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Code/Test Coverage Configuration

- Code coverage is configured via a `jest` entry in `package.json`.
- To see code coverage reports, run `npm run test:coverage` in the project folder.
- Reports include `.json`, `lcov`, and `text` (terminal output) for integration with CI or code quality tools.

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

See `package.json` for custom test/coverage configuration provided under the `"jest"` section.

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
