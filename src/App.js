import { useState } from 'react';
import './App.css';

function App() {
  const [titel,setTitle] = useState("");
  const [date,setDate] = useState("");
  const [discrption,setDes] = useState("");
  const addTransaction = (ev)=>{
    ev.preventDefault();
    fetch("http://localhost:4041/api/transaction",{
      method:"post",
      headers:{"Content-Type": "application/json" },
      body:JSON.stringify({titel,date,discrption})
    }).then((response)=>response.json().then(info => console.log("result",info)))
  }
  return (
    <div className="App">
      <h1>$400</h1>
      <form onSubmit={addTransaction}>
        <div className='basics'>
          <input type='text' placeholder='for buying a new samsung tv' onClick={(ev)=>setTitle(ev.target.value)} />
          <input type='datetime-local'  onClick={(ev)=>setDate(ev.target.value)}/>S
        </div>
        <div className='description'>
          <input type="text" placeholder='description' onClick={(ev)=>setDes(ev.target.value)} />
        </div>
        <button type='submit'> Add new Transaction</button>
      </form>
      <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>
              New samsung TV

            </div>
            <div className='description'>

              To buy a new samsung tv
            </div>

          </div>

          <div className='right'>
            <div className='price red'>
              +$300
            </div>
            <div className='date'>
              2024:07:25 14:30

            </div>

          </div>

        </div>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>
              Gig job new website
            </div>
            <div className='description'>
              to join in  a new website
            </div>
          </div>
          <div className='right'>
            <div className='price green'>
              +$400
            </div>
            <div className='date'>
              2024:07:25 14:30
            </div>
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>
              New I Phone
            </div>
            <div className='description'>
              to buy a new i phone
            </div>
          </div>
          <div className='right'>
            <div className='price red'>
              -$900
            </div>
            <div className='date'>
              2024:07:25 14:30
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
