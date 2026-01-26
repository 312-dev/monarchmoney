---
sidebar_position: 7
---

# get_aggregate_snapshots

**Type:** query

Retrieves the daily net value of all accounts, optionally between `start_date` and `end_date`, and optionally only for accounts of type `account_type`. Both `start_date` and `end_date` are ISO datestrings, formatted as YYYY-MM-DD

## Signature

```python
async def get_aggregate_snapshots(
    start_date: date | None = None,
    end_date: date | None = None,
    account_type: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | `date | None` | No | - |
| `end_date` | `date | None` | No | - |
| `account_type` | `str | None` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_aggregate_snapshots()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetAggregateSnapshots`

### GraphQL Query

```graphql
query GetAggregateSnapshots($filters: AggregateSnapshotFilters) {
                aggregateSnapshots(filters: $filters) {
                    date
                    balance
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
