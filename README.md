# Monarch Money API (Unofficial)

[![PyPI version](https://badge.fury.io/py/monarchmoney.svg)](https://badge.fury.io/py/monarchmoney)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://312-dev.github.io/monarchmoney/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An unofficial Python library for programmatic access to [Monarch Money](https://www.monarchmoney.com/referral/ngam2i643l) financial data. This community-maintained fork provides a comprehensive async API for managing accounts, transactions, budgets, categories, and more.

> **Attribution:** This library is based on the original work by [hammem](https://github.com/hammem/monarchmoney). It is now maintained by [312.dev](https://github.com/312-dev).

*This project is not affiliated with, endorsed by, or connected to Monarch Money in any way.*

## Documentation

Full API documentation is available at: **[https://312-dev.github.io/monarchmoney/](https://312-dev.github.io/monarchmoney/)**

## Installation

### Via pip from GitHub (Recommended)

```bash
pip install git+https://github.com/312-dev/monarchmoney.git
```

### From Source

```bash
git clone https://github.com/312-dev/monarchmoney.git
cd monarchmoney
pip install -e .
```

## Quick Start

### Interactive Login (Jupyter/iPython)

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.interactive_login()
```

### Programmatic Login

```python
from monarchmoney import MonarchMoney, RequireMFAException

mm = MonarchMoney()

# Simple login
await mm.login(email, password)

# With MFA handling
try:
    await mm.login(email, password)
except RequireMFAException:
    await mm.multi_factor_authenticate(email, password, mfa_code)
```

### Using MFA Secret Key

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(
    email=email,
    password=password,
    mfa_secret_key=mfa_secret_key,  # From Monarch Security Settings
)
```

### Session Persistence

Sessions can be saved and reused to avoid repeated logins:

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()

# First time: login and save
await mm.interactive_login()
mm.save_session()

# Later: load saved session
mm = MonarchMoney()
mm.load_session()
accounts = await mm.get_accounts()
```

## API Overview

### Account Operations

| Method | Description |
|--------|-------------|
| `get_accounts()` | Get all linked accounts |
| `get_account_holdings(account_id)` | Get securities in a brokerage account |
| `get_account_history(account_id)` | Get historical balance snapshots |
| `get_account_type_options()` | Get available account types/subtypes |
| `create_manual_account(...)` | Create a new manual account |
| `update_account(account_id, ...)` | Update account settings |
| `delete_account(account_id)` | Delete an account |
| `request_accounts_refresh(account_ids)` | Trigger account sync |

### Transaction Operations

| Method | Description |
|--------|-------------|
| `get_transactions(...)` | Get transactions with filters |
| `get_transaction_details(transaction_id)` | Get full transaction details |
| `get_transaction_splits(transaction_id)` | Get split transaction info |
| `create_transaction(...)` | Create a new transaction |
| `update_transaction(transaction_id, ...)` | Update a transaction |
| `delete_transaction(transaction_id)` | Delete a transaction |
| `update_transaction_splits(...)` | Modify transaction splits |

### Budget & Planning

| Method | Description |
|--------|-------------|
| `get_budgets(start_date, end_date)` | Get budget data |
| `set_budget_amount(...)` | Set budget for a category |
| `update_flexible_budget(...)` | Update flexible budget |
| `get_savings_goals()` | Get all savings goals |
| `get_savings_goal_budgets(...)` | Get goal monthly budgets |

### Categories & Tags

| Method | Description |
|--------|-------------|
| `get_transaction_categories()` | Get all categories |
| `get_transaction_category_groups()` | Get category groups |
| `create_transaction_category(...)` | Create a category |
| `update_transaction_category(...)` | Update a category |
| `delete_transaction_category(category_id)` | Delete a category |
| `get_transaction_tags()` | Get all tags |
| `create_transaction_tag(name, color)` | Create a tag |
| `set_transaction_tags(...)` | Set tags on a transaction |

### Cash Flow & Analytics

| Method | Description |
|--------|-------------|
| `get_cashflow(...)` | Get cashflow by category/merchant |
| `get_cashflow_summary(...)` | Get income/expense summary |
| `get_aggregates(...)` | Get aggregate spending totals |
| `get_transactions_summary()` | Get transaction statistics |

### Recurring Transactions

| Method | Description |
|--------|-------------|
| `get_recurring_transactions(...)` | Get upcoming recurring transactions |
| `get_all_recurring_transaction_items(...)` | Get all recurring streams |

### Account & User Info

| Method | Description |
|--------|-------------|
| `get_institutions()` | Get linked institutions |
| `get_subscription_details()` | Get subscription status |
| `get_user_profile()` | Get user profile info |

## Advanced Usage

### Custom Headers

```python
mm = MonarchMoney(
    device_uuid="custom-uuid",
    client_platform="web",
    monarch_client="my-app",
    monarch_client_version="1.0.0",
    user_agent="MyApp/1.0",
)
```

### Pre-authenticated Token

```python
mm = MonarchMoney(token="your-auth-token")
accounts = await mm.get_accounts()
```

### Timeout Configuration

```python
mm = MonarchMoney(timeout=30)  # 30 second timeout
# Or change later:
mm.set_timeout(60)
```

## Error Handling

```python
from monarchmoney import (
    MonarchMoney,
    RequireMFAException,
    LoginFailedException,
    RequestFailedException,
)

mm = MonarchMoney()

try:
    await mm.login(email, password)
except RequireMFAException:
    # MFA is required
    code = input("Enter MFA code: ")
    await mm.multi_factor_authenticate(email, password, code)
except LoginFailedException as e:
    print(f"Login failed: {e}")

try:
    await mm.delete_transaction("invalid-id")
except RequestFailedException as e:
    print(f"Request failed: {e}")
```

## Google Login Users

If you use "Continue with Google" to access Monarch Money, you'll need to set a password first:

1. Go to [Monarch Security Settings](https://app.monarchmoney.com/settings/security)
2. Set a password for your account
3. Enable MFA for additional security

## Contributing

Contributions are welcome! Please ensure:

1. Code is formatted with [Black](https://github.com/psf/black)
2. All unit tests pass
3. New features include appropriate tests

## Credits

- **Original Author:** [hammem](https://github.com/hammem)
- **Current Maintainer:** [312.dev](https://github.com/312-dev)

## Disclaimer

This is an unofficial, community-maintained library. It is not affiliated with, endorsed by, or connected to Monarch Money, Inc. Use at your own risk.

## License

MIT License - see [LICENSE](LICENSE) for details.
