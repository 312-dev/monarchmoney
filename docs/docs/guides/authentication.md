---
sidebar_position: 2
---

# Authentication

Eclosion provides several ways to authenticate with Monarch Money.

## Interactive Login

Best for Jupyter notebooks and interactive environments:

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.interactive_login()
```

This will prompt you for:
1. Email address
2. Password
3. MFA code (if enabled)

## Programmatic Login

For scripts and automated applications:

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email="your@email.com", password="your_password")
```

### Handling MFA

If your account has MFA enabled, a `RequireMFAException` will be raised:

```python
from monarchmoney import MonarchMoney, RequireMFAException

mm = MonarchMoney()

try:
    await mm.login(email, password)
except RequireMFAException:
    code = input("Enter MFA code: ")
    await mm.multi_factor_authenticate(email, password, code)
```

### Using MFA Secret Key

For fully automated login with MFA, you can use the MFA secret key:

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(
    email=email,
    password=password,
    mfa_secret_key="YOUR_MFA_SECRET_KEY",
)
```

To get your MFA secret key:
1. Go to [Monarch Money Settings](https://app.monarchmoney.com/settings/security)
2. Click "Enable MFA" (or re-enable if already enabled)
3. Copy the "Two-factor text code" shown during setup

## Pre-authenticated Token

If you already have a valid authentication token:

```python
mm = MonarchMoney(token="your_auth_token")
accounts = await mm.get_accounts()  # Works immediately
```

You can get your token from browser developer tools after logging into Monarch Money web app.

## Google Login Users

If you use "Continue with Google" to access Monarch Money, you'll need to set a password:

1. Go to [Monarch Security Settings](https://app.monarchmoney.com/settings/security)
2. Set a password for your account
3. Use that password with this library
4. Enable MFA for additional security

## Custom Headers

For advanced use cases, you can customize the request headers:

```python
mm = MonarchMoney(
    device_uuid="custom-uuid",
    client_platform="web",
    monarch_client="my-app",
    monarch_client_version="1.0.0",
    user_agent="MyApp/1.0",
)
```

## Timeout Configuration

Set custom timeout for API requests (default is 10 seconds):

```python
mm = MonarchMoney(timeout=30)  # 30 second timeout

# Or change later
mm.set_timeout(60)
```

## Security Best Practices

1. **Never hardcode credentials** - Use environment variables or secure credential storage
2. **Use session files** - Save sessions to avoid storing passwords
3. **Enable MFA** - Always enable MFA on your Monarch Money account
4. **Rotate tokens** - Periodically re-authenticate to get fresh tokens

Example using environment variables:

```python
import os
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(
    email=os.environ["MONARCH_EMAIL"],
    password=os.environ["MONARCH_PASSWORD"],
    mfa_secret_key=os.environ.get("MONARCH_MFA_SECRET"),
)
```
