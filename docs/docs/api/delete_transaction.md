---
sidebar_position: 7
---

# delete_transaction

**Type:** mutation

Deletes the given transaction.

## Signature

```python
async def delete_transaction(
    transaction_id: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transaction_id` | `str` | Yes | the ID of the transaction targeted for deletion. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.delete_transaction("example_transaction_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_DeleteTransactionMutation`

### GraphQL Query

```graphql
mutation Common_DeleteTransactionMutation($input: DeleteTransactionMutationInput!) {
            deleteTransaction(input: $input) {
              deleted
              errors {
                ...PayloadErrorFields
                __typename
              }
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
