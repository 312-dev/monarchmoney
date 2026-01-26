---
sidebar_position: 1
---

# get_budgets

**Type:** query

Get your budgets and corresponding actual amounts from the account. When no date arguments given: | `start_date` will default to last month based on todays date | `end_date` will default to next month based on todays date

## Signature

```python
async def get_budgets(
    start_date: str | None = None,
    end_date: str | None = None,
    use_legacy_goals: bool | None = False,
    use_v2_goals: bool | None = True
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | `str | None` | No | the earliest date to get budget data, in "yyyy-mm-dd" format (default: last month) |
| `end_date` | `str | None` | No | the latest date to get budget data, in "yyyy-mm-dd" format (default: next month) |
| `use_legacy_goals` | `bool | None` | No | Inoperative (plan to remove) |
| `use_v2_goals` | `bool | None` | No | Inoperative (paln to remove) |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_budgets()
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_GetJointPlanningData`

### GraphQL Query

```graphql
query Common_GetJointPlanningData($startDate: Date!, $endDate: Date!) {
              budgetSystem
              budgetData(startMonth: $startDate, endMonth: $endDate) {
                ...BudgetDataFields
                __typename
              }
              categoryGroups {
                ...BudgetCategoryGroupFields
                __typename
              }
              goalsV2 {
                ...BudgetDataGoalsV2Fields
                __typename
              }
            }
            
            fragment BudgetDataMonthlyAmountsFields on BudgetMonthlyAmounts {
              month
              plannedCashFlowAmount
              plannedSetAsideAmount
              actualAmount
              remainingAmount
              previousMonthRolloverAmount
              rolloverType
              cumulativeActualAmount
              rolloverTargetAmount
              __typename
            }
            
            fragment BudgetMonthlyAmountsByCategoryFields on BudgetCategoryMonthlyAmounts {
              category {
                id
                __typename
              }
              monthlyAmounts {
                ...BudgetDataMonthlyAmountsFields
                __typename
              }
              __typename
            }
            
            fragment BudgetMonthlyAmountsByCategoryGroupFields on BudgetCategoryGroupMonthlyAmounts {
              categoryGroup {
                id
                __typename
              }
              monthlyAmounts {
                ...BudgetDataMonthlyAmountsFields
                __typename
              }
              __typename
            }
            
            fragment BudgetMonthlyAmountsForFlexExpenseFields on BudgetFlexMonthlyAmounts {
              budgetVariability
              monthlyAmounts {
                ...BudgetDataMonthlyAmountsFields
                __typename
              }
              __typename
            }
            
            fragment BudgetDataTotalsByMonthFields on BudgetTotals {
              actualAmount
              plannedAmount
              previousMonthRolloverAmount
              remainingAmount
              __typename
            }
            
            fragment BudgetTotalsByMonthFields on BudgetMonthTotals {
              month
              totalIncome {
                ...BudgetDataTotalsByMonthFields
                __typename
              }
              totalExpenses {
                ...BudgetDataTotalsByMonthFields
                __typename
              }
              totalFixedExpenses {
                ...BudgetDataTotalsByMonthFields
                __typename
              }
              totalNonMonthlyExpenses {
                ...BudgetDataTotalsByMonthFields
                __typename
              }
              totalFlexibleExpenses {
                ...BudgetDataTotalsByMonthFields
                __typename
              }
              __typename
            }
            
            fragment BudgetRolloverPeriodFields on BudgetRolloverPeriod {
              id
              startMonth
              endMonth
              startingBalance
              targetAmount
              frequency
              type
              __typename
            }
            
            fragment BudgetCategoryFields on Category {
              id
              name
              icon
              order
              budgetVariability
              excludeFromBudget
              isSystemCategory
              updatedAt
              group {
                id
                type
                budgetVariability
                groupLevelBudgetingEnabled
                __typename
              }
              rolloverPeriod {
                ...BudgetRolloverPeriodFields
                __typename
              }
              __typename
            }
            
            fragment BudgetDataFields on BudgetData {
              monthlyAmountsByCategory {
                ...BudgetMonthlyAmountsByCategoryFields
                __typename
              }
              monthlyAmountsByCategoryGroup {
                ...BudgetMonthlyAmountsByCategoryGroupFields
                __typename
              }
              monthlyAmountsForFlexExpense {
                ...BudgetMonthlyAmountsForFlexExpenseFields
                __typename
              }
              totalsByMonth {
                ...BudgetTotalsByMonthFields
                __typename
              }
              __typename
            }
            
            fragment BudgetCategoryGroupFields on CategoryGroup {
              id
              name
              order
              type
              budgetVariability
              updatedAt
              groupLevelBudgetingEnabled
              categories {
                ...BudgetCategoryFields
                __typename
              }
              rolloverPeriod {
                id
                type
                startMonth
                endMonth
                startingBalance
                frequency
                targetAmount
                __typename
              }
              __typename
            }
            
            fragment BudgetDataGoalsV2Fields on GoalV2 {
              id
              name
              archivedAt
              completedAt
              priority
              imageStorageProvider
              imageStorageProviderId
              plannedContributions(startMonth: $startDate, endMonth: $endDate) {
                id
                month
                amount
                __typename
              }
              monthlyContributionSummaries(startMonth: $startDate, endMonth: $endDate) {
                month
                sum
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
