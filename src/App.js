import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form/Form";
import { addChildDispatcher, addRootDispatcher } from "./state/configureStore";

// The code became a bit messy but it is working till two levels (one root and one child). Had some doubts as well but since it is
// late night, can't ask anyone so implemented the functionality to the best of my understanding. Due to lack of time (had to do some
// office work as well), couldn't do more.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      isRoot: false,
      addChildren: false,
      rootName: null,
      childName: null,
    };
    this.noOfRootsCount = -1;
    this.noOfChildrenCount = -1;
  }

  addRootClickHandler = () => {
    this.setState((prevState) => {
      return { isRoot: !prevState.isRoot, addChildren: false };
    });
  };

  addRootNameChangeHandler = (event) => {
    if (this.state.isRoot && !this.state.addChildren) {
      this.setState({ rootName: event.target.value });
    } else if (this.state.addChildren) {
      this.setState({ childName: event.target.value });
    }
  };

  submitRootHandler = () => {
    if (this.state.isRoot && !this.state.addChildren) {
      this.props.addRootDispatcher(this.state.rootName, ++this.noOfRootsCount);
    } else if (this.state.addChildren) {
      this.props.addChildDispatcher(
        this.state.childName,
        ++this.noOfChildrenCount,
        this.noOfRootsCount
      );
    }

    this.setState({ isRoot: false, addChildren: true });
  };

  render() {
    const nodes = Object.keys(this.props.root);
    return (
      <div className="App">
        <div id="left-hand-component" className="component">
          <ul>
            {nodes?.map((item) => {
              let hasChild = this.props.root[item] !== null;
              return (
                <li key={item}>
                  {item}
                  {hasChild ? (
                    <ul>
                      {Object.keys(this.props.root[item]).map((item) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        <div id="right-hand-component" className="component">
          <div className="button-container">
            <button
              className="add-root-button"
              onClick={this.addRootClickHandler}
            >
              Add Root
            </button>
          </div>
          {this.state.isRoot ? (
            <Form
              nodeType={"Root"}
              addRootNameChangeHandler={this.addRootNameChangeHandler}
              submitRootHandler={this.submitRootHandler}
            />
          ) : null}
          {this.state.addChildren ? (
            <Form
              nodeType="Child"
              addRootNameChangeHandler={this.addRootNameChangeHandler}
              submitRootHandler={this.submitRootHandler}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    root: state.rootReducer.root,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRootDispatcher: (data, id) => dispatch(addRootDispatcher(data, id)),
    addChildDispatcher: (data, childId, RootId) =>
      dispatch(addChildDispatcher(data, childId, RootId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
