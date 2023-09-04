// declaring fonts
let pixelReg;
let pixelBold;

// declaring audio files
let dialogueSfx;
let titleTheme;
let mainTheme;

// declaring background variables
var bgFrameCount;
var bgPause;
var bgFrames;

// declaring title screen variables
let titleBlock;
let playButton;

// declaring company name selection variables
var companyName;
let companyNameTitleBox;
let companyNameInputBox;

// declaring menu (main screen) variables
let compNameTile;
let fishingTile;
let newsTile;
let expensesTile;
let homeTile;
let shopTile;
let monthTile;
let moneyTile;
let fishTile;

// declaring pop up menu variables
var popUp;
var popUpDirection;
let popUpMenu;
let shopInnerTileHome;
let shopInnerTileCar;
let shopInnerTileStatue;
let fishInput;
let goFishButton;
let homeBg;

// declaring dialogue variables
var dialogueStart;
var chr = 0;
var dialogueCapped;
var dialogueFinished;
let dialogueBox;
let fishAlive;
let fishDead;
var dialogues;
var inDialogue;
var dialogue;
var stagedDialogues;

// declaring all use variables
var confirmButton;

// declaring input variables
var inputObj;
var requireInput;

// declaring screen/canvas variables
var screen;
const screenW = 700;
const screenH = 650;
const transitionScreens = ["transitionStart", "transitionTitle", "transitionMenu", "transitionNextMonth", "transitionMonthSummary", "transitionFromMonthSummary"];
const transitionSpeed = 7;
const transitionRate = 30; // 30
var transitionDelay;
const popUpTransitionSpeed = 2;
const popUpTransitionRate = 25; //25
var popUpTransitionDelay;

// All Screens: start, transitionStart, title, transitionTitle, blank, chooseCompName, transitionMenu, menu
// All Dialogues: intro, tutorial

// declaring game variables
var gameVarXChange;
var gameVarYChange;

var gameMonth;
var firstMonth;

var companyName;

var currentHouse;
var currentCar;
var currentStatue;

var lastMonthEvent;
var currentEvent;
const EVENTS =
{
  "too many fish caught1": "fish prices decrease by 25%",
  "too few fish caught!": "fish prices increase by 25%",
  "economic recession!": "operating costs increase by 25%",
  "pollution!": "fish population decreases by 5%",
  "many cleanups!": "fish population increase by 10%",
  "extreme heat warning!": "fish reprod. rate decreases by 10%",
  "good weather!": "fish reprod. rate increases by 10%",
  "oil spillage!": "fish population decreases 5%",
  "thunderstorm!": "operating costs increase by 15%",
  "gov. regulations lifted!": "companies will catch more fish",
  "none": "just a regular month",
};

var lastMonthBalance;
var currentBalance;

var lastMonthFishPop;
var currentFishPop;

var lastMonthFishCaught;
var currentFishCaught;

var lastMonthCompFishCaught;
var currentCompFishCaught;
var competitorFishRate = 1.2;

var lastMonthFishPrice;
var currentFishPrice;

const RENT = 5000;
var lastMonthRentRate;
var currentMonthRentRate;

var lastMonthReproduceRate;
var currentReproduceRate;

// defining other constants
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class Sprite {
  constructor(forPopUp, x, y, w, h, url, altUrl = "") {
    this.forPopUp = forPopUp;
    this.img = loadImage(url);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xChange = 0;
    this.yChange = 0;
    this.bobRate = 0.5;
    if (altUrl != "") {
      this.altImg = loadImage(altUrl);
    }
    else {
      this.altImg = null;
    }
  }
  render() {
    if (this.altImg != null && transitionScreens.includes(screen) == false && inDialogue == false) {
      if ((this.forPopUp && popUp != "none") || (this.forPopUp == false && popUp == "none")) {
        let hover = this.checkHover();

        if (hover) {
          image(this.altImg, this.x + this.xChange, this.y + this.yChange);
          cursor(HAND);
        }
        else {
          image(this.img, this.x + this.xChange, this.y + this.yChange);
        }
      }
      else {
        image(this.img, this.x + this.xChange, this.y + this.yChange);
      }
    }
    else {
      image(this.img, this.x + this.xChange, this.y + this.yChange);
    }
  }

  checkHover() {
    if (mouseX >= this.x && mouseX <= this.x + this.w) {
      if (mouseY >= this.y && mouseY <= this.y + this.h) {
        return true;
      }
    }
    return false;
  }

  bob() {
    if (this.yChange > 4 || this.yChange < -4) {
      this.bobRate = this.bobRate * -1;
    }
    this.yChange += this.bobRate;
  }

  updatePos(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.img.resize(w, h);
    this.w = this.img.width;
    this.h = this.img.height;
  }
}

class TextedSprite extends Sprite {
  constructor(forPopUp, x, y, w, h, url, altUrl, text, tx, ty, fontType, fontSize, fontColor) {
    super(forPopUp, x, y, w, h, url, altUrl);
    this.text = text;
    this.tx = tx;
    this.ty = ty;
    this.fontType = fontType;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
  }
  render() {
    if (this.altImg != null && transitionScreens.includes(screen) == false && inDialogue == false) {
      if ((this.forPopUp && popUp != "none") || (this.forPopUp == false && popUp == "none")) {
        let hover = this.checkHover();

        if (hover) {
          image(this.altImg, this.x + this.xChange, this.y + this.yChange);
          cursor(HAND);
        }
        else {
          image(this.img, this.x + this.xChange, this.y + this.yChange);
        }
      }
      else {
        image(this.img, this.x + this.xChange, this.y + this.yChange);
      }
    }
    else {
      image(this.img, this.x + this.xChange, this.y + this.yChange);
    }
    textFont(this.fontType);
    textSize(this.fontSize);
    fill(this.fontColor);
    text(this.text, this.x + this.tx + this.xChange, this.y + this.ty + this.yChange);
  }
  recenter() {
    this.tx = (this.w / 2) - (textWidth(this.text) / 3) + 2;
  }
}

