---
sidebar_position: 9
---

# update_account

**Type:** mutation

Updates the details of an account. With the exception of the account_balance parameter, the only available parameters currently are those that are valid for both synced and manual accounts.

## Signature

```python
async def update_account(
    account_id: str,
    account_name: str | None = None,
    account_balance: float | None = None,
    account_type: str | None = None,
    account_sub_type: str | None = None,
    include_in_net_worth: bool | None = None,
    hide_from_summary_list: bool | None = None,
    hide_transactions_from_reports: bool | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_id` | `str` | Yes | The string ID of the account to update |
| `account_name` | `str | None` | No | The string of the account name |
| `account_balance` | `float | None` | No | a float of the amount to update the account balance to |
| `account_type` | `str | None` | No | The string of account group type (i.e. loan, other_liability, other_asset, etc) |
| `account_sub_type` | `str | None` | No | The string sub type of the account (i.e. auto, commercial, mortgage, line_of_credit, etc) |
| `include_in_net_worth` | `bool | None` | No | A boolean if the account should be considered in the net worth calculation |
| `hide_from_summary_list` | `bool | None` | No | A boolean if the account should be hidden in the "Accounts" view |
| `hide_transactions_from_reports` | `bool | None` | No | A boolean if the account should be excluded from budgets and reports |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_account("example_account_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_UpdateAccount`

### GraphQL Query

```graphql
mutation Common_UpdateAccount($input: UpdateAccountMutationInput!) {
                updateAccount(input: $input) {
                    account {
                        ...AccountFields
                        __typename
                    }
                    errors {
                        ...PayloadErrorFields
                        __typename
                    }
                    __typename
                }
            }

            fragment AccountFields on Account {
                id
                displayName
                syncDisabled
                deactivatedAt
                isHidden
                isAsset
                mask
                createdAt
                updatedAt
                displayLastUpdatedAt
                currentBalance
                displayBalance
                includeInNetWorth
                hideFromList
                hideTransactionsFromReports
                includeBalanceInNetWorth
                includeInGoalBalance
                dataProvider
                dataProviderAccountId
                isManual
                transactionsCount
                holdingsCount
                manualInvestmentsTrackingMethod
                order
                icon
                logoUrl
                deactivatedAt
                type {
                    name
                    display
                    group
                    __typename
                }
                subtype {
                    name
                    display
                    __typename
                }
                credential {
                    id
                    updateRequired
                    disconnectedFromDataProviderAt
                    dataProvider
                    institution {
                        id
                        plaidInstitutionId
                        name
                        status
                        __typename
                    }
                    __typename
                }
                institution {
                    id
                    name
                    primaryColor
                    url
                    __typename
                }
                __typename
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
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
