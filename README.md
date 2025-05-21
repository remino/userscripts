userscripts
===========

[Rémino Rem](https://remino.net/)

Collection of bookmarklets, userscripts, and userstyles.

- [Code](https://github.com/remino/userscripts)
- [Site](https://remino.github.io/userscripts/)

---

<!-- mtoc-start -->

* [Bookmarklets](#bookmarklets)
  * [Usage](#usage)
  * [Development](#development)
  * [Details](#details)
* [Userscripts](#userscripts)
* [Userstyles](#userstyles)

<!-- mtoc-end -->

## Bookmarklets

### Usage

You can import the bookmarks in [bookmarklets/index.html](bookmarklets/index.html) into any browser you choose. This will add all the bookmarklets at once.

### Development

The source code of each bookmarklet is stored in the `bookmarklets`.

To create a new bookmarklet:

- Make sure you initialized the repo: `nvm install && nvm use && pnpm install`
- Copy `_template.bookmarklet.js` to `123-name.bookmarklet.js`, with the number and name of your choice. (The number is used to order bookmarklets in the `bookmarklets.html` file.)
- Write your code.
- Run `pnpm start`.

The new bookmarklet should be found in `bookmarklets/index.html`.

### Details

Some bookmarklets have their own page:

- [Contrast Checker](https://remino.github.io/userscripts/bookmarklets/contrast-checker/)
- [Japaste](https://remino.github.io/userscripts/bookmarklets/japaste/)

## Userscripts

To install any userscript in the `userscripts` directory, you need a userscript manager. Some include [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/) (both for Firefox and Chrome), and [Userscripts](https://github.com/quoid/userscripts) (for Safari).

## Userstyles

To install any userstyle in the `userstyles` directory, you need a userstyle manager. Some include [Stylus](https://add0n.com/stylus.html) (for Firefox and Chrome), and [Userstyles](https://github.com/quoid/userscripts) (for Safari).
