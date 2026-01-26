import React, { useState, useCallback } from 'react';

/**
 * ApiTester Component
 *
 * This component provides an interactive way to test API calls directly in the browser.
 * It simulates what the Python code would do and shows the expected request/response format.
 *
 * Note: Actual API calls require authentication and a Monarch Money account.
 * This tester demonstrates the request format and allows local testing with a token.
 */
export default function ApiTester({
  methodName,
  parameters = [],
  graphqlOperation = null,
  graphqlQuery = null,
  isMutation = false
}) {
  const [values, setValues] = useState(() => {
    const initial = {};
    parameters.forEach(p => {
      initial[p.name] = p.default !== undefined ? String(p.default) : '';
    });
    return initial;
  });
  const [token, setToken] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const buildVariables = useCallback(() => {
    const vars = {};
    parameters.forEach(p => {
      const value = values[p.name];
      if (value === '' && !p.required) return;

      switch (p.type) {
        case 'int':
        case 'integer':
          vars[p.name] = parseInt(value, 10);
          break;
        case 'float':
        case 'number':
          vars[p.name] = parseFloat(value);
          break;
        case 'bool':
        case 'boolean':
          vars[p.name] = value === 'true' || value === true;
          break;
        case 'list':
        case 'array':
          try {
            vars[p.name] = JSON.parse(value || '[]');
          } catch {
            vars[p.name] = value.split(',').map(s => s.trim()).filter(Boolean);
          }
          break;
        case 'object':
        case 'dict':
          try {
            vars[p.name] = JSON.parse(value || '{}');
          } catch {
            vars[p.name] = {};
          }
          break;
        default:
          vars[p.name] = value;
      }
    });
    return vars;
  }, [parameters, values]);

  const generatePythonCode = useCallback(() => {
    const vars = buildVariables();
    const paramStrings = Object.entries(vars).map(([key, value]) => {
      if (typeof value === 'string') return `${key}="${value}"`;
      if (typeof value === 'boolean') return `${key}=${value ? 'True' : 'False'}`;
      if (Array.isArray(value)) return `${key}=${JSON.stringify(value)}`;
      if (typeof value === 'object') return `${key}=${JSON.stringify(value)}`;
      return `${key}=${value}`;
    });

    return `from monarchmoney import MonarchMoney

mm = MonarchMoney()
await mm.login(email, password)

result = await mm.${methodName}(${paramStrings.join(', ')})
print(result)`;
  }, [methodName, buildVariables]);

  const generateCurlCommand = useCallback(() => {
    const vars = buildVariables();
    const body = {
      operationName: graphqlOperation,
      query: graphqlQuery,
      variables: vars,
    };

    return `curl -X POST https://api.monarch.money/graphql \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Token YOUR_TOKEN" \\
  -d '${JSON.stringify(body, null, 2)}'`;
  }, [graphqlOperation, graphqlQuery, buildVariables]);

  const executeTest = useCallback(async () => {
    if (!token) {
      setError('Please enter your authentication token to test the API.');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const vars = buildVariables();
      const body = {
        operationName: graphqlOperation,
        query: graphqlQuery,
        variables: vars,
      };

      const response = await fetch('https://api.monarch.money/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
          'Client-Platform': 'web',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.errors) {
        setError(JSON.stringify(data.errors, null, 2));
      } else {
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setError(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [token, graphqlOperation, graphqlQuery, buildVariables]);

  return (
    <div className="api-tester">
      <h4>Try It Out</h4>

      <div className="api-tester-form">
        <div className="api-tester-field">
          <label>Authentication Token (from Monarch Money session)</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your Monarch Money auth token"
          />
          <small style={{ color: 'var(--ifm-color-emphasis-600)', marginTop: '0.25rem' }}>
            You can get this from browser DevTools after logging into Monarch Money
          </small>
        </div>

        {parameters.map((param) => (
          <div key={param.name} className="api-tester-field">
            <label>
              {param.name}
              {param.required ? (
                <span className="parameter-required">*required</span>
              ) : (
                <span className="parameter-optional">(optional)</span>
              )}
            </label>
            {param.type === 'boolean' || param.type === 'bool' ? (
              <select
                value={values[param.name]}
                onChange={(e) => handleChange(param.name, e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : param.type === 'object' || param.type === 'dict' || param.type === 'list' || param.type === 'array' ? (
              <textarea
                value={values[param.name]}
                onChange={(e) => handleChange(param.name, e.target.value)}
                placeholder={`Enter ${param.type} as JSON`}
              />
            ) : (
              <input
                type={param.type === 'int' || param.type === 'integer' || param.type === 'float' || param.type === 'number' ? 'number' : 'text'}
                value={values[param.name]}
                onChange={(e) => handleChange(param.name, e.target.value)}
                placeholder={param.description || `Enter ${param.name}`}
              />
            )}
            {param.description && (
              <small style={{ color: 'var(--ifm-color-emphasis-600)' }}>
                {param.description}
              </small>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="api-tester-button"
            onClick={executeTest}
            disabled={loading || !graphqlQuery}
          >
            {loading ? 'Executing...' : 'Execute Request'}
          </button>
          <button
            className="api-tester-button"
            onClick={() => {
              setOutput(generatePythonCode());
              setError(null);
            }}
            style={{ background: 'var(--ifm-color-emphasis-600)' }}
          >
            Generate Python Code
          </button>
          <button
            className="api-tester-button"
            onClick={() => {
              setOutput(generateCurlCommand());
              setError(null);
            }}
            style={{ background: 'var(--ifm-color-emphasis-600)' }}
          >
            Generate cURL
          </button>
        </div>
      </div>

      {error && (
        <div className="api-tester-output api-tester-error">
          <pre>{error}</pre>
        </div>
      )}

      {output && !error && (
        <div className="api-tester-output api-tester-success">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
