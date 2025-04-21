# webcomponent-collection
A collection of reusable web components as single module files.

toc

## Search Bar
A component that renders an input field for search text, and a button to trigger a filter search for DOM elements on the page. 

The following markup will generate a filter component for list items (`li`) of an unordered list with the id `ul#item-list`.

```html
<!-- search bar with search button -->
<search-bar item-selector="ul#item-list li" placeholder="Search text" button-text="Search!"></search-bar>

<!-- search bar that search on type; the posible modes are 'input' and 'click' -->
<search-bar item-selector="ul#item-list li" placeholder="Search text" mode="input"></search-bar>
```

### Styling Options
```css
search-bar {
    --border-color: rgb(108, 112, 141);
    --button-color: rgb(208, 208, 208);
    --button-hover-color: rgb(163, 181, 253);
    --font-size: 1.1rem;
}
```