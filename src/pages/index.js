import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    icon: '🌐',
    title: 'Web & Mobile Testing',
    description: 'Automate testing for web apps, mobile apps, and responsive websites with a unified API and cross-platform Appium support.',
    link: '/web-testing',
  },
  {
    icon: '⚡',
    title: 'API Testing',
    description: 'Simplify API testing with built-in REST support, JSON validation, schema checks, and response verification.',
    link: '/api-testing',
  },
  {
    icon: '🗄️',
    title: 'Database Testing',
    description: 'Test SQL and NoSQL databases — MySQL, MongoDB, Oracle, PostgreSQL, Redis, Couchbase, and more.',
    link: '/database-testing',
  },
  {
    icon: '🔔',
    title: 'Notification System',
    description: 'Automated email and Slack notifications for test results with rich Allure reporting and failure alerts.',
    link: '/notifications',
  },
  {
    icon: '🛠️',
    title: 'Utility Libraries',
    description: 'Comprehensive utilities for data generation, file handling, JSON/Excel/CSV/PDF helpers, and assertions.',
    link: '/utilities',
  },
  {
    icon: '📋',
    title: 'BDD & Reporting',
    description: 'Choose BDD with Cucumber or traditional TestNG — either way you get detailed Allure reports with screenshots and videos.',
    link: '/getting-started',
  },
  {
    icon: '🔄',
    title: 'CI/CD Integration',
    description: 'Seamless integration with Jenkins, GitHub Actions, GitLab CI, and any modern pipeline with built-in CI healing mode.',
    link: '/getting-started',
  },
];

const aiFeatures = [
  {
    icon: '🩺',
    badge: 'Self-Healing',
    title: '3-Tier Self-Healing Locators',
    description: 'When a locator breaks, the engine cascades through three tiers automatically: historical baselines (Tier 1), embedded local AI semantic matching (Tier 2), and LLM-powered visual reasoning (Tier 3). Tests keep running without manual intervention.',
    link: '/ai/self-healing',
    linkLabel: 'Explore Self-Healing →',
  },
  {
    icon: '🎬',
    badge: 'Codegen Recorder',
    title: 'AI Codegen Recorder',
    description: 'Record clicks and typing in a live browser. Every element gets ranked, uniqueness-verified locator candidates shown in an in-browser overlay. Override picks, add assertions, then click Stop — complete Page Objects generated instantly.',
    link: '/ai/codegen-recorder',
    linkLabel: 'Explore Codegen →',
  },
  {
    icon: '🧠',
    badge: 'AI Engine',
    title: 'Natural Language → Test Code',
    description: 'Feed plain-English test descriptions and the AI Engine generates complete TestNG classes, reusable Page Objects, and BDD feature files by scraping the live DOM for real locators. Supports OpenAI, Gemini, Claude, and custom providers.',
    link: '/ai/ai-engine',
    linkLabel: 'Explore AI Engine →',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroVersion}>v3.0.0</div>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          A unified Java test automation framework for Web, Mobile, API, and Database testing —
          now with an AI module for self-healing locators, codegen recording, and natural language test generation.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button', styles.button, styles.primaryButton)}
            to="/getting-started">
            Get Started
          </Link>
          <Link
            className={clsx('button', styles.button, styles.aiHeroButton)}
            to="/ai">
            ✨ Explore AI Features
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({icon, title, description, link}) {
  return (
    <Link to={link} className={styles.featureCardLink}>
      <div className={styles.featureCard}>
        <span className={styles.featureIcon}>{icon}</span>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </Link>
  );
}

function AIFeatureCard({icon, badge, title, description, link, linkLabel}) {
  return (
    <div className={styles.aiCard}>
      <div className={styles.aiBadge}>{badge}</div>
      <span className={styles.aiCardIcon}>{icon}</span>
      <h3 className={styles.aiCardTitle}>{title}</h3>
      <p className={styles.aiCardDescription}>{description}</p>
      <Link to={link} className={styles.aiCardLink}>{linkLabel}</Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="A unified Java test automation framework for Web, Mobile, API, and Database testing with AI-powered self-healing, codegen recording, and natural language test generation.">
      <HomepageHeader />
      <main>

        {/* ── AI MODULE HIGHLIGHT ─────────────────────────────────────────── */}
        <div className={styles.aiSection}>
          <div className="container">
            <div className={styles.aiSectionHeader}>
              <span className={styles.aiSectionBadge}>NEW IN 3.0</span>
              <h2 className={styles.aiSectionTitle}>✨ AI-Powered Testing Module</h2>
              <p className={styles.aiSectionSubtitle}>
                Ellithium 3.0 ships a full AI subsystem — self-healing locators, an in-browser codegen
                recorder, and a natural-language-to-code engine. Everything is configured through a single{' '}
                <code>ai-config.properties</code> file. Zero cloud dependency required for Tier 1 &amp; 2.
              </p>
            </div>

            <div className={styles.aiCards}>
              {aiFeatures.map((props, idx) => (
                <AIFeatureCard key={idx} {...props} />
              ))}
            </div>

            <div className={styles.aiSectionFooter}>
              <Link
                className={clsx('button', styles.button, styles.aiButton)}
                to="/ai">
                AI Module Overview
              </Link>
              <Link
                className={clsx('button', styles.button, styles.aiConfigButton)}
                to="/utilities/property-files">
                AI Configuration Reference
              </Link>
            </div>
          </div>
        </div>

        {/* ── KEY FEATURES ────────────────────────────────────────────────── */}
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <section className={styles.features}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div className={clsx('container', styles.ctaSection)}>
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
      <img
        referrerPolicy="no-referrer-when-downgrade"
        src="https://static.scarf.sh/a.png?x-pxid=98201aa5-90b3-490c-8655-c6d45282eec7"
        alt=""
        style={{position:'absolute',width:'1px',height:'1px',opacity:0,pointerEvents:'none'}}
      />
    </Layout>
  );
}
