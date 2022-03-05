import React from 'react';
import ReactDOM from 'react-dom';
//updating state on every change on form
const uniqueId = ()=> {
  return `id ${Math.floor(Math.random() * 10000)}`
}

const NewCardForm = (props) =>{
   const initialState = {
    id: uniqueId(),
    publisher:"", 
    textInput: "",
    media_Type: "",
    date: "",
   
  }
   const [formData, setFormData] = React.useState(
    initialState);
    //keeping track of inputs in form
    function handleChange(event) {
        const {name,value} = event.target
        setFormData(prevFormData => {
            return{
              ...prevFormData,
              [name]: value
 
     }

    })
      
    }
 //fires on button submit. need to conect to card comp
  function handleSubmit(event) {
    event.preventDefault()

    props.setData((prevData)=> {
      console.log("setData is firing")
   return [...prevData, formData]
    })
    setFormData( { ...initialState, id:uniqueId() } )
    console.log(props.data)
  }
 function handleDeleteCard() {
  if(props.clickedCard)  props.setData((prevData)=>{
    if(prevData.length === 1) {
      return [initialState]
    }
    return [...prevData.filter(x=>x.id !==props.clickedCard.id)]
  })
 }

 React.useEffect(()=>{
   if(props.clickedCard) setFormData(props.clickedCard)
 },[props.clickedCard])
 return(
 <div className = "NewCardForm">
    <nav className = "navBar">
       <section className = "newCardH1_container">
           <button form="form_NewCard" className = "newCard_button" > New Card</button>
       </section>
    </nav>
   <div className ="main_container">
 <form onSubmit={handleSubmit} className="publisher_Form" id="form_NewCard"> 
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
       <textarea onChange={handleChange} name="textInput" value={formData.textInput} required/> 
      
   </section>
   <section className="form_Sections media_input">
    
       <legend> Media </legend>
       <label htmlFor="media_None" required> None </label>
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
       <input type="radio" 
        id="media_Video" 
        name="media_Type" 
        value="Video"
        checked={formData.media_Type === `Video`}
        onChange={handleChange}/>   
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
    <button className="delete_Button" onClick={handleDeleteCard}>Delete Card</button>
       </div>

   </div>
)};

const Cards = (props) =>{
 
  return(
    <div className="NewCards" key = {props.id} onClick={props.handleClick}> 
      <section className="card_info"> 
       <h2 className="publisher_title">{props.title}  </h2> 
       <p className="text_paragraph"> {props.text} </p>
       <span className="time_published">{props.date}</span>
      </section>
      <section className="media_display">
      
        <img src={`${props.media}`}/>
        
      </section>


    </div>

  )};


  
const App = () => {
  const [data, setData] = React.useState ([
    { 
      "id": 0,
     "publisher": "CNN",
     "textInput": "The First stock-market `correction since October has begun,` says Morgan Stanley analyst who called 2021 tech rout",
     "media_type": "",
     "date": "2022-05-09T18:07"
    },
      { 
      "id": 1,
     "publisher": "Houston Cronicle",
     "textInput": "The case for Jaden Schwartz, his absence on the left side will be another difficult gap",
     "media_type": "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bb35f0-99d5-11ec-bfff-46b1df77f3a4",
     "date": "2022-03-09T18:07"
    },
      { 
      "id": 2,
     "publisher": "Yahoo!",
     "textInput": "Lady Gaga Pays homeage to Italy as `House of Gucci` Wraps Filming and bids adieu to Italy",
     "media_type": "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bbab20-99d5-11ec-bbef-9427ff56467b",
     "date": "2022-05-09T18:07"
    }

 ]);
  

  const [editCard, setEditCard] = React.useState(null)
  
 function handleEditCard(cardData) {
    setEditCard(cardData)
 }


 //attempting to pass in form info to cards
  const completedCards = data.map(dataSet => {
  return ( 
    <Cards 
      handleClick = {()=>handleEditCard(dataSet)}
      key = {dataSet.id}  
      title = {dataSet.publisher}
      text  = {dataSet.textInput}
      media = {dataSet.media_type}
      date = {dataSet.date}
    />
   )
  })

  return( 
    <div className="App">
        <NewCardForm clickedCard ={editCard} setData= {setData}/>
      <div className="deck_of_cards">
         {completedCards }
      </div>

     </div>
     
)};


export default App;
