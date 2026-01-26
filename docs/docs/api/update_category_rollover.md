---
sidebar_position: 10
---

# update_category_rollover

**Type:** mutation

Updates a category's rollover settings. Use this to modify the starting balance, start month, or other rollover configuration for a category that already has rollover enabled.

## Signature

```python
async def update_category_rollover(
    category_id: str,
    starting_balance: float | None = None,
    start_month: str | None = None,
    rollover_type: str | None = None,
    frequency: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | `str` | Yes | The ID of the category to update |
| `starting_balance` | `float | None` | No | New starting balance for rollover calculation |
| `start_month` | `str | None` | No | New start month in YYYY-MM-DD format |
| `rollover_type` | `str | None` | No | Rollover type (e.g., "monthly") |
| `frequency` | `str | None` | No | Rollover frequency (e.g., "monthly") |

## Returns

Dict with updateCategory containing the updated category

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_category_rollover("example_category_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `UpdateCategoryRollover`

### GraphQL Query

```graphql
mutation UpdateCategoryRollover($input: UpdateCategoryInput!) {
                updateCategory(input: $input) {
                    category {
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
                    errors {
                        message
                        fieldErrors {
                            field
                            messages
                        }
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