class InputSprite extends TextedSprite {
  constructor(forPopUp, x, y, w, h, url, altUrl, text, tx, ty, fontType, fontSize, fontColor) {
    super(forPopUp, x, y, w, h, url, altUrl, text, tx, ty, fontType, fontSize, fontColor);
    this.placeholder = "|";
  }
  render(pSwitch = false) {
    if (this.altImg != null && transitionScreens.includes(screen) == false && inDialogue == false) {
      if ((this.forPopUp && popUp != "none") || (this.forPopUp == false && popUp == "none")) {
        let hover = this.checkHover();

        if (hover) {
          image(this.altImg, this.x + this.xChange, this.y + this.yChange);
          cursor(HAND);
        }
        else {
          image(this.img, this.x + this.xChange, this.y + this.yChange);
        }
      }
      else {
        image(this.img, this.x + this.xChange, this.y + this.yChange);
      }
    }
    else {
      image(this.img, this.x + this.xChange, this.y + this.yChange);
    }
    textFont(this.fontType);
    textSize(this.fontSize);
    fill(this.fontColor);
    if (this.text == "") {
      text(this.placeholder, this.x + this.tx, this.y + this.ty)
      if (pSwitch) {
        if (this.placeholder == "|") {
          this.placeholder = "";
        }
        else {
          this.placeholder = "|";
        }
      }
    }
    else {
      text(this.text, this.x + this.tx, this.y + this.ty);
    }
  }
  add(chr) {
    let newStr = this.text + chr;
    if (textWidth(newStr) < this.w / 2) {
      this.text = newStr;
    }
  }
  delChr() {
    if (this.text.length > 0) {
      this.text = this.text.substring(0, this.text.length - 1);
    }
  }
  save() {
    let finalText = this.text;
    this.text = "";
    this.placeholder = "|";
    return finalText
  }
}

class InputField {
  constructor(x, y, text, maxChrLen, fontType, fontSize, fontColor, id = "") {
    this.x = x;
    this.y = y;
    this.xChange = 0;
    this.yChange = 0;
    this.text = text;
    this.maxChrLen = maxChrLen;
    this.fontType = fontType;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.placeholder = "|";
    this.id = id;
  }
  render(pSwitch = false, x = this.x, y = this.y) {
    textFont(this.fontType);
    textSize(this.fontSize);
    fill(this.fontColor);
    if (this.text == "") {
      text(this.placeholder, x + this.xChange - 5, y + this.yChange);
      if (pSwitch) {
        if (this.placeholder == "|") {
          this.placeholder = "";
        }
        else {
          this.placeholder = "|";
        }
      }
    }
    else {
      text(this.text, x + this.xChange - textWidth(this.text), y + this.yChange);
    }
  }
  add(chr) {
    let newStr = this.text + chr;
    if ((newStr.length) <= this.maxChrLen) {
      if (this.id == "fishInput") {
        if (Number(newStr) <= currentFishPop - currentCompFishCaught) {
          console.log(Number(newStr));
          if (this.text == "0") {
            this.text = chr;
          }
          else {
            this.text = newStr;
          }
        }
      }
      else {
        this.text = newStr;
      }
    }

  }
  delChr() {
    if (this.text.length > 0) {
      this.text = this.text.substring(0, this.text.length - 1);
    }
  }
  save() {
    let finalText = this.text;
    this.text = "";
    this.placeholder = "|";
    return finalText;
  }
}

function preload() {
  // loading fonts
  pixelReg = loadFont('./static/assets/fonts/pixeloidSans.ttf');
  pixelBold = loadFont('./static/assets/fonts/pixeloidSansBold.ttf');

  // loading audio files
  dialogueSfx = loadSound('./static/assets/audio/sfx/dialogue-sfx.wav');
  titleTheme = loadSound('./static/assets/audio/music/title-theme.wav');
  mainTheme = loadSound('./static/assets/audio/music/main-theme.wav');

  // loading sprites
  titleBlock = new Sprite(false, 30, 50, 640, 260, './static/assets/images/title/title-block.png'); // title screen
  playButton = new Sprite(false, 240, 380, 230, 80, './static/assets/images/title/play-button.png', './static/assets/images/title/play-button-hover.png');
  fishAlive = new Sprite(false, 542, 530, 126, 84, './static/assets/images/dialogue/fish.png'); // dialogue
  fishDead = new Sprite(false, 542, 544, 133, 70, './static/assets/images/dialogue/fish-dead.png');
  dialogueBox = new Sprite(false, 24, 435, 494, 179, './static/assets/images/dialogue/dialogue.png');
  companyNameInputBox = new InputSprite(false, screenW / 2 - 315, 225, 630, 180, './static/assets/images/companyName/company-name-input.png', '', '', 35, 105, pixelReg, 50, "#422a05"); // company name setting
  companyNameTitleBox = new TextedSprite(false, screenW / 2 - 315, 85, 630, 100, './static/assets/images/companyName/company-name-title.png', '', 'NAME YOUR COMPANY', 120, 62, pixelBold, 30, "#422a05");
  confirmButton = new TextedSprite(false, screenW / 2 - 130, 465, 260, 80, './static/assets/images/companyName/confirm-button.png', './static/assets/images/companyName/confirm-button-hover.png', "CONFIRM", 65, 50, pixelBold, 24, "#422a05"); // all
  compNameTile = new TextedSprite(false, 235, 140, 230, 37, './static/assets/images/menuTiles/company-title-tile.png', '', '', 0, 25, pixelBold, 16, "#422a05"); // Menu
  fishingTile = new Sprite(false, 235, 255, 230, 240, './static/assets/images/menuTiles/go-fish-tile.png', './static/assets/images/menuTiles/go-fish-tile-hover.png');
  newsTile = new Sprite(false, 30, 400, 180, 180, './static/assets/images/menuTiles/news-tile.png', './static/assets/images/menuTiles/news-tile-hover.png');
  expensesTile = new Sprite(false, 30, 170, 180, 180, './static/assets/images/menuTiles/expenses-tile.png', './static/assets/images/menuTiles/expenses-tile-hover.png');
  homeTile = new Sprite(false, screenW - 30 - 180, 400, 180, 180, './static/assets/images/menuTiles/home-tile.png', './static/assets/images/menuTiles/home-tile-hover.png');
  shopTile = new Sprite(false, screenW - 30 - 180, 170, 180, 180, './static/assets/images/menuTiles/shop-tile.png', './static/assets/images/menuTiles/shop-tile-hover.png');
  monthTile = new TextedSprite(false, 20, 15, 230, 37, './static/assets/images/menuTiles/tile-sm.png', '', 'Month 0', 20, 24, pixelBold, 16, "#422a05");
  moneyTile = new TextedSprite(false, screenW - 230 - 20, 15, 230, 37, './static/assets/images/menuTiles/tile-sm.png', '', '$1000', 20, 25, pixelBold, 16, "#422a05");
  fishTile = new TextedSprite(false, screenW - 230 - 20, 52, 230, 37, './static/assets/images/menuTiles/tile-sm.png', '', 'Fish Left: 1000', 20, 25, pixelBold, 16, "#422a05");
  // loading sprites (for pop up)
  popUpMenu = new Sprite(false, 70, 65, 560, 520, './static/assets/images/popUpMenu/pop-up-menu.png');
  shopInnerTileCar = new Sprite(true, 170, 170, 153, 141, './static/assets/images/popUpMenu/shop-tile.png', './static/assets/images/popUpMenu/shop-tile-hover.png');
  shopInnerTileHome = new Sprite(true, 370, 170, 153, 141, './static/assets/images/popUpMenu/shop-tile.png', './static/assets/images/popUpMenu/shop-tile-hover.png');
  shopInnerTileStatue = new Sprite(true, 270, 340, 153, 141, './static/assets/images/popUpMenu/shop-tile.png', './static/assets/images/popUpMenu/shop-tile-hover.png');
  car1 = new Sprite(true, 0, 0, 0, 0, './static/assets/images/popUpMenu/car-1.png');
  car2 = new Sprite(true, 0, 0, 0, 0, './static/assets/images/popUpMenu/car-2.png');
  house1 = new Sprite(true, 0, 0, 0, 0, './static/assets/images/popUpMenu/house-1.png');
  house2 = new Sprite(true, 0, 0, 0, 0, './static/assets/images/popUpMenu/house-2.png');
  house3 = new Sprite(true, 0, 0, 0, 0, './static/assets/images/popUpMenu/house-3.png');
  statue1 = new Sprite(true, 0, 0, 0, 0, './static/assets/images/popUpMenu/statue-1.png');
  fishInput = new InputField(200, 200, "", 4, pixelReg, 16, "#422a05", "fishInput");
  goFishButton = new TextedSprite(true, screenW / 2 - 130, 410, 260, 80, './static/assets/images/companyName/confirm-button.png', './static/assets/images/companyName/confirm-button-hover.png', "GO FISH!", 65, 50, pixelBold, 24, "#422a05");
  homeBg = new Sprite(true,118.5,130,455,391, './static/assets/images/popUpMenu/home-background.png');

  // loading background
  bgFrames = [];
  for (let i = 0; i < 9; i++) {
    img = loadImage(`./static/assets/images/bg/bg_f${i}.png`);
    bgFrames.push(img);
  }
}

