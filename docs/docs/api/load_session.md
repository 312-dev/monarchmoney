---
sidebar_position: 5
---

# load_session

<span className="method-badge method-badge--utility">utility</span>

Loads a previously saved authentication token from a pickle file. This allows you to reuse a saved session without logging in again.

## Signature

```python
def load_session(
    filename: Optional[str] = None
) -> None
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | `str \| None` | No | Path to the session file. Defaults to `.mm/mm_session.pickle` |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()

# Load from default location
mm.load_session()

# Now you can make API calls without logging in
accounts = await mm.get_accounts()
```

```python
# Load from custom location
mm = MonarchMoney()
mm.load_session("/path/to/my_session.pickle")
```

## Error Handling

```python
from monarchmoney import MonarchMoney, LoginFailedException

mm = MonarchMoney()

try:
    mm.load_session()
    # Test the session
    await mm.get_user_profile()
except FileNotFoundError:
    print("No saved session found")
    await mm.login(email, password)
    mm.save_session()
except LoginFailedException:
    print("Session expired, logging in again")
    await mm.login(email, password)
    mm.save_session()
```

## Notes

- Raises `FileNotFoundError` if the session file doesn't exist
- The loaded session may have expired - always test with an API call
- Session files are pickle format and contain only the auth token

## Try It Out

This method doesn't make API calls - it loads a session from disk. Use the code example above in your Python environment.
