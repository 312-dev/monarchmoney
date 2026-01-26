---
sidebar_position: 2
---

# gql_call

**Type:** utility

Makes a GraphQL call to Monarch Money's API.

## Signature

```python
async def gql_call(
    operation: str,
    graphql_query: DocumentNode,
    variables: Dict[str
) -> Dict[str, Any]
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `operation` | `str` | Yes | - |
| `graphql_query` | `DocumentNode` | Yes | - |
| `variables` | `Dict[str` | Yes | - |

## Example

```python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.gql_call("example_operation", graphql_query, "example_variables")
print(result)
```

## Try It Out

To test this API method locally:

1. Install the package: `pip install monarchmoney`
2. Create a Python script with the example code above
3. Replace `email` and `password` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
