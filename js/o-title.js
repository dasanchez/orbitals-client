class OrbitalsTitle extends HTMLElement {
    connectedCallback() {
        let orbitalsTitle = document.createElement("div");
        orbitalsTitle.innerText = "ORBITALS"
        this.appendChild(orbitalsTitle);

      }
}

customElements.define('o-title', OrbitalsTitle)