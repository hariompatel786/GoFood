import React, { useState  } from 'react'
import { Link , useNavigate} from "react-router-dom";


export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email, 
                password: credentials.password, 
                location: credentials.geolocation,
            })
        })

        const json = await response.json()
        console.log(json);

        if(!json.success){
         alert("Enter valid credentials")
        }
        navigate("/");
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} ></input>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label for="" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange}></input>
                    </div>

                    <button  type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/Login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}

