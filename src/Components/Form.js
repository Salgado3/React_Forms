export default function NewCardForm(props) {
  const uniqueId = () => {
    return `id ${Math.floor(Math.random() * 10000)}`;
  };
  const initialState = {
    id: uniqueId(),
    publisher: "",
    textInput: "",
    media_Type: "",
    date: "",
  };
  const [formData, setFormData] = React.useState(initialState);
  //keeping track of inputs in form
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  //fires on button submit. need to conect to card comp
  function handleSubmit(event) {
    event.preventDefault();
    //updates Db array with new card
    props.setData((prevData) => {
      // if(props.clickedCard){
      //   prevData[formData.id] = formData
      //   return [...prevData ]
      // }
      console.log("setData is firing");
      return [...prevData, formData];
    });
    //resets form with every submit
    setFormData({ ...initialState, id: uniqueId() });
    console.log(props.data);
  }
  //handles delete button when card is clicked
  function handleDeleteCard() {
    if (props.clickedCard)
      props.setData((prevData) => {
        if (prevData.length === 1) {
          setFormData({ ...initialState, id: uniqueId() });
          return [{ initialState, id: uniqueId() }];
        }
        setFormData({ ...initialState, id: uniqueId() });
        return [...prevData.filter((x) => x.id !== props.clickedCard.id)];
      });
  }

  React.useEffect(() => {
    if (props.clickedCard) {
      setFormData(props.clickedCard);
    }
  }, [props.clickedCard]);

  return (
    <div className="NewCardForm">
      <nav className="navBar">
        <section className="newCardH1_container">
          <button form="form_NewCard" className="newCard_button">
            New Card
          </button>
          <button form="form_NewCard" className="updateCard_button">
            Update Card
          </button>
        </section>
      </nav>
      <div className="main_container">
        <form
          onSubmit={handleSubmit}
          className="publisher_Form"
          id="form_NewCard"
        >
          <section className="form_Sections">
            <label htmlFor="publisherName">Publisher</label>
            <select
              id="publisherName"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
            >
              <option value=""> --Choose --</option>
              <option value="CNN">CNN</option>
              <option value="Houston Cronicle">Houston Cronicle</option>
              <option value="Yahoo!">Yahoo</option>
            </select>
          </section>
          <section className="form_Sections text_input">
            <h3>text</h3>
            <textarea
              onChange={handleChange}
              name="textInput"
              value={formData.textInput}
              required
            />
          </section>
          <section className="form_Sections media_input">
            <legend> Media </legend>
            <label htmlFor="media_None" required>
              {" "}
              None{" "}
            </label>
            <input
              type="radio"
              id="media_None"
              name="media_Type"
              value=""
              checked={formData.media_Type === ``}
              onChange={handleChange}
            />

            <label htmlFor="media_Img"> Image </label>
            <input
              type="radio"
              id="media_Img"
              name="media_Type"
              value="Image"
              checked={formData.media_Type === `Image`}
              onChange={handleChange}
            />

            <label htmlFor="media_Video"> Video </label>
            <input
              type="radio"
              id="media_Video"
              name="media_Type"
              value="Video"
              checked={formData.media_Type === `Video`}
              onChange={handleChange}
            />
          </section>

          <section className="form_Sections date_input">
            <h3>Published Time </h3>
            <input
              type="datetime-local"
              id="time_pub"
              name="date"
              onChange={handleChange}
              value={formData.date}
              required
            />
          </section>
        </form>
        <button className="delete_Button" onClick={handleDeleteCard}>
          Delete Card
        </button>
      </div>
    </div>
  );
}
