---
sidebar_position: 5
---

# Advanced Usage

This guide covers advanced patterns and techniques for using Eclosion.

## Concurrent Requests

Use `asyncio.gather` for multiple concurrent API calls:

```python
import asyncio
from monarchmoney import MonarchMoney

async def main():
    mm = MonarchMoney()
    await mm.login(email, password)

    # Fetch multiple data types concurrently
    accounts, categories, budgets = await asyncio.gather(
        mm.get_accounts(),
        mm.get_transaction_categories(),
        mm.get_budgets(),
    )

    print(f"Accounts: {len(accounts['accounts'])}")
    print(f"Categories: {len(categories['categories'])}")

asyncio.run(main())
```

## Pagination

For large datasets, use pagination:

```python
async def get_all_transactions(mm, start_date, end_date, batch_size=100):
    """Fetch all transactions with pagination."""
    all_transactions = []
    offset = 0

    while True:
        result = await mm.get_transactions(
            limit=batch_size,
            offset=offset,
            start_date=start_date,
            end_date=end_date,
        )

        transactions = result['allTransactions']['results']
        all_transactions.extend(transactions)

        if len(transactions) < batch_size:
            break  # No more results

        offset += batch_size

    return all_transactions
```

## Batch Operations

For bulk updates, process in batches:

```python
async def bulk_categorize_transactions(mm, transaction_ids, category_id, batch_size=10):
    """Categorize multiple transactions in batches."""
    results = []

    for i in range(0, len(transaction_ids), batch_size):
        batch = transaction_ids[i:i + batch_size]

        # Process batch concurrently
        batch_results = await asyncio.gather(*[
            mm.update_transaction(txn_id, category_id=category_id)
            for txn_id in batch
        ], return_exceptions=True)

        results.extend(batch_results)

        # Small delay between batches to avoid rate limiting
        await asyncio.sleep(0.5)

    return results
```

## Custom GraphQL Queries

For advanced use cases, you can make raw GraphQL calls:

```python
from gql import gql

async def custom_query(mm):
    query = gql("""
        query CustomQuery {
            accounts {
                id
                displayName
                currentBalance
            }
        }
    """)

    result = await mm.gql_call(
        operation="CustomQuery",
        graphql_query=query,
        variables={},
    )

    return result
```

## Webhook-like Polling

Simulate webhooks by polling for changes:

```python
import asyncio
from datetime import datetime, timedelta

async def watch_for_new_transactions(mm, interval_seconds=300):
    """Poll for new transactions periodically."""
    last_check = datetime.now() - timedelta(days=1)

    while True:
        now = datetime.now()

        transactions = await mm.get_transactions(
            start_date=last_check.strftime("%Y-%m-%d"),
            end_date=now.strftime("%Y-%m-%d"),
        )

        new_txns = transactions['allTransactions']['results']
        if new_txns:
            print(f"Found {len(new_txns)} new transactions")
            for txn in new_txns:
                # Process new transaction
                print(f"  {txn['date']}: {txn['merchant']['name']} ${txn['amount']}")

        last_check = now
        await asyncio.sleep(interval_seconds)
```

## Data Export

Export your financial data:

```python
import json
import csv
from datetime import datetime

async def export_to_csv(mm, filename, start_date, end_date):
    """Export transactions to CSV."""
    transactions = await mm.get_transactions(
        start_date=start_date,
        end_date=end_date,
        limit=10000,
    )

    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Date', 'Merchant', 'Category', 'Amount', 'Account', 'Notes'])

        for txn in transactions['allTransactions']['results']:
            writer.writerow([
                txn['date'],
                txn['merchant']['name'] if txn['merchant'] else '',
                txn['category']['name'] if txn['category'] else '',
                txn['amount'],
                txn['account']['displayName'] if txn['account'] else '',
                txn['notes'] or '',
            ])

    print(f"Exported {len(transactions['allTransactions']['results'])} transactions to {filename}")

async def export_to_json(mm, filename, start_date, end_date):
    """Export transactions to JSON."""
    transactions = await mm.get_transactions(
        start_date=start_date,
        end_date=end_date,
        limit=10000,
    )

    with open(filename, 'w') as f:
        json.dump(transactions, f, indent=2, default=str)

    print(f"Exported to {filename}")
```

## Integration Patterns

### With Pandas

```python
import pandas as pd

async def transactions_to_dataframe(mm, start_date, end_date):
    """Convert transactions to a pandas DataFrame."""
    result = await mm.get_transactions(
        start_date=start_date,
        end_date=end_date,
        limit=10000,
    )

    transactions = result['allTransactions']['results']

    df = pd.DataFrame([
        {
            'date': txn['date'],
            'merchant': txn['merchant']['name'] if txn['merchant'] else None,
            'category': txn['category']['name'] if txn['category'] else None,
            'amount': txn['amount'],
            'account': txn['account']['displayName'] if txn['account'] else None,
        }
        for txn in transactions
    ])

    df['date'] = pd.to_datetime(df['date'])
    return df
```

### With Scheduled Tasks

```python
import asyncio
from datetime import datetime

async def daily_summary(mm):
    """Generate a daily financial summary."""
    today = datetime.now().strftime("%Y-%m-%d")

    # Get today's data
    cashflow = await mm.get_cashflow_summary(
        start_date=today,
        end_date=today,
    )

    summary = cashflow['summary']['summary']
    print(f"Daily Summary for {today}:")
    print(f"  Income:  ${summary['sumIncome']:.2f}")
    print(f"  Expense: ${summary['sumExpense']:.2f}")
    print(f"  Savings: ${summary['savings']:.2f}")

# Run daily at 8 AM
async def scheduler():
    while True:
        now = datetime.now()
        if now.hour == 8 and now.minute == 0:
            mm = MonarchMoney()
            mm.load_session()
            await daily_summary(mm)

        await asyncio.sleep(60)
```

## Rate Limiting

Implement rate limiting for heavy usage:

```python
import asyncio
from collections import deque
from datetime import datetime

class RateLimiter:
    def __init__(self, calls_per_minute=60):
        self.calls_per_minute = calls_per_minute
        self.call_times = deque()

    async def acquire(self):
        now = datetime.now()

        # Remove calls older than 1 minute
        while self.call_times and (now - self.call_times[0]).total_seconds() > 60:
            self.call_times.popleft()

        # Wait if we've exceeded the limit
        if len(self.call_times) >= self.calls_per_minute:
            sleep_time = 60 - (now - self.call_times[0]).total_seconds()
            if sleep_time > 0:
                await asyncio.sleep(sleep_time)

        self.call_times.append(datetime.now())

# Usage
limiter = RateLimiter(calls_per_minute=30)

async def rate_limited_call(mm, method, *args, **kwargs):
    await limiter.acquire()
    return await method(*args, **kwargs)
```
