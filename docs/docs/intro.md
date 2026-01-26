---
sidebar_position: 1
slug: /intro
---

# Introduction to Eclosion

**Eclosion** is a Python library that provides programmatic access to [Monarch Money](https://www.monarchmoney.com/referral/ngam2i643l) financial data. It offers a comprehensive async API for managing accounts, transactions, budgets, categories, and more.

## Why Eclosion?

Monarch Money is a powerful personal finance tool, but sometimes you need to:

- **Automate** repetitive tasks like categorizing transactions
- **Integrate** your financial data with other tools and services
- **Analyze** your spending patterns with custom scripts
- **Build** applications that interact with your financial data

Eclosion makes all of this possible with a clean, Pythonic API.

## Key Features

### Comprehensive API Coverage

Access all major Monarch Money features:

- **Accounts**: View, create, update, and manage all your linked accounts
- **Transactions**: Full CRUD operations with filtering and search
- **Budgets**: Get and set budget amounts, track spending
- **Categories & Tags**: Organize your transactions
- **Savings Goals**: Track progress toward financial goals
- **Cash Flow**: Analyze income and expenses

### Async First

Built with `asyncio` for efficient, non-blocking I/O:

```python
import asyncio
from monarchmoney import MonarchMoney

async def main():
    mm = MonarchMoney()
    await mm.login(email, password)
    accounts = await mm.get_accounts()
    print(f"Found {len(accounts['accounts'])} accounts")

asyncio.run(main())
```

### Session Management

Save and reuse sessions to avoid repeated logins:

```python
mm = MonarchMoney()
await mm.login(email, password)
mm.save_session()  # Save for later

# Later...
mm = MonarchMoney()
mm.load_session()  # No login needed!
```

### MFA Support

Full support for multi-factor authentication:

```python
from monarchmoney import MonarchMoney, RequireMFAException

mm = MonarchMoney()
try:
    await mm.login(email, password)
except RequireMFAException:
    code = input("Enter MFA code: ")
    await mm.multi_factor_authenticate(email, password, code)
```

Or use the MFA secret key for fully automated login:

```python
await mm.login(
    email=email,
    password=password,
    mfa_secret_key=mfa_secret_key,
)
```

## Installation

```bash
pip install monarchmoney
```

## Quick Start

```python
import asyncio
from monarchmoney import MonarchMoney

async def main():
    mm = MonarchMoney()
    await mm.interactive_login()  # Prompts for credentials

    # Get all accounts
    accounts = await mm.get_accounts()
    for account in accounts['accounts']:
        print(f"{account['displayName']}: ${account['currentBalance']:.2f}")

    # Get recent transactions
    transactions = await mm.get_transactions(limit=10)
    for txn in transactions['allTransactions']['results']:
        print(f"{txn['date']}: {txn['merchant']['name']} - ${txn['amount']:.2f}")

asyncio.run(main())
```

## Attribution

This library is based on the original work by [hammem](https://github.com/hammem/monarchmoney). It is now maintained by [312.dev](https://github.com/312-dev) and powers the [Eclosion for Monarch](https://github.com/312-dev/eclosion-for-monarch) toolkit.

## Next Steps

- [Installation Guide](/docs/guides/installation) - Detailed installation instructions
- [Authentication](/docs/guides/authentication) - Learn about authentication options
- [API Reference](/docs/api/overview) - Complete API documentation
