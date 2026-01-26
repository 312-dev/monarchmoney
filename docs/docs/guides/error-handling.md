---
sidebar_position: 4
---

# Error Handling

Eclosion provides specific exception types to help you handle different error scenarios.

## Exception Types

### RequireMFAException

Raised when multi-factor authentication is required:

```python
from monarchmoney import MonarchMoney, RequireMFAException

mm = MonarchMoney()

try:
    await mm.login(email, password)
except RequireMFAException:
    # MFA is required - prompt for code
    code = input("Enter MFA code: ")
    await mm.multi_factor_authenticate(email, password, code)
```

### LoginFailedException

Raised when login fails (wrong credentials, account locked, etc.):

```python
from monarchmoney import MonarchMoney, LoginFailedException

mm = MonarchMoney()

try:
    await mm.login(email, password)
except LoginFailedException as e:
    print(f"Login failed: {e}")
    # Handle: wrong password, account locked, etc.
```

### RequestFailedException

Raised when an API request fails (invalid data, permission denied, etc.):

```python
from monarchmoney import MonarchMoney, RequestFailedException

mm = MonarchMoney()
await mm.login(email, password)

try:
    await mm.delete_transaction("invalid-id")
except RequestFailedException as e:
    print(f"Request failed: {e}")
    # Handle: invalid ID, permission denied, etc.
```

## Common Error Scenarios

### Session Expired

```python
from monarchmoney import MonarchMoney, LoginFailedException

mm = MonarchMoney()

try:
    mm.load_session()
    # Test with a simple call
    await mm.get_user_profile()
except (FileNotFoundError, LoginFailedException):
    # Session invalid or doesn't exist
    await mm.login(email, password)
    mm.save_session()
```

### Network Errors

Network issues raise standard `aiohttp` exceptions:

```python
from aiohttp import ClientError

try:
    accounts = await mm.get_accounts()
except ClientError as e:
    print(f"Network error: {e}")
    # Retry logic, etc.
```

### Timeout Errors

Configure timeouts and handle them:

```python
from asyncio import TimeoutError

mm = MonarchMoney(timeout=5)  # 5 second timeout

try:
    accounts = await mm.get_accounts()
except TimeoutError:
    print("Request timed out")
    mm.set_timeout(30)  # Increase timeout
    accounts = await mm.get_accounts()  # Retry
```

### Invalid Parameters

Many methods validate parameters before making API calls:

```python
try:
    # This will raise an exception - dates must both be provided or both be None
    await mm.get_transactions(start_date="2024-01-01")  # Missing end_date
except Exception as e:
    print(f"Invalid parameters: {e}")
```

## Robust Error Handling Pattern

Here's a comprehensive error handling pattern:

```python
import asyncio
from aiohttp import ClientError
from monarchmoney import (
    MonarchMoney,
    RequireMFAException,
    LoginFailedException,
    RequestFailedException,
)

async def safe_api_call(mm, method, *args, max_retries=3, **kwargs):
    """Wrapper for safe API calls with retries."""
    for attempt in range(max_retries):
        try:
            return await method(*args, **kwargs)
        except ClientError as e:
            if attempt < max_retries - 1:
                await asyncio.sleep(2 ** attempt)  # Exponential backoff
                continue
            raise
        except RequestFailedException as e:
            # Don't retry on request failures (usually data errors)
            raise
    return None

async def main():
    mm = MonarchMoney()

    # Login with error handling
    try:
        mm.load_session()
        await mm.get_user_profile()  # Test session
    except FileNotFoundError:
        print("No saved session, logging in...")
        try:
            await mm.login(email, password)
        except RequireMFAException:
            code = input("Enter MFA code: ")
            await mm.multi_factor_authenticate(email, password, code)
        except LoginFailedException as e:
            print(f"Could not log in: {e}")
            return
        mm.save_session()
    except Exception as e:
        print(f"Session invalid: {e}")
        # Re-login...

    # Make API calls with error handling
    try:
        accounts = await safe_api_call(mm, mm.get_accounts)
        print(f"Found {len(accounts['accounts'])} accounts")
    except RequestFailedException as e:
        print(f"API error: {e}")
    except ClientError as e:
        print(f"Network error after retries: {e}")

asyncio.run(main())
```

## Debugging

Enable debug logging to see detailed request/response information:

```python
import logging

logging.basicConfig(level=logging.DEBUG)
```

This will show GraphQL queries and responses, which is helpful for debugging issues.
