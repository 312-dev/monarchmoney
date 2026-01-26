---
sidebar_position: 3
---

# get_account_history

**Type:** query

Gets historical account snapshot data for the requested account

## Signature

```python
async def get_account_history(
    account_id: int
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_id` | `int` | Yes | Monarch account ID as an integer |

## Returns

json object with all historical snapshots of requested account's balances

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_account_history(123)
print(result)
```

## GraphQL Operation

**Operation Name:** `AccountDetails_getAccount`

### GraphQL Query

```graphql
query AccountDetails_getAccount($id: UUID!, $filters: TransactionFilterInput) {
              account(id: $id) {
                id
                ...AccountFields
                ...EditAccountFormFields
                isLiability
                credential {
                  id
                  hasSyncInProgress
                  canBeForceRefreshed
                  disconnectedFromDataProviderAt
                  dataProvider
                  institution {
                    id
                    plaidInstitutionId
                    url
                    ...InstitutionStatusFields
                    __typename
                  }
                  __typename
                }
                institution {
                  id
                  plaidInstitutionId
                  url
                  ...InstitutionStatusFields
                  __typename
                }
                __typename
              }
              transactions: allTransactions(filters: $filters) {
                totalCount
                results(limit: 20) {
                  id
                  ...TransactionsListFields
                  __typename
                }
                __typename
              }
              snapshots: snapshotsForAccount(accountId: $id) {
                date
                signedBalance
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
              logoUrl
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

            fragment EditAccountFormFields on Account {
              id
              displayName
              deactivatedAt
              displayBalance
              includeInNetWorth
              hideFromList
              hideTransactionsFromReports
              dataProvider
              dataProviderAccountId
              isManual
              manualInvestmentsTrackingMethod
              isAsset
              invertSyncedBalance
              canInvertBalance
              type {
                name
                display
                __typename
              }
              subtype {
                name
                display
                __typename
              }
              __typename
            }

            fragment InstitutionStatusFields on Institution {
              id
              hasIssuesReported
              hasIssuesReportedMessage
              plaidStatus
              status
              balanceStatus
              transactionsStatus
              __typename
            }

            fragment TransactionsListFields on Transaction {
              id
              ...TransactionOverviewFields
              __typename
            }

            fragment TransactionOverviewFields on Transaction {
              id
              amount
              pending
              date
              hideFromReports
              plaidName
              notes
              isRecurring
              reviewStatus
              needsReview
              dataProviderDescription
              attachments {
                id
                __typename
              }
              isSplitTransaction
              category {
                id
                name
                group {
                  id
                  type
                  __typename
                }
                __typename
              }
              merchant {
                name
                id
                transactionsCount
                __typename
              }
              tags {
                id
                name
                color
                order
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
