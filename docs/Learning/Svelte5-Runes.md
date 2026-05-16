---
tags: [learning, svelte, runes, reactive, state]
---

# [[Svelte 5 Runes]]

## Overview
Svelte 5 introduces "runes" — special symbols that provide reactive state, effects, and event handling with a cleaner API than earlier Svelte versions.

## Key Runes

### $state() — Reactive State
```svelte
<script lang="ts">
  let count = $state(0);
  
  function increment() {
    count++;  // Automatically reactive
  }
</script>

<p>Count: {count}</p>
<button onclick={increment}>+1</button>
```

**Key Points**:
- Declares reactive state
- Changes automatically update the DOM
- Works with primitive types and objects
- Objects are deep reactive by default

### $props() — Component Props
```svelte
<script lang="ts">
  // Old way (Svelte 4):
  // export let title = "Hello";
  
  // New way (Svelte 5):
  let { title = "Hello", count = 0 } = $props();
</script>

<h1>{title}</h1>
```

**Key Points**:
- Destructure props in one line
- Supports default values
- No `export let` keyword needed
- More TypeScript-friendly

### $effect() — Side Effects
```svelte
<script lang="ts">
  let count = $state(0);
  
  $effect(() => {
    console.log("Count changed:", count);
    // Runs whenever `count` changes
  });
</script>
```

**Key Points**:
- Replaces lifecycle hooks (onMount, beforeUpdate, etc.)
- Runs after component renders
- Automatically tracks dependencies
- Use for side effects, subscriptions, etc.

### $effect.pre() — Before DOM Update
```svelte
<script lang="ts">
  let value = $state("");
  
  $effect.pre(() => {
    console.log("Before DOM update:", value);
  });
</script>
```

**Key Points**:
- Runs before DOM updates
- Useful for validation, calculations
- Rare; most cases use regular $effect()

## Common Patterns

### Derived State
```svelte
<script lang="ts">
  let count = $state(0);
  
  // Don't use $state for derived values — use regular variables
  let doubled = count * 2;  // Automatically reactive
</script>

<p>Count: {count}, Doubled: {doubled}</p>
```

### Cleanup on Unmount
```svelte
<script lang="ts">
  $effect(() => {
    const timer = setInterval(() => {
      console.log("tick");
    }, 1000);
    
    return () => {
      clearInterval(timer);  // Cleanup function
    };
  });
</script>
```

### Form Binding
```svelte
<script lang="ts">
  let name = $state("");
  
  $effect(() => {
    console.log("Name updated:", name);
  });
</script>

<input bind:value={name} />
<p>Hello, {name}</p>
```

## Migration from Svelte 4 to 5

| Svelte 4 | Svelte 5 |
|----------|----------|
| `export let prop` | `let { prop } = $props()` |
| `onMount()` | `$effect()` |
| `beforeUpdate()` | `$effect.pre()` |
| `$:` reactive statements | Regular variables (still work) |
| `{#if}` blocks | `{#if}` still works |

## Resources

- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/what-is-svelte)
- [Runes Explanation](https://svelte.dev/docs/svelte/what-is-svelte#runes)

## Related

- [[DECISIONS]] — Why we chose Svelte 5 runes
- [[Hero Section]] — Using runes in components
