---
sidebar_position: 2
---

# interactive_login

**Type:** mutation

Performs an interactive login for iPython and similar environments.

## Signature

```python
async def interactive_login(
    use_saved_session: bool = True,
    save_session: bool = True
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `use_saved_session` | `bool` | No | - |
| `save_session` | `bool` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.interactive_login()
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
