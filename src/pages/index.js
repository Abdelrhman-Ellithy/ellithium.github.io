import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    title: 'Web & Mobile Testing',
    description: 'Automate testing for web applications, mobile apps, and responsive websites with unified API and cross-platform capabilities.',
  },
  {
    title: 'API Testing',
    description: 'Simplify API testing with built-in support for RESTful services, JSON validation, and response verification.',
  },
  {
    title: 'Database Testing',
    description: 'Test SQL and NoSQL databases including MySQL, MongoDB, SQL Server, Oracle, PostgreSQL, Redis, and more.',
  },
  {
    title: 'Notification System',
    description: 'Automated email and Slack notifications for test results with rich reporting, failure alerts, and team collaboration.',
  },
  {
    title: 'Utility Libraries',
    description: 'Leverage comprehensive utilities for data generation, file handling, assertions, and system integrations.',
  },
  {
    title: 'BDD & Reporting',
    description: 'Choose between BDD testing with Cucumber or traditional TestNG with detailed Allure reporting.',
  },
  {
    title: 'CI/CD Integration',
    description: 'Seamlessly integrate with popular CI/CD tools including Jenkins, GitHub Actions, and GitLab.',
  }
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button', styles.button, styles.primaryButton)}
            to="/getting-started">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}) {
  return (
    <div className={styles.featureCard}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="A unified test automation framework for Web, Mobile, API, and Database testing">
      <HomepageHeader />
      <main>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <section className={styles.features}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </section>
        
        <div className="container text-center margin-top--xl margin-bottom--xl">
          <h2 className={styles.sectionTitle}>Ready to Start Testing?</h2>
          <div className={styles.buttons}>
            <Link
              className={clsx('button', styles.button, styles.primaryButton)}
              to="/installation">
              Installation Guide
            </Link>
            <Link
              className={clsx('button', styles.button, styles.secondaryButton)}
              to="https://github.com/Abdelrhman-Ellithy/Ellithium">
              GitHub Repository
            </Link>
          </div>
          
          <div className={styles.recognitionContainer}>
            <div className={styles.seleniumEcosystem}>
              <a href="https://www.selenium.dev/ecosystem/#frameworks" target="_blank" rel="noopener noreferrer">
                Officially recognized in the Selenium Ecosystem
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 