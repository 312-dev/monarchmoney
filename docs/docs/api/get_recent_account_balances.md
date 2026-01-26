---
sidebar_position: 5
---

# get_recent_account_balances

**Type:** query

Retrieves the daily balance for all accounts starting from `start_date`. `start_date` is an ISO formatted datestring, e.g. YYYY-MM-DD. If `start_date` is None, then the last 31 days are requested.

## Signature

```python
async def get_recent_account_balances(
    start_date: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | `str | None` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_recent_account_balances()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetAccountRecentBalances`

### GraphQL Query

```graphql
query GetAccountRecentBalances($startDate: Date!) {
                accounts {
                    id
                    recentBalances(startDate: $startDate)
                    __typename
                }
            }
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
