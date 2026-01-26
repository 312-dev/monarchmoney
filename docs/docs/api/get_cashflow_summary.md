---
sidebar_position: 2
---

# get_cashflow_summary

**Type:** query

Gets all the categories configured in the account.

## Signature

```python
async def get_cashflow_summary(
    limit: int = DEFAULT_RECORD_LIMIT,
    start_date: str | None = None,
    end_date: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | `int` | No | - |
| `start_date` | `str | None` | No | - |
| `end_date` | `str | None` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_cashflow_summary()
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_GetCashFlowPage`

### GraphQL Query

```graphql
query Web_GetCashFlowPage($filters: TransactionFilterInput) {
            summary: aggregates(filters: $filters, fillEmptyValues: true) {
              summary {
                sumIncome
                sumExpense
                savings
                savingsRate
                __typename
              }
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
