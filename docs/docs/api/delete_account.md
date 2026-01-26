---
sidebar_position: 10
---

# delete_account

**Type:** mutation

Deletes an account

## Signature

```python
async def delete_account(
    account_id: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_id` | `str` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.delete_account("example_account_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_DeleteAccount`

### GraphQL Query

```graphql
mutation Common_DeleteAccount($id: UUID!) {
                deleteAccount(id: $id) {
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
