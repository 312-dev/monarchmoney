---
sidebar_position: 1
---

# get_institutions

**Type:** query

Gets institution data from the account.

## Signature

```python
async def get_institutions(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_institutions()
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_GetInstitutionSettings`

### GraphQL Query

```graphql
query Web_GetInstitutionSettings {
              credentials {
                id
                ...CredentialSettingsCardFields
                __typename
              }
              accounts(filters: {includeDeleted: true}) {
                id
                displayName
                subtype {
                  display
                  __typename
                }
                mask
                credential {
                  id
                  __typename
                }
                deletedAt
                __typename
              }
              subscription {
                isOnFreeTrial
                hasPremiumEntitlement
                __typename
              }
            }

            fragment CredentialSettingsCardFields on Credential {
              id
              updateRequired
              disconnectedFromDataProviderAt
              ...InstitutionInfoFields
              institution {
                id
                name
                url
                __typename
              }
              __typename
            }

            fragment InstitutionInfoFields on Credential {
              id
              displayLastUpdatedAt
              dataProvider
              updateRequired
              disconnectedFromDataProviderAt
              ...InstitutionLogoWithStatusFields
              institution {
                id
                name
                hasIssuesReported
                hasIssuesReportedMessage
                __typename
              }
              __typename
            }

            fragment InstitutionLogoWithStatusFields on Credential {
              dataProvider
              updateRequired
              institution {
                hasIssuesReported
                status
                balanceStatus
                transactionsStatus
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
