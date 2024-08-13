class tagcomp extends HTMLElement {

    private _tag: string | null = null;
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    static get observedAttributes(): string[] {
      return ['tag'];
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
      //console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
      if (oldValue !== newValue) {
        switch(name) {
          case 'tag':
              this._tag = newValue;
            break;
        }
        this.render();
      }
    }
  
    connectedCallback(): void {
      //console.log('Header component connected');
      this._tag = this.getAttribute('tag');
      //console.warn(this._tag);
      console.log(this);
      this.render();
    }
  
    render(): void {
      const headerHTML = `
        <style>
        .tag{
          height:min-content;
          width:max-content;
          padding: 0.5em 1em;
          text-align: center;
          border-radius:20px;
          border:1px solid  rgb(233, 233, 233);
          user-select: none;
      }
        
        </style>

            <div id = ${this._tag} class = "tag">
              ${this._tag}
            </div>
    
      `;
      
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = headerHTML;
      }
    }
  }
  customElements.define('tagcomp-component', tagcomp);
