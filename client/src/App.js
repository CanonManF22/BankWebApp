import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div className="App">
        <form>
          <label>
              userame:
              <input type="text" name="name" />
            </label>
          <input type="submit" value="Submit" />
        </form>   
      </div>
    );
  }
}

export default App;
