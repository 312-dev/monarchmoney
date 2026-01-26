---
sidebar_position: 1
---

# get_transaction_tags

**Type:** query

Gets all the tags configured in the account.

## Signature

```python
async def get_transaction_tags(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_transaction_tags()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetHouseholdTransactionTags`

### GraphQL Query

```graphql
query GetHouseholdTransactionTags($search: String, $limit: Int, $bulkParams: BulkTransactionDataParams) {
            householdTransactionTags(
              search: $search
              limit: $limit
              bulkParams: $bulkParams
            ) {
              id
              name
              color
              order
              transactionCount
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
