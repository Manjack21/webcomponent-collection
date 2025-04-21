/**
 * This class contains render and filter logic for an on-site search bar
 * that filters DOM elements by their properties
 */
class SearchBar extends HTMLElement 
{
    constructor() {
        super();
        this.timeout = null;
    }
    /**
     * this method is called when the element is added to the document
     * that means usually it's called once.
     * Use this for initialisation logic
     * @returns { void }
     */
    connectedCallback() 
    {
        this.shadow = this.attachShadow({mode: 'closed'});

        const style = document.createElement("style");
        style.textContent = `
:host {    
    margin: 4px;
    --border-color: grey;
    --button-color: grey;
    --button-hover-color: grey;
    --font-size: 1.1rem;
}

div {
    display:grid;
    grid-template-columns: auto 6rem;
    column-gap: 4px;
}

input {
    font-size: var(--font-size);
    padding: 8px;
    border:1px solid;
    border-color:var(--border-color);
    border-radius: 0.3rem;
}

button {
    font-size: var(--font-size);
    padding: 8px;
    border:1px solid;
    border-color:var(--border-color);
    border-radius: 0.3rem;
    background-color: var(--button-color);
}
button:hover {
    background-color: var(--button-hover-color);
}
        `;
        this.shadow.appendChild(style);
        const mode = this.getAttribute('mode') ?? "click";

        const container = document.createElement("div");

        const textInput = document.createElement("input");
        textInput.placeholder = this.getAttribute('placeholder') ?? "";
        if(mode === 'input')
        {
            textInput.addEventListener(
                'keyup', 
                () => {
                    window.clearTimeout(this.timeout);
                    this.timeout = window.setTimeout(
                        () => this.filterItems(textInput.value),
                        300
                    );
                }
            );
        }
        container.appendChild(textInput);        

        if(mode === 'click')
        {
            const searchButton = document.createElement("button");
            searchButton.textContent = this.getAttribute('button-text') ?? "Search";
            searchButton.addEventListener('click', () => this.filterItems(textInput.value));
            container.appendChild(searchButton);
        }
        
        this.shadow.appendChild(container);
    }

    filterItems(searchTerm)
    {
        const search = new RegExp(searchTerm, "i");
        Array.from(document.querySelectorAll(this.getAttribute('item-selector')))
            .forEach(item => {                
                if(item.style.display !== 'none' && !this.itemPredicate(item, search))
                {   
                    item.style.display = 'none';
                }                 
                else if(item.style.display === 'none' && this.itemPredicate(item, search))
                {
                    item.style.display = '';
                }
            });
    }

    /**
     * Predicate for each item element. Returns true if the element should be visible, otherwise false.
     * @param {HTMLElement} elementNode 
     * @param {RegExp} search
     * @returns {Boolean}
     */
    itemPredicate = function (elementNode, search)
    {
        return elementNode.textContent.match(search) !== null;
    }
    
    /**
     * this read-only property provides information to the browser 
     * which component properties should trigger the attributesChangedCallback method
     * @returns { String[] }
     */
    static get observedAttributes() 
    {
        return [];
    }

    // 
    /**
     * handler for changing attributes, called by the browser
     * @param { String } property name of the updated component property
     * @param { String } oldValue previous value 
     * @param { String } newValue new value that needs to be set in this method
     */
    attributeChangedCallback(property, oldValue, newValue)
    {
    }
}
customElements.define('search-bar', SearchBar);