---
sidebar_position: 4
---

# get_account_type_options

**Type:** query

Retrieves a list of available account types and their subtypes.

## Signature

```python
async def get_account_type_options(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_account_type_options()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetAccountTypeOptions`

### GraphQL Query

```graphql
query GetAccountTypeOptions {
                accountTypeOptions {
                    type {
                        name
                        display
                        group
                        possibleSubtypes {
                            display
                            name
                            __typename
                        }
                        __typename
                    }
                    subtype {
                        name
                        display
                        __typename
                    }
                    __typename
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
