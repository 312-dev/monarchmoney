import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p style={{fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.5rem'}}>
          Community-maintained. Not affiliated with Monarch Money, Inc.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/api/overview"
            style={{marginLeft: '1rem'}}>
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Comprehensive API',
    description: (
      <>
        Full access to all Monarch Money features including accounts, transactions,
        budgets, categories, tags, and savings goals through a clean async Python API.
      </>
    ),
  },
  {
    title: 'Session Management',
    description: (
      <>
        Save and reuse authentication sessions for long-running applications.
        Built-in support for MFA and secure token handling.
      </>
    ),
  },
  {
    title: 'GraphQL Under the Hood',
    description: (
      <>
        Leverages Monarch Money's GraphQL API for efficient data fetching.
        Full async/await support with configurable timeouts.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md feature-card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickInstall() {
  return (
    <section className={styles.quickInstall}>
      <div className="container">
        <h2>Quick Install</h2>
        <div className={styles.codeBlock}>
          <code>pip install git+https://github.com/312-dev/monarchmoney.git</code>
        </div>
        <div className={styles.quickExample}>
          <h3>Quick Example</h3>
          <pre>
{`from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)
accounts = await mm.get_accounts()
print(accounts)`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function Disclaimer() {
  return (
    <section style={{
      background: 'var(--ifm-background-surface-color)',
      padding: '2rem 0',
      borderTop: '1px solid var(--ifm-color-emphasis-200)',
    }}>
      <div className="container">
        <p style={{
          textAlign: 'center',
          margin: 0,
          color: 'var(--ifm-color-emphasis-600)',
          fontSize: '0.875rem',
        }}>
          <strong>Disclaimer:</strong> This is an unofficial, community-maintained library.
          It is not affiliated with, endorsed by, or connected to Monarch Money, Inc.
          Use at your own risk.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Unofficial Python API`}
      description="An unofficial Python library for programmatic access to Monarch Money financial data">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickInstall />
        <Disclaimer />
      </main>
    </Layout>
  );
}
