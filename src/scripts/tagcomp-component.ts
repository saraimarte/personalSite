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
    this._tag = this.getAttribute('tag');
    this.render();
  }

  render(): void {
    const headerHTML = `
      <style>
      .tag {
        height: min-content;
        width: max-content;
        padding: 0.5em 1em;
        text-align: center;
        border-radius: 20px;
        border: 1px solid rgb(233, 233, 233);
        user-select: none;
      }
      .clickedOn{
         background-image: linear-gradient(35deg,
          hsl(320deg 60% 92%) 0%,
          hsl(330deg 100% 93%) 24%,
          hsl(339deg 100% 92%) 36%,
          hsl(354deg 100% 92%) 43%,
          hsl(13deg 100% 89%) 48%,
          hsl(26deg 100% 85%) 52%,
          hsl(36deg 100% 81%) 56%,
          hsl(44deg 100% 77%) 61%,
          hsl(50deg 100% 74%) 67%,
          hsl(55deg 100% 72%) 90%);
        }
      </style>
      
      <div id="${this._tag}" class="tag">
        ${this._tag}
      </div>
    `;
    
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = headerHTML;
    }
  }

  // New method to get the tag element
  getTagElement(): Element | null {
    return this.shadowRoot ? this.shadowRoot.querySelector('.tag') : null;
  }
}

customElements.define('tagcomp-component', tagcomp);