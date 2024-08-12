class ToolCard extends HTMLElement {
    private _icon: string | null = null;
    private _name: string | null = null;
    private _description: string | null = null;
    private _category: string | null = null;
    private _tag: string | null = null;
    private _link: string | null = null;
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    static get observedAttributes(): string[] {
      return ['icon', 'name', 'description', 'category', 'tag', 'link'];
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
      console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
      if (oldValue !== newValue) {
        switch(name) {
          case 'icon':
            this._icon = newValue;
            break;
          case 'name':
            this._name = newValue;
            break;
          case 'description':
            this._description = newValue;
            break;
          case 'category':
             this._category = newValue;
            break;
          case 'tag':
              this._tag = newValue;
            break;
           case 'link':
              this._link = newValue;
            break;
        }
        this.render();
      }
    }
  
    connectedCallback(): void {
      console.log('Header component connected');
      this._icon = this.getAttribute('icon');
      this._name = this.getAttribute('name');
      this._description = this.getAttribute('description');
      this._category = this.getAttribute('category');
      this._tag = this.getAttribute('tag');
      this._link = this.getAttribute('link');
      this.render();
    }
  
    render(): void {
      const headerHTML = `
        <style>
        .toolCard{
            border:5px solid red;
            width:100%;
            height:min-content;
            border-radius:20px;
            display:flex;
            justify-content: center;
            align-items:center;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
            gap:1em;
            text-decoration: none;
            color:black;
        }
        img{
          width:20px;
          height:20px;
        }
        </style>

   
      <a href="${this._link}" class="toolCard ${this._tag}">
        <div class="toolIcon">
          <img src="${this._icon}" alt="${this._name} icon"/>
        </div>
        <p class="toolName">${this._name}</p>
        <p class="toolDescription">${this._description}</p>
		</a>
      `;
      
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = headerHTML;
      }
    }
  }
  
  customElements.define('toolcard-component', ToolCard);