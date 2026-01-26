---
sidebar_position: 5
---

# create_transaction

**Type:** mutation

Creates a transaction with the given parameters

## Signature

```python
async def create_transaction(
    date: str,
    account_id: str,
    amount: float,
    merchant_name: str,
    category_id: str,
    notes: str = "",
    update_balance: bool = False
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `str` | Yes | - |
| `account_id` | `str` | Yes | - |
| `amount` | `float` | Yes | - |
| `merchant_name` | `str` | Yes | - |
| `category_id` | `str` | Yes | - |
| `notes` | `str` | No | - |
| `update_balance` | `bool` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.create_transaction("example_date", "example_account_id", 100.0, "example_merchant_name", "example_category_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_CreateTransactionMutation`

### GraphQL Query

```graphql
mutation Common_CreateTransactionMutation($input: CreateTransactionMutationInput!) {
            createTransaction(input: $input) {
              errors {
                ...PayloadErrorFields
                __typename
              }
              transaction {
                id
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
