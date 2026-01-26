---
sidebar_position: 9
---

# get_category_rollover

**Type:** query

Gets the rollover settings for a category.

## Signature

```python
async def get_category_rollover(
    category_id: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | `str` | Yes | The ID of the category to get rollover settings for |

## Returns

Dict with category containing rolloverPeriod data

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_category_rollover("example_category_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `GetCategoryRollover`

### GraphQL Query

```graphql
query GetCategoryRollover($id: UUID!) {
                category(id: $id) {
                    id
                    name
                    rolloverPeriod {
                        id
                        startMonth
                        startingBalance
                        type
                        frequency
                        targetAmount
                    }
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
