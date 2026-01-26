---
sidebar_position: 3
---

# Session Management

Sessions allow you to save your authentication state and reuse it later without logging in again.

## Saving a Session

After logging in, save your session for later use:

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)
mm.save_session()  # Saves to default location: .mm/mm_session.pickle
```

### Custom Session File

You can specify a custom location:

```python
mm.save_session("/path/to/my_session.pickle")
```

Or set it during initialization:

```python
mm = MonarchMoney(session_file="/path/to/my_session.pickle")
await mm.login(email, password)
mm.save_session()
```

## Loading a Session

To reuse a saved session:

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
mm.load_session()  # Loads from default location

# Now you can make API calls without logging in
accounts = await mm.get_accounts()
```

### Auto-load on Login

The `login()` method can automatically use saved sessions:

```python
# Will use saved session if available, otherwise logs in
await mm.login(
    email=email,
    password=password,
    use_saved_session=True,  # Default
    save_session=True,       # Default
)
```

To force a fresh login:

```python
await mm.login(
    email=email,
    password=password,
    use_saved_session=False,
    save_session=True,
)
```

## Deleting a Session

To remove a saved session:

```python
mm.delete_session()  # Removes the session file
```

## Session Lifecycle

Sessions persist for an extended period (often several months based on user reports). However, they can expire due to:

- Monarch Money security policies
- Password changes
- MFA changes
- Account security events

### Handling Expired Sessions

```python
from monarchmoney import MonarchMoney, LoginFailedException

mm = MonarchMoney()

try:
    mm.load_session()
    # Test the session with a simple API call
    await mm.get_user_profile()
except (FileNotFoundError, LoginFailedException):
    # Session doesn't exist or is invalid, login fresh
    await mm.login(email, password)
    mm.save_session()
```

## Session File Format

Sessions are stored as Python pickle files containing the authentication token. The default location is:

```
.mm/mm_session.pickle
```

This is relative to your current working directory.

## Multiple Sessions

You can manage multiple sessions for different accounts or purposes:

```python
# Session for personal account
mm_personal = MonarchMoney(session_file=".mm/personal_session.pickle")
mm_personal.load_session()

# Session for family account
mm_family = MonarchMoney(session_file=".mm/family_session.pickle")
mm_family.load_session()
```

## Security Considerations

1. **Protect session files** - They contain authentication tokens
2. **Don't commit to version control** - Add `.mm/` to `.gitignore`
3. **Restrict file permissions** - `chmod 600 .mm/mm_session.pickle`
4. **Use environment-specific paths** - Different sessions for dev/prod

Example `.gitignore`:

```
.mm/
*.pickle
```
