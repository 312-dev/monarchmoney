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
          <code>pip install monarchmoney</code>
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

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Python API for Monarch Money`}
      description="Eclosion is a Python library for programmatic access to Monarch Money financial data">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickInstall />
      </main>
    </Layout>
  );
}
