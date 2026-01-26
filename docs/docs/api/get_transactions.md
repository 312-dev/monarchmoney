---
sidebar_position: 1
---

# get_transactions

**Type:** query

Gets transaction data from the account.

## Signature

```python
async def get_transactions(
    limit: int = DEFAULT_RECORD_LIMIT,
    offset: int | None = 0,
    start_date: str | None = None,
    end_date: str | None = None,
    search: str = "",
    category_ids: List[str] = [],
    account_ids: List[str] = [],
    tag_ids: List[str] = [],
    has_attachments: bool | None = None,
    has_notes: bool | None = None,
    hidden_from_reports: bool | None = None,
    is_split: bool | None = None,
    is_recurring: bool | None = None,
    imported_from_mint: bool | None = None,
    synced_from_institution: bool | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | `int` | No | the maximum number of transactions to download, defaults to DEFAULT_RECORD_LIMIT. |
| `offset` | `int | None` | No | the number of transactions to skip (offset) before retrieving results. |
| `start_date` | `str | None` | No | the earliest date to get transactions from, in "yyyy-mm-dd" format. |
| `end_date` | `str | None` | No | the latest date to get transactions from, in "yyyy-mm-dd" format. |
| `search` | `str` | No | a string to filter transactions. use empty string for all results. |
| `category_ids` | `List[str]` | No | a list of category ids to filter. |
| `account_ids` | `List[str]` | No | a list of account ids to filter. |
| `tag_ids` | `List[str]` | No | a list of tag ids to filter. |
| `has_attachments` | `bool | None` | No | a bool to filter for whether the transactions have attachments. |
| `has_notes` | `bool | None` | No | a bool to filter for whether the transactions have notes. |
| `hidden_from_reports` | `bool | None` | No | a bool to filter for whether the transactions are hidden from reports. |
| `is_split` | `bool | None` | No | a bool to filter for whether the transactions are split. |
| `is_recurring` | `bool | None` | No | a bool to filter for whether the transactions are recurring. |
| `imported_from_mint` | `bool | None` | No | a bool to filter for whether the transactions were imported from mint. |
| `synced_from_institution` | `bool | None` | No | a bool to filter for whether the transactions were synced from an institution. |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_transactions()
print(result)
```

## GraphQL Operation

**Operation Name:** `GetTransactionsList`

### GraphQL Query

```graphql
query GetTransactionsList($offset: Int, $limit: Int, $filters: TransactionFilterInput, $orderBy: TransactionOrdering) {
            allTransactions(filters: $filters) {
              totalCount
              results(offset: $offset, limit: $limit, orderBy: $orderBy) {
                id
                ...TransactionOverviewFields
                __typename
              }
              __typename
            }
            transactionRules {
              id
              __typename
            }
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
            attachments {
              id
              extension
              filename
              originalAssetUrl
              publicId
              sizeBytes
              __typename
            }
            isSplitTransaction
            createdAt
            updatedAt
            category {
              id
              name
              __typename
            }
            merchant {
              name
              id
              transactionsCount
              __typename
            }
            account {
              id
              displayName
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
