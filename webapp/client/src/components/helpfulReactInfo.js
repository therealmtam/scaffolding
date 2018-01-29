// HELPFUL REACT INFO:

//-----------------------------------------------
// General Notes:

  1) JSX allows you to transform plain React:

    React.createElement("div", { className: "red" }, "Children Text");
    React.createElement(MyCounter, { count: 3 + 5 });

    React.createElement(
      DashboardUnit,
      { "data-index": "2" },
      React.createElement("h1", null, "Scores"),
      React.createElement(Scoreboard, { className: "results", scores: gameScores })
    );

  into

    < div className = "red" > Children Text</div >;
    <MyCounter count={3 + 5} />;

    // Here, we set the "scores" attribute below to a JavaScript object.
    var gameScores = {
      player1: 2,
      player2: 5
    };
    <DashboardUnit data-index="2">
      <h1>Scores</h1>
      <Scoreboard className="results" scores={gameScores} />
    </DashboardUnit>;

  Reference: http://buildwithreact.com/tutorial/jsx

  JSX requires a transpiler to convert it into regular JS.
  JSX appears like HTML but has a few difference such as how it
  requires camelCase, the use of className and not class, etc.


  2) Airbnb Style Guide will want you to use ES6 destructuring
  when passing in props to stateless React components:

  const StatelessComponent = (props) => (
    <div>
      <p>{this.props.prop1}</p>
      <p>{this.props.prop2}</p>
    </div>
  );

  should be:

  const StatelessComponent = ({prop1, prop2}) => (
    <div>
      <p>{prop1}</p>
      <p>{prop2}</p>
    </div>
  );

  3) Importing and Exporting React Components:

    a) It is necessary to import React into every module:

       import React from 'react';

       at the top of each module IF it includes any JSX
       because the transpiler will convert the JSX:

       <div></div> => React.createElement(...)

       and if React is not imported into that module, the
       execution context will not contain React.createElement
       as a method.

    b) You can Export in different ways:

        export default <component name>
        module.exports = Component1;
        module.exports = {
          Component1: Component1,
          Component2: Component2
        }

    c) And React.component can be replaced with

      import React, { Component } from 'react';

  4) State can ONLY be changed via setState AFTER the first time
  the React component is mounted. So you can initialize the state to
  a passed in prop. But that state will not update when that prop is
  updated because it is already AFTER the component has been mounted.

  ex. this.state = { state1: this.props.prop1 }

  5) Use PropTypes to throw WARNINGS into the console during runtime
  so that other developers using your code will be warned if they are
  improperly passing in props to a component.

  6) Place CSS style sheets in the HEAD tag because:

    It is recommended because when you have the CSS declared before <body> starts,
    your styles has actually loaded already. So very quickly users see something
    appear on their screen (e.g. background colors). If not, users see blank screen
    for some time before the CSS reaches the user.

    Also, if you leave the the styles somewhere in the <body>, the browser has to
    re-render the page (new and old when loading) when the styles declared has
    been parsed.

//-----------------------------------------------
// Inline React Component Styling:
/*
  Notes:
  Inline styling is done as seen below.
*/

<button
  type="button"
  className="btn btn-outline-dark"
  style={{ backgroundColor: '#D6D6D5', fontWeight: 'bold', color: 'white' }}
  onClick={this.fn.bind(this)}
>
  esc
</button>

//-----------------------------------------------
// Capturing Input from Input Field:
/*
  Notes:
  To capture an input field, capture the specific
  event. Make sure to avoid potential event bubbling issues where
  the same event may trigger multiple event callbacks listening for
  the same event.

  Also, make sure the correct "this" is used by binding it to the function
  for event handlers.

*/

/**
 * recordSearchedUser:
 * Function keeps track, in State, of the User's input into the
 * seach-for-users input field.
 *
 * @param {Object} event - Event object
 */

recordSearchedUser(event) {
  this.setState({
    userInput: event.target.value,
  });
}

render() {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Find or start a conversation"
      aria-label="Find or start a conversation"
      onChange={this.recordSearchedUser.bind(this)}
    />
  )
}
//-----------------------------------------------
// Event Handling:
/*
  Notes:
  Use anonymous or helper functions to call the function needed.
  Make sure to have the correct 'this' binding.

  There are 2 ways to ensure 'this' is bound correctly when passing
  a function as a prop
  1) use this.fn.bind(this) and invoke it via anonymous fn => () => {this.props.fn()}
  2) use ()=> { this.fn() } and invoke it via anonymous fn => () => {this.props.fn()}

  The 2nd option delegates the 'this' assignment to the enclosing scope.
*/

fn() {
  this.setState({
  });
}

<button
  type="button"
  className="btn btn-outline-dark"
  style={{ backgroundColor: '#D6D6D5', fontWeight: 'bold', color: 'white' }}
  onClick={this.fn.bind(this)}
  //OR
  onClick={() => this.fn()} //this allows the 'this' to be delegated to the enclosing
  //context which is this react component.
>
  esc
</button>


//-----------------------------------------------
// Using Map() to Create Multiple JSX Components:
/*
  Notes:
  Use map() to returns a new array.
  Also remeber to use a unique key beside the index of
  an array.

  Reference: https://reactjs.org/docs/lists-and-keys.html
*/

<table className="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="colSpan">Table Header</th>
    </tr>
  </thead>
  <tbody>
    {
      listToDisplay.map((user, index) => (
        <tr key={index}>
          <td onClick={selectUser} value={user}>
            <img
              src={allUsersInLobby[user]}
              className="img-rounded"
              style={{ width: '70px' }}
              value={user}
              alt="Profile Pic"
            />
            <span value={user}>{user}</span>
          </td>
        </tr>
      ))
    }
  </tbody>
</table>