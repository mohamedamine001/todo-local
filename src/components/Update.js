import React, { Component,useState,useEffect }from "react";
import {Redirect,useHistory,useParams} from "react-router-dom";
 import Header from "../components/Header/Header";

export default function Update(props) {
 
	const [isLoading, setIsLoading] = useState(true);
	const [isFailed, setIsFailed] = useState(false);
	const history = useHistory()
	const [data, setData] = useState({
			title:"",
			description:"",
	});
	
	
	 
	const { id } = useParams() 
	 
    const localTodos = JSON.parse(localStorage.getItem("todos"));
	/* Fetch TODO */
		const fetchTodo = () => {
				setIsLoading(true);
                        
                        console.log(localTodos);
						const todo = localTodos.find(todo=>todo.id == id)
						console.log(todo)
						setData(todo)
			}

		useEffect(() => {
			fetchTodo()
		}, []);	
	  
	
	/* Submit */
	function handleSubmit(e){
		e.preventDefault();
        console.log(data);

        const updatedItem = localTodos.map((todo) => {
            return todo.id == id ? data : todo;
          });

        /*const updatedItem =  localTodos.map((todo) => {
            if( todo.id == id) return data
             else return todo
        });*/
        console.log(updatedItem)
          
          localStorage.setItem("todos", JSON.stringify(updatedItem));
          alert('success! updated successfully')
		  history.push('/todo')
	};
	/* Handle Input change */
	function handle(e){
		const newdata = {...data}
		newdata[e.target.id]=e.target.value
		setData(newdata)
		console.log(data);
	}
	
	 
	return (
		<>
		<Header />
{!id || isFailed ? (
<Redirect to='/' />)
:(
	<div className="container">
	<div className="row justify-content-md-center">
		<div className="col-md-8 ml-auto mr-auto text-center mt-5">
			<h3 className="title">Update Todo</h3>
		</div>
	</div>
	<div className="row justify-content-md-center">
		<div className="col-md-6">
		
			<form className='p-3' onSubmit={handleSubmit}> 
			<div className="card-body">	
				
				<div className="form-group">
					<label>Titre</label>
					<input type="text" className="form-control" required id="title" name="title"  placeholder="Titre ..."
						value={data.title}
						onChange={e => handle(e)}/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<input type="text" className="form-control" required id="description" name="description" placeholder="Description ..."
						value={data.description}
						onChange={e => handle(e)}/>
				</div>
				
				
				<div className="form-group mt-2 text-center">
					<button className="btn btn-info text-white btn-block ml-auto">Update</button>
				</div>
			</div>
			</form>
		</div>
		
	</div></div>
	)}
		</>
)
}