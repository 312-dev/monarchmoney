---
sidebar_position: 6
---

# delete_transaction_categories

**Type:** mutation

Deletes a list of transaction categories.

## Signature

```python
async def delete_transaction_categories(
    category_ids: List[str]
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_ids` | `List[str]` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.delete_transaction_categories("example_category_ids")
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
