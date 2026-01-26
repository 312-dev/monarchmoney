---
sidebar_position: 3
---

# update_flexible_budget

**Type:** mutation

Updates the Flexible budget amount.

## Signature

```python
async def update_flexible_budget(
    amount: float,
    start_date: str | None = None,
    apply_to_future: bool = False
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `float` | Yes | The amount to set the Flexible budget to. Can be negative (to indicate over-budget). A zero value will "unset" or "clear" the budget for the Flexible category. |
| `start_date` | `str | None` | No | The beginning of the given timeframe (ex: 2023-12-01). If not specified, then the beginning of next month will be used. |
| `apply_to_future` | `bool` | No | Whether to apply the new budget amount to all proceeding timeframes |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_flexible_budget(100.0)
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_UpdateFlexBudgetMutation`

### GraphQL Query

```graphql
mutation Common_UpdateFlexBudgetMutation($input: UpdateOrCreateFlexBudgetItemMutationInput!) {
              updateOrCreateFlexBudgetItem(input: $input) {
                budgetItem {
                  id
                  budgetAmount
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
