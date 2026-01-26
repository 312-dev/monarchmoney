---
sidebar_position: 3
---

# create_transaction_category

**Type:** mutation

Creates a new transaction category

## Signature

```python
async def create_transaction_category(
    group_id: str,
    transaction_category_name: str,
    rollover_start_month: datetime = datetime.today().replace(day=1),
    icon: str = "\U00002753",
    rollover_enabled: bool = False,
    rollover_type: str = "monthly",
    rollover_frequency: str = "monthly",
    rollover_starting_balance: float = 0
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `group_id` | `str` | Yes | The transaction category group id |
| `transaction_category_name` | `str` | Yes | The name of the transaction category being created |
| `rollover_start_month` | `datetime` | No | The datetime of the rollover start month |
| `icon` | `str` | No | The icon of the transaction category. This accepts the unicode string or emoji. |
| `rollover_enabled` | `bool` | No | A bool whether the transaction category should be rolled over or not |
| `rollover_type` | `str` | No | The budget roll over type |
| `rollover_frequency` | `str` | No | The rollover frequency, e.g. "monthly" (default: "monthly") |
| `rollover_starting_balance` | `float` | No | The starting balance for rollover (default: 0) |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.create_transaction_category("example_group_id", "example_transaction_category_name")
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_CreateCategory`

### GraphQL Query

```graphql
mutation Web_CreateCategory($input: CreateCategoryInput!) {
                createCategory(input: $input) {
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
                systemCategory
                systemCategoryDisplayName
                budgetVariability
                isSystemCategory
                isDisabled
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
