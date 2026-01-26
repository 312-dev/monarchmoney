---
sidebar_position: 2
---

# create_transaction_tag

**Type:** mutation

Creates a new transaction tag.

## Signature

```python
async def create_transaction_tag(
    name: str,
    color: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `str` | Yes | The name of the tag |
| `color` | `str` | Yes | The color of the tag. The observed format is six-digit RGB hexadecimal, including the leading number sign. Example: color="#19D2A5". More information can be found https://en.wikipedia.org/wiki/Web_colors#Hex_triplet. Does not appear to be limited to the color selections in the dashboard. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.create_transaction_tag("example_name", "example_color")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_CreateTransactionTag`

### GraphQL Query

```graphql
mutation Common_CreateTransactionTag($input: CreateTransactionTagInput!) {
              createTransactionTag(input: $input) {
                tag {
                  id
                  name
                  color
                  order
                  transactionCount
                  __typename
                }
                errors {
                  message
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
