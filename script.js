//grid position
const stagesCarouselWrapper = document.getElementById(
  "steges_carousel_wrapper"
);
const stagesGrid = document.getElementById("stages_grid");
const stages = document.getElementById("stages");
const gridItems = [...stagesGrid.childNodes].filter(
  (node) => node.nodeName === "DIV"
);

//replaces
if (window.screen.width <= 479) {
  let stagesFlex = document.createElement("div");
  stagesFlex.id = "stages_flex";

  const gridItemOne = document.createElement("div");
  gridItemOne.id = "flex_item_1";
  gridItems.slice(0, 2).forEach((item) => gridItemOne.appendChild(item));
  const gridItemTwo = document.createElement("div");
  gridItemTwo.appendChild(gridItems[2]);
  const gridItemThree = document.createElement("div");
  gridItems.slice(3, 5).forEach((item) => gridItemThree.appendChild(item));
  gridItemThree.id = "flex_item_3";
  const gridItemFour = document.createElement("div");
  gridItemFour.appendChild(gridItems[5]);
  const gridItemFive = document.createElement("div");
  gridItemFive.appendChild(gridItems[6]);

  const newGridItems = [
    gridItemOne,
    gridItemTwo,
    gridItemThree,
    gridItemFour,
    gridItemFive,
  ];

  newGridItems.forEach((item) => {
    item.className = "flex_item";
    stagesFlex.appendChild(item);
  });

  stagesGrid.remove();
  stagesCarouselWrapper.appendChild(stagesFlex);

  //stages carousel
  const stageWidth = 836;
  const stageCount = 1;
  let stagePosition = 0;

  const stageCards = document.querySelectorAll(".flex_item");
  let stageBulls = [
    ...document.getElementById("stages_bulls").childNodes,
  ].filter((item) => item.nodeName === "P");

  const stageArrowPrew = document
    .querySelector("#stages_arrow")
    .querySelector(".prew");
  const stageArrowNext = document
    .querySelector("#stages_arrow")
    .querySelector(".next");

  stageArrowPrew.classList.add("disabled");

  stageArrowPrew.onclick = () => {
    stagePosition += stageWidth * stageCount;
    stagePosition = Math.min(stagePosition, 0);
    stagesFlex.style.marginLeft = stagePosition + "px";
    stageBulls.map((item) =>
      item.id === `stages_bull_${-(stagePosition / stageWidth)}`
        ? (item.className = "active_bull")
        : (item.className = "")
    );

    stageArrowNext.classList.remove("disabled");
    stagePosition === 0 && stageArrowPrew.classList.add("disabled");
  };

  stageArrowNext.onclick = () => {
    stagePosition -= stageWidth * stageCount;
    stagePosition = Math.max(
      stagePosition,
      -stageWidth * (stageCards.length - stageCount)
    );
    stagesFlex.style.marginLeft = stagePosition + "px";
    stageBulls.map((item) =>
      item.id === `stages_bull_${-(stagePosition / stageWidth)}`
        ? (item.className = "active_bull")
        : (item.className = "")
    );

    stageArrowPrew.classList.remove("disabled");
    stagePosition === -(stageWidth * (stageCards.length - stageCount)) &&
      stageArrowNext.classList.add("disabled");
  };
}

//members carousel
const memberWidth = window.screen.width <= 479 ? 894 : 414;
const memberCount = window.screen.width <= 479 ? 1 : 3;
let memberPosition = 0;

let memberCounter = document.getElementById("member_counter");
memberCounter.textContent = `${memberCount} / 6`;

const membersCarousel = document.getElementById("members_carousel");
const members = document.querySelectorAll(".member");

if (window.screen.width <= 479) {
  const membersArrows = document.getElementById("members_arrows");
  membersArrows.remove();
  document.getElementById("members").appendChild(membersArrows);
}

setInterval(() => {
  if (memberPosition === -(memberWidth * (members.length - memberCount))) {
    memberPosition = 0;
    membersCarousel.style.marginLeft = memberPosition + "px";
    memberCounter.textContent = `${memberCount} / 6`;
    return;
  }

  memberPosition -= memberWidth * memberCount;
  memberPosition = Math.max(
    memberPosition,
    -memberWidth * (members.length - memberCount)
  );
  membersCarousel.style.marginLeft = memberPosition + "px";

  memberCounter.textContent = `${
    -(memberPosition / memberWidth) + memberCount
  } / 6`;
}, 4000);

document.querySelector("#members_arrows").querySelector(".prew").onclick =
  () => {
    memberPosition += memberWidth * memberCount;
    memberPosition = Math.min(memberPosition, 0);
    membersCarousel.style.marginLeft = memberPosition + "px";
    memberCounter.textContent = `${
      -(memberPosition / memberWidth) + memberCount
    } / 6`;
  };
document.querySelector("#members_arrows").querySelector(".next").onclick =
  () => {
    if (memberPosition === -(memberWidth * (members.length - memberCount))) {
      memberPosition = 0;
      membersCarousel.style.marginLeft = memberPosition + "px";
      memberCounter.textContent = `${memberCount} / 6`;
      return;
    }
    memberPosition -= memberWidth * memberCount;
    memberPosition = Math.max(
      memberPosition,
      -memberWidth * (members.length - memberCount)
    );
    membersCarousel.style.marginLeft = memberPosition + "px";
    memberCounter.textContent = `${
      -(memberPosition / memberWidth) + memberCount
    } / 6`;
  };
