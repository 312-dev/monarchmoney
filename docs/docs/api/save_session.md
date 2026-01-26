---
sidebar_position: 4
---

# save_session

<span className="method-badge method-badge--utility">utility</span>

Saves the authentication token to a pickle file for later reuse. This allows you to avoid repeated logins by persisting your session.

## Signature

```python
def save_session(
    filename: Optional[str] = None
) -> None
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | `str \| None` | No | Path to save the session file. Defaults to `.mm/mm_session.pickle` |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

# Save to default location
mm.save_session()

# Or save to custom location
mm.save_session("/path/to/my_session.pickle")
```

## Notes

- The session file contains your authentication token
- Keep the session file secure and don't commit it to version control
- Add `.mm/` to your `.gitignore` file
- Sessions can last several months but may expire due to security events

## Try It Out

This method doesn't make API calls - it saves the current session to disk. Use the code example above in your Python environment.
