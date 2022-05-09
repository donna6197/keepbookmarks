import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import "../styles.css"; 
import { useParams, useNavigate } from "react-router-dom";


const env = require('./env');
let url = env.url(); // pull in the url
// console.log(url);  

let EditItem = (props) => {

  let [formState, setFormState] = React.useState(
    { 
    itemTitle: "", 
    itemLink: "",
    itemComments: "",
    itemEditDate: ""
  });

//START GET EXISTING DATA TO POPULATE FORM
//parameter passed from results.js
  const bmk_id = useParams()['*']

  // console.log("This is from edit page: ", bmk_id) 

  //id of row to be used in fetch (comes from parameter)
  const dataToFetch = {bmk_id : bmk_id }

  //similar to componentdidmount
  useEffect(() => {

    //fetch the individiual item
    // fetch(`http://127.0.0.1:5000/bookmarks/getEntryById`, { 
    fetch(url+`/bookmarks/getEntryById`, { 
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToFetch), 
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data)
      let editData = data
      console.log("editData:  ", (editData))

    //fill the form with the existing data returned by the fetch
    setFormState(previousState => {
      return { ...previousState, 
        itemTitle: editData[0].bmk_description,
        itemLink: editData[0].bmk_link,
        itemComments: editData[0].bmk_comments,
        itemEditDate: editData[0].bmk_edit_date 
      }
    });
    })
  },[]);
  // });
//END GET EXISTING DATA TO POPULATE FORM

  //set a format for edit date
  let bmkDates = new Date();
  bmkDates.toISOString();

  let navigate = useNavigate();

//START UPDATE
  let handleUpdateItem = (event) => {
    event.preventDefault();
    //the item details
    let theTitle = document.getElementById('itemTitle').value;
    let theLink = document.getElementById('itemLink').value; 
    let theComments = document.getElementById('itemComments').value;
    let theEditDate = bmkDates;
    let theId = bmk_id;

    let allDetails = {
      bmk_id: theId,
      bmk_description: theTitle,
      bmk_link: theLink,
      bmk_comments: theComments,
      bmk_edit_date: theEditDate,
    }

    //now over to the bookmarkRoute to do all the work
    // fetch(`http://127.0.0.1:5000/bookmarks/updateSingleItem`, { 
    fetch(url+`/bookmarks/updateSingleItem`, { 
      method: "PUT",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(allDetails),
    })
    .then((response) => {
      // console.log(response)
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
          EDIT
        </div>
        <div className="singleItem">
          <label className="formLabel" >Title (required)</label>
          <input className="itemInput" 
                id="itemTitle" 
                defaultValue={formState.itemTitle} 
              >
          </input>
        </div>
        <div className="singleItem">
          <label className="formLabel">Link</label>
          <input className="itemInput" id="itemLink" 
                defaultValue={formState.itemLink}
              >
          </input>
        </div>
        <div className="singleItem">
          <label className="formLabel">Comments</label>
          <textarea id="itemComments" 
                className='itemInput'
                maxLength={500}
                readOnly={false}
                defaultValue={formState.itemComments}
                rows={5}
              >
          </textarea>
        </div>

        <button className="formButton" 
          title="updateItem" 
          onClick={(e)=>handleUpdateItem(e)} >
            Update item
        </button>
        <div className="singleItem">
            <label className="metadataLabelleft" >Last modified: {formState.itemEditDate} </label>
            <label className="metadataLabelright">Id: {bmk_id}</label>
            <div className="clearBoth"></div>
	      </div>
      </div>
    </>
  );

  return (
    <div className="app">
          {render}
    </div>
  );
}

export default EditItem;