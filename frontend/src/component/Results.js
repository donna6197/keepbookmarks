import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Tooltip } from 'antd';
import "../styles.css"; 
import { Layout } from 'antd';
import { Button } from 'antd';
import {  DeleteOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

let ReturnedResults = (props) => {
  let [dataObjState, setDataObj] = React.useState(0);

  useEffect(() => {
    //now over to the bookmarkRoute to do all the work
    fetch(`http://127.0.0.1:5000/bookmarks/getAllEntries`, { 
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify(), //body not required for get
    })
    .then((response) => {
        return response.json();
      })
    .then((data) => {
      console.log(data);
      //set the state
      // data.map((row, index) => {
      //   console.log("row:", row, "index: ", index)
      // })
      setDataObj(
        data.map((row, index)=> ({
          key: index,
          bmk_link: row.bmk_link,
          bmk_description: row.bmk_description,
          bmk_comments: row.bmk_comments,
          bmk_id: row.bmk_id,
          actions:  [<Tooltip key={index+1000} title={row.bmk_link}><Button key={index+4000} icon={<LinkOutlined key={index+7000}/>} onClick={(e)=>{handleFollowLink(e, row.bmk_link)}}></Button></Tooltip>,
          <Tooltip key={index+2000} title={"Edit item"}><Button key={index+5000} icon={<EditOutlined key={index+8000}/>} onClick={(e)=>{handleSearchEditbyID(e, row.bmk_id)}}  /></Tooltip>,
                    <Tooltip key={index+3000} title={"Delete item"}><Button key={index+6000} icon={ <DeleteOutlined key={index+9000} />} onClick={(e)=>{handleDeleteItem(e, row.bmk_id)}}/></Tooltip>]
         //https://stackoverflow.com/questions/42597602/react-onclick-pass-event-with-parameter
        }))
      );
    })
  }, []);

  let handleFollowLink = (event, item) =>{
    window.open(item, '_blank');
    event.preventDefault();
    // window.location = item;
    // window.location.reload();
  }

// START DELETE A SINGLE ITEM 
  let handleDeleteItem = (event, itemValue) => {
    event.preventDefault();
    console.log("delete triggered")
    console.log(JSON.stringify(itemValue))
    let theItemToDelete = { bmk_id : itemValue};

    //delete fetch
    fetch(`http://127.0.0.1:5000/bookmarks/deleteOneBookmark`, { 
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(theItemToDelete), 
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })

    window.location.reload() 
  };
// END DELETE A SINGLE ITEM

let navigate = useNavigate();

//START ADD NEW ITEM
  function handleAddItem(event) {
    event.preventDefault();
    console.log("handleAddItem triggered")
    // window.location = "http://localhost:3000/Addnew";
    navigate('/Addnew');
  }
//END ADD NEW ITEM

//START EDIT ITEM
  let handleSearchEditbyID = (event, itemValue) => {

    event.preventDefault();
    console.log("Search edit triggered for :", JSON.stringify(itemValue));
  
    let theItemToEdit = { bmk_id : itemValue};
    
    // pass the id across to the edit page
    const handleSelectEdit = (itemValue) => {
      navigate(`/EditPage/${itemValue["bmk_id"]}`, {
      // navigate(`/EditPage/${itemValue}`, {
        state: {
          bmk_Id: theItemToEdit,
        }
      });
      console.log(theItemToEdit)
    };

    handleSelectEdit(theItemToEdit)
  };
// END EDIT ITEM

//START SEARCH BY TITLE
  let handleTitleSearch = (itemValue) => {
  // event.preventDefault();
    console.log("Title search triggered using :", JSON.stringify(itemValue))
    let itemValue1 = "%"+itemValue+"%"
    let theQueryText = { bmk_queryText : itemValue1};
  //fetch using text
    fetch(`http://127.0.0.1:5000/bookmarks/getEntryByText`, { 
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(theQueryText), 
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //set state of returned data
      setDataObj(
        data.map((row, index)=> ({
          key: index,
          bmk_link: row.bmk_link,
          bmk_description: row.bmk_description,
          bmk_comments: row.bmk_comments,
          bmk_id: row.bmk_id,
          actions: [<Tooltip title={row.bmk_link}><Button icon={<LinkOutlined />} onClick={(e)=>{handleFollowLink(e, row.bmk_link)}}></Button></Tooltip>,
                    <Tooltip title={"Edit item"}><Button icon={<EditOutlined />} onClick={(e)=>{handleSearchEditbyID(e, row.bmk_id)}}  /></Tooltip>,
                    <Tooltip title={"Delete item"}><Button  icon={ <DeleteOutlined />} onClick={(e)=>{handleDeleteItem(e, row.bmk_id)}}/></Tooltip>]
        }))
      );
    })
  };
//END SEARCH BY TITLE

//SET UP COLUMNS
  const columns = [
    {
      title: "TITLE",
      dataIndex: "bmk_description",
      width: 250,
      render: bmk_description => (
        <Tooltip placement="topLeft" title={bmk_description}>
          {bmk_description}
        </Tooltip>
      ),
      key: 1,
    },
    // {
    //   title: "LINK",
    //   dataIndex: "bmk_link",
    //   width: 250,
    //   render: bmk_link => (
    //     <a href={bmk_link} target="blank">{bmk_link}</a>
    //     ),
    //     responsive: ['md'],
    //   key: 2,
    // },
    {
      title: "COMMENTS",
      dataIndex: "bmk_comments",
      width: 350,
      key: 3,
      responsive: ['md'],
      ellipsis: true,
    },
    {
      title: "ID",
      dataIndex: "bmk_id",
      width: 100,
      key: 4,
      responsive: ['md'],
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      // dataIndex: "bmk_create_date",
      width: 100,
      key: 5,
    }
  ];
//END SET UP COLUMNS

  const { Search } = Input;
  const { Header } = Layout;

// Brief description of functionality
  function MyDescription(){
    return <p style={
      {fontSize: '10pt',
        color: 'black',
        paddingTop: '10px',
        textAlign: 'center',
        fontWeight: '600',
      }
    }>
    A full stack application built with React and Expressjs to organise and store your bookmarks.<br/>
    Add, Edit, Update or Delete from the list.  Use the Search box to search by title.<br/>
    Forget why you bookmarked a page ... add a comment!  Built by Donna</p>;
  };

  let render = ( 
    <>
    <div minheight="100vh">
      <Header>
      <h2>Keep my bookmarks</h2>
      </Header>
      <MyDescription />
      <div className='searchPlaceholder'>
        <Search placeholder="Title search"  onSearch={handleTitleSearch} style={{ width: 300 }}  />
      </div>
      <Button type="button" id="addNew" onClick={(e)=>{handleAddItem(e)}} style={{marginLeft: '2%'}}>Add new item</Button>

      <Table 
            columns={columns}
            dataSource={dataObjState}
            size={"small"}
            // dataSource={dataSource}
            // bordered={true}
            // title={() => 'Header'}
            // footer={() => 'Footer'}
            rowClassName={()=>"rowClassName1"}
            pagination={{ defaultPageSize: 10 }}
            // scroll={{ x: 240, y:400 }}
            style={{ minHeight: "80vh"}}
        />
    </div>
    </>
  );
//END RENDER LAYOUT

  return (
    <div className="app">
          {render}
    </div>
  );
}

export default ReturnedResults;
