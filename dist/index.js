'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var moment = _interopDefault(require('moment'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Day = function (_Component) {
  inherits(Day, _Component);

  function Day() {
    classCallCheck(this, Day);
    return possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));
  }

  createClass(Day, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          today = _props.today,
          date = _props.date,
          selected = _props.selected,
          classes = _props.classes,
          handleClick = _props.handleClick,
          children = _props.children;


      var classNames = ['Day'];
      if (today.isSame(date, 'day')) {
        classNames.push('today');
      }
      if (selected && selected.isSame(date, 'day')) {
        classNames.push('selected');
      }

      var body = void 0;
      if (!!children) {
        body = children;
      } else {
        body = React__default.createElement(
          'button',
          {
            className: 'Day-inner',
            onClick: function onClick() {
              return handleClick(date);
            },
            type: 'button'
          },
          date.format('D')
        );
      }

      return React__default.createElement(
        'td',
        {
          className: [].concat(classNames, toConsumableArray(classes)).join(' '),
          'data-date': date.toISOString(),
          'data-day': date.format('D')
        },
        body
      );
    }
  }]);
  return Day;
}(React.Component);

Day.propTypes = {
  handleClick: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  today: PropTypes.object.isRequired,
  selected: PropTypes.object,
  children: PropTypes.node
};

var DayOfWeek = function DayOfWeek(_ref) {
  var date = _ref.date;
  return React__default.createElement(
    'th',
    { className: 'DayOfWeek' },
    date.format('dd')
  );
};

DayOfWeek.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired
};

var Week = function Week(_ref) {
  var children = _ref.children;
  return React__default.createElement(
    "tr",
    { className: "Week" },
    children
  );
};

var Calendar = function (_Component) {
  inherits(Calendar, _Component);

  function Calendar(props) {
    classCallCheck(this, Calendar);

    var _this = possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    var date = props.date;
    var month = void 0;
    if (date) {
      month = props.date;
    } else {
      month = props.month;
    }
    _this.state = {
      date: date,
      month: month
    };

    _this.previous = _this.previous.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  createClass(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      moment.locale(this.props.locale);

      if (!!this.state.date) {
        this.state.date.locale(this.props.locale);
      }

      this.state.month.locale(this.props.locale);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      moment.locale(this.props.locale);

      if (!!nextState.date) {
        nextState.date.locale(this.props.locale);
      }

      nextState.month.locale(this.props.locale);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(date) {
      var flag = this.props.onSelect(date, this.state.date, this.state.month);

      if (flag === true) {
        this.setState({
          date: moment(date)
        });
      } else if (flag === false) {
        this.setState({
          date: null
        });
      }
    }
  }, {
    key: 'previous',
    value: function previous() {
      this.setState({
        month: moment(this.state.month).subtract(1, 'month')
      });
    }
  }, {
    key: 'next',
    value: function next() {
      this.setState({
        month: moment(this.state.month).add(1, 'month')
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          startOfWeekIndex = _props.startOfWeekIndex,
          dayRenderer = _props.dayRenderer;


      var classes = ['Calendar', this.props.className].join(' ');

      var today = moment();

      var date = this.state.date;
      var month = this.state.month;

      var current = month.clone().startOf('month').day(startOfWeekIndex);
      if (current.date() > 1 && current.date() < 7) {
        current.subtract(7, 'd');
      }

      var end = month.clone().endOf('month').day(7 + startOfWeekIndex);

      if (end.date() > 7) {
        end.subtract(7, 'd');
      }

      var elements = [];
      var days = [];
      var week = 1;
      var i = 1;
      var daysOfWeek = [];
      var day = current.clone();
      for (var j = 0; j < 7; j++) {
        var dayOfWeekKey = 'dayOfWeek' + j;
        daysOfWeek.push(React__default.createElement(DayOfWeek, { key: dayOfWeekKey, date: day.clone() }));
        day.add(1, 'days');
      }
      while (current.isBefore(end)) {
        var dayClasses = this.props.dayClasses(current);
        if (!current.isSame(month, 'month')) {
          dayClasses = dayClasses.concat(['other-month']);
        }
        var props = {
          date: current.clone(),
          selected: date,
          month: month,
          today: today,
          classes: dayClasses,
          handleClick: this.handleClick
        };

        var children = void 0;
        if (!!dayRenderer) {
          children = dayRenderer(props);
        }

        days.push(React__default.createElement(
          Day,
          _extends({ key: i++ }, props),
          children
        ));
        current.add(1, 'days');
        if (current.day() === startOfWeekIndex) {
          var weekKey = 'week' + week++;
          elements.push(React__default.createElement(
            Week,
            { key: weekKey },
            days
          ));
          days = [];
        }
      }

      var nav = void 0;

      if (this.props.useNav) {
        nav = React__default.createElement(
          'tr',
          { className: 'month-header' },
          React__default.createElement(
            'th',
            { className: 'nav previous' },
            React__default.createElement(
              'button',
              { className: 'nav-inner', onClick: this.previous, type: 'button' },
              '\xAB'
            )
          ),
          React__default.createElement(
            'th',
            { colSpan: '5' },
            React__default.createElement(
              'span',
              { className: 'month' },
              month.format('MMMM')
            ),
            ' ',
            React__default.createElement(
              'span',
              { className: 'year' },
              month.format('YYYY')
            )
          ),
          React__default.createElement(
            'th',
            { className: 'nav next' },
            React__default.createElement(
              'button',
              { className: 'nav-inner', onClick: this.next, type: 'button' },
              '\xBB'
            )
          )
        );
      } else {
        nav = React__default.createElement(
          'tr',
          { className: 'month-header' },
          React__default.createElement(
            'th',
            { colSpan: '7' },
            React__default.createElement(
              'span',
              { className: 'month' },
              month.format('MMMM')
            ),
            ' ',
            React__default.createElement(
              'span',
              { className: 'year' },
              month.format('YYYY')
            )
          )
        );
      }

      return React__default.createElement(
        'table',
        { className: classes },
        React__default.createElement(
          'thead',
          null,
          nav
        ),
        React__default.createElement(
          'thead',
          null,
          React__default.createElement(
            'tr',
            { className: 'days-header' },
            daysOfWeek
          )
        ),
        React__default.createElement(
          'tbody',
          null,
          elements
        )
      );
    }
  }]);
  return Calendar;
}(React.Component);

Calendar.defaultProps = {
  month: moment(),
  dayClasses: function dayClasses() {
    return [];
  },
  useNav: true,
  locale: 'en',
  startOfWeekIndex: 0
};
Calendar.propTypes = {
  onSelect: PropTypes.func.isRequired,
  date: PropTypes.object,
  month: PropTypes.object,
  dayClasses: PropTypes.func,
  useNav: PropTypes.bool,
  locale: PropTypes.string,
  startOfWeekIndex: PropTypes.number,
  dayRenderer: PropTypes.func
};

module.exports = Calendar;
//# sourceMappingURL=index.js.map
