---
sidebar_position: 1
---

# Installation

## Requirements

- Python 3.8 or higher
- `pip` package manager

## Installing from PyPI

The recommended way to install Eclosion is via pip:

```bash
pip install monarchmoney
```

This will install the `monarchmoney` package along with all required dependencies.

## Installing from Source

For development or to get the latest features:

```bash
# Clone the repository
git clone https://github.com/312-dev/eclosion.git
cd eclosion

# Install in development mode
pip install -e .
```

## Dependencies

Eclosion requires the following packages (automatically installed):

| Package | Purpose |
|---------|---------|
| `aiohttp` | Async HTTP client for API requests |
| `gql[aiohttp]` | GraphQL client library |
| `oathtool` | TOTP/HOTP token generation for MFA |

## Verifying Installation

After installation, verify everything works:

```python
import asyncio
from monarchmoney import MonarchMoney

print("Eclosion installed successfully!")

# Check version
import monarchmoney
print(f"Version: {monarchmoney.__version__}")
```

## Upgrading

To upgrade to the latest version:

```bash
pip install --upgrade monarchmoney
```

## Troubleshooting

### SSL Certificate Errors

If you encounter SSL certificate errors, you may need to update your certificates:

```bash
pip install --upgrade certifi
```

### Import Errors

If you get import errors for `gql` or `aiohttp`, ensure all dependencies are installed:

```bash
pip install aiohttp gql[aiohttp] oathtool
```

### Permission Errors

If you encounter permission errors during installation, use `--user` flag:

```bash
pip install --user monarchmoney
```

Or use a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install monarchmoney
```
