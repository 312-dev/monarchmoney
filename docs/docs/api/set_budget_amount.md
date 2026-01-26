---
sidebar_position: 2
---

# set_budget_amount

**Type:** mutation

Updates the budget amount for the given category.

## Signature

```python
async def set_budget_amount(
    amount: float,
    category_id: str | None = None,
    category_group_id: str | None = None,
    timeframe: str = "month",
    I: Any,
    believe: Any,
    this: Any,
    is: Any,
    the: Any,
    only: Any,
    valid: Any,
    value: Any,
    right: Any,
    now: Any,
    start_date: str | None = None,
    apply_to_future: bool = False
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `float` | Yes | The amount to set the budget to. Can be negative (to indicate over-budget). A zero value will "unset" or "clear" the budget for the given category. |
| `category_id` | `str | None` | No | The ID of the category to set the budget for (cannot be provided w/ category_group_id) |
| `category_group_id` | `str | None` | No | The ID of the category group to set the budget for (cannot be provided w/ category_id) |
| `timeframe` | `str` | No | The timeframe of the budget. As of writing, it is believed that `month` is the only valid value for this parameter. |
| `I` | `Any` | Yes | - |
| `believe` | `Any` | Yes | - |
| `this` | `Any` | Yes | - |
| `is` | `Any` | Yes | - |
| `the` | `Any` | Yes | - |
| `only` | `Any` | Yes | - |
| `valid` | `Any` | Yes | - |
| `value` | `Any` | Yes | - |
| `right` | `Any` | Yes | - |
| `now` | `Any` | Yes | - |
| `start_date` | `str | None` | No | The beginning of the given timeframe (ex: 2023-12-01). If not specified, then the beginning of today's month will be used. |
| `apply_to_future` | `bool` | No | Whether to apply the new budget amount to all proceeding timeframes |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.set_budget_amount(100.0, I, believe, this, is, the, only, valid, value, right, now)
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_UpdateBudgetItem`

### GraphQL Query

```graphql
mutation Common_UpdateBudgetItem($input: UpdateOrCreateBudgetItemMutationInput!) {
            updateOrCreateBudgetItem(input: $input) {
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
