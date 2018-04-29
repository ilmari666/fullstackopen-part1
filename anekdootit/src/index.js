import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ label, onclick }) => <button style={{ margin: 10 }} onClick={onclick}>{label}</button>;

const Anecdote = ({ text }) => <p>{text}</p>;

const MostVotes = ({ votes, anecdotes }) => {
  const highestVoteCount = Math.max(...votes);
  if (highestVoteCount === 0) {
    return null;
  }
  const mostPopular = votes.indexOf(highestVoteCount);
  return (<div>
    <h1>anecdote with most votes:</h1>
    <Anecdote text={anecdotes[mostPopular]} />
    <p>has {highestVoteCount} votes</p>
  </div>);
};

class Anecdotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      votes: new Array(this.props.anecdotes.length).fill(0),
    };
  }

  getSelectRandomAnecdote() {
    return () => {
      this.setState({ selected: Math.floor(Math.random() * this.props.anecdotes.length) });
    };
  }

  getVoteAnecdote(id) {
    return () => {
      this.setState(({ votes }) => {
        const updatedVotes = [...votes];
        ++updatedVotes[id];
        return { votes: updatedVotes };
      });
    };
  }


  render() {
    const { anecdotes } = this.props;
    const { selected, votes } = this.state;
    return (
      <div>
        <Anecdote text={anecdotes[selected]} />
        <br />
        <Button label="next anecdote" onclick={this.getSelectRandomAnecdote()} />
        <Button label="vote" onclick={this.getVoteAnecdote(selected)} />
        <MostVotes votes={votes} anecdotes={anecdotes} />
      </div>
    );
  }
}

const App = () => <Anecdotes anecdotes={anecdotes} />;

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];


ReactDOM.render(<App />, document.getElementById('root'));
