const rainbowApp = {};

rainbowApp.list = document.getElementById("list");
rainbowApp.isRight = "Not In Order!";

rainbowApp.arrayIsCorrect = () =>
  rainbowApp.randomized.map(item => item.color).join("") ===
  rainbowApp.base.map(item => item.color).join("");

rainbowApp.genRandom = () => {
  const orderedRainbow = [
    { color: "red", fontColor: "black" },
    { color: "orange", fontColor: "green" },
    { color: "yellow", fontColor: "black" },
    { color: "green", fontColor: "white" },
    { color: "blue", fontColor: "white" },
    { color: "indigo", fontColor: "violet" },
    { color: "violet", fontColor: "indigo" }
  ];
  rainbowApp.base = orderedRainbow.slice();
  rainbowApp.randomized = orderedRainbow.sort(() => Math.random() - 0.5);

  // recursion to account if the randomization returns the original array
  if (rainbowApp.arrayIsCorrect()) {
    rainbowApp.genRandom();
  }
};

rainbowApp.renderItems = () => {
  document.getElementById("isRight").innerText = rainbowApp.isRight;
  rainbowApp.list.innerText = "";
  rainbowApp.randomized.forEach(item => {
    const node = document.createElement("li");
    node.classList.add("neon");
    node.draggable = true;
    node.style.backgroundColor = item.color;
    node.style.color = item.fontColor;
    node.innerText = item.color;
    node.addEventListener("drag", rainbowApp.setDragging);
    node.addEventListener("dragover", rainbowApp.setDraggedOver);
    node.addEventListener("drop", rainbowApp.compare);
    rainbowApp.list.appendChild(node);
  });
};

rainbowApp.compare = () => {
  const draggedItem = rainbowApp.randomized.find(
    item => item.color === rainbowApp.dragging
  );
  const draggedOverItem = rainbowApp.randomized.find(
    item => item.color === rainbowApp.draggedOver
  );

  const index1 = rainbowApp.randomized.indexOf(draggedItem);
  const index2 = rainbowApp.randomized.indexOf(draggedOverItem);

  rainbowApp.randomized.splice(index1, 1);
  rainbowApp.randomized.splice(index2, 0, draggedItem);

  rainbowApp.isRight = rainbowApp.arrayIsCorrect()
    ? "You Did It!"
    : "Not In Order!";

  rainbowApp.renderItems();
};

rainbowApp.setDraggedOver = e => {
  e.preventDefault();
  rainbowApp.draggedOver = Number.isNaN(parseInt(e.target.innerText, 10))
    ? e.target.innerText
    : parseInt(e.target.innerText, 10);
};

rainbowApp.setDragging = e => {
  rainbowApp.dragging = Number.isNaN(parseInt(e.target.innerText, 10))
    ? e.target.innerText
    : parseInt(e.target.innerText, 10);
};

rainbowApp.init = () => {
  rainbowApp.genRandom();
  rainbowApp.renderItems();
};

rainbowApp.init();
