const DATA_FOR_WEBRING = `https://raw.githubusercontent.com/ochamena/pssring/main/member.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>
@font-face {
    font-family: "pokexy";
    src: url("https://ochame.neocities.org/ring/pokexy.ttf");
  }
.webring {
  border: 4px outset #AE6E00;
  border-radius: 10px;
  padding: 0px; 

  display: flex;

  grid-gap: 1px;

  text-align: center;

  font: 13px "pokexy", MS UI Gothic, sans-serif;
  background-color: #FFDC5C;

}
.title{
    background-color: #141F55;
    color: #FFFFFF;
    margin: 0;
    font-size: 18px;
    height: 21px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.title2{
    background-color: #141F55;
    color: #FFFFFF;
    margin: 0;
    font-size: 18px;
    height: 21px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
p{
    font-weight: bold;
    color:#141F55;
    margin: 2px;
}
a{
    color: #6873ff;
    font-size: 13px;
    text-decoration: none;
}
</style>

<div class="webring">
  <div id="copy">
    
  </div>
</div>`;

class WebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://css-tricks.com
    const thisSite = this.getAttribute("site");

    fetch(DATA_FOR_WEBRING)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length) nextSiteIndex = 0;

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `
          <h3 class="title">PSS Ring</h3><br>
          <img src="${matchedSite.icon}">
          <p>
          ${matchedSite.owner}'s <br><a href="${matchedSite.url}">${matchedSite.name}</a> <br>
          is part of the <a href="https://ochame.neocities.org/ring/index.html">PSS Ring</a>!
          </p>
          
          <p class="title2">
            <a href="${sites[prevSiteIndex].url}">❮</a>
            <a href="${sites[randomSiteIndex].url}">[Random]</a>
            <a href="${sites[nextSiteIndex].url}">❯</a>
            
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", WebRing);