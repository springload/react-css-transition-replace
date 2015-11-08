### v1.0.0 (8 November 2015)

* [ENHANCEMENT] Publish the demo page on [`gh-pages`](http://marnusw.github.io/react-css-transition-replace/).
* [ENHANCEMENT] Added a demo page; to view run `npm install` and `gulp demo`.
* [ENHANCEMENT] Allow in place transitions fully configurable in CSS.
* [ENHANCEMENT] Use `ReactCSSTransitionGroupChild` rather than defining yet another child wrapper.
* [ENHANCEMENT] More stable implementation which does not call `setState` in `componentDidUpdate` among other improvements.
 
### v0.2.1 (26 October 2015)

* [UPGRADE] Upgrade React.js to v0.14.0.
 
### v0.2.0 (28 September 2015)

* [DEPENDENCY] Removed the `classnames` dependency. 
* [ENHANCEMENT] The `${transitionName}-height` class is only added while the height transition is active.
* [ENHANCEMENT] The `ReactCSSTransitionReplace` component require `transitionEnterTimeout` etc. props like `ReactCSSTransitionGroup`.
* [UPGRADE] Upgrade React.js to v0.14.0-rc1.

### v0.1.4 (9 September 2015)

* [BUGFIX] Using React's `object.assign` method to be ES5 compatible which was the intent. (#2)

### v0.1.3 (12 August 2015)

* [BUGFIX] Added the `classnames` dependency to `package.json`. (#1)
* [ENHANCEMENT] The `style` prop rules are maintained while animating, only overriding the necessary style rules.
* [ENHANCEMENT] Stricter and fully configured linting rules.
* [DOCUMENTATION] Fixed a typo.

### v0.1.2 (10 August 2015)

Initial release.