'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _ReactCSSTransitionGroupChild = require('react/lib/ReactCSSTransitionGroupChild');

var _ReactCSSTransitionGroupChild2 = _interopRequireDefault(_ReactCSSTransitionGroupChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Adapted from ReactCSSTransitionGroup.js by Facebook
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule ReactCSSTransitionReplace
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var reactCSSTransitionGroupChild = _react2.default.createFactory(_ReactCSSTransitionGroupChild2.default);

var TICK = 17;

function createTransitionTimeoutPropValidator(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (!props[timeoutPropName]) {
        return new Error(timeoutPropName + ' wasn\'t supplied to ReactCSSTransitionReplace: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
          return new Error(timeoutPropName + ' must be a number (in milliseconds)');
        }
    }
  };
}

var ReactCSSTransitionReplace = function (_React$Component) {
  _inherits(ReactCSSTransitionReplace, _React$Component);

  function ReactCSSTransitionReplace() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactCSSTransitionReplace);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactCSSTransitionReplace)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      currentChild: _this.props.children ? _react2.default.Children.only(_this.props.children) : null,
      nextChild: null,
      height: null
    }, _this._handleDoneAppearing = function () {
      _this.isTransitioning = false;
    }, _this._handleDoneEntering = function () {
      _this.isTransitioning = false;
      _this.setState({
        currentChild: _this.state.nextChild,
        nextChild: null,
        height: null
      });
    }, _this._handleDoneLeaving = function () {
      if (_this.isTransitioning) {
        var state = { currentChild: null };

        if (!_this.state.nextChild) {
          _this.isTransitioning = false;
          state.height = null;
        }

        _this.setState(state);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactCSSTransitionReplace, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.transitionAppear && this.state.currentChild) {
        this.appearCurrent();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // Setting false indicates that the child has changed, but it is a removal so there is no next child.
      var nextChild = nextProps.children ? _react2.default.Children.only(nextProps.children) : false;
      var currentChild = this.state.currentChild;

      if (currentChild && nextChild && nextChild.key === currentChild.key) {
        // Nothing changed, but we are re-rendering so update the currentChild.
        return this.setState({
          currentChild: nextChild
        });
      }

      // Set the next child to start the transition, and set the current height.
      this.setState({
        nextChild: nextChild,
        height: this.state.currentChild ? _reactDom2.default.findDOMNode(this.refs.curr).offsetHeight : 0
      });

      // Enqueue setting the next height to trigger the height transition.
      this.timeout = setTimeout(function () {
        var nextNode = _reactDom2.default.findDOMNode(_this2.refs.next);
        if (nextNode) {
          _this2.setState({ height: nextChild ? nextNode.offsetHeight : 0 });
        }
        _this2.timeout = null;
      }, TICK);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.isTransitioning) {
        if (this.state.nextChild) {
          this.enterNext();
        }
        if (this.state.currentChild && (this.state.nextChild || this.state.nextChild === false)) {
          this.leaveCurrent();
        }
      }
    }
  }, {
    key: 'appearCurrent',
    value: function appearCurrent() {
      this.refs.curr.componentWillAppear(this._handleDoneAppearing);
      this.isTransitioning = true;
    }
  }, {
    key: 'enterNext',
    value: function enterNext() {
      this.refs.next.componentWillEnter(this._handleDoneEntering);
      this.isTransitioning = true;
    }
  }, {
    key: 'leaveCurrent',
    value: function leaveCurrent() {
      this.refs.curr.componentWillLeave(this._handleDoneLeaving);
      this.isTransitioning = true;
    }

    // When the leave transition time-out expires the animation classes are removed, so the
    // element must be removed from the DOM if the enter transition is still in progress.

  }, {
    key: '_wrapChild',
    value: function _wrapChild(child, moreProps) {
      // We need to provide this childFactory so that
      // ReactCSSTransitionReplaceChild can receive updates to name,
      // enter, and leave while it is leaving.
      return reactCSSTransitionGroupChild((0, _objectAssign2.default)({
        name: this.props.transitionName,
        appear: this.props.transitionAppear,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave,
        appearTimeout: this.props.transitionAppearTimeout,
        enterTimeout: this.props.transitionEnterTimeout,
        leaveTimeout: this.props.transitionLeaveTimeout
      }, moreProps), child);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var currentChild = _state.currentChild;
      var nextChild = _state.nextChild;
      var height = _state.height;

      var childrenToRender = [];

      var _props = this.props;
      var overflowHidden = _props.overflowHidden;

      var containerProps = _objectWithoutProperties(_props, ['overflowHidden']);

      if (currentChild) {
        childrenToRender.push(this._wrapChild(currentChild, {
          ref: 'curr', key: 'curr'
        }));
      }

      if (height !== null) {
        containerProps.className = (containerProps.className || '') + ' ' + containerProps.transitionName + '-height';
        containerProps.style = (0, _objectAssign2.default)({}, containerProps.style, {
          position: 'relative',
          display: 'block',
          height: height
        });

        if (overflowHidden) {
          containerProps.style.overflow = 'hidden';
        }
      }

      if (nextChild) {
        childrenToRender.push(_react2.default.createElement('span', {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          },
          key: 'next'
        }, this._wrapChild(nextChild, { ref: 'next' })));
      }

      return _react2.default.createElement(this.props.component, containerProps, childrenToRender);
    }
  }]);

  return ReactCSSTransitionReplace;
}(_react2.default.Component);

ReactCSSTransitionReplace.propTypes = {
  transitionName: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.shape({
    enter: _react2.default.PropTypes.string,
    leave: _react2.default.PropTypes.string,
    active: _react2.default.PropTypes.string
  }), _react2.default.PropTypes.shape({
    enter: _react2.default.PropTypes.string,
    enterActive: _react2.default.PropTypes.string,
    leave: _react2.default.PropTypes.string,
    leaveActive: _react2.default.PropTypes.string,
    appear: _react2.default.PropTypes.string,
    appearActive: _react2.default.PropTypes.string
  })]).isRequired,

  transitionAppear: _react2.default.PropTypes.bool,
  transitionEnter: _react2.default.PropTypes.bool,
  transitionLeave: _react2.default.PropTypes.bool,
  transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
  transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
  transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave'),
  overflowHidden: _react2.default.PropTypes.bool
};
ReactCSSTransitionReplace.defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true,
  overflowHidden: true,
  component: 'span'
};
exports.default = ReactCSSTransitionReplace;