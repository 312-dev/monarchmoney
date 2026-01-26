---
sidebar_position: 2
---

# get_account_holdings

**Type:** query

Get the holdings information for a brokerage or similar type of account.

## Signature

```python
async def get_account_holdings(
    account_id: int
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account_id` | `int` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_account_holdings(123)
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_GetHoldings`

### GraphQL Query

```graphql
query Web_GetHoldings($input: PortfolioInput) {
            portfolio(input: $input) {
              aggregateHoldings {
                edges {
                  node {
                    id
                    quantity
                    basis
                    totalValue
                    securityPriceChangeDollars
                    securityPriceChangePercent
                    lastSyncedAt
                    holdings {
                      id
                      type
                      typeDisplay
                      name
                      ticker
                      closingPrice
                      isManual
                      closingPriceUpdatedAt
                      __typename
                    }
                    security {
                      id
                      name
                      type
                      ticker
                      typeDisplay
                      currentPrice
                      currentPriceUpdatedAt
                      closingPrice
                      closingPriceUpdatedAt
                      oneDayChangePercent
                      oneDayChangeDollars
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
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
