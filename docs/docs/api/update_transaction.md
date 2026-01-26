---
sidebar_position: 6
---

# update_transaction

**Type:** mutation

Updates a single existing transaction as identified by the transaction_id The only required attribute is transaction_id. Calling this function with only the transaction_id will have no effect on the existing transaction data but will not cause an error. Comments on parameters: - transaction_id: Must match an existing transaction_id returned from Monarch - category_id: This parameter is only needed when the user wants to change the current category. When provided, it must match an existing category_id returned from Monarch. An empty string is equivalent to the parameter not being passed. - merchant_name: This parameter is only needed when the user wants to change the existing merchant name. Empty strings are ignored by the Monarch API when passed since a non-empty merchant name is required for all transactions - goal_id: This parameter is only needed when the user wants to change the existing goal.  When provided, it must match an existing goal_id returned from Monarch.  An empty string can be passed to clear out existing goal associations. - amount:  This parameter is only needed when the user wants to update the existing transaction amount. Empty strings are explicitly ignored by this code to avoid errors in the API. - date:  This parameter is only needed when the user wants to update the existing transaction date. Empty strings are explicitly ignored by this code to avoid errors in the API.  Required format is "2023-10-30" - hide_from_reports: This parameter is only needed when the user wants to update the existing transaction's hide-from-reports value.  If passed, the parameter is cast to Booleans to avoid API issues. - needs_review: This parameter is only needed when the user wants to update the existing transaction's needs-review value.  If passed, the parameter is cast to Booleans to avoid API issues. - notes: This parameter is only needed when the user wants to change the existing note.  An empty string can be passed to clear out existing notes. Examples: - To update a note: mm.update_transaction( transaction_id="160820461792094418", notes="my note") - To clear a note: mm.update_transaction( transaction_id="160820461792094418", notes="") - To update all items: mm.update_transaction( transaction_id="160820461792094418", category_id="160185840107743863", merchant_name="Amazon", goal_id="160826408575920275", amount=123.45, date="2023-11-09", hide_from_reports=False, needs_review="ThisWillBeCastToTrue", notes=f'Updated On: &#123;datetime.now().strftime("%m/%d/%Y %H:%M:%S")&#125;', )

## Signature

```python
async def update_transaction(
    transaction_id: str,
    category_id: str | None = None,
    merchant_name: str | None = None,
    goal_id: str | None = None,
    amount: float | None = None,
    date: str | None = None,
    hide_from_reports: bool | None = None,
    needs_review: bool | None = None,
    notes: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transaction_id` | `str` | Yes | - |
| `category_id` | `str | None` | No | - |
| `merchant_name` | `str | None` | No | - |
| `goal_id` | `str | None` | No | - |
| `amount` | `float | None` | No | - |
| `date` | `str | None` | No | - |
| `hide_from_reports` | `bool | None` | No | - |
| `needs_review` | `bool | None` | No | - |
| `notes` | `str | None` | No | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_transaction("example_transaction_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `Web_TransactionDrawerUpdateTransaction`

### GraphQL Query

```graphql
mutation Web_TransactionDrawerUpdateTransaction($input: UpdateTransactionMutationInput!) {
            updateTransaction(input: $input) {
            transaction {
                id
                amount
                pending
                date
                hideFromReports
                needsReview
                reviewedAt
                reviewedByUser {
                id
                name
                __typename
                }
                plaidName
                notes
                isRecurring
                category {
                id
                __typename
                }
                goal {
                id
                __typename
                }
                merchant {
                id
                name
                __typename
                }
                __typename
            }
            errors {
                ...PayloadErrorFields
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
