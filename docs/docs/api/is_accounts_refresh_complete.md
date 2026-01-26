---
sidebar_position: 12
---

# is_accounts_refresh_complete

**Type:** query

Checks on the status of a prior request to refresh account balances.

## Signature

```python
async def is_accounts_refresh_complete(
    account_ids: List[str] | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_ids` | `List[str] | None` | No | The list of accounts IDs to check on the status of. If set to None, all account IDs will be checked. |

## Returns

- True if refresh request is completed. - False if refresh request still in progress. Otherwise, throws a `RequestFailedException`. :param account_ids: The list of accounts IDs to check on the status of. If set to None, all account IDs will be checked.

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.is_accounts_refresh_complete()
print(result)
```

## GraphQL Operation

**Operation Name:** `ForceRefreshAccountsQuery`

### GraphQL Query

```graphql
query ForceRefreshAccountsQuery {
            accounts {
              id
              hasSyncInProgress
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
