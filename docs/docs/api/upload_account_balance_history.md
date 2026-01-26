---
sidebar_position: 1
---

# upload_account_balance_history

**Type:** post

Uploads the account balance history csv for a given account.

## Signature

```python
async def upload_account_balance_history(
    account_id: str,
    csv_content: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_id` | `str` | Yes | The account ID to apply the history to. |
| `csv_content` | `str` | Yes | CSV representation of the balance history. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.upload_account_balance_history("example_account_id", "example_csv_content")
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
