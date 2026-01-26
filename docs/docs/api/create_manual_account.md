---
sidebar_position: 8
---

# create_manual_account

**Type:** mutation

Creates a new manual account

## Signature

```python
async def create_manual_account(
    account_type: str,
    account_sub_type: str,
    is_in_net_worth: bool,
    account_name: str,
    account_balance: float = 0
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_type` | `str` | Yes | The string of account group type (i.e. loan, other_liability, other_asset, etc) |
| `account_sub_type` | `str` | Yes | The string sub type of the account (i.e. auto, commercial, mortgage, line_of_credit, etc) |
| `is_in_net_worth` | `bool` | Yes | A boolean if the account should be considered in the net worth calculation |
| `account_name` | `str` | Yes | The string of the account name |
| `account_balance` | `float` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.create_manual_account("example_account_type", "example_account_sub_type", True, "example_account_name")
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_CreateManualAccount`

### GraphQL Query

```graphql
mutation Web_CreateManualAccount($input: CreateManualAccountMutationInput!) {
                createManualAccount(input: $input) {
                    account {
                        id
                        __typename
                    }
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
