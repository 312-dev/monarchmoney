---
sidebar_position: 2
---

# get_transaction_category_groups

**Type:** query

Gets all the category groups configured in the account.

## Signature

```python
async def get_transaction_category_groups(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_transaction_category_groups()
print(result)
```

## GraphQL Operation

**Operation Name:** `ManageGetCategoryGroups`

### GraphQL Query

```graphql
query ManageGetCategoryGroups {
              categoryGroups {
                  id
                  name
                  order
                  type
                  updatedAt
                  createdAt
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