function setup() {
  // initialize game canvas
  let gameCanvas = createCanvas(screenW, screenH);
  gameCanvas.parent('gameCanvas');
  outputVolume(0.5);

  // defining background variables
  bgFrameCount = 0;
  bgPause = 0;

  // defining pop up variables
  popUp = "none";
  popUpDirection = "idle";

  // define input variables
  inputObj = "none";
  requireInput = false;

  // define dialogue variables
  updateDialogues();
  dialogueStart = 0;
  dialogueCapped = false;
  dialogueFinished = false;
  dialogue = 0;
  inDialogue = false;
  stagedDialogues = [];

  // define game variables
  screen = "start";
  transitionDelay = 0;
  popUpTransitionDelay = 0;

  gameMonth = 1;
  firstMonth = true;

  gameVarXChange = 0;
  gameVarYChange = 0;

  companyName = "";

  currentHouse = 0;
  currentCar = 0;
  currentStatue = 0;

  lastMonthEvent = "none";
  currentEvent = "none";

  lastMonthBalance = 0;
  currentBalance = 1000;

  lastMonthFishPop = 0;
  currentFishPop = 5000;

  lastMonthFishCaught = 0;
  currentFishCaught = 0;

  lastMonthCompFishCaught = 0;
  currentCompFishCaught = 500;

  lastMonthFishPrice = 9;
  currentFishPrice = 9;

  lastMonthRentRate = 1.0;
  currentMonthRentRate = 1.0;

  lastMonthReproduceRate = 2.0;
  currentReproduceRate = 2.0;

  // initialize start screen
  background(200);
  let startMsg = "click to play";
  text(startMsg, screenW / 2 - textWidth(startMsg) / 2, screenH / 2);
}

