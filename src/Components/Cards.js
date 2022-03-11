import React from "react";

export default function Cards(props) {
  const selectedCard = React.createRef();
  React.useEffect(() => {
    selectedCard.current.focus();
  }, []);
  const imgUrl =
    "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bb35f0-99d5-11ec-bfff-46b1df77f3a4";
  const videoUrl =
    "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bbab20-99d5-11ec-bbef-9427ff56467b";

  return (
    <div
      className="NewCards"
      key={props.id}
      onClick={props.handleClick}
      ref={selectedCard}
    >
      <section className="card_info">
        <h2 className="publisher_title">{props.title} </h2>
        <p className="text_paragraph"> {props.text} </p>
        <span className="time_published">{props.date}</span>
      </section>
      <section className="media_display">
        {props.media && (
          <img src={props.media === `Image` ? imgUrl : videoUrl} />
        )}
      </section>
    </div>
  );
}
