import { connect } from "react-redux";
// import { Button, Container } from "react-bootstrap";
import {
  increaseCounter,
  decreaseCounter,
  resetCounter,
} from "redux/action/counter";

function Counter(props) {
  return (
    <>
      <div className="text-center">
        <h1>Counter</h1>
        <hr />
        <h3>{props.counter.count}</h3>
        <button variant="primary" onClick={props.decreaseCounter}>
          -
        </button>
        <button
          variant="secondary"
          className="mx-2"
          onClick={props.resetCounter}
        >
          RESET
        </button>
        <button variant="primary" onClick={props.increaseCounter}>
          +
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = { increaseCounter, decreaseCounter, resetCounter };
// (null, mapDispatchToProps)
// (mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
