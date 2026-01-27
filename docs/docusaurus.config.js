// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// Read version from Python package
const fs = require('fs');
const path = require('path');

let version = '0.1.16';
try {
  const initPath = path.join(__dirname, '..', 'monarchmoney', '__init__.py');
  const initContent = fs.readFileSync(initPath, 'utf8');
  const versionMatch = initContent.match(/__version__\s*=\s*["']([^"']+)["']/);
  if (versionMatch) {
    version = versionMatch[1];
  }
} catch (e) {
  console.warn('Could not read version from __init__.py, using default');
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Monarch Money API',
  tagline: 'Unofficial Python API for Monarch Money',
  favicon: 'img/favicon.ico',

  url: 'https://312-dev.github.io',
  baseUrl: '/monarchmoney/',

  organizationName: '312-dev',
  projectName: 'monarchmoney',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/312-dev/monarchmoney/tree/main/docs/',
          versions: {
            current: {
              label: `${version} (Current)`,
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      navbar: {
        title: 'Monarch Money API',
        logo: {
          alt: 'Monarch Money API Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API Reference',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/312-dev/monarchmoney',
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
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'API Reference',
                to: '/docs/api/overview',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Issues',
                href: 'https://github.com/312-dev/monarchmoney/issues',
              },
              {
                label: 'Discussions',
                href: 'https://github.com/312-dev/monarchmoney/discussions',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/312-dev/monarchmoney',
              },
              {
                label: 'PyPI',
                href: 'https://pypi.org/project/monarchmoney/',
              },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} 312.dev. Originally by hammem. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['python', 'bash', 'json'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
