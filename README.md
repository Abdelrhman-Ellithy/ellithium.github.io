# Ellithium Framework Documentation

This repository contains the documentation website for Ellithium Framework, a unified test automation framework for Web, Mobile, API, SQL and NoSQL database testing. The documentation is built using Docusaurus and automatically deployed to GitHub Pages using GitHub Actions.

## 🎯 Framework Overview

Ellithium is officially recognized in the Selenium Ecosystem as a recommended test automation framework. It provides a seamless experience across different testing platforms with a consistent API.

### Supported Testing Platforms

|Web |Mobile| API|Database|
| :---: |:---: |:---: |:---: |
| ✅  |✅  |✅   |✅  |

### Supported Database Types with Caching

|Mongo | Couchbase |Redis | MySQL| SQL Server | Oracle | IBM DB2| PostgreSQL|SQLite |
| :---: |:---: |:---: |:---: |:---: |:---: |:---: |:---: |:---: |
| ✅  |✅  |✅   |✅  |✅  |✅  |✅   |✅  |✅  |

### Key Features

|BDD Support|Parallel Execution|Cross-Browser Testing|Headless Testing|Logging|Screenshots|User Stories|Reporting|CLI Interface|Synchronization|CI/CD|Test Data|
|:--------:|:--------:|:--------:|:------:|:------:|:------:|:------:|:-----:|:------:|:-----:|:-----:|:-----:|
|✅        |✅         |✅         |✅        |✅      |✅       |✅       |✅      |✅       |✅       |✅       |✅       |

## 🚀 Framework Highlights

- **Unified API**: Consistent API for all testing platforms (Web, Mobile, API)
- **Thread-Safe Driver Management**: Built-in thread safety for parallel test execution
- **Powerful Synchronization**: Intelligent wait mechanisms and timeout management
- **Database Support**: Comprehensive database support with built-in caching
- **BDD and Default Testing**: Support for both Cucumber BDD and TestNG modes
- **Rich Reporting**: Detailed test reports with Allure integration

## 🛠️ Comprehensive Utility Libraries

The framework includes powerful utility libraries for:
- JSON manipulation and validation
- Excel file operations with Apache POI
- CSV file processing
- Text file operations
- PDF content extraction and validation
- Properties file management
- JAR file extraction
- Cross-platform command execution
- Test data generation
- Advanced assertions with detailed logging

## 🏗️ Powered By

- Selenium WebDriver
- REST Assured
- Cucumber
- TestNG
- Allure Reports
- Appium

## 🚀 Quick Start

### Prerequisites

- Node.js version 16.14 or above
- npm or yarn package manager

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ellithium.github.io.git
cd ellithium.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:3000`.

### Building for Production

To build the site for production:

```bash
npm run build
```

The built files will be in the `build` directory.

## 📚 Documentation Structure

- `/docs` - Contains all the documentation markdown files
- `/static` - Static assets like images and files
- `/src` - React components and custom code
- `/docusaurus.config.js` - Main configuration file
- `/sidebars.js` - Documentation sidebar configuration

## 🔄 Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions. The workflow is configured in `.github/workflows/deploy.yml`.

### Deployment Process

1. When changes are pushed to the `main` branch
2. GitHub Actions workflow is triggered
3. The site is built and deployed to GitHub Pages

## 📝 License

This project is licensed under the terms of the license included in the repository. 