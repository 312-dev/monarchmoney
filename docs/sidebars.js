/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'guides/installation',
        'guides/authentication',
        'guides/session-management',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/error-handling',
        'guides/advanced-usage',
      ],
    },
  ],
  apiSidebar: [
    'api/overview',
    {
      type: 'category',
      label: 'Authentication',
      items: [
        'api/login',
        'api/interactive_login',
        'api/multi_factor_authenticate',
        'api/save_session',
        'api/load_session',
        'api/delete_session',
      ],
    },
    {
      type: 'category',
      label: 'Accounts',
      items: [
        'api/get_accounts',
        'api/get_account_holdings',
        'api/get_account_history',
        'api/get_account_type_options',
        'api/get_recent_account_balances',
        'api/get_account_snapshots_by_type',
        'api/get_aggregate_snapshots',
        'api/create_manual_account',
        'api/update_account',
        'api/delete_account',
        'api/request_accounts_refresh',
        'api/is_accounts_refresh_complete',
        'api/request_accounts_refresh_and_wait',
      ],
    },
    {
      type: 'category',
      label: 'Transactions',
      items: [
        'api/get_transactions',
        'api/get_transaction_details',
        'api/get_transaction_splits',
        'api/get_transactions_summary',
        'api/create_transaction',
        'api/update_transaction',
        'api/delete_transaction',
        'api/update_transaction_splits',
      ],
    },
    {
      type: 'category',
      label: 'Categories',
      items: [
        'api/get_transaction_categories',
        'api/get_transaction_category_groups',
        'api/create_transaction_category',
        'api/update_transaction_category',
        'api/delete_transaction_category',
        'api/delete_transaction_categories',
        'api/update_category_group_settings',
        'api/enable_category_rollover',
        'api/get_category_rollover',
        'api/update_category_rollover',
      ],
    },
    {
      type: 'category',
      label: 'Tags',
      items: [
        'api/get_transaction_tags',
        'api/create_transaction_tag',
        'api/set_transaction_tags',
      ],
    },
    {
      type: 'category',
      label: 'Budgets & Goals',
      items: [
        'api/get_budgets',
        'api/set_budget_amount',
        'api/update_flexible_budget',
        'api/get_savings_goals',
        'api/get_savings_goal_budgets',
      ],
    },
    {
      type: 'category',
      label: 'Cash Flow & Analytics',
      items: [
        'api/get_cashflow',
        'api/get_cashflow_summary',
        'api/get_aggregates',
      ],
    },
    {
      type: 'category',
      label: 'Recurring Transactions',
      items: [
        'api/get_recurring_transactions',
        'api/get_all_recurring_transaction_items',
      ],
    },
    {
      type: 'category',
      label: 'Institutions & User',
      items: [
        'api/get_institutions',
        'api/get_subscription_details',
        'api/get_user_profile',
      ],
    },
    {
      type: 'category',
      label: 'Utilities',
      items: [
        'api/upload_account_balance_history',
        'api/gql_call',
      ],
    },
  ],
};

module.exports = sidebars;
