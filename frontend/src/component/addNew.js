import React  from 'react';
import 'antd/dist/antd.css';
import "../styles.css"; 
import { useNavigate} from "react-router-dom";

const env = require('./env');
let url = env.url(); // pull in the url
// console.log(url);  

let NewItem = (props) => {

  let [formState, setFormState] = React.useState({ 
    itemTitle: " ", 
    itemLink: " ",
    itemComments: " "
  });

  //set a format for the create and edit dates
  let bmkDates = new Date();
  bmkDates.toISOString();

  //get number from the current datetime to use as the id
  let bmkId = new Date()
  let bmkIdNum = bmkId.getTime().toString();
  console.log("Potential new id is: ", bmkIdNum)

  let navigate = useNavigate();

  //BUTTON TO ADD
  let handleAddItemToDB = (event) => {
    event.preventDefault();
    //the item details
    let theTitle = document.getElementById('itemTitle').value;
    let theLink = document.getElementById('itemLink').value; 
    let theComments = document.getElementById('itemComments').value;
    let theEditDate = bmkDates;
    let theCreateDate = bmkDates;
    let theId = bmkIdNum;

    let allDetails = {
      bmk_id: theId,
      bmk_description: theTitle,
      bmk_link: theLink,
      bmk_comments: theComments,
      bmk_edit_date: theEditDate,
      bmk_create_date: theCreateDate,
    }
   
    //now over to the bookmarkRoute to do all the work
    // fetch(`http://127.0.0.1:5000/bookmarks/createNewBookmark`, { 
      fetch(url+`/bookmarks/createNewBookmark`, { 
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(allDetails),
    })
    .then((response) => {
        // console.log(JSON.parse(response.body));
        // console.log(JSON.stringify(response.body));
        console.log(response)
        return response.json();
      })
    .then((data) => {
      console.log(data);
    }
    );
    navigate('/')
  };

  let render = (
    <>
    <div className="itemForm">
      <div className='itemFormHeading'>
        ADD NEW ITEM
      </div>
      <div className="singleItem">
        <label className="formLabel">Title</label>
        <input className="itemInput" id="itemTitle"></input>
      </div>
      <div className="singleItem">
          <label className="formLabel">Item link</label>
          <input className="itemInput" id="itemLink"></input>
      </div>
      <div className="singleItem">
          <label className="formLabel">Comments</label>
          <textarea id="itemComments" className='itemInput'
            maxLength={500}
            readOnly={false}
            defaultValue={formState.itemComments}
            rows={5}
          >
          </textarea>
      </div>
      <button className="formButton" id="btnAddNew" title="AddNewItem" onClick={(e)=>handleAddItemToDB(e)} >
        Add item
      </button>
    </div>
    </>
  );

  return (
    <div className="app">
          {render}
    </div>
  );
}

export default NewItem;