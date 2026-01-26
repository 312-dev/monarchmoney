---
sidebar_position: 3
---

# get_transaction_splits

**Type:** query

Returns the transaction split information for a transaction.

## Signature

```python
async def get_transaction_splits(
    transaction_id: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transaction_id` | `str` | Yes | the transaction to query. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_transaction_splits("example_transaction_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `TransactionSplitQuery`

### GraphQL Query

```graphql
query TransactionSplitQuery($id: UUID!) {
            getTransaction(id: $id) {
              id
              amount
              category {
                id
                name
                __typename
              }
              merchant {
                id
                name
                __typename
              }
              splitTransactions {
                id
                merchant {
                  id
                  name
                  __typename
                }
                category {
                  id
                  name
                  __typename
                }
                amount
                notes
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
