---
sidebar_position: 5
---

# delete_transaction_category

**Type:** mutation

No description available.

## Signature

```python
async def delete_transaction_category(
    category_id: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | `str` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.delete_transaction_category("example_category_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_DeleteCategory`

### GraphQL Query

```graphql
mutation Web_DeleteCategory($id: UUID!, $moveToCategoryId: UUID) {
            deleteCategory(id: $id, moveToCategoryId: $moveToCategoryId) {
              errors {
                ...PayloadErrorFields
                __typename
              }
              deleted
              __typename
            }
          }

          fragment PayloadErrorFields on PayloadError {
            fieldErrors {
              field
              messages
              __typename
            }
            message
            code
            __typename
          }
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
