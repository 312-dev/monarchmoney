---
sidebar_position: 4
---

# update_transaction_category

**Type:** mutation

Updates an existing transaction category's name, icon, or group.

## Signature

```python
async def update_transaction_category(
    category_id: str,
    name: str | None = None,
    icon: str | None = None,
    group_id: str | None = None
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | `str` | Yes | The ID of the category to update |
| `name` | `str | None` | No | New name for the category (optional) |
| `icon` | `str | None` | No | New icon/emoji for the category (optional) |
| `group_id` | `str | None` | No | New category group ID to move the category to (optional) |

## Returns

Dict with updateCategory containing the updated category and any errors

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.update_transaction_category("example_category_id")
print(result)
```

## GraphQL Operation

**Operation Name:** `UpdateCategory`

### GraphQL Query

```graphql
mutation UpdateCategory($input: UpdateCategoryInput!) {
                updateCategory(input: $input) {
                    category {
                        id
                        name
                        icon
                        group {
                            id
                            name
                        }
                    }
                    errors {
                        message
                        fieldErrors {
                            field
                            messages
                        }
                    }
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
