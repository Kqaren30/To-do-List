import React,{useEffect,useState} from 'react';

import './App.css';

const LOCAL_STORAGE_KEY ="to-do";

function App() {

  const [currentInput,setCurrentInput]=useState('');
  const [list,setList]=useState([]);

  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos){
      setList(storageTodos);
    }
   },[]);
   
   useEffect(()=>{
     localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(list));
   },[list]);


  const AddTodo = (event)=>{
    event.preventDefault();
    const createdAt=new Date().toLocaleString();
    const newList=list;
    newList.unshift({content:currentInput,createdAt,isComplete:false});
    setList([...newList]);
    setCurrentInput("");
  }

  const deleteTodo = (index)=>{
    var newList=list;
    newList.splice(index,1);
    setList([...newList]);
  }

  const completedTask =(index) =>{
    var newList=list;
    newList[index].isCompleted=!newList[index].isCompleted;
    setList([...newList]);
  }

  return (
    <div className="cuerpo">
    <div className="App box is-three-quarter column">
     <div className="outer-box">
     <h1 className="title is-1">To Do List</h1>
     <form className="input-box">
       <input className="input is-rounded" onChange={(event)=>
        {setCurrentInput(event.target.value)}} 
        value={currentInput}/>
       <button className="add-button button is-primary añadir" onClick={AddTodo}>Añadir</button> 
     </form>
     {list.map(({content,createdAt,isCompleted},index)=>{
       return (
         <div key={index} className="todo-container box">
           <div className="todo-main-content">
            <div className="todo-content title is-3" style={{textDecoration:isCompleted ? 'line-through':'none'}}
            onClick={()=>{completedTask(index)}}>{content}</div>
            <div className="todo-createdAt subtitle is-4">Creado a las: {createdAt}</div>
           </div>
           <button className="del-button button is-danger eliminar" onClick={()=>deleteTodo(index)}>Eliminar</button>
         </div>)
     })}
     </div>
    </div>
    <footer>
    <center>
    <p>&copy; Desarrollado por <a href="#">Karen Robles</a></p>
 </center>
</footer>
    </div>
  );

}

export default App;
