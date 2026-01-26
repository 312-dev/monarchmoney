---
sidebar_position: 8
---

# enable_category_rollover

**Type:** mutation

Enables rollover on an existing category.

## Signature

```python
async def enable_category_rollover(
    category_id: str,
    rollover_start_month: datetime = datetime.today().replace(day=1),
    rollover_starting_balance: float = 0,
    rollover_frequency: str = "monthly",
    rollover_type: str = "monthly"
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | `str` | Yes | The ID of the category to enable rollover on |
| `rollover_start_month` | `datetime` | No | The datetime of the rollover start month (default: first of current month) |
| `rollover_starting_balance` | `float` | No | The starting balance for rollover (default: 0) |
| `rollover_frequency` | `str` | No | The rollover frequency, e.g. "monthly" (default: "monthly") |
| `rollover_type` | `str` | No | The rollover type, e.g. "monthly" (default: "monthly") |

## Returns

The updated category data

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.enable_category_rollover("example_category_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_UpdateCategory`

### GraphQL Query

```graphql
mutation Web_UpdateCategory($input: UpdateCategoryInput!) {
                updateCategory(input: $input) {
                    errors {
                        ...PayloadErrorFields
                        __typename
                    }
                    category {
                        id
                        ...CategoryFormFields
                        __typename
                    }
                    __typename
                }
            }
            fragment PayloadErrorFields on PayloadError {
                fieldErrors {
                    field
                    messages
                    __typename
                }
                message
                code
                __typename
            }
            fragment CategoryFormFields on Category {
                id
                order
                name
                icon
                systemCategory
                systemCategoryDisplayName
                budgetVariability
                excludeFromBudget
                isSystemCategory
                isDisabled
                isProtected
                group {
                    id
                    type
                    groupLevelBudgetingEnabled
                    __typename
                }
                rolloverPeriod {
                    id
                    startMonth
                    startingBalance
                    type
                    frequency
                    targetAmount
                    __typename
                }
                __typename
            }
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
