---
sidebar_position: 2
---

# get_all_recurring_transaction_items

**Type:** query

Fetches all recurring transaction streams for specified frequencies (quarterly, semiyearly, yearly, etc). Optionally includes liabilities.

## Signature

```python
async def get_all_recurring_transaction_items(
    frequencies: list | None = None,
    include_liabilities: bool = True
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `frequencies` | `list | None` | No | - |
| `include_liabilities` | `bool` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_all_recurring_transaction_items()
print(result)
```

### GraphQL Query

```graphql
query Web_GetAllRecurringTransactionItems($filters: RecurringTransactionFilter, $includeLiabilities: Boolean) {
              recurringTransactionStreams(
                filters: $filters
                includeLiabilities: $includeLiabilities
              ) {
                stream {
                  id
                  frequency
                  isActive
                  isApproximate
                  name
                  logoUrl
                  baseDate
                  merchant {
                    id
                    __typename
                  }
                  creditReportLiabilityAccount {
                    id
                    account {
                      id
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                nextForecastedTransaction {
                  date
                  amount
                  __typename
                }
                category {
                  id
                  name
                  icon
                  __typename
                }
                account {
                  id
                  displayName
                  icon
                  logoUrl
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
