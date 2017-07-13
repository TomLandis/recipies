"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// for first visit
var arrayOfObjects = [{ name: "Okonomiyaki", inIt: "pork, flour, water" }, {
  name: "chili",
  inIt: "pork, beans, tomatoes, onions, garlic, spicy peppers"
}, { name: "HamSandwich", inIt: "ham, bread" }];
var z = 100;
var ob = arrayOfObjects;
//convert array to string prior to local storage
var stringIt = function stringIt(arr) {
  var jas = JSON.stringify(arr);
  return jas;
};
//convert string back to array for mapping
var arrIt = function arrIt(str) {
  var jas = JSON.parse(str);
  return jas;
};
// check for previous visits if first visit plug in sample recipies
if (!localStorage.Recipies) {
  localStorage.Recipies = stringIt(ob);
}

var EditRecButton = function (_React$Component) {
  _inherits(EditRecButton, _React$Component);

  function EditRecButton(props) {
    _classCallCheck(this, EditRecButton);

    return _possibleConstructorReturn(this, _React$Component.call(this));
  }

  EditRecButton.prototype.render = function render() {
    return React.createElement(
      "button",
      {
        className: "btn btn-success",
        "data-toggle": "modal",
        "data-target": "#myModal3"
      },
      "Edit A Recipe"
    );
  };

  return EditRecButton;
}(React.Component);

var EditForm = function (_React$Component2) {
  _inherits(EditForm, _React$Component2);

  function EditForm(props) {
    _classCallCheck(this, EditForm);

    return _possibleConstructorReturn(this, _React$Component2.call(this));
  }

  EditForm.prototype.edit = function edit(id) {
    // console.log(id);
    this.props.editor(id);
  };

  EditForm.prototype.render = function render() {
    var _this3 = this;

    var gen = this.props.reci.map(function (data) {
      return React.createElement(
        "div",
        null,
        " ",
        React.createElement(
          "button",
          {
            "data-dismiss": "modal",
            className: "btn btn-success",
            key: data.name,
            id: data.name,
            onClick: function onClick() {
              return _this3.edit(data.name);
            }
          },
          "Edit ",
          data.name
        ),
        " "
      );
    });
    return React.createElement(
      "div",
      null,
      gen
    );
  };

  return EditForm;
}(React.Component);

var DeleteButtons = function (_React$Component3) {
  _inherits(DeleteButtons, _React$Component3);

  function DeleteButtons(props) {
    _classCallCheck(this, DeleteButtons);

    return _possibleConstructorReturn(this, _React$Component3.call(this));
  }

  DeleteButtons.prototype.remove = function remove(id) {
    // console.log(id);
    this.props.removeRec(id);
  };

  DeleteButtons.prototype.render = function render() {
    var _this5 = this;

    var gen = this.props.reci.map(function (data) {
      return React.createElement(
        "div",
        null,
        " ",
        React.createElement(
          "button",
          {
            "data-dismiss": "modal",
            className: "btn btn-danger",
            key: data.name,
            id: data.name,
            onClick: function onClick() {
              return _this5.remove(data.name);
            }
          },
          "Delete ",
          data.name
        ),
        " "
      );
    });
    return React.createElement(
      "div",
      null,
      gen
    );
  };

  return DeleteButtons;
}(React.Component);

var Credits = function (_React$Component4) {
  _inherits(Credits, _React$Component4);

  function Credits(props) {
    _classCallCheck(this, Credits);

    return _possibleConstructorReturn(this, _React$Component4.call(this));
  }

  Credits.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "credit" },
      React.createElement(
        "h5",
        null,
        "built by ",
        React.createElement("br", null),
        "Tom Landis ",
        React.createElement("br", null),
        "in",
        React.createElement(
          "strong",
          null,
          React.createElement(
            "a",
            null,
            " React.js"
          )
        ),
        " "
      )
    );
  };

  return Credits;
}(React.Component);

