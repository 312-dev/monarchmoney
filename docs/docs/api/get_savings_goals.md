---
sidebar_position: 4
---

# get_savings_goals

**Type:** query

Gets all savings goals (Monarch Goals) configured in the account. Returns goal data including: - id, name, type, status - currentBalance, targetAmount, progress - targetDate, estimatedMonthsUntilCompletion - plannedMonthlyContribution, currentMonthPlannedContributionAmount - Account allocations showing which accounts fund the goal

## Signature

```python
async def get_savings_goals(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_savings_goals()
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_SavingsGoals`

### GraphQL Query

```graphql
query Common_SavingsGoals {
              savingsGoals {
                ...GoalSummaryFields
                __typename
              }
            }

            fragment NewAccountLogoFields on Account {
              id
              dataProvider
              logoUrl
              type {
                name
                __typename
              }
              subtype {
                name
                __typename
              }
              institution {
                id
                logo
                primaryColor
                __typename
              }
              __typename
            }

            fragment GoalSummaryFields on SavingsGoal {
              id
              type
              name
              createdAt
              archivedAt
              completedAt
              imageStorageProvider
              imageStorageProviderId
              status
              progress
              currentBalance
              targetDate
              targetAmount
              hasFutureBudgetDifferentFromCurrentMonth
              currentMonthActualBudgetAmount
              currentMonthPlannedContributionAmount
              plannedMonthlyContribution
              spendingTotal
              netContribution
              netContributionWithSpending
              netContributionWithoutSpending
              balanceThisMonth
              estimatedMonthsUntilCompletion
              forecastedCompletionDate
              isSinkingFund
              priority
              allocationAmountsByAccount {
                goalId
                totalAmount
                spendingAmount
                contributionsAmount
                withdrawalsAmount
                account {
                  icon
                  displayName
                  linkedGoal {
                    id
                    __typename
                  }
                  subtype {
                    name
                    display
                    __typename
                  }
                  ...NewAccountLogoFields
                  __typename
                }
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
