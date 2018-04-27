import React, { Component } from 'react';
import './App.css';

const OPTIONS = {
  Good: 'hyvä',
  Neutral: 'neutraali',
  Bad: 'huono',
};

const Button = (props) => {
  const style = {
    margin: '10px',
  };
  return <button {...props} style={style} />;
};

const Header = ({ label }) => <h1>{label}</h1>;
const Choices = ({ choices, choose }) => (<div>
  {choices.map(choice =>
    <Button type="button" onClick={() => choose(choice)} key={choice}>{OPTIONS[choice]}</Button>)}
</div>);

const getHistoryPerButton = history =>
  Object.keys(history).map(key => <p>{`${OPTIONS[key]} ${history[key]}`}</p>);

const getTotalClicks = (history) => 
  Object.keys(history).reduce((accumulator, option) => accumulator + history[option], 0);

const getPositiveClickPct = (history) => {
  const totalClicks = getTotalClicks(history);
  if (totalClicks === 0){
    return null;
  }
  const positiveClicks = history.Good;
  const avgPct = (positiveClicks / totalClicks) * 100;
  return <p>positiivisia { avgPct.toFixed(1) } %</p>;
};


const getClickAvg = (history) => {
  const totalClicks = getTotalClicks(history);
  if (totalClicks === 0){
    return null;
  }
  const avgPoints = (history.Good - history.Bad) / totalClicks;
  return <p>keskiarvo { avgPoints.toFixed(1) }</p>;
};

const Stats = ({ history }) => (<div>
  { getHistoryPerButton(history) }
  { getClickAvg(history)}
  { getPositiveClickPct(history) }
</div>);

class App extends Component {
  constructor() {
    super();
    this.state = {
      history: Object.keys(OPTIONS).reduce((history, option) => {
        history[option] = 0;
        return history;
      }, {}),
    };
  }
  onSelect(value) {
    this.setState(({ history }) => {
      ++history[value];
      return { history };
    });
  }
  render() {
    const { history } = this.state;
    return (
      <div>
        <Header label="anna palautetta" />
        <Choices choices={Object.keys(OPTIONS)} choose={value => this.onSelect(value)} />
        <Header label="statistiikka" />
        <Stats history={history} />
      </div>
    );
  }
}

export default App;
