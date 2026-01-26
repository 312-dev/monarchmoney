---
sidebar_position: 5
---

# get_savings_goal_budgets

**Type:** query

Gets monthly budget amounts for all savings goals within a date range. This returns detailed monthly planning data for goals, including planned and actual contribution amounts by month.

## Signature

```python
async def get_savings_goal_budgets(
    start_month: str,
    end_month: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_month` | `str` | Yes | Start date in YYYY-MM-DD format (first of month) |
| `end_month` | `str` | Yes | End date in YYYY-MM-DD format (first of month) |

## Returns

Dict with savingsGoalMonthlyBudgetAmounts containing goal and monthly data

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_savings_goal_budgets("example_start_month", "example_end_month")
print(result)
```

## GraphQL Operation

**Operation Name:** `GetSavingsGoals`

### GraphQL Query

```graphql
query GetSavingsGoals($startDate: Date!, $endDate: Date!) {
                savingsGoalMonthlyBudgetAmounts(startMonth: $startDate, endMonth: $endDate) {
                    id
                    savingsGoal {
                        id
                        name
                        type
                        status
                        archivedAt
                        completedAt
                    }
                    monthlyAmounts {
                        month
                        plannedAmount
                        actualAmount
                        remainingAmount
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
