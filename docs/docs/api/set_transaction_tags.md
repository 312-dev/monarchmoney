---
sidebar_position: 3
---

# set_transaction_tags

**Type:** mutation

Sets the tags on a transaction

## Signature

```python
async def set_transaction_tags(
    transaction_id: str,
    tag_ids: List[str]
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transaction_id` | `str` | Yes | The transaction id |
| `tag_ids` | `List[str]` | Yes | The list of tag ids to set on the transaction. Overwrites existing tags. Empty list removes all tags. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.set_transaction_tags("example_transaction_id", "example_tag_ids")
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_SetTransactionTags`

### GraphQL Query

```graphql
mutation Web_SetTransactionTags($input: SetTransactionTagsInput!) {
            setTransactionTags(input: $input) {
              errors {
                ...PayloadErrorFields
                __typename
              }
              transaction {
                id
                tags {
                  id
                  __typename
                }
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
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
