"""Startup hook.

The Python macro runtime is not assumed to persist between separate macro
invocations. This hook is intentionally lightweight; it does not perform
source loading or create a custom module loader.
"""

# Reserved for per-document initialization if the plugin later needs it.
