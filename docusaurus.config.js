// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ellithium',
  tagline: 'A powerful Java-based test automation framework',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://ellithium.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ellithium', // Usually your GitHub org/user name.
  projectName: 'ellithium.github.io', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/', // Set docs as the root
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.png',
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: 'Ellithium',
        logo: {
          alt: 'Ellithium Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Overview',
          },
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Get Started',
          },
          {
            type: 'dropdown',
            label: 'Testing',
            position: 'left',
            items: [
              {
                label: 'Driver Factory',
                to: '/driverfactory',
              },
              {
                label: 'Interactions',
                to: '/interactions/interactions',
              },
              {
                label: 'Web Testing',
                to: '/web-testing',
              },
              {
                label: 'Mobile Testing',
                to: '/mobile-testing',
              },
              {
                label: 'API Testing',
                to: '/api-testing',
              },
              {
                label: 'Database Testing',
                to: '/database-testing',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Utilities',
            position: 'left',
            items: [
              {
                label: 'All Utilities',
                to: '/utilities',
              },
              {
                label: 'JSON Helper',
                to: '/utilities/json-helper',
              },
              {
                label: 'Excel Helper',
                to: '/utilities/excel-helper',
              },
              {
                label: 'CSV Helper',
                to: '/utilities/csv-helper',
              },
              {
                label: 'Text Helper',
                to: '/utilities/text-helper',
              },
              {
                label: 'PDF Helper',
                to: '/utilities/pdf-helper',
              },
              {
                label: 'Property Helper',
                to: '/utilities/property-helper',
              },
              {
                label: 'JAR Extractor',
                to: '/utilities/jar-extractor',
              },
              {
                label: 'Command Executor',
                to: '/utilities/command-executor',
              },
              {
                label: 'Test Data Generator',
                to: '/utilities/test-data-generator',
              },
              {
                label: 'Assertion Executor',
                to: '/utilities/assertion-executor',
              },
              {
                label: 'Configuration Properties',
                to: '/utilities/property-files',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Examples',
            position: 'left',
            items: [
              {
                label: 'Web UI Tests',
                to: '/examples/web-testing',
              },
              {
                label: 'API Tests',
                to: '/examples/api-testing',
              },
              {
                label: 'Database Tests',
                to: '/examples/db-testing',
              },
              {
                label: 'Mobile Tests',
                to: '/examples/mobile-testing',
              },
              {
                label: 'Helper Utilities',
                to: '/examples/helpers',
              },
            ],
          },
          {
            href: 'https://github.com/Abdelrhman-Ellithy/Ellithium',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/',
              },
              {
                label: 'Installation',
                to: '/installation',
              },
              {
                label: 'Testing Modes',
                to: '/test-modes',
              }
            ],
          },
          {
            title: 'Testing',
            items: [
              {
                label: 'Driver Factory',
                to: '/driverfactory',
              },
              {
                label: 'Interactions',
                to: '/interactions/interactions',
              },
              {
                label: 'Web Testing',
                to: '/web-testing',
              },
              {
                label: 'Mobile Testing',
                to: '/mobile-testing',
              },
            ],
          },
          {
            title: 'Utilities',
            items: [
              {
                label: 'JSON Helper',
                to: '/utilities/json-helper',
              },
              {
                label: 'Test Data Generator',
                to: '/utilities/test-data-generator',
              },
              {
                label: 'Assertion Executor',
                to: '/utilities/assertion-executor',
              },
              {
                label: 'Configuration Properties',
                to: '/utilities/property-files',
              },
              {
                label: 'All Utilities',
                to: '/utilities',
              },
            ],
          },
          {
            title: 'Examples',
            items: [
              {
                label: 'Web UI Tests',
                to: '/examples/web-testing',
              },
              {
                label: 'API Tests',
                to: '/examples/api-testing',
              },
              {
                label: 'Database Tests',
                to: '/examples/db-testing',
              },
              {
                label: 'Mobile Tests',
                to: '/examples/mobile-testing',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Abdelrhman-Ellithy/Ellithium',
              },
              {
                label: 'Udemy Course',
                href: 'https://www.udemy.com/course/master-ellithium-unified-test-automation-framework',
              },
              {
                label: 'Selenium Ecosystem',
                href: 'https://www.selenium.dev/ecosystem/#frameworks',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ellithium. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