function draw() {
  // running the background gif/refreshing screen
  if (screen != "start") {
    cursor(ARROW);
    clear();
    image(bgFrames[bgFrameCount], 0, 0);
    bgPause += 1;
    let nextFrame = false;
    if (bgPause % 35 == 0) {
      bgPause = 0;
      bgFrameCount += 1;
      if (bgFrameCount % 9 == 0) {
        bgFrameCount = 0;
      }
      nextFrame = true;
    }

    // calculating transition delay
    var transition = false;
    transitionDelay += 1;
    if (transitionDelay % transitionSpeed == 0) {
      transition = true;
      transitionDelay = 0;
    }
    // calculating pop up transition delay
    var popUpTransition = false;
    popUpTransitionDelay += 1;
    if (popUpTransitionDelay % popUpTransitionSpeed == 0) {
      popUpTransition = true;
      popUpTransitionDelay = 0;
    }
    // start to title screen transition
    if (screen == "transitionStart") {
      titleBlock.render();
      playButton.render();
      if (transition) {
        titleBlock.yChange -= transitionRate;
        playButton.yChange -= transitionRate;
        if (titleBlock.y + titleBlock.yChange <= titleBlock.y) {
          screen = "title";
          titleBlock.yChange = 0;
          playButton.yChange = 0;
        }
      }
    }
    //title screen rendering
    else if (screen == "title") {
      titleBlock.render();
      playButton.render();
      if (transition) {
        titleBlock.bob();
        playButton.bob();
      }
    }
    // title screen to comp name transition
    else if (screen == "transitionTitle") {
      titleBlock.render();
      playButton.render();
      if (transition) {
        titleBlock.yChange += transitionRate;
        playButton.yChange += transitionRate;
        if (titleBlock.y + titleBlock.yChange > screenH) {
          dialogueSfx.play();
          screen = "blank";
          inDialogue = true;
          titleBlock.yChange = 0;
          playButton.yChange = 0;
          titleTheme.stop();
          mainTheme.play();
          mainTheme.setLoop(true);
          mainTheme.setVolume(0.7);
        }
      }
    }
    // company name screen rendering
    else if (screen == "chooseCompName") {
      companyNameTitleBox.render();
      companyNameInputBox.render(nextFrame);
      confirmButton.render();
    }

    else if (screen == "blank" && dialogue != 0) {
      monthTile.render();
      moneyTile.render();
      fishTile.render();
    }

    // transition to menu screen rendering
    else if (screen == "transitionMenu") {
      renderMenus();
      if (transition) {
        moveMenusUp();
        if (compNameTile.y + compNameTile.yChange <= compNameTile.y) {
          screen = "menu";
          resetMenuYChange(); 4
          if (dialogue == 1) {
            dialogueSfx.play();
            inDialogue = true;
          }
        }
      }
    }
    // menu screen rendering
    else if (screen == "menu") {
      renderMenus(transition);
      if (stagedDialogues.length > 0 && inDialogue == false){
        console.log(stagedDialogues);

        dialogue = stagedDialogues[0];
        console.log(dialogue);
        inDialogue = true;
        stagedDialogues.shift();
      }
    }

    // menu screen to next month rendering
    else if (screen == "transitionNextMonth") {
      renderMenus();
      renderPopUp(popUp);
      if (popUpTransition) {
        movePopUpMenuDown(popUp);
      }
      if (transition) {
        moveMenusDown();
      }
      if (compNameTile.y + compNameTile.yChange > screenH && popUpMenu.y + popUpMenu.yChange > screenH) {
        screen = "blank";
        console.log("bnana");
        dropMenus();
        dropPopUpMenu(popUp);
        popUp = "none";
        setTimeout(transitionToNextMonth, 2000);
        
      }
    }

    else if (screen == "transitionMonthSummary") {
      monthTile.render();
      moneyTile.render();
      fishTile.render();
      renderPopUp(popUp);
      if (popUpTransition) {
        movePopUpMenuUp(popUp);
        if (popUpMenu.y + popUpMenu.yChange <= popUpMenu.y) {
          screen = "monthSummary";
          resetPopUpMenuYChange(popUp);
        }
      }
    }

    else if (screen == "monthSummary") {
      monthTile.render();
      moneyTile.render();
      fishTile.render();
      renderPopUp(popUp);
    }

    else if (screen == "transitionFromMonthSummary") {
      monthTile.render();
      moneyTile.render();
      fishTile.render();
      renderPopUp(popUp);
      if (popUpTransition) {
        movePopUpMenuDown(popUp);
        if (popUpMenu.y + popUpMenu.yChange > screenH) {
          dropPopUpMenu(popUpMenu);
          popUp = "none";
          setTimeout(() => { screen = "transitionMenu" }, 2000);
        }
      }
    }

    // RENDERING POPUPS

    // go fish menu pop up
    if (popUp != "none") {
      renderPopUp(popUp, nextFrame);
      if (popUpDirection == "up") {
        if (popUpTransition) {
          movePopUpMenuUp(popUp);
          if (popUpMenu.y + popUpMenu.yChange <= popUpMenu.y) {
            popUpDirection = "idle";
            resetPopUpMenuYChange(popUp);
          }
        }
      }
      else if (popUpDirection == "down") {
        if (popUpTransition) {
          movePopUpMenuDown(popUp);
          if (popUpMenu.y + popUpMenu.yChange > screenH) {
            popUpDirection = "idle";
            popUp = "none";
            dropPopUpMenu();
          }
        }
      }
    }

    //dialogue rendering
    if (inDialogue) {
      dialogueBox.render();
      if (currentFishPop > 0) {
        fishAlive.render();
      }
      else {
        fishDead.render();
      }
      dialogueCapped = displayMsg(dialogues[dialogue], pixelReg, 22, "#000000", dialogueBox.x + 40, dialogueBox.y + 50, 730, dialogueStart, chr);
      dialogueFinished = dialogueStart + chr >= dialogues[dialogue].length;
      if (dialogueCapped || dialogueFinished) {
        dialogueSfx.stop();
      }
      if (dialogueCapped == false && dialogueFinished == false) {
        chr += 1
      }
    }
  }
}

function keyPressed() {
  if (requireInput) {
    if (keyCode === BACKSPACE) {
      inputObj.delChr();
    }
  }
}

function keyTyped() {
  if (requireInput) {
    if (key === ENTER || key == "ENTER") {
    }
    else {
      if (inputObj == fishInput) {
        if (NUMBERS.includes(Number(key))) {
          inputObj.add(key);
        }
      }
      else {
        inputObj.add(key);
      }
    }
  }
}

function mousePressed() {
  if (screen == "start") {
    titleBlock.yChange = screenH - titleBlock.y;
    playButton.yChange = screenH - titleBlock.y;
    screen = "transitionStart";
    titleTheme.play();
  }

  if (transitionScreens.includes(screen) == false) {
    // play button
    if (playButton.checkHover() && screen == "title") {
      screen = "transitionTitle";
    }
    // company name confirm button
    if (confirmButton.checkHover() && screen == "chooseCompName") {
      screen = "transitionMenu";
      companyName = companyNameInputBox.save();
      compNameTile.text = companyName;
      compNameTile.recenter();
      dropMenus();
      updateDialogues();
      updateTiles();
      requireInput = false;
      inputObj = "none";
      fishInput.save();
    }

    // menu buttons
    if (screen == "menu" && popUp == "none" && inDialogue == false) {
      if (fishingTile.checkHover()) {
        requireInput = true;
        inputObj = fishInput;
        popUp = "fish";
      }
      else if (expensesTile.checkHover()) {
        popUp = "expenses";
      }
      else if (newsTile.checkHover()) {
        popUp = "news";
      }
      else if (shopTile.checkHover()) {
        popUp = "shop";
        updateIconPos("shop");
      }
      else if (homeTile.checkHover()) {
        popUp = "home";
        updateIconPos("home");
      }

      if (popUp != "none") {
        dropPopUpMenu(popUp);
        popUpDirection = "up";
      }
    }
    // clicking out of menu
    if (screen == "menu" && popUp != "none" && inDialogue == false && popUpMenu.checkHover() == false) {
      popUpDirection = "down";
      requireInput = false;
      inputObj = "none";
    }
    //
    if (screen == "monthSummary" && popUpMenu.checkHover() == false) {
      screen = "transitionFromMonthSummary";
    }

    if (popUp == "shop") {
      if (shopInnerTileCar.checkHover()) {
        if (currentCar == 0 && currentBalance >= 7000) {
          currentCar = 1;
          currentBalance -= 7000;
          updateTiles();
        }
        else if (currentCar == 1 && currentBalance >= 16000) {
          currentCar = 2;
          currentBalance -= 16000;
          updateTiles();
        }
      }
      else if (shopInnerTileHome.checkHover()) {
        if (currentHouse == 0 && currentBalance >= 15000) {
          currentHouse = 1;
          currentBalance -= 15000;
          updateTiles();
        }
        else if (currentHouse == 1 && currentBalance >= 20000) {
          currentHouse = 2;
          currentBalance -= 20000;
          updateTiles();
        }
        else if (currentHouse == 2 && currentBalance >= 30000) {
          currentHouse = 3;
          currentBalance -= 30000;
          updateTiles();
        }
      }
      else if (shopInnerTileStatue.checkHover()) {
        if (currentStatue == 0 && currentBalance >= 50000) {
          currentStatue = 1;
          currentBalance -= 50000;
          updateTiles();
        }
      }

    }
    else if (popUp == "fish") {
      if (goFishButton.checkHover()) {
        if (fishInput.text != "") {
          screen = "transitionNextMonth";
          requireInput = false;
          inputObj = "none";
          currentFishCaught = Number(fishInput.save());
        }

      }
    }

    // dialogue interaction
    if (inDialogue) {
      if (dialogueCapped) {
        dialogueStart += chr;
        chr = 0;
        dialogueCapped = false;
      }
      if (dialogueFinished) {
        // changing to next screen
        if (dialogue == 0) {
          screen = "chooseCompName";
          requireInput = true;
          inputObj = companyNameInputBox;
        }

        // resetting dialogue variables
        dialogueStart = 0;
        chr = 0;
        dialogueCapped = false;
        dialogueFinished = false;
        // if dialogues are grouped together
        if (dialogue >= 1 && dialogue < 2) { //dialogue < 9
          dialogue += 1;
          inDialogue = true;
          dialogueSfx.play()
        }
        else {
          inDialogue = false;
        }

      if (dialogue == 0){
        dialogue = 1;
      }
      }
    }
  }
}

