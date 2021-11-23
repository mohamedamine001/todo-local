import React, { Component,useState,useEffect }from "react";
import { useHistory, Redirect} from "react-router-dom";
import Header from "../components/Header/Header";
import Update from '../components/Update'; 
// reactstrap components
import {
	Button,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap'




export default function Todo(props) {
	const history = useHistory();
	function Update(id){
		
		history.push('/Update/'+id);
	}
	
	const [Titre, setTitre] = useState('');
	const [Description, setDescription]  = useState('');
	 
	
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState(()=>{
        const localTodos = localStorage.getItem("todos");
        // s'il existe deja des todo dans la localstorage
    if (localTodos) {
        // return the parsed JSON object back to a javascript object
        return JSON.parse(localTodos);
      
      } else {
        // return un array vide
        return [];
      }
    });
	const [isFailed, setIsFailed] = useState(false);
	
		useEffect(() => {
			localStorage.setItem("todos", JSON.stringify(todos));
		}, [todos]);	
	  
	
	/* Submit */
	const handleSubmit = e =>{
		e.preventDefault();

        if(Titre !== "" && Description !== ""){
            setTodos([
                // copy the current values in state
                ...todos,
                {
                  // setting a basic id to identify the object
                  id: todos.length + 1,
                  // set a text property to the value of the todo state and 
                  title: Titre,
                  description : Description,
                  etat : 'active'
                }
              ]);
        }
		setTitre('');
		setDescription('');
        e.target.reset();
	};
 
	/* Delete */
	
	function Delete(id){
		 
        const alldata = todos.filter(todo=>todo.id !== id)
        setTodos(alldata)
        //refresh localstorage data
        localStorage.setItem("todos", JSON.stringify(alldata));
	}
    function Finished(id){
		 
        const finished_todo = todos.find(todo=>todo.id == id)
        finished_todo.etat = 'finished'

        const updatedItem = todos.map((todo) => {
            return todo.id == id ? finished_todo : todo;
          });
          setTodos(updatedItem)
          //refresh localstorage data
          localStorage.setItem("todos", JSON.stringify(updatedItem));
          alert('success! updated successfully')
	}
     

	return (
		<>
		<Header />
	<div className="container">
	<div className="row justify-content-md-center">
		<div className="col-md-8 ml-auto mr-auto text-center mt-5">
			<h3 className="title">Todo</h3>
		</div>
	</div>
	<div className="row justify-content-md-center">
		<div className="col-md-6">
		
			<form className='p-3' onSubmit={handleSubmit}> 
			<div className="card-body">	
				
				<div className="form-group">
					<label>Titre</label>
					<input type="text" className="form-control" id="titre" name="titre" required placeholder="Titre ..."
						onChange={e => setTitre(e.target.value)}/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<input type="text" className="form-control" id="description" name="description" required placeholder="Description ..."
						onChange={e => setDescription(e.target.value)}/>
				</div>
				
				
				<div className="form-group mt-2 text-center">
					<button className="btn btn-danger btn-block ml-auto">Ajouter</button>
				</div>
			</div>
			</form>
		</div>
		
		
		<h3> Todo List </h3>
		{todos.map((todo) => (
			<li className="list-group-item d-flex text-capitalize justify-content-between my-2" key={todo.id}>
				  <div className="d-flex">
					<b style={{ marginRight: "100px" }}>{todo.title}</b>
					<h6>{todo.description}</h6>
				  </div>
				  <div className="todo-icons">
                  {todo.etat == 'active' ? 
                    
                      (<button className="btn mx-2 btn-success" onClick={()=>Finished(todo.id)}>
                        Finished?
                      </button>)
                    : '' }

                    <button className="btn mx-2 btn-warning" onClick={()=>Update(todo.id)}>
					  Edit
					</button>
					<button className="btn mx-2 btn-danger" onClick={()=>Delete(todo.id)}>
					  Delete
					</button>
					 
				  </div>
			</li>
		))}
		
	</div></div>
		</>
	)
}