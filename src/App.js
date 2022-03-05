import React from 'react';
import ReactDOM from 'react-dom';
//updating state on every change on form
const uniqueId = ()=> {
  return `id ${Math.floor(Math.random() * 100)}`
}

const NewCardForm = (props) =>{
   const [formData, setFormData] = React.useState(
     {
      id: uniqueId(),
      publisher:"", 
      textInput: "",
      media_Type: "",
      date: "",
     
    });
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
      if(formData.media_Type ==="Image") prevData.media_Type = "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bb35f0-99d5-11ec-bfff-46b1df77f3a4"
      if(formData.media_Type ==="Video") prevData.media_Type = "https://s.yimg.com/os/creatr-uploaded-images/2022-03/02bbab20-99d5-11ec-bbef-9427ff56467b"
   return [...prevData, formData]
    })
    console.log(props.data)
  }
 
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
  
  <button className="delete_Button">Delete Card</button>
    </form>
       </div>

   </div>
)};

const Cards = (props) =>{
  const cardRef = React.useRef()
  function focus() {
    cardRef.current.focus()
   cardRef.current.style.background = "grey"
    console.log("handle card click is firign",cardRef.current)
  }   
 
  
  return(
    <div className="NewCards" key = {props.id} ref={cardRef} onClick= {focus}> 
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
  const [Data, setData] = React.useState ([
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
//  console.log("app function rendered", Data)
//  function handleChange() {
//   setData((prevData)=> {
//     console.log("setData is firing")
//  return [...prevData, prevData[prevData.length-1]]
//   })
//   }

  // }, Data)
 //attempting to pass in form info to cards
  const completedCards = Data.map(dataSet => {
  return ( 
    <Cards 
      key = {Data.indexOf(dataSet)}  
      title = {dataSet.publisher}
      text  = {dataSet.textInput}
      media = {dataSet.media_type}
      date = {dataSet.date}
    />
   )
  })

  return( 
    <div className="App">
        <NewCardForm data= {Data} setData= {setData}/>
      <div className="deck_of_cards">
         {completedCards }
      </div>

     </div>
     
)};


export default App;
