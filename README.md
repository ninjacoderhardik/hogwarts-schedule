# Hogwarts Schedule React App

This project implements a Hogwarts class scheduling system with teacher attendance tracking and dynamic teacher assignment based on hierarchy.

## Project Overview

The application consists of two main sections:
- **Attendance**: Tracks teacher presence/absence status
- **Current Schedule**: Displays student-teacher assignments that automatically update based on attendance

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hogwarts-schedule-app
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run test:cucumber`

Runs Cucumber integration tests for the application. Tests are written in Gherkin syntax and can be found in the `src/test/cucumber` directory.

### `npm run test:cucumber:report`

Runs Cucumber tests and generates HTML and JSON reports in the `reports` directory.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Testing

### Unit Tests

The project includes comprehensive unit tests focusing on:
- Teacher attendance management
- Student-teacher assignment logic
- Hierarchy-based teacher reassignment
- Component rendering and interactions

### Cucumber Integration Tests

Integration tests are written using Cucumber to ensure the application behaves correctly in real-world scenarios. Test files are organized as follows:

```
src/test/cucumber/
├── features/        # Feature files written in Gherkin
├── steps/          # Step definitions
└── support/        # Support files and setup
```

To run Cucumber tests with HTML reports:
```bash
npm run test:cucumber:report
```

Reports can be found in:
- HTML: `reports/cucumber-report.html`
- JSON: `reports/cucumber-report.json`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).