---
sidebar_position: 1
---

# login

**Type:** mutation

Logs into a Monarch Money account.

## Signature

```python
async def login(
    email: str | None = None,
    password: str | None = None,
    use_saved_session: bool = True,
    save_session: bool = True,
    mfa_secret_key: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `str | None` | No | - |
| `password` | `str | None` | No | - |
| `use_saved_session` | `bool` | No | - |
| `save_session` | `bool` | No | - |
| `mfa_secret_key` | `str | None` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.login()
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
