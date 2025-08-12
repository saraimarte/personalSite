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
    this._date = this.getAttribute('date');
    this._title = this.getAttribute('title');
    this._slug = this.getAttribute('slug');
    this.render();
  }

  private playClickSound(): void {
    // Create a fresh audio element each time (same as back button)
    const clickSound = new Audio('https://audio.jukehost.co.uk/lEvEFHUvNTZxQ6PTEagKi9B60t48m25K');
    clickSound.volume = 0.5; // Adjust volume as needed
    
    clickSound.play().catch(error => {
      console.log('Card audio play failed:', error);
    });
  }

  private handleCardClick = (e: Event): void => {
    e.preventDefault(); // Prevent immediate navigation
    
    const cardLink = this.shadowRoot?.querySelector('.card') as HTMLAnchorElement;
    if (cardLink) {
      // Play sound
      this.playClickSound();
      
      // Navigate after a short delay to let sound play
      setTimeout(() => {
        window.location.href = cardLink.href;
      }, 150); // Same delay as back button
    }
  };
  
  render(): void {
    const headerHTML = `
      <style>
        .card{
          display:flex;
          min-height:3em;
          justify-content:start;
          align-items:center;
          color:#778D9C;
          padding-left:20px;
          gap:1em;
          border: 1px solid blue;
          font-size:0.8em;
          text-decoration:none;
          font-family: "IBM Plex Mono", monospace;
          cursor: pointer;
        }
       
        .card:hover{
            background-color:blue;
            color:white;
        }
       
        @media (max-width: 768px) {
            .card{
                flex-wrap:wrap;
                gap:1em;
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
      
      // Add click event listener after rendering
      const cardElement = this.shadowRoot.querySelector('.card');
      if (cardElement) {
        cardElement.addEventListener('click', this.handleCardClick);
      }
    }
  }
}

customElements.define('card-component', Card);