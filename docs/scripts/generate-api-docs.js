#!/usr/bin/env node

/**
 * API Documentation Generator for Eclosion
 *
 * This script parses the monarchmoney.py file and generates Markdown documentation
 * for each API method, including:
 * - Method signature and description
 * - Parameters with types and descriptions
 * - GraphQL operation details
 * - Interactive API tester component
 *
 * The documentation auto-updates when the Python code changes.
 */

const fs = require('fs');
const path = require('path');

const PYTHON_FILE = path.join(__dirname, '..', '..', 'monarchmoney', 'monarchmoney.py');
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'api');

// Method metadata for categorization and ordering
const METHOD_METADATA = {
  // Authentication
  'login': { category: 'Authentication', order: 1, badge: 'mutation' },
  'interactive_login': { category: 'Authentication', order: 2, badge: 'mutation' },
  'multi_factor_authenticate': { category: 'Authentication', order: 3, badge: 'mutation' },
  'save_session': { category: 'Authentication', order: 4, badge: 'utility' },
  'load_session': { category: 'Authentication', order: 5, badge: 'utility' },
  'delete_session': { category: 'Authentication', order: 6, badge: 'utility' },

  // Accounts
  'get_accounts': { category: 'Accounts', order: 1, badge: 'query' },
  'get_account_holdings': { category: 'Accounts', order: 2, badge: 'query' },
  'get_account_history': { category: 'Accounts', order: 3, badge: 'query' },
  'get_account_type_options': { category: 'Accounts', order: 4, badge: 'query' },
  'get_recent_account_balances': { category: 'Accounts', order: 5, badge: 'query' },
  'get_account_snapshots_by_type': { category: 'Accounts', order: 6, badge: 'query' },
  'get_aggregate_snapshots': { category: 'Accounts', order: 7, badge: 'query' },
  'create_manual_account': { category: 'Accounts', order: 8, badge: 'mutation' },
  'update_account': { category: 'Accounts', order: 9, badge: 'mutation' },
  'delete_account': { category: 'Accounts', order: 10, badge: 'mutation' },
  'request_accounts_refresh': { category: 'Accounts', order: 11, badge: 'mutation' },
  'is_accounts_refresh_complete': { category: 'Accounts', order: 12, badge: 'query' },
  'request_accounts_refresh_and_wait': { category: 'Accounts', order: 13, badge: 'mutation' },

  // Transactions
  'get_transactions': { category: 'Transactions', order: 1, badge: 'query' },
  'get_transaction_details': { category: 'Transactions', order: 2, badge: 'query' },
  'get_transaction_splits': { category: 'Transactions', order: 3, badge: 'query' },
  'get_transactions_summary': { category: 'Transactions', order: 4, badge: 'query' },
  'create_transaction': { category: 'Transactions', order: 5, badge: 'mutation' },
  'update_transaction': { category: 'Transactions', order: 6, badge: 'mutation' },
  'delete_transaction': { category: 'Transactions', order: 7, badge: 'mutation' },
  'update_transaction_splits': { category: 'Transactions', order: 8, badge: 'mutation' },

  // Categories
  'get_transaction_categories': { category: 'Categories', order: 1, badge: 'query' },
  'get_transaction_category_groups': { category: 'Categories', order: 2, badge: 'query' },
  'create_transaction_category': { category: 'Categories', order: 3, badge: 'mutation' },
  'update_transaction_category': { category: 'Categories', order: 4, badge: 'mutation' },
  'delete_transaction_category': { category: 'Categories', order: 5, badge: 'mutation' },
  'delete_transaction_categories': { category: 'Categories', order: 6, badge: 'mutation' },
  'update_category_group_settings': { category: 'Categories', order: 7, badge: 'mutation' },
  'enable_category_rollover': { category: 'Categories', order: 8, badge: 'mutation' },
  'get_category_rollover': { category: 'Categories', order: 9, badge: 'query' },
  'update_category_rollover': { category: 'Categories', order: 10, badge: 'mutation' },

  // Tags
  'get_transaction_tags': { category: 'Tags', order: 1, badge: 'query' },
  'create_transaction_tag': { category: 'Tags', order: 2, badge: 'mutation' },
  'set_transaction_tags': { category: 'Tags', order: 3, badge: 'mutation' },

  // Budgets & Goals
  'get_budgets': { category: 'Budgets', order: 1, badge: 'query' },
  'set_budget_amount': { category: 'Budgets', order: 2, badge: 'mutation' },
  'update_flexible_budget': { category: 'Budgets', order: 3, badge: 'mutation' },
  'get_savings_goals': { category: 'Budgets', order: 4, badge: 'query' },
  'get_savings_goal_budgets': { category: 'Budgets', order: 5, badge: 'query' },

  // Cash Flow
  'get_cashflow': { category: 'Analytics', order: 1, badge: 'query' },
  'get_cashflow_summary': { category: 'Analytics', order: 2, badge: 'query' },
  'get_aggregates': { category: 'Analytics', order: 3, badge: 'query' },

  // Recurring
  'get_recurring_transactions': { category: 'Recurring', order: 1, badge: 'query' },
  'get_all_recurring_transaction_items': { category: 'Recurring', order: 2, badge: 'query' },

  // Institutions & User
  'get_institutions': { category: 'Institutions', order: 1, badge: 'query' },
  'get_subscription_details': { category: 'User', order: 1, badge: 'query' },
  'get_user_profile': { category: 'User', order: 2, badge: 'query' },

  // Utilities
  'upload_account_balance_history': { category: 'Utilities', order: 1, badge: 'post' },
  'gql_call': { category: 'Utilities', order: 2, badge: 'utility' },
};

/**
 * Parse Python type hints to a human-readable format
 */
function parseType(typeStr) {
  if (!typeStr) return 'Any';

  // Handle Optional
  const optionalMatch = typeStr.match(/Optional\[(.+)\]/);
  if (optionalMatch) {
    return `${parseType(optionalMatch[1])} | None`;
  }

  // Handle List
  const listMatch = typeStr.match(/List\[(.+)\]/);
  if (listMatch) {
    return `List[${parseType(listMatch[1])}]`;
  }

  // Handle Dict
  const dictMatch = typeStr.match(/Dict\[(.+),\s*(.+)\]/);
  if (dictMatch) {
    return `Dict[${parseType(dictMatch[1])}, ${parseType(dictMatch[2])}]`;
  }

  return typeStr;
}

/**
 * Parse a Python method definition and docstring
 */
function parseMethod(methodText) {
  // Extract method signature
  const sigMatch = methodText.match(/async\s+def\s+(\w+)\s*\(([\s\S]*?)\)\s*(?:->[\s\S]*?)?:/);
  if (!sigMatch) return null;

  const methodName = sigMatch[1];
  const paramsStr = sigMatch[2];

  // Skip private methods
  if (methodName.startsWith('_')) return null;

  // Parse parameters
  const params = [];
  const paramRegex = /(\w+)\s*(?::\s*([^=,]+))?\s*(?:=\s*([^,]+))?/g;
  let match;

  while ((match = paramRegex.exec(paramsStr)) !== null) {
    const [, name, type, defaultVal] = match;
    if (name === 'self') continue;

    params.push({
      name,
      type: parseType(type?.trim()),
      default: defaultVal?.trim(),
      required: !defaultVal,
    });
  }

  // Extract docstring
  const docMatch = methodText.match(/:\s*\n\s*"""([\s\S]*?)"""/);
  let description = '';
  let paramDocs = {};
  let returns = '';

  if (docMatch) {
    const docstring = docMatch[1];
    const lines = docstring.split('\n').map(l => l.trim());

    // Parse description (everything before :param or :return)
    const descLines = [];
    let i = 0;
    while (i < lines.length && !lines[i].startsWith(':param') && !lines[i].startsWith(':return') && !lines[i].startsWith('Args:') && !lines[i].startsWith('Returns:')) {
      if (lines[i]) descLines.push(lines[i]);
      i++;
    }
    description = descLines.join(' ');

    // Parse param docs
    const paramDocRegex = /:param\s+(\w+):\s*([\s\S]*?)(?=:param|:return|$)/g;
    while ((match = paramDocRegex.exec(docstring)) !== null) {
      paramDocs[match[1]] = match[2].replace(/\n\s*/g, ' ').trim();
    }

    // Alternative Args: format
    const argsMatch = docstring.match(/Args:\s*([\s\S]*?)(?=Returns:|$)/);
    if (argsMatch) {
      const argsRegex = /(\w+):\s*([\s\S]*?)(?=\n\s*\w+:|$)/g;
      while ((match = argsRegex.exec(argsMatch[1])) !== null) {
        paramDocs[match[1]] = match[2].replace(/\n\s*/g, ' ').trim();
      }
    }

    // Parse returns
    const returnMatch = docstring.match(/:return[s]?:\s*([\s\S]*?)$/);
    if (returnMatch) {
      returns = returnMatch[1].replace(/\n\s*/g, ' ').trim();
    }

    const returnsMatch = docstring.match(/Returns:\s*([\s\S]*?)$/);
    if (returnsMatch) {
      returns = returnsMatch[1].replace(/\n\s*/g, ' ').trim();
    }
  }

  // Add descriptions to params
  params.forEach(p => {
    p.description = paramDocs[p.name] || '';
  });

  // Extract GraphQL operation name
  let graphqlOperation = null;
  const opMatch = methodText.match(/operation\s*=\s*["']([^"']+)["']/);
  if (opMatch) {
    graphqlOperation = opMatch[1];
  }

  // Extract GraphQL query (simplified)
  let graphqlQuery = null;
  const queryMatch = methodText.match(/gql\s*\(\s*"""([\s\S]*?)"""\s*\)/);
  if (queryMatch) {
    graphqlQuery = queryMatch[1].trim();
  }

  return {
    name: methodName,
    params,
    description,
    returns,
    graphqlOperation,
    graphqlQuery,
    metadata: METHOD_METADATA[methodName] || { category: 'Other', order: 99, badge: 'query' },
  };
}

/**
 * Escape content for safe use in MDX (handles JSX-like syntax)
 */
function escapeForMdx(str) {
  if (!str) return '';
  return str
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Clean description for use in markdown tables
 */
function cleanDescription(str) {
  if (!str) return '-';
  // Remove newlines, escape pipes, and escape MDX special chars
  return escapeForMdx(str)
    .replace(/\n/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

/**
 * Generate Markdown documentation for a method
 */
function generateMarkdown(method) {
  const { name, params, description, returns, graphqlOperation, graphqlQuery, metadata } = method;

  // Filter out invalid params (like 'Any' artifacts from complex types)
  const validParams = params.filter(p =>
    p.name &&
    p.name !== 'Any' &&
    !p.name.includes(']') &&
    !p.name.includes('[')
  );

  let md = `---
sidebar_position: ${metadata.order}
---

# ${name}

**Type:** ${metadata.badge}

${escapeForMdx(description) || 'No description available.'}

## Signature

\`\`\`python
async def ${name}(
${validParams.map(p => `    ${p.name}: ${p.type}${p.default ? ` = ${p.default}` : ''}`).join(',\n') || '    # No parameters'}
) -> Dict[str, Any]
\`\`\`

`;

  // Parameters table
  if (validParams.length > 0) {
    md += `## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
`;
    validParams.forEach(p => {
      md += `| \`${p.name}\` | \`${p.type}\` | ${p.required ? 'Yes' : 'No'} | ${cleanDescription(p.description)} |\n`;
    });
    md += '\n';
  }

  // Returns
  if (returns) {
    md += `## Returns

${escapeForMdx(returns)}

`;
  }

  // Example
  const exampleParams = validParams.filter(p => p.required).map(p => {
    if (p.type.includes('str')) return `"example_${p.name}"`;
    if (p.type.includes('int')) return '123';
    if (p.type.includes('float')) return '100.0';
    if (p.type.includes('bool')) return 'True';
    if (p.type.includes('List')) return '[]';
    if (p.type.includes('Dict')) return '{}';
    return `${p.name}`;
  });

  md += `## Example

\`\`\`python
from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.${name}(${exampleParams.join(', ')})
print(result)
\`\`\`

`;

  // GraphQL details
  if (graphqlOperation) {
    md += `## GraphQL Operation

**Operation Name:** \`${graphqlOperation}\`

`;
  }

  if (graphqlQuery) {
    md += `### GraphQL Query

\`\`\`graphql
${graphqlQuery}
\`\`\`

`;
  }

  // Simple try it out section without JSX
  md += `## Try It Out

To test this API method locally:

1. Install the package: \`pip install monarchmoney\`
2. Create a Python script with the example code above
3. Replace \`email\` and \`password\` with your Monarch Money credentials
4. Run the script

See the [Authentication Guide](/docs/guides/authentication) for details on logging in.
`;

  return md;
}

/**
 * Main function
 */
function main() {
  console.log('Generating API documentation from Python source...');

  // Read Python file
  const pythonContent = fs.readFileSync(PYTHON_FILE, 'utf8');

  // Split into method blocks
  const methodBlocks = pythonContent.split(/(?=\s+async\s+def\s+)/);

  // Parse methods
  const methods = [];
  for (const block of methodBlocks) {
    const method = parseMethod(block);
    if (method) {
      methods.push(method);
    }
  }

  console.log(`Found ${methods.length} public methods`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate documentation for each method
  for (const method of methods) {
    const filename = path.join(OUTPUT_DIR, `${method.name}.md`);
    const markdown = generateMarkdown(method);
    fs.writeFileSync(filename, markdown);
    console.log(`Generated: ${method.name}.md`);
  }

  console.log('API documentation generation complete!');
}

main();
