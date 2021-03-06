var hexToRgbA = require('./hexToRgbA.js');

var textToolParams = window.textToolParams = {
  fillColor: "",
  bold: false,
  italic: false,
  emphasis: "",
  fontFamily: "Courier New",
  fontSize: 30
};

var textTool = document.getElementById("textTool");

var textPreviewWrapper = document.getElementById("textPreviewWrapper");

textTool.querySelector(".toolHeader").onclick = function() {
  var newTextItem = window.newTextItem;
  if (!textTool.classList.contains("open")) {
    window.textTool.activate();
    delete window.timestamp;
    window.timeAnimation();
    if (newTextItem) {
      newTextItem.visible = true;
      textPreviewWrapper.style.display = "block";
    }
  } else {
    nopTool.activate();
    if (newTextItem) {
      newTextItem.visible = false;
    }
    textPreviewWrapper.style.display = "none";
  }
};

var textFillColor = document.getElementById("textFillColor");
var textFillAlpha = document.getElementById("textFillAlpha");
textFillAlpha.onchange = textFillColor.onchange = function colorPickedHandlerFill() {
  var color = hexToRgbA(textFillColor.value, textFillAlpha.value);
  textToolParams.fillColor = new paper.Color(color);

  var newTextItem = window.newTextItem;
  if (newTextItem) {
    newTextItem.fillColor = new paper.Color(color);
  }
};
textFillAlpha.oninput = function updateOpacity() {
  textFillColor.style.opacity = textFillAlpha.value;
};

var currentFontSizeDisplay = document.getElementById("currentFontSizeDisplay");
var textSizeSlider = document.getElementById("textSizeSlider");
textSizeSlider.onchange = textSizeSlider.oninput = function() {
  var value = textSizeSlider.value;
  textToolParams.textSize = value;
  currentFontSizeDisplay.textContent = value + "px";

  var newTextItem = window.newTextItem;
  if (newTextItem) {
    newTextItem.fontSize = value;
    newTextItem.leading = value * 1.3;
  }
};

document.getElementById("textFontSelection").onchange = function(event) {
  textToolParams.fontFamily = event.target.value;
  var newTextItem = window.newTextItem;
  newTextItem ? newTextItem.fontFamily = event.target.value : null;
};

var emphasisBold = document.getElementById("emphasisBold");
var emphasisItalic = document.getElementById("emphasisItalic");
var boldButton = emphasisBold.nextElementSibling.classList;
var italicButton = emphasisItalic.nextElementSibling.classList;
function onEmphasisButtonChange() {
  var bold = emphasisBold.checked;
  var italic = emphasisItalic.checked;
  var props = [];

  if (bold) {
    props.push("bold");
    boldButton.add("ui-state-active");
  } else {
    boldButton.remove("ui-state-active");
  }

  if (italic) {
    props.push("italic");
    italicButton.add("ui-state-active");
  } else {
    italicButton.remove("ui-state-active");
  }

  var emphasis = props.join(" ");
  textToolParams.emphasis = emphasis;
  var newTextItem = window.newTextItem;
  if (newTextItem) {
    newTextItem.fontWeight = emphasis;
  }
}

[].slice
  .call(document.querySelectorAll("#emphasisButtons input"))
  .forEach(function(emphasisButton) {
    emphasisButton.oninput = emphasisButton.onclick = onEmphasisButtonChange;
  });

var textPreview = document.getElementById("textPreview");
textPreview.onkeyup = function() {
  var error = textPreviewWrapper.querySelector("p.error");
  var newTextItem = window.newTextItem;
  var newVal = textPreview.value;
  if (newVal.length > 512) {
    error.style.display = "block";
    textPreview.value = newTextItem.content;
    return;
  } else if (newVal.length === 512) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }
  newTextItem.content = newVal;
};

document.getElementById("newTextOKButton").onclick = function() {
  var newTextItem = window.newTextItem;
  if (newTextItem.content.length > 512) {
    return;
  }
  if (!newTextItem.iwb) {
    window.send(newTextItem);
  } else {
    window.updateObject(newTextItem);
  }
  newTextItem.content = "";
  newTextItem.selected = false;
  newTextItem.remove();
  delete window.newTextItem;
  textPreview.value = "";
  textPreviewWrapper.style.display = "none";
  document.body.style.cursor = "default";
};

document.getElementById("newTextCancelButton").onclick = function() {
  var newTextItem = window.newTextItem;
  newTextItem.content = "";
  newTextItem.selected = false;
  newTextItem.remove();
  delete window.newTextItem;
  textPreview.value = "";
  textPreviewWrapper.style.display = "none";
  document.body.style.cursor = "default";
};
