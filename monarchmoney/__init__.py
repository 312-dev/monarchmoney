"""
monarchmoney

A Python API for interacting with MonarchMoney.

Originally created by hammem (https://github.com/hammem)
Now maintained by 312.dev (https://github.com/312-dev)
"""

from .monarchmoney import (
    LoginFailedException,
    MonarchMoneyEndpoints,
    MonarchMoney,
    RequireMFAException,
    RequestFailedException,
)

__version__ = "0.1.19"
__author__ = "hammem"
__maintainer__ = "312.dev"
