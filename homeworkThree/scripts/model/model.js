export function loadData(fName, callback) {
  console.log(`My First Name is ${fName}`);
  callback(fName);
}

export function changePage(pageName) {
  document.querySelector("#app").innerHTML = pages[pageName];
}

const home = `<div class="container pageOne">
        <div class="bgImg"></div>
        <div class="titleAndLogo">
          <h1 class="title">Why You should watch</h1>
          <img
            class="logo"
            src="images/Re_Zero_kara_Hajimeru_Isekai_Seikatsu_logo.png"
            alt="RE:ZERO title"
          />
        </div>
        </div>
      </div>`;
const reasonOne = `
   <div class="container pageTwo">
        <div class="bgImg pgTwoBg"></div>

        <h1 class="darkBG title">Reason 1: World Building</h1>
        <div class="darkBG description">
          <p>ReZero has a ton of creatures and characters from the fantasty genre. Our main character is a regular human, but there are plenty of foxes, echidnas, demons, goblins, and hybrids between them.</p>
        </div>
        </div>
`;
const reasonTwo = `
  <div class="container pageThree">
        <div class="bgImg ottoBG"></div>
        <h1 class="darkBG title">Reason 2: Fleshed Out Side Cast</h1>
        <p class="darkBG description">
          How many times have you watched a show where the side cast is pretty
          much tossed aside for the main character? It's super annoying right?
          So you might as well watch RE:ZERO, where all the side characters have
          personality, motivations, development, and backstory, especially my
          man Otto in the background.
        </p>
      </div>
`;
const reasonThree = `
  <div class="container pageFour">
        <h1 class="darkBG title">Reason 3: Ratings (If nothing else)</h1>
        <p class="darkBG description">
          Just look at those amazing ratings, surely it's as high as another
          show you really like. Same ratings always means you'll like the shows
          exactly the same.
        </p>
        <img
          class="hero"
          src="images/rezero_ratings_default.png"
          alt="A picture of the current ReZero ratings (very high)"
        />
      </div>
`;
const conclusion = `
  <div class="container pageFive">
        <h1 class="darkBG title">Conclusion</h1>
        <p class="darkBG description">
          Hopefully you enjoyed some of the reasons you should watch RE:ZERO. Enjoy the music!
        </p>
        <iframe
      src="https://audiomack.com/embed/karrar-7/song/paradisus-paradoxum-myth-roid-re-zero-op-2"
      scrolling="no"
      frameborder="0"
      title="Paradisus-Paradoxum - MYTH & ROID [Re: Zero OP 2]"
    ></iframe>
        <div class="bgImg conclusionBG"></div>
      </div>
`;
const pages = {
  home,
  reasonOne,
  reasonTwo,
  reasonThree,
  conclusion,
};
