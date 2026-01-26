---
sidebar_position: 11
---

# request_accounts_refresh

**Type:** mutation

Requests Monarch to refresh account balances and transactions with source institutions.  Returns True if request was successfully started. Otherwise, throws a `RequestFailedException`.

## Signature

```python
async def request_accounts_refresh(
    account_ids: List[str]
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_ids` | `List[str]` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.request_accounts_refresh("example_account_ids")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_ForceRefreshAccountsMutation`

### GraphQL Query

```graphql
mutation Common_ForceRefreshAccountsMutation($input: ForceRefreshAccountsInput!) {
            forceRefreshAccounts(input: $input) {
              success
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
