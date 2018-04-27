import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = props => <h1>{props.kurssi}</h1>;
const Sisalto = props => <div>{props.osat.map(osa=><Osa {...osa} />)}</div>;
const Yhteensa = props => (<p>yhteensä {
    props.osat.reduce((yhteensa, osa)=> yhteensa+osa.tehtavia, 0)
   } tehtävää
  </p>);
const Osa = props => <p>{props.nimi} {props.tehtavia}</p>;


const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
      }
    ]
  };

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
export default App;
