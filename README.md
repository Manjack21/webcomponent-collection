# webcomponent-collection
A collection of reusable web components as single module files.

## Search Bar
A component that renders an input field for search text, and a button to trigger a filter search for DOM elements on the page. 

The following markup will generate a filter component for list items of an unordered list with the id `item-list`.

```
<search-bar item-selector="ul#item-list li" placeholder="Search text" button-text="Search!"></search-bar>
```