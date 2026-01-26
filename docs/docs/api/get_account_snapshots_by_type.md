---
sidebar_position: 6
---

# get_account_snapshots_by_type

**Type:** query

Retrieves snapshots of the net values of all accounts of a given type, with either a yearly monthly granularity. `start_date` is an ISO datestring in the format YYYY-MM-DD, e.g. 2024-04-01, containing the date to begin the snapshots from `timeframe` is one of "year" or "month". Note, `month` in the snapshot results is not a full ISO datestring, as it doesn't include the day. Instead, it looks like, e.g., 2023-01

## Signature

```python
async def get_account_snapshots_by_type(
    start_date: str,
    timeframe: str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | `str` | Yes | - |
| `timeframe` | `str` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.get_account_snapshots_by_type("example_start_date", "example_timeframe")
print(result)
```

## GraphQL Operation

**Operation Name:** `GetSnapshotsByAccountType`

### GraphQL Query

```graphql
query GetSnapshotsByAccountType($startDate: Date!, $timeframe: Timeframe!) {
                snapshotsByAccountType(startDate: $startDate, timeframe: $timeframe) {
                    accountType
                    month
                    balance
                    __typename
                }
                accountTypes {
                    name
                    group
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
