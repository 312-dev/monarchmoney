---
sidebar_position: 3
---

# multi_factor_authenticate

**Type:** mutation

Performs multi-factor authentication to access a Monarch Money account.

## Signature

```python
async def multi_factor_authenticate(
    email: str,
    password: str,
    code: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `str` | Yes | - |
| `password` | `str` | Yes | - |
| `code` | `str` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.multi_factor_authenticate("example_email", "example_password", "example_code")
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
