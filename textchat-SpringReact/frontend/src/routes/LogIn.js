import {useState} from "react";
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "../store/userSlice";
import {useNavigate} from "react-router-dom";


export function LogIn() {

    let [email , setEmail] = useState("");
    let [password, setPassword] = useState("");

    let dispatch = useDispatch();
    let navigate = useNavigate();

    function login(event) {
        // form으로 submit할 경우 redirect 방지
        event.preventDefault();
        axios.post("/login", {
            email: email,
            passwd: password
        }).then(res => {
            console.log(res.data);
            dispatch(setUser(res.data));
            navigate("/");

        }).catch(err => {
            console.log(err);
            navigate("/login");
        });
    }

    return (
        <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={event => setEmail(event.target.value)} type="email" placeholder="Enter email"/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={event => setPassword(event.target.value)} type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export function LogOut(){
    let dispatch = useDispatch();
    let navigate = useNavigate();

    axios.get("/logout").then(res => {
        console.log(res.data);
        dispatch(setUser({email: null, nickName: null}));
        navigate("/");
    }).catch(err => {
        console.log(err);
        navigate("/");
    });

    return (
        <div>
            로그아웃중
        </div>
    );

}
