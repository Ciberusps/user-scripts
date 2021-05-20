# Steam scripts

Some [userscripts](https://en.wikipedia.org/wiki/Userscript) for steam

## How to install

- install tampermonkey for your browser - [google chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en), [other browsers](https://www.tampermonkey.net/?ext=dhdg&browser=chrome)
- install necessary script via "Quick Install" section

## Revenue calculator

Displays approximate game revenue using [Slava Gris formula](https://youtu.be/FvEBroOIKOE?t=1625)

### Quick install

https://github.com/Ciberusps/steam-scripts/raw/main/revenue-calculator/revenue-calculator.user.js

### Variables

RN - reviews number

60 - magic value that makes formula workes, is it constant that lord Gaben sended to Slava's bold head during sleep or just fucking random number that 
fit, only god knows

AGC - average game cost in all regions, calculates like US price * 0.75

WSC - without steam cut multiplier, now steam cut is 30% -> 100%-30% = 70% -> 0.7

### Formula

Gross revenue = RN * 60 * AGC

Net revenue(without taxes) = RN * 60 * AGC * WSC

![View](revenue-calculator/screenshots/1.png)