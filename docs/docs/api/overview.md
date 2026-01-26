---
sidebar_position: 1
---

# API Overview

The Eclosion API provides comprehensive access to Monarch Money's functionality through a Python async interface.

## Architecture

Eclosion communicates with Monarch Money via their GraphQL API. All API methods are asynchronous and should be called with `await`.

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

# All API calls are async
accounts = await mm.get_accounts()
```

## API Categories

### Authentication

Methods for logging in, handling MFA, and managing sessions.

| Method | Description |
|--------|-------------|
| [`login()`](./login) | Log in to Monarch Money |
| [`interactive_login()`](./interactive_login) | Interactive login with prompts |
| [`multi_factor_authenticate()`](./multi_factor_authenticate) | Complete MFA |
| [`save_session()`](./save_session) | Save auth session to file |
| [`load_session()`](./load_session) | Load auth session from file |
| [`delete_session()`](./delete_session) | Delete saved session |

### Accounts

Methods for managing financial accounts.

| Method | Description |
|--------|-------------|
| [`get_accounts()`](./get_accounts) | Get all linked accounts |
| [`get_account_holdings()`](./get_account_holdings) | Get investment holdings |
| [`get_account_history()`](./get_account_history) | Get balance history |
| [`get_account_type_options()`](./get_account_type_options) | Get account types |
| [`create_manual_account()`](./create_manual_account) | Create manual account |
| [`update_account()`](./update_account) | Update account settings |
| [`delete_account()`](./delete_account) | Delete an account |
| [`request_accounts_refresh()`](./request_accounts_refresh) | Trigger account sync |

### Transactions

Methods for working with transactions.

| Method | Description |
|--------|-------------|
| [`get_transactions()`](./get_transactions) | Get transactions with filters |
| [`get_transaction_details()`](./get_transaction_details) | Get single transaction |
| [`get_transaction_splits()`](./get_transaction_splits) | Get split info |
| [`create_transaction()`](./create_transaction) | Create transaction |
| [`update_transaction()`](./update_transaction) | Update transaction |
| [`delete_transaction()`](./delete_transaction) | Delete transaction |
| [`update_transaction_splits()`](./update_transaction_splits) | Modify splits |

### Categories & Tags

Methods for organizing transactions.

| Method | Description |
|--------|-------------|
| [`get_transaction_categories()`](./get_transaction_categories) | Get all categories |
| [`create_transaction_category()`](./create_transaction_category) | Create category |
| [`update_transaction_category()`](./update_transaction_category) | Update category |
| [`delete_transaction_category()`](./delete_transaction_category) | Delete category |
| [`get_transaction_tags()`](./get_transaction_tags) | Get all tags |
| [`create_transaction_tag()`](./create_transaction_tag) | Create tag |
| [`set_transaction_tags()`](./set_transaction_tags) | Set tags on transaction |

### Budgets & Goals

Methods for budget and savings goal management.

| Method | Description |
|--------|-------------|
| [`get_budgets()`](./get_budgets) | Get budget data |
| [`set_budget_amount()`](./set_budget_amount) | Set budget amount |
| [`update_flexible_budget()`](./update_flexible_budget) | Update flex budget |
| [`get_savings_goals()`](./get_savings_goals) | Get savings goals |
| [`get_savings_goal_budgets()`](./get_savings_goal_budgets) | Get goal budgets |

### Analytics

Methods for financial analytics and reporting.

| Method | Description |
|--------|-------------|
| [`get_cashflow()`](./get_cashflow) | Get cashflow breakdown |
| [`get_cashflow_summary()`](./get_cashflow_summary) | Get cashflow summary |
| [`get_aggregates()`](./get_aggregates) | Get aggregate totals |
| [`get_transactions_summary()`](./get_transactions_summary) | Get txn summary |

## Return Types

All API methods return Python dictionaries parsed from JSON responses. The structure matches Monarch Money's GraphQL schema.

```python
accounts = await mm.get_accounts()
# Returns:
# {
#     "accounts": [...],
#     "householdPreferences": {...}
# }
```

## Error Handling

API methods may raise:

- `RequireMFAException` - MFA is required
- `LoginFailedException` - Login failed
- `RequestFailedException` - API request failed

```python
from monarchmoney import RequestFailedException

try:
    await mm.delete_transaction("invalid-id")
except RequestFailedException as e:
    print(f"Error: {e}")
```

## Rate Limiting

Monarch Money may rate limit requests. For bulk operations, consider:

1. Adding delays between requests
2. Using pagination for large datasets
3. Implementing exponential backoff

## Interactive API Testing

Each API method page includes an interactive tester that lets you:

1. Fill in parameters
2. Generate Python code
3. Execute requests (with your auth token)

This is useful for exploring the API and understanding response formats.
