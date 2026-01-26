---
sidebar_position: 6
---

# delete_session

<span className="method-badge method-badge--utility">utility</span>

Deletes a saved session file from disk. Use this to clean up session files when they're no longer needed.

## Signature

```python
def delete_session(
    filename: Optional[str] = None
) -> None
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filename` | `str \| None` | No | Path to the session file to delete. Defaults to `.mm/mm_session.pickle` |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()

# Delete the default session file
mm.delete_session()

# Or delete a custom session file
mm.delete_session("/path/to/my_session.pickle")
```

## Notes

- Safe to call even if the file doesn't exist (no error is raised)
- Useful for security purposes when you want to ensure the session is removed
- After deleting, you'll need to log in again to use the API

## Try It Out

This method doesn't make API calls - it deletes a session file from disk. Use the code example above in your Python environment.
