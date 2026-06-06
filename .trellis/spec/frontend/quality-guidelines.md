# Quality Guidelines

> Code quality standards for frontend development.

---

## Overview

<!--
Document your project's quality standards here.

Questions to answer:
- What patterns are forbidden?
- What linting rules do you enforce?
- What are your testing requirements?
- What code review standards apply?
-->

(To be filled by the team)

---

## Forbidden Patterns

<!-- Patterns that should never be used and why -->

### CSS `:active` for Mini Program Tap States

Do not use CSS `:active` to implement tap feedback in Taro mini program pages.
WeChat mini program audits flag this pattern because it can trigger too easily
and can remain visible during scroll or swipe interactions.

Use the component `hoverClass` prop and a matching class selector instead.

```tsx
// Good
<View className="add-btn" hoverClass="add-btn-hover" onClick={this.addWordToList}>
  <Text className="add-btn-text">Add</Text>
</View>
```

```scss
.add-btn {
  &.add-btn-hover {
    background-color: #f2f2f7;
    transform: scale(0.98);
  }
}
```

```scss
// Bad
.add-btn {
  &:active {
    background-color: #f2f2f7;
  }
}
```

---

## Required Patterns

<!-- Patterns that must always be used -->

### Taro Mini Program Touch Animations

For letter/page transitions, keep only one copy of heavy content such as `ScrollView` word grids mounted. Do not duplicate outgoing and incoming panes just to make movement visible.

When the product requirement calls for drag-follow feedback in the WeChat mini program, prefer an inline `style` transform on the visible moving nodes. `animation` objects can be unreliable when applied to a wrapper that contains a `ScrollView`, and a transform on a `ScrollView` wrapper may not move the grid content in the native layer. Apply the same transform to the lightweight header area and the actual `words-grid` inside the `ScrollView`.

Good:

```tsx
const cardStyle =
  `transform: translate3d(${adjustedDeltaX}px, 0, 0); ` +
  "transition: transform 0ms ease-out, opacity 0ms ease-out;"

this.setState({ cardStyle })
```

```tsx
<View className="card-content" onTouchMove={this.handleTouchMove}>
  <View className="letter-section" style={cardStyle}>
    <Text className="letter-text">{pageData.letter}</Text>
  </View>
  <ScrollView className="words-section" scrollY onTouchMove={this.handleTouchMove}>
    <View className="words-grid" style={cardStyle}>{/* single mounted grid */}</View>
  </ScrollView>
</View>
```

Do not duplicate a `ScrollView` subtree just to make page movement visible. In WeChat mini programs, temporarily rendering outgoing and incoming heavy panes can increase bridge sync pressure and may surface developer-tool sync errors.

### Mini Program Interactive Hit Areas

When a visible target is intentionally tiny, such as an indicator dot, do not
bind `onClick` directly to that tiny visual node. Bind the event to a real
wrapper element with an adequate response area, then render the tiny visual
element inside it.

```tsx
// Good
<View className="indicator-hit-area" hoverClass="indicator-hit-area-hover" onClick={this.goToPage}>
  <View className="indicator-dot" />
</View>
```

```scss
.indicator-hit-area {
  width: 48rpx;
  height: 48rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.indicator-dot {
  width: 6rpx;
  height: 6rpx;
}
```

Pseudo-elements such as `::after` are not a reliable substitute for the real
component's response area in mini program audits.

---

## Common Mistakes

### JS-Driven Swipe Feedback for Discrete Page Changes

**Symptom**: Swipe feedback feels uneven, is not visible in the simulator, or the WeChat developer tool reports sync errors while switching pages.

**Cause**: Updating broad React state on every touch move, relying on `animation` objects on a `ScrollView` wrapper, leaving timers active across transitions, or duplicating heavy child trees such as `ScrollView` sends avoidable work through the mini program JS/render bridge.

**Fix**: Keep gesture data outside React state, animate the visible letter section and `words-grid` with the same inline `transform` style, bind touch handlers where the user actually drags, use boundary damping for unavailable pages, ignore `touchEnd` swipe fallback after a vertical drag lock, and clear timers before starting or cancelling transitions.

---

## Testing Requirements

<!-- What level of testing is expected -->

(To be filled by the team)

---

## Code Review Checklist

<!-- What reviewers should check -->

(To be filled by the team)
