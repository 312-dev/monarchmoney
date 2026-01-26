---
sidebar_position: 1
---

# get_accounts

**Type:** query

Gets the list of accounts configured in the Monarch Money account.

## Signature

```python
async def get_accounts(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_accounts()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetAccounts`

### GraphQL Query

```graphql
query GetAccounts {
            accounts {
              ...AccountFields
              __typename
            }
            householdPreferences {
              id
              accountGroupOrder
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
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
