class All extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    this.attachShadow({ mode: 'open' });
    // Call the render method
    this.render();
  }

  // Method to render the component
  render() {
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
        .clickedOn {
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

      .clickedOn2{
        background:blue;
      }

      </style>
      <div id="all" class="tag clickedOn">all</div>
    `;
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = headerHTML;
    }
  }
   

}

customElements.define('all-component', All);