var App = function (_React$Component5) {
  _inherits(App, _React$Component5);

  function App(props) {
    _classCallCheck(this, App);

    var _this7 = _possibleConstructorReturn(this, _React$Component5.call(this));

    _this7._addRec = _this7._addRec.bind(_this7);
    _this7._delRec = _this7._delRec.bind(_this7);
    _this7.editor = _this7.editor.bind(_this7);
    var trans = localStorage.Recipies;
    trans = arrIt(trans);
    _this7.state = { data: trans };
    return _this7;
  }

  App.prototype.editor = function editor(id) {
    var grab = this.state.data;
    var ingred = undefined;

    for (var i = 0; i < grab.length; i++) {
      if (grab[i].name === id) {
        ingred = grab[i].inIt;
      }
    }

    this._delRec(id);
    recTitle.value = id;
    recIngred.value = ingred;
    newR.click();
  };

  App.prototype._addRec = function _addRec() {
    var item = recTitle.value;
    var inside = recIngred.value;

    var newData = [];
    //this regEx is here to fix a problem with the accordian not being openable if the title has spaces
    var str = item.replace(/\s+/g, '');
    str = str.replace(/[0-9]/g, '');

    if (str == "" || inside == "" || inside == undefined || str == undefined) {
      alert("The Cook is only as good as the instructions he is given!!!");
      return;
    } else {

      var newRec = { name: str, inIt: inside };
      newData = this.state.data;
      newData.push(newRec);
      recTitle.value = "";
      recIngred.value = "";
      this.setState({ data: newData });
      var trans = stringIt(newData);

      localStorage.Recipies = trans;
    }
  };

  App.prototype._delRec = function _delRec(id) {
    var filter = this.state.data;
    var yes = [];

    for (var i = 0; i < filter.length; i++) {
      if (filter[i].name !== id) {
        yes.push(filter[i]);
      }
    }

    this.setState({ data: yes });
    var trans = stringIt(yes);
    localStorage.Recipies = trans;
  };

  App.prototype.render = function render() {
    var reci = this.state.data;
    var dishes = reci.map(function (data) {
      return data.name;
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h2",
        null,
        "My Favorite Recipies"
      ),
      React.createElement(
        "button",
        {
          id: "newR",
          className: "btn btn-primary",
          "data-toggle": "modal",
          "data-target": "#myModal"
        },
        "NEW RECIPE",
        " "
      ),
      React.createElement(EditRecButton, null),
      React.createElement(
        "div",
        {
          className: "modal fade",
          id: "myModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel"
        },
        React.createElement(
          "div",
          { className: "modal-dialog", role: "document" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                {
                  type: "button",
                  "class": "close",
                  "data-dismiss": "modal",
                  "aria-label": "Close",
                  onClick: this._addRec
                },
                React.createElement(
                  "span",
                  { "aria-hidden": "true" },
                  "×"
                )
              ),
              React.createElement(
                "h4",
                { className: "modal-title", id: "myModalLabel" },
                "Recipe for..."
              ),
              React.createElement("input", { type: "text", id: "recTitle" })
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              "Ingredients: ",
              React.createElement("input", { type: "text", id: "recIngred" })
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-default",
                  "data-dismiss": "modal",
                  onClick: this._addRec
                },
                "Close"
              ),
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-primary",
                  onClick: this._addRec,
                  "data-dismiss": "modal"
                },
                "Save Recipe"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { id: "accordion", role: "tablist", "aria-multiselectable": "true" },
        reci.map(function (data) {
          return React.createElement(
            "div",
            { className: "card" },
            React.createElement(
              "div",
              { className: "card-header", role: "tab", id: data.index },
              React.createElement(
                "p",
                { className: "mb-0" },
                React.createElement(
                  "a",
                  {
                    "data-toggle": "collapse",
                    "data-parent": "#" + data.index,
                    href: "#" + data.name + "C",
                    "aria-expanded": "false",
                    "aria-controls": data.name + "C"
                  },
                  data.name
                )
              )
            ),
            React.createElement(
              "div",
              {
                id: data.name + "C",
                className: "collapse hide",
                role: "tabpanel",
                "aria-labelledby": data.index
              },
              React.createElement(
                "div",
                { className: "card-block" },
                data.inIt
              )
            )
          );
        })
      ),
      React.createElement(
        "button",
        {
          className: "btn btn-danger",
          "data-toggle": "modal",
          "data-target": "#myModal2"
        },
        "Delete A Recipe"
      ),
      React.createElement(
        "div",
        {
          className: "modal fade",
          id: "myModal2",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel"
        },
        React.createElement(
          "div",
          { className: "modal-dialog", role: "document" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                {
                  type: "button",
                  "class": "close",
                  "data-dismiss": "modal",
                  "aria-label": "Close"
                },
                React.createElement(
                  "span",
                  { "aria-hidden": "true" },
                  "×"
                )
              ),
              React.createElement("h4", { className: "modal-title", id: "myModalLabel" })
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(DeleteButtons, { removeRec: this._delRec, reci: reci })
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-default",
                  "data-dismiss": "modal"
                },
                "Close"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        {
          className: "modal fade",
          id: "myModal3",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel"
        },
        React.createElement(
          "div",
          { className: "modal-dialog", role: "document" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                {
                  type: "button",
                  "class": "close",
                  "data-dismiss": "modal",
                  "aria-label": "Close"
                },
                React.createElement(
                  "span",
                  { "aria-hidden": "true" },
                  "×"
                )
              ),
              React.createElement("h4", { className: "modal-title", id: "myModalLabel" })
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(EditForm, { editor: this.editor, reci: reci })
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-default",
                  "data-dismiss": "modal"
                },
                "Close"
              )
            )
          )
        )
      ),
      React.createElement(Credits, null)
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("App"));