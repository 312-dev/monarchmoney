---
sidebar_position: 7
---

# update_category_group_settings

**Type:** mutation

Updates a category group's settings including rollover configuration.

## Signature

```python
async def update_category_group_settings(
    group_id: str,
    name: str = None,
    budget_variability: str = None,
    group_level_budgeting_enabled: bool = None,
    rollover_enabled: bool = None,
    rollover_start_month: str = None,
    rollover_starting_balance: float = None,
    rollover_type: str = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `group_id` | `str` | Yes | The ID of the category group to update |
| `name` | `str` | No | Optional new name for the group |
| `budget_variability` | `str` | No | Optional budget type - "fixed" or "flexible" |
| `group_level_budgeting_enabled` | `bool` | No | Optional - whether budgets are set at group level |
| `rollover_enabled` | `bool` | No | Optional - whether to enable/disable rollover |
| `rollover_start_month` | `str` | No | Optional rollover start month (YYYY-MM-DD format) |
| `rollover_starting_balance` | `float` | No | Optional starting balance for rollover |
| `rollover_type` | `str` | No | Optional rollover type (e.g., "monthly") |

## Returns

Dict with the updateCategoryGroup result

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_category_group_settings("example_group_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_UpdateCategoryGroup`

### GraphQL Query

```graphql
mutation Common_UpdateCategoryGroup($input: UpdateCategoryGroupInput!) {
                updateCategoryGroup(input: $input) {
                    categoryGroup {
                        id
                        name
                        order
                        type
                        color
                        groupLevelBudgetingEnabled
                        budgetVariability
                        rolloverPeriod {
                            id
                            startMonth
                            endMonth
                            startingBalance
                            __typename
                        }
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