// moves all menus to the bottom of the screen
function dropMenus() {
  let change = screenH - compNameTile.y;
  compNameTile.yChange = change;
  fishingTile.yChange = change;
  newsTile.yChange = change;
  expensesTile.yChange = change;
  homeTile.yChange = change;
  shopTile.yChange = change;
}

// renders all menus
function renderMenus(bobbing = false) {
  compNameTile.render();
  fishingTile.render();
  newsTile.render();
  expensesTile.render();
  homeTile.render();
  shopTile.render();
  monthTile.render();
  moneyTile.render();
  fishTile.render();

  if (bobbing) {
    compNameTile.bob();
    fishingTile.bob();
    newsTile.bob();
    expensesTile.bob();
    homeTile.bob();
    shopTile.bob();
  }
}

function resetMenuYChange() {
  compNameTile.yChange = 0;
  fishingTile.yChange = 0;
  newsTile.yChange = 0;
  expensesTile.yChange = 0;
  homeTile.yChange = 0;
  shopTile.yChange = 0;
}

function moveMenusUp() {
  compNameTile.yChange -= transitionRate;
  fishingTile.yChange -= transitionRate;
  newsTile.yChange -= transitionRate;
  expensesTile.yChange -= transitionRate;
  homeTile.yChange -= transitionRate;
  shopTile.yChange -= transitionRate;
}

function moveMenusDown() {
  compNameTile.yChange += transitionRate;
  fishingTile.yChange += transitionRate;
  newsTile.yChange += transitionRate;
  expensesTile.yChange += transitionRate;
  homeTile.yChange += transitionRate;
  shopTile.yChange += transitionRate;
}

