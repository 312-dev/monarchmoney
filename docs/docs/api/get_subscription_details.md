---
sidebar_position: 1
---

# get_subscription_details

**Type:** query

The type of subscription for the Monarch Money account.

## Signature

```python
async def get_subscription_details(
    # No parameters
) -> Dict[str, Any]
```

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_subscription_details()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetSubscriptionDetails`

### GraphQL Query

```graphql
query GetSubscriptionDetails {
            subscription {
              id
              paymentSource
              referralCode
              isOnFreeTrial
              hasPremiumEntitlement
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
