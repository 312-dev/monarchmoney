---
sidebar_position: 13
---

# request_accounts_refresh_and_wait

**Type:** mutation

Convenience method for forcing an accounts refresh on Monarch, as well as waiting for the refresh to complete. Returns True if all accounts are refreshed within the timeout specified, False otherwise.

## Signature

```python
async def request_accounts_refresh_and_wait(
    account_ids: List[str] | None = None,
    timeout: int = 300,
    delay: int = 10
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_ids` | `List[str] | None` | No | The list of accounts IDs to refresh. If set to None, all account IDs will be implicitly fetched. |
| `timeout` | `int` | No | The number of seconds to wait for the refresh to complete |
| `delay` | `int` | No | The number of seconds to wait for each check on the refresh request |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.request_accounts_refresh_and_wait()
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