function renderPopUp(type, nFrame) {
  popUpMenu.render();
  let title;
  let x1 = popUpMenu.x + 70; // Left Boundary
  let x2 = popUpMenu.w - 10; // Right Boundary
  let y = popUpMenu.y + 100; //starting y

  // green : #12820c
  // red : #c21313

  if (type == "expenses") {
    title = "EXPENSES";

    if (firstMonth && screen == "menu") {
      fill("#422a05");
      textFont(pixelReg);
      textSize(24);
      let txtMsg = "No expenses so far!";
      text(txtMsg, popUpMenu.x + popUpMenu.w / 2 - textWidth(txtMsg) / 2 + gameVarXChange, popUpMenu.y + popUpMenu.h / 2 + gameVarYChange);
    }
    else {
      if (lastMonthEvent != "none") {
        renderText(`Event: ${lastMonthEvent}`, `${EVENTS[lastMonthEvent]}`, x1, x2, y, "#000000", 12);
        y += 35;
      }
      renderPopUpTitle("Finances", popUpMenu.x + popUpMenu.w / 2, y, "#422a05", 24);
      y += 30;
      renderText("Balance:", `$${lastMonthBalance}`, x1, x2, y);
      y += 30;
      renderText("Operating Costs:", `-$${RENT * lastMonthRentRate}`, x1, x2, y, "#c21313");
      y += 30;
      renderText(`Fish (${lastMonthFishCaught}) x Price ($${lastMonthFishPrice}):`, `+$${lastMonthFishCaught * lastMonthFishPrice}`, x1, x2, y, "#12820c");
      y += 30;
      renderText("Current Balance:", `${currentBalance}`, x1, x2, y, "#422a05");
      y += 45;
      renderPopUpTitle("Fish Population:", popUpMenu.x + popUpMenu.w / 2, y, "#422a05", 24);
      y += 30;
      renderText("Fish Population:", `${lastMonthFishPop}`, x1, x2, y);
      y += 30;
      renderText("Total Fish Caught:", `-${lastMonthFishCaught + lastMonthCompFishCaught}`, x1, x2, y, "#c21313");
      y += 30;
      renderText("Reproduction Rate:", `x${lastMonthReproduceRate}`, x1, x2, y, "#12820c");
      y += 30;
      renderText("Current Fish Population:", `${currentFishPop}`, x1, x2, y);
    }
  }
  else if (type == "fish") {
    title = "GO FISH";
    x3 = x1 + 205;
    x4 = x3 + 10;
    y2 = y;

    let estProfit = 0;

    fill("#995b05");
    rect(x3 + 3 + gameVarXChange, y - 20 + gameVarYChange, 2, 235);

    renderText("Fish Price:", `$${currentFishPrice}`, x1, x3, y, "#422a05", 16);
    renderText("Fish Pop:", `${currentFishPop}`, x4, x2, y2, "#422a05", 16);
    y += 30;
    y2 += 30;
    renderText("Catch Quantity:", "", x1, x3, y, "#422a05", 16);
    fishInput.render(nFrame, x3, y);
    renderText("Competitors:", `-${currentCompFishCaught}`, x4, x2, y2, "#c21313", 16);
    y += 30;
    y2 += 30;

    if (fishInput.text != "") {
      estProfit = Number(fishInput.text) * currentFishPrice;
    }

    let interimFishPop = currentFishPop - currentCompFishCaught;
    renderText("Est. Profit:", `+$${estProfit}`, x1, x3, y, "#12820c", 16);
    renderText("Fish Left:", `= ${interimFishPop}`, x4, x2, y2, "#422a05", 16);
    y += 30;
    y2 += 30;
    let estRent = RENT * currentMonthRentRate;
    renderText("Est. Opr Costs:", `-$${estRent}`, x1, x3, y, "#c21313", 16);
    if (fishInput.text == "") {
      renderText("Catch Quantity:", `-0`, x4, x2, y2, "#c21313", 16);
    }
    else {
      renderText("Catch Quantity:", `-${fishInput.text}`, x4, x2, y2, "#c21313", 16);
    }

    fill("#995b05");
    rect(x1 + 5 + gameVarXChange, y + 15 + gameVarYChange, 190, 2);

    y += 45;
    y2 += 30;
    let estNetGain = estProfit - estRent;
    console.log(estNetGain);

    if (estNetGain >= 0) {
      renderText("Est. Net Gain:", `= $${estNetGain}`, x1, x3, y, "#12820c", 16);
    }
    else {
      renderText("Est. Net Gain:", `= -$${estNetGain * -1}`, x1, x3, y, "#c21313", 16);
    }
    if (fishInput.text != "") {
      interimFishPop = (interimFishPop - Number(fishInput.text))
    }
    renderText("Fish Left:", `= ${interimFishPop}`, x4, x2, y2, "#422a05", 16);
    y += 30;
    y2 += 30;

    renderText(`(${Math.ceil(estRent / currentFishPrice)} fish needed to break even)`, "", x1, x2, y, "#422a05", 11);

    renderText("Repro. Rate:", `x${currentReproduceRate}`, x4, x2, y2, "#12820c", 16);


    fill("#995b05");
    rect(x3 + 17.5 + gameVarXChange, y2 + 15 + gameVarYChange, 180, 2);

    y2 += 45;
    interimFishPop *= currentReproduceRate;
    renderText("Est. Fish Pop:", `= ${interimFishPop}`, x4, x2, y2, "#422a05", 16);

    goFishButton.render();
  }
  else if (type == "news") {
    x3 = x1 + 205;
    x4 = x3 + 10;
    y2 = y;
    title = "NEWS";
    y+=10;
    renderPopUpTitle("The Monthly Fisher", popUpMenu.x + popUpMenu.w / 2, y, "#422a05", 35);
    y+= 15;
    fill("#995b05");
    rect(x1 + gameVarXChange, y + gameVarYChange, 412.5, 2);
    y+=60;
    renderPopUpTitle("Current Events", popUpMenu.x + popUpMenu.w / 2, y, "#422a05", 20);
    y+=15;
    fill("#995b05");
    rect(x1 + gameVarXChange, y + gameVarYChange, 412.5, 2);
    y+=30;
    renderText(`${currentEvent}`, `${EVENTS[currentEvent]}`, x1, x2, y, "#422a05", 14);
    y+=20;
    fill("#995b05");
    rect(x1 + gameVarXChange, y + gameVarYChange, 412.5, 2);

    y+=60;
    renderPopUpTitle("Last Month Earnings", popUpMenu.x + popUpMenu.w/2, y ,"#422a05",20);
    y+=15;
    fill("#995b05");
    rect(x1 + gameVarXChange, y + gameVarYChange, 412.5, 2);

    fill("#995b05");
    rect(x3 + 3 + gameVarXChange, y + gameVarYChange, 2, 110);

    y+=25;
    renderPopUpTitle(`${companyName}`,popUpMenu.x+ popUpMenu.w/4+25, y,"#422a05", 16);
    renderPopUpTitle(`Fishery Inc.`,popUpMenu.x+ popUpMenu.w*3/4-25, y,"#422a05", 16);

    y+=30;

    renderText("Fish Caught: ", `${lastMonthFishCaught}`, x1, x3-5, y,"#422a05", 16);
    renderText("Fish Caught: ", `${lastMonthCompFishCaught}`, x4+5, x2, y,"#422a05", 16);

    y+=30;

    let profit = currentBalance-lastMonthBalance;
    let compProfit = lastMonthCompFishCaught*lastMonthFishPrice-Math.floor((RENT*lastMonthRentRate));
    if (firstMonth){
      profit = 0;
      compProfit = 0;
    }

    renderText("Profit: ", `$${profit}`, x1, x3-5, y,"#422a05", 16);
    renderText("Profit: ", `$${compProfit}`, x4+5, x2, y,"#422a05", 16);


  }
  else if (type == "shop") {
    title = "SHOP";
    shopInnerTileHome.render();
    shopInnerTileCar.render();
    shopInnerTileStatue.render();
    textFont(pixelBold);
    textSize(16);
    if (currentHouse == 0) { // house
      if (currentBalance >= 15000) {
        fill("#12820c");
      }
      else {
        fill("#c21313");
      }

      text("New House!", 387.5 + gameVarXChange, 200 + gameVarYChange);
      text("$15000", 407.5 + gameVarXChange, 230 + gameVarYChange);
      house1.render();
    }
    else if (currentHouse == 1) {
      if (currentBalance >= 20000) {
        fill("#12820c");
      }
      else {
        fill("#c21313");
      }
      text("New House!", 387.5 + gameVarXChange, 200 + gameVarYChange);
      text("$20000", 407.5 + gameVarXChange, 230 + gameVarYChange);
      house2.render();
    }
    else if (currentHouse == 2) {
      if (currentBalance >= 30000) {
        fill("#12820c");
      }
      else {
        fill("#c21313");
      }
      text("New House!", 387.5 + gameVarXChange, 200 + gameVarYChange);
      text("$30000", 407.5 + gameVarXChange, 230 + gameVarYChange);
      house3.render();
    }
    else {
      fill("#422a05");
      text("New House!", 387.5 + gameVarXChange, 200 + gameVarYChange);
      text("SOLD OUT", 400 + gameVarXChange, 250 + gameVarYChange);
    }
    if (currentCar == 0) { // car
      if (currentBalance >= 7000) {
        fill("#12820c");
      }
      else {
        fill("#c21313");
      }
      text("New Car!", 202.5 + gameVarXChange, 200 + gameVarYChange);
      text("$7000", 215 + gameVarXChange, 230 + gameVarYChange);
      car1.render();
    }
    else if (currentCar == 1) {
      if (currentBalance >= 16000) {
        fill("#12820c");
      }
      else {
        fill("#c21313");
      }
      text("New Car!", 202.5 + gameVarXChange, 200 + gameVarYChange);
      text("$16000", 210 + gameVarXChange, 230 + gameVarYChange);
      car2.render();
    }
    else {
      fill("#422a05");
      text("New Car!", 202.5 + gameVarXChange, 200 + gameVarYChange);
      text("SOLD OUT", 200 + gameVarXChange, 250 + gameVarYChange);
    }
    if (currentStatue == 0) { // statue
      if (currentBalance >= 50000) {
        fill("#12820c");
      }
      else {
        fill("#c21313");
      }
      text("Fish Statue!", 286 + gameVarXChange, 370 + gameVarYChange);
      text("$50000", 305 + gameVarXChange, 400 + gameVarYChange);
      statue1.render();
    }
    else {
      fill("#422a05");
      text("Fish Statue!", 286 + gameVarXChange, 370 + gameVarYChange);
      text("SOLD OUT", 300 + gameVarXChange, 420 + gameVarYChange);
    }
  }
  else if (type == "home") {
    title = "HOME";
    homeBg.render();
  }
  if (popUp != "none") {
    renderPopUpTitle(title, popUpMenu.x + popUpMenu.w / 2, popUpMenu.y + 30);
  }
}

