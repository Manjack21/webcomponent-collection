# webcomponent-collection
A collection of reusable web components as single module files.

* [Search Bar](#search-bar)
  * [Properties](#properties)
  * [Styling Options](#styling-options)
  * [Custom Search Predicate](#custom-search-predicate)

## Search Bar
A component that renders an input field for search text, and a button to trigger a filter search for DOM elements on the page. 

The following markup will generate a filter component for list items (`li`) of an unordered list (`ul#item-list`).

```html
<!-- search bar with search button -->
<search-bar item-selector="ul#item-list li" placeholder="Search text" button-text="Search!"></search-bar>

<!-- search bar that search on type; the posible modes are 'input' and 'click' -->
<search-bar item-selector="ul#item-list li" placeholder="Search text" mode="input"></search-bar>
```

### Properties
* **item-selector**: CSS selector for identifying the filterable list items
* **mode**: The mode determines the input behaviour of the element. If set to `click` a button will be rendered to trigger searches. If set to `input` the keyup event triggers the search.
* **placeholder**: Placeholder text for the text input field
* **button-text**: Text for the search button (only visible in 'click' mode); default = 'Search'


### Styling Options
```css
search-bar {
    --border-color: rgb(108, 112, 141);
    --button-color: rgb(208, 208, 208);
    --button-hover-color: rgb(163, 181, 253);
    --font-size: 1.1rem;
}
```

### Custom search predicate
The default search predicate searches in the textContent of the element node. 
If your use case requires another search method, you can set the itemPredicate 
property of the search-bar element.


```html
<script>
    window.addEventListener('load', ()=>{
        document.getElementById('searchBar').itemPredicate = (element, search) => {
            return element.dataset.searchtext?.match(search) !== null;
        };
    })
</script>

<search-bar id="searchBar" item-selector="ul#item-list li" button-text="Search!"></search-bar>
```