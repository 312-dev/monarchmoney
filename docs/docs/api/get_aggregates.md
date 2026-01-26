---
sidebar_position: 3
---

# get_aggregates

**Type:** query

Gets aggregate spending totals with optional filters. Returns summary statistics including total income and expenses for the specified filters.

## Signature

```python
async def get_aggregates(
    start_date: str | None = None,
    end_date: str | None = None,
    category_ids: List[str] | None = None,
    account_ids: List[str] | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | `str | None` | No | Start date in YYYY-MM-DD format |
| `end_date` | `str | None` | No | End date in YYYY-MM-DD format |
| `category_ids` | `List[str] | None` | No | Optional list of category IDs to filter by |
| `account_ids` | `List[str] | None` | No | Optional list of account IDs to filter by |

## Returns

Dict with aggregates containing summary (sumExpense, sumIncome)

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_aggregates()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetAggregates`

### GraphQL Query

```graphql
query GetAggregates($filters: TransactionFilterInput!) {
                aggregates(filters: $filters) {
                    summary {
                        sumExpense
                        sumIncome
                    }
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
