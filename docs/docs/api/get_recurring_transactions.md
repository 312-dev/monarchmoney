---
sidebar_position: 1
---

# get_recurring_transactions

**Type:** query

Fetches upcoming recurring transactions from Monarch Money's API.  This includes all merchant data, as well as the accounts where the charge will take place.

## Signature

```python
async def get_recurring_transactions(
    start_date: str | None = None,
    end_date: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | `str | None` | No | - |
| `end_date` | `str | None` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_recurring_transactions()
print(result)
```

### GraphQL Query

```graphql
query Web_GetUpcomingRecurringTransactionItems($startDate: Date!, $endDate: Date!, $filters: RecurringTransactionFilter) {
              recurringTransactionItems(
                startDate: $startDate
                endDate: $endDate
                filters: $filters
              ) {
                stream {
                  id
                  frequency
                  amount
                  isApproximate
                  merchant {
                    id
                    name
                    logoUrl
                    __typename
                  }
                  __typename
                }
                date
                isPast
                transactionId
                amount
                amountDiff
                category {
                  id
                  name
                  __typename
                }
                account {
                  id
                  displayName
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
