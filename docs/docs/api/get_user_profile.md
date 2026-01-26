---
sidebar_position: 2
---

# get_user_profile

**Type:** query

Gets the current user's profile information.

## Signature

```python
async def get_user_profile(
    # No parameters
) -> Dict[str, Any]
```

## Returns

Dict containing user profile with id, name, and email.

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_user_profile()
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_GetMe`

### GraphQL Query

```graphql
query Common_GetMe {
                me {
                    id
                    name
                    email
                }
            }
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
