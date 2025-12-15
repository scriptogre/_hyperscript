---
title: go - ///_hyperscript
---

## The `go` Command

### Syntax

```ebnf
 go [to] url <stringLike> [in new window]
 go [to] [top|middle|bottom|nearest] [left|center|right] [of] <expression> [(+|-) <number> [px] ][smoothly|instantly]
 go back
```

### Description

Use the `go` command to navigate or scroll.

#### Navigate to a URL

Navigate to a URL:

```hyperscript
go to url https://example.com
```

Open a URL in a new window:

```hyperscript
go to url https://example.com in new window
```

Navigate to an anchor on the current page:

```hyperscript
go to url #section-id
```

#### Scroll an element into view

Scroll an element to the top of the viewport:

```hyperscript
go to top of #my-element
```

The element's top edge aligns with the viewport's top edge.

Scroll an element to the bottom of the viewport:

```hyperscript
go to bottom of #my-element
```

The element's bottom edge aligns with the viewport's bottom edge.

Scroll an element to the middle of the viewport:

```hyperscript
go to middle of #my-element
```

The element centers vertically in the viewport.

Scroll an element using minimal movement:

```hyperscript
go to nearest of #my-element
```

The browser scrolls only if the element is not already visible. If the element is partially visible, the browser does not scroll at all.

#### Add horizontal positioning

Combine vertical and horizontal positions:

```hyperscript
go to top left of #my-element
go to middle center of #my-element
go to bottom right of #my-element
```

#### Add pixel offset

Add space between the element and viewport edge:

```hyperscript
go to top of #my-element -20px
```

This scrolls to 20 pixels above the element's top edge.

Use a positive offset to scroll below the target:

```hyperscript
go to bottom of #my-element +30px
```

#### Control animation

Scroll with smooth animation:

```hyperscript
go to top of #my-element smoothly
```

Scroll instantly without animation:

```hyperscript
go to top of #my-element instantly
```

Combine offset and animation:

```hyperscript
go to top of #my-element -20px smoothly
```

#### Navigate browser history

Go back one page in browser history:

```hyperscript
go back
```

### Examples

```html
<button _="on click go to url https://duck.com">
  Search the Web
</button>

<button _="on click go to top of the body smoothly">
  Scroll to Top
</button>

<button _="on click go to top of #content -20px">
  View Content (with 20px padding)
</button>

<button _="on click go to nearest of #next-item">
  Show Next Item (minimal scroll)
</button>

<button _="on click go to middle center of #dialog smoothly">
  Center Dialog in View
</button>

<button _="on click go back">
  Go Back
</button>
```
