import React, { Component } from "react";
import axios from "axios";
import image from "./irrigatie.jpg";
import "./styles.css";
class App extends Component {
  state = {
    temp: null,
    humidity: null,
    soil: null,
    predict: false,
    result: null
  };

  valueChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  predict = () => {
    console.log(this.state);
    axios
      .post(
        "http://0.0.0.0:5000/predict",
        {
          Temperature: this.state.temp,
          Humidity: this.state.humidity,
          SoilMoisture: this.state.soil
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        let text = "";
        if (res.data.result === 1) text = "very high water requirements";
        else if (res.data.result === 2) text = "high water requirements";
        else if (res.data.result === 3) text = "Average water requirements";
        else if (res.data.result === 4) text = "low water requirements";
        else if (res.data.result === 5) text = "no water requirements";

        this.setState({
          predict: true,
          result: text
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="Header">
          <h1 id="mainHeading">Irrigation Project</h1>
          <img src={image} alt="sprinkler_image" />
          <p id="description">
            This website gives a description on the agriculture senario in India
            today.
          </p>
          <br />
          <br />
          <p id="quote">
            The man who has grit enough to bring about the afforestation or the
            irrigation of a country is not less worthy of honor than its
            conqueror.
          </p>
        </div>
        <div className="inputs">
          <label class="varNames">Enter Temperature</label>
          {console.log(this.state)}
          <input
            className="variables"
            type="text"
            id="temp"
            placeholder="Temperature"
            onChange={(e) => this.valueChange(e)}
            value={this.state.temp}
          />
          <br />
          <label class="varNames">Enter Humidity</label>
          <input
            className="variables"
            type="text"
            id="humidity"
            placeholder="Humidity"
            onChange={(e) => this.valueChange(e)}
            value={this.state.humidity}
          />
          <br />
          <label class="varNames">Enter Soil Moisture</label>
          <input
            className="variables"
            type="text"
            id="soil"
            placeholder="Soil Moisture"
            onChange={(e) => this.valueChange(e)}
            value={this.state.soil}
          />
          <br />
          <button class="btn" onClick={() => this.predict()}>
            Submit
          </button>
          {this.state.predict ? (
            <div>
              <h4>{`${this.state.result}`}</h4>
              <p></p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
