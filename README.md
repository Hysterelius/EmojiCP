# Emoji CP
<img align="right" src="Assets\ContactPhotoExample.jpg" width=400px>
Everyone in my contacts is an emoji, I use this emoji to describe them to me. So, I made a simple program that allows for the creation and downloading of these emoji contact photos.


## Contents:
- [Emoji CP](#emoji-cp)
  - [Contents:](#contents)
  - [Workings:](#workings)
  - [Usage:](#usage)


## Workings:
The program uses javascript to render an SVG emoji taken from [Twitter's emojis](https://github.com/twitter/twemoji) onto a gradient background of the user's choosing. The program first receives an event from [emoji picker](https://github.com/nolanlawson/emoji-picker-element), which it then passes to `twemoji.parse()` which parses it as an SVG image - that is then called from the server using `getText()`. This image is the raw SVG code, which is then edited to add `width` and `height` tags so the SVG changes size with the canvas. This edited SVG is then added to the canvas using `drawInlineSVG()`.

## Usage:
1. Open the folder where you want _Emoji CP_ to be installed in
2. `git clone https://github.com/Hystersis/EmojiCP`
3. Open the `index.html` file in your browser either by right-clicking on it and opening it in the browser, or go to `C:/path/to/file/index.html`
4. Enjoy! 🎉

[MIT](/LICENSE) **Copyright** [Hystersis](https://github.com/Hystersis)