function renderText(description, val, x1, x2, y, color = "#422a05", size = 22, font = pixelReg) {
  textFont(font);
  fill(color);
  textSize(size);
  text(description + "", x1 + gameVarXChange, y + gameVarYChange);
  text(val.toString(), x2 + gameVarXChange - textWidth(val.toString()), y + gameVarYChange);
}

function renderPopUpTitle(title, x, y, color = "#422a05", size = 40, font = pixelBold) {
  textFont(font);
  fill(color);
  textSize(size);
  text(title, x - textWidth(title) / 2 + gameVarXChange, y + gameVarYChange);
}

function dropPopUpMenu(type) {
  let change = screenH - popUpMenu.y;
  popUpMenu.yChange = change;
  gameVarYChange = change;
  if (type == "shop") {
    shopInnerTileHome.yChange = change;
    shopInnerTileCar.yChange = change;
    shopInnerTileStatue.yChange = change;
    car1.yChange = change;
    car2.yChange = change;
    house1.yChange = change;
    house2.yChange = change;
    house3.yChange = change;
    statue1.yChange = change;
  }
  else if (type == "fish") {
    fishInput.yChange = change;
    goFishButton.yChange = change;
  }
  else if (type == "home"){
    homeBg.yChange = change;
  }
}

function resetPopUpMenuYChange(type) {
  popUpMenu.yChange = 0;
  gameVarYChange = 0;
  if (type == "shop") {
    shopInnerTileHome.yChange = 0;
    shopInnerTileCar.yChange = 0;
    shopInnerTileStatue.yChange = 0;
    car1.yChange = 0;
    car2.yChange = 0;
    house1.yChange = 0;
    house2.yChange = 0;
    house3.yChange = 0;
    statue1.yChange = 0;
  }
  else if (type == "fish") {
    fishInput.yChange = 0;
    goFishButton.yChange = 0;
  }
  else if (type == "home"){
    homeBg.yChange = 0;
  }
}

function movePopUpMenuUp(type) {
  popUpMenu.yChange -= popUpTransitionRate;
  gameVarYChange -= popUpTransitionRate;
  if (type == "shop") {
    shopInnerTileHome.yChange -= popUpTransitionRate;
    shopInnerTileCar.yChange -= popUpTransitionRate;
    shopInnerTileStatue.yChange -= popUpTransitionRate;
    car1.yChange -= popUpTransitionRate;
    car2.yChange -= popUpTransitionRate;
    house1.yChange -= popUpTransitionRate;
    house2.yChange -= popUpTransitionRate;
    house3.yChange -= popUpTransitionRate;
    statue1.yChange -= popUpTransitionRate;
  }
  else if (type == "fish") {
    fishInput.yChange -= popUpTransitionRate;
    goFishButton.yChange -= popUpTransitionRate;
  }
  else if (type == "home"){
    homeBg.yChange -= popUpTransitionRate;
  }
}

function movePopUpMenuDown(type) {
  popUpMenu.yChange += popUpTransitionRate;
  gameVarYChange += popUpTransitionRate;
  if (type == "shop") {
    shopInnerTileHome.yChange += popUpTransitionRate;
    shopInnerTileCar.yChange += popUpTransitionRate;
    shopInnerTileStatue.yChange += popUpTransitionRate;
    car1.yChange += popUpTransitionRate;
    car2.yChange += popUpTransitionRate;
    house1.yChange += popUpTransitionRate;
    house2.yChange += popUpTransitionRate;
    house3.yChange += popUpTransitionRate;
    statue1.yChange += popUpTransitionRate;
  }
  else if (type == "fish") {
    fishInput.yChange += popUpTransitionRate;
    goFishButton.yChange += popUpTransitionRate;
  }
  else if (type == "home"){
    homeBg.yChange += popUpTransitionRate;
  }
}

function randomEvent() {
  if (Math.random() >= 0.0) {
    let num = Math.floor(Math.random() * Object.keys(EVENTS).length);
    newEvent = Object.keys(EVENTS)[num];
    return newEvent
  }
  return "none";
}

function activateEvent(ev) {
  if (ev == "too many fish caught!") {
    currentFishPrice = Math.floor(currentFishPrice * 0.75);
    stagedDialogues.push(13);
  }
  else if (ev == "too few fish caught!") {
    currentFishPrice = Math.floor(currentFishPrice * 1.25);
    stagedDialogues.push(14);
  }
  else if (ev == "economic recession!") {
    currentMonthRentRate *= 1.25;
    stagedDialogues.push(15);
  }
  else if (ev == "pollution!") {
    currentFishPop = Math.floor(currentFishPop * 0.95);
    stagedDialogues.push(16);
  }
  else if (ev == "many cleanups!") {
    currentFishPop = Math.floor(currentFishPop * 1.10);
    stagedDialogues.push(17);
  }
  else if (ev == "extreme heat warning!") {
    currentReproduceRate = Math.floor(currentReproduceRate * 0.90);
    stagedDialogues.push(18);
  }
  else if (ev == "good weather!") {
    currentReproduceRate = Math.floor(currentReproduceRate * 1.10);
    stagedDialogues.push(19);
  }
  else if (ev == "oil spillage!") {
    currentFishPop = Math.floor(currentFishPop * 0.95);
    stagedDialogues.push(20);
  }
  else if (ev == "thunderstorm!") {
    currentMonthRentRate *= 1.15;
    stagedDialogues.push(21);
  }
  else if (ev == "gov. regulations lifted!") {
    competitorFishRate += 1;
    stagedDialogues.push(22);
  }
  currentCompFishCaught = Math.floor(competitorFishRate * lastMonthFishCaught);
  if (currentCompFishCaught > currentFishPop) {
    currentCompFishCaught = currentFishPop;
  }
}

function transitionToNextMonth() {
  lastMonthEvent = currentEvent;
  currentEvent = randomEvent();
  console.log(currentEvent);
  lastMonthBalance = currentBalance;
  lastMonthFishPop = currentFishPop;
  lastMonthFishCaught = currentFishCaught;
  lastMonthCompFishCaught = currentCompFishCaught;
  lastMonthFishPrice = currentFishPrice;
  lastMonthRentRate = currentMonthRentRate;
  lastMonthReproduceRate = currentReproduceRate;

  currentBalance = Math.floor(currentBalance - (RENT * currentMonthRentRate) + (currentFishCaught * currentFishPrice));
  currentFishPop = Math.floor((currentFishPop - currentFishCaught - currentCompFishCaught) * currentReproduceRate);
  currentFishCaught = 0;
  currentFishPrice = currentFishPrice;
  currentMonthRentRate = currentMonthRentRate;
  currentReproduceRate = currentReproduceRate;

  activateEvent(currentEvent);

  currentCompFishCaught = Math.floor(competitorFishRate * lastMonthFishCaught);
  if (currentCompFishCaught > currentFishPop) {
    currentCompFishCaught = currentFishPop;
  }

  competitorFishRate += 0.5;

  gameMonth += 1;

  // predefined month events
  if (gameMonth == 2){
    firstMonth = false;
  }

  if (currentCompFishCaught > lastMonthCompFishCaught*1.5){ // tragedy of commons
    stagedDialogues.push(11);
  }

  if (lastMonthFishPop > currentFishPop){ // overfishing
    stagedDialogues.push(12);
  }

  updateTiles();

  screen = "transitionMonthSummary";
  popUp = "expenses";
  dropPopUpMenu(popUp);
}

function updateIconPos(pos) {
  if (pos == "shop") {
    car1.updatePos(206, 255, 0, 40);
    car2.updatePos(196, 255, 0, 40);
    house1.updatePos(421, 245, 0, 50);
    house2.updatePos(429, 245, 0, 50);
    house3.updatePos(415, 245, 0, 50);
    statue1.updatePos(310, 415, 0, 50);
  }
  else if (pos == "home") {

  }
}

function updateTiles() {
  moneyTile.text = `$${currentBalance}`;
  fishTile.text = `Fish Left: ${currentFishPop}`;
  monthTile.text = `Month: ${gameMonth}`
}

function updateDialogues() {
  dialogues = [
    // dialogues 0-10
    "Hello! I'm Fishy, your assistant. I'll be helping you with your new fishery startup called... what's it name?",
    `${companyName}? What an awesome name!`,
    "Here is the control panel for your fishery. Interacting with the tiles allows you to manage your fishery.",
    "The top-left tile is the EXPENSES tile. Here, it will show you a breakdown of the past month.",
    "The bottom-left tile is the NEWS tile. Here, it will give you update and events happening in the month, in addition to insights into your company's performance compared to your competitors.",
    "The middle tile is the GO FISH tile. Here, you can set the amount of fish your fishery will catch for the current month and progress to the next month.",
    "The top-right tile is the SHOP tile. Here, you can make purchases and customize your home with the cash you earn from your fishery.",
    "The bottom-right tile is the HOME tile. Here, it will give you a view of your home with all of your new purchases.",
    "In the top left, you can view what month it is and in the top right, your current account balance and fish count",
    "Random events are unexpected things that can happen each month, such as sudden economic changes, which require you to change up your fishing strategies.",
    "Every time you decide to go fishing, it represents a month of the fishery running. The goal of this game is it last as long as you can. Make sure to keep in mind that it's crucial to strike a balance between profitability and sustainability! Have fun and fish on!",
    // dialogues 11 - 12
    "Looks like your competitor this month is going to overfish more than they should. The TRAGEDY OF THE COMMONS is when individuals use shared resources in their own self-interest and degrade them because they don’t directly suffer the negative consequences. Be careful of overfishing yourself as your competitors will try to match that!",
    "Hey, I noticed you've been doing a lot of fishing lately. The fish population seems to be decreasing rapidly. OVERFISHING can have serious consequences for the marine ecosystem, causing trophic cascades or a ripple effect on other species like sharks that survive upon the fishes we are fishing, decreasing biodiversity, and can even cause your fishery to collapse. It's important to maintain a balance between catching fish and allowing the population to replenish.",
    // dialogue 13 - 22
    "Looks like too many fish were caught last month and the increased SUPPLY outweights the DEMAND lessened. Consequently, fish prices will decrease this month. You may need to overfish to compensate for the price loss",
    "Looks like too few fish were caught last month and the DEMAND outweights the decreased SUPPLY. Consequently, fish prices will increase this month",
    "Looks like we're in an ECONOMIC RECESSION, which is a general decline in economic activity and may lead to inflation. Consequently, operating costs will increase this month. You may need to overfish to compensate for the greater costs",
    "Looks like there is some POLLUTION that's causing harm to the fish. Consequently, fish populations have decreased this month.",
    "Looks like many ocean CLEANUPS are happening this month! Consequently, the fish population has increased this month.",
    "Looks like there's an EXTREME WEATHER EVENT and the waters have warmed. Periods like this, particularly EL NINO years, harm fish populations and reproduction. Consequently, the fish may not reproduce as much this month.",
    "Looks like there's good weather this month! Consequently, the fish will reproduce more this month",
    "Looks like there was an OIL SPILLAGE, which harm the ecosystem in the surronding area! Consequntly, fish populations will decrease this month.",
    "Looks like there is a huge THUNDERSTORM! Consequently, operating costs will increase this month",
    "Uh oh! It appears that some GOVERNMENT REGULATIONS have been lifted. This is extremely bad because the BIGGEST PREVENTION of overfishing is government regulations. Conseqeuntly, your competitors will catch more fish due to lack of enforcement.",  
  ];
}

function displayMsg(msg, font, size, color, x, y, w, start, count) {
  textFont(font);
  textSize(size);
  fill(color);

  let newMsg = msg.substr(start);
  let length = newMsg.length;
  let maxLength = false;

  if (count <= length) {
    let chrs = 0
    let str_length = 0
    let msg_str = ""
    let lines = 1;

    for (let i = 0; i < count; i++) {
      str_length += textWidth(newMsg[i]);
      if (str_length > w) {
        str_length = 0;
        msg_str += "\n";
        lines += 1;
      }

      if (lines > 4) {
        maxLength = true;
        break;
      }

      msg_str += newMsg[i];
      chrs += 1;
      str_length += textWidth(newMsg[i]);
    }
    text(msg_str, x, y);
  }
  return maxLength;
}