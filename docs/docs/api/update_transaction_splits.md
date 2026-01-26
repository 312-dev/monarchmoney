---
sidebar_position: 8
---

# update_transaction_splits

**Type:** mutation

Creates, modifies, or deletes the splits for a given transaction. Returns the split information for the update transaction.

## Signature

```python
async def update_transaction_splits(
    transaction_id: str,
    split_data: List[Dict[str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transaction_id` | `str` | Yes | the original transaction to modify. |
| `split_data` | `List[Dict[str` | Yes | the splits to create, modify, or delete. If empty list or None is given, all splits will be deleted. If split_data is given, all existing splits for transaction_id will be replaced with the new splits. split_data takes the shape: [&#123;"merchantName": "...", "amount": -12.34, "categoryId": "231"&#125;, split2, split3, ...] sum([split.amount for split in split_data]) must equal transaction_id.amount. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_transaction_splits("example_transaction_id", "example_split_data")
print(result)
```

## GraphQL Operation

**Operation Name:** `Common_SplitTransactionMutation`

### GraphQL Query

```graphql
mutation Common_SplitTransactionMutation($input: UpdateTransactionSplitMutationInput!) {
            updateTransactionSplit(input: $input) {
              errors {
                ...PayloadErrorFields
                __typename
              }
              transaction {
                id
                hasSplitTransactions
                splitTransactions {
                  id
                  merchant {
                    id
                    name
                    __typename
                  }
                  category {
                    id
                    name
                    __typename
                  }
                  amount
                  notes
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
