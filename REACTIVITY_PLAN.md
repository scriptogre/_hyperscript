# _hyperscript Reactivity Enhancement Plan

## Current Status
- ✅ `when @attribute changes` - MutationObserver-based attribute monitoring
- ✅ `when $variable changes` - Existing variable reactivity  
- ✅ `when my.property changes` - Property descriptor-based monitoring (programmatic changes only)
- ❌ `when $x or $y changes` - Multiple variable watching (deferred for future implementation)

## Enhancements to Implement

### 1. Implicit Initial Sync for `when` Feature
**Current:** Requires manual `init` setup
```html
<div _="init set @title to $foo when $foo changes set @title to $foo"></div>
```

**New:** Automatic initial sync
```html
<div _="when $foo changes set @title to it"></div>
```

**Behavior:** When `when X changes ...` is parsed, automatically set the target to X's current value initially.

### 2. Future: Multiple Variable Watching
**Deferred:** Support for watching multiple variables with logical operators
```html
<div _="when $x or $y changes set my.textContent to (($x or 0) + ($y or 0))"></div>
```

**Implementation Notes:** This requires more complex parsing and reactive effect coordination. Will be implemented in a future version.

### 2. New `bind` Command for Two-Way Binding
**Syntax:** `bind X and Y`

**Examples:**
```html
<!-- Variable ↔ Input value -->
<input _="bind $username and @value">

<!-- Variable ↔ Checkbox state -->
<input type="checkbox" _="bind $isEnabled and @checked">

<!-- Variable ↔ Attribute -->
<div _="bind $theme and @data-theme">
```

**Behavior:**
1. Sync both values initially (prefer non-empty value)
2. Set up: `when $username changes set my.value to it`
3. Set up: `when my.value changes set $username to it`

## Implementation Tasks
1. Modify `when` feature parser to detect and set initial values
2. Add `bind` command parser
3. Create two-way binding setup logic
4. Update tests with new syntax examples

## Syntax Comparison
| Pattern | _hyperscript | Datastar |
|---------|-------------|----------|
| One-way reactive | `when $foo changes set @title to it` | `data-attr-title="$foo"` |
| Two-way binding | `bind $foo and my.value` | `data-bind-foo` |
| Clarity | Explicit, readable | Implicit, requires memorization |