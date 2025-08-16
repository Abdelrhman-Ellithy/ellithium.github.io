// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Overview'
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Get Started'
    },
    {
      type: 'doc',
      id: 'installation',
      label: 'Installation'
    },
    {
      type: 'doc',
      id: 'test-modes',
      label: 'Testing Modes'
    },
    {
      type: 'category',
      label: 'Testing',
      items: [
        {
          type: 'doc',
          id: 'driverfactory',
          label: 'Driver Factory'
        },
        {
          type: 'category',
          label: 'Interactions',
          items: [
            'interactions/index',
            'interactions/element-actions',
            'interactions/javascript-actions',
            'interactions/alert-actions',
            'interactions/frame-actions',
            'interactions/mouse-actions',
            'interactions/navigation-actions',
            'interactions/wait-actions',
            'interactions/window-actions',
            'interactions/key-press-actions',
            'interactions/select-actions',
            'interactions/screen-recorder-actions',
            'interactions/android-actions',
            'interactions/ios-actions'
          ]
        },
        {
          type: 'doc',
          id: 'web-testing',
          label: 'Web Testing'
        },
        {
          type: 'doc',
          id: 'mobile-testing',
          label: 'Mobile Testing'
        },
        {
          type: 'doc',
          id: 'api-testing',
          label: 'API Testing'
        },
        {
          type: 'doc',
          id: 'database-testing',
          label: 'Database Testing'
        }
      ]
    },
    {
      type: 'category',
      label: 'Notifications',
      items: [
        'notifications/notifications',
        'notifications/configuration',
        'notifications/email-setup',
        'notifications/ci-cd-integration'
      ]
    },
    {
      type: 'category',
      label: 'Utilities',
      items: [
        'utilities/index',
        'utilities/json-helper',
        'utilities/excel-helper',
        'utilities/csv-helper',
        'utilities/text-helper',
        'utilities/pdf-helper',
        'utilities/property-helper',
        'utilities/jar-extractor',
        'utilities/command-executor',
        'utilities/test-data-generator',
        'utilities/assertion-executor',
        'utilities/property-files'
      ]
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      items: [
        'examples/web-testing',
        'examples/api-testing',
        'examples/db-testing',
        'examples/mobile-testing',
        'examples/helpers'
      ]
    }
  ]
};

module.exports = sidebars;
