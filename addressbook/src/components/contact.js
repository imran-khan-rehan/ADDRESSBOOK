import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import './styles/contact.css'; // You can define your styles here
const url = "http://127.0.0.1:3001";
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [email, setemail] = useState('');
  const [message, setmessage] = useState('')
  useEffect(() => {
    const email1 = Cookies.get("userEmail");
    // const password=Cookies.get("userpass");
    if(email1)
    {

      setemail(email1);
    }
    else
    {
      window.location.href='/login';
    }
   
  }, []);
  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse if already open
    } else {
      setActiveIndex(index); // Expand if not open
    }
    setmessage('');
  };

  const insertContact = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const number = formData.get('number');

    const response = await fetch(url + '/insertContact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        name: name,
        number: number
      })
    });
    if (response.ok) {
      setmessage("inserted successfully");
    }
    else {
      setmessage("can not insert error ");
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const deletedname = formData.get('deletedname');
    const response = await fetch(url + '/deleteContact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        name: deletedname
      })
    });
    if (response.ok) {
      setmessage("deleted successfully");
    }
    else {
      setmessage("can not delete error ");
    }
  }
  const [contactdata, setData] = useState([]);

  

  const fetchData = async () => {
    try {
      const response = await fetch(url+"/getContacts/"+email);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const handleupdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const oldname = formData.get('oldname');
    const newname = formData.get('newname');
    const newnumber = formData.get('newnumber');
    console.log(oldname,newname,newnumber,email);
    const response = await fetch(url + '/updateContact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        oldname: oldname,
        newname: newname,
        newnumber: newnumber
      })
    });
    if (response.ok) {
      setmessage("updated successfully");
    }
    else {
      setmessage("can not update error ");
    }
  }
  const items = [
    {
      title: <h2>Add Contact</h2>,
      content: <form onSubmit={insertContact}>
        <input type='text' name='name' placeholder='name'></input><br />
        <input type='number' name='number' placeholder='contact number'></input><br />
        <input type='submit' name='add'></input>
      </form>
    },
    {
      title: <h2>Update Contact</h2>,
      content: <form onSubmit={handleupdate}>
        <label htmlFor='oldname'>enter old name</label>
        <input type='text' name='oldname' placeholder='oldname' id='oldname'></input><br />
        <label htmlFor='newname'>enter new name</label>
        <input type='text' name='newname' placeholder='newname' id='newname'></input><br />
        <label htmlFor='newnumber'>enter new number</label>
        <input type='number' name='newnumber' placeholder='newnumber' id='newnumber'></input><br />
        <input type='submit' name='add'></input>
      </form>
    },
    {
      title: <h2>Delete Contact</h2>,
      content: <form onSubmit={handleDelete}>
        <label htmlFor='deletedname'>enter name</label>
        <input type='text' name='deletedname' placeholder='name' id='deletedname'></input><br />
        <input type='submit' name='add'></input>
      </form>
    },
    {
      title: <h2>Show Contact</h2>,
      content:<table border='1px'>
        <thead>
          <tr>
          <th>Name</th>
          <th>number</th>
          </tr>
        </thead>
        <tbody>
        {contactdata.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.number}</td>
            </tr>
          ))}

        </tbody>
      </table>
    }
  ];

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <div
            className={`accordion-title ${activeIndex === index ? 'active' : ''}`}
            onClick={() =>{toggleAccordion(index); fetchData()}}
          >
            {item.title}
          </div>
          <div className={`accordion-content ${activeIndex === index ? 'open' : ''}`}>
            {item.content}
          </div>
        </div>
      ))}
      <div className={message ? 'showmessage' : 'noshowmessage'}>{message}</div>
    </div>
  );
};

export default Accordion;
