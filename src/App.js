import React from "react";
import NewCardForm from "./Components/Form";
import Cards from "./Components/Cards";

const App = () => {
  const uniqueId = () => {
    return `id ${Math.floor(Math.random() * 10000)}`;
  };
  const [data, setData] = React.useState([
    {
      id: uniqueId(),
      publisher: "CNN",
      textInput:
        "The First stock-market `correction since October has begun,` says Morgan Stanley analyst who called 2021 tech rout",
      media_type: "",
      date: "2022-05-09T18:07",
    },
    {
      id: uniqueId(),
      publisher: "Houston Cronicle",
      textInput:
        "The case for Jaden Schwartz, his absence on the left side will be another difficult gap",
      media_type:
        "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bb35f0-99d5-11ec-bfff-46b1df77f3a4",
      date: "2022-03-09T18:07",
    },
    {
      id: uniqueId(),
      publisher: "Yahoo!",
      textInput:
        "Lady Gaga Pays homeage to Italy as `House of Gucci` Wraps Filming and bids adieu to Italy",
      media_type:
        "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bbab20-99d5-11ec-bbef-9427ff56467b",
      date: "2022-05-09T18:07",
    },
  ]);

  const [editCard, setEditCard] = React.useState(null);
  console.log(data, "this is the data in the App comp");
  function handleEditCard(cardData) {
    setEditCard(cardData);
  }

  //attempting to pass in form info to cards
  const completedCards = data.map((dataSet) => {
    return (
      <Cards
        handleClick={() => handleEditCard(dataSet)}
        key={dataSet.id}
        title={dataSet.publisher}
        text={dataSet.textInput}
        media={dataSet.media_type}
        date={dataSet.date}
        onClick={
          ((e) => e.currentTarget.focus(), console.log("this is focued"))
        }
      />
    );
  });

  return (
    <div className="App">
      <NewCardForm clickedCard={editCard} setData={setData} />
      <div className="deck_of_cards">{completedCards}</div>
    </div>
  );
};

export default App;
