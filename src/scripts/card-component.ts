class Card extends HTMLElement {
  private _date: string | null = null;
  private _title: string | null = null;
  private _slug: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes(): string[] {
    return ['date', 'title', 'slug'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    if (oldValue !== newValue) {
      switch(name) {
        case 'date':
          this._date = newValue;
          break;
        case 'title':
          this._title = newValue;
          break;
        case 'slug':
          this._slug = newValue;
          break;
      }
      this.render();
    }
  }

  connectedCallback(): void {
    console.log('Header component connected');
    this._date = this.getAttribute('date');
    this._title = this.getAttribute('title');
    this._slug = this.getAttribute('slug');
    console.log('Initial attributes:', { date: this._date, title: this._title, slug: this._slug });
    this.render();
  }

  render(): void {
    console.log('Rendering with:', { date: this._date, title: this._title, slug: this._slug });
    const headerHTML = `
      <style>
        .card{
          display:flex;
          min-height:3em;
          justify-content:start;
          align-items:center;
          color:#778D9C;
          padding-left:10px;
          gap:1em;
          border: 1px solid blue;
          font-size:0.8em;
          text-decoration:none;
          font-family: "IBM Plex Mono", monospace;
    }
    
    .card:hover{
        background-color:blue;
        color:white;
    }
   
    @media (max-width: 768px) {
        .card{
            flex-wrap:wrap;
            gap:0em;
            font-size:0.8em;
        }
    }
      </style>
      <a class="post card" href="/posts/${this._slug || '#'}">
        <p class="date">${this._date || 'No date'}</p>
        <p>${this._title || 'No title'}</p>
      </a>
    `;
    
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = headerHTML;
    }
  }
}

customElements.define('card-component', Card);