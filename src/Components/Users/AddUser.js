import React, {useState} from 'react';

import Card from '../Ui/Card';
import Button from '../Ui/Button';
import ErrorModal from '../Ui/ErrorModal';

import classes from './Adduser.module.css'


const AddUser = (props) => {

    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();


    const addUserHandler = (event) => {
        event.preventDefault();

        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'invalid Input',
                message: 'Please enter a valid name and age (non-empty values).'});
            return;
        }
        if(+enteredAge < 1){
            setError({
                title: 'invalid Age',
                message: 'Please enter a valid age (>0)'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredAge('');
        setEnteredUsername('');
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }
    
    return(
    <div>
        {error&& <ErrorModal onConfirm = {errorHandler} title={error.title} message = {error.message}/>}
        <Card className = {classes.input}>
            <form onSubmit = {addUserHandler}>
                <label htmlFor="username">Username</label>
                <input is = "username" type ="text" value = {enteredUsername} onChange = {usernameChangeHandler}/>
                <label htmlFor="age">Age (Years)</label>
                <input is = "age" type ="number" value = {enteredAge} onChange = {ageChangeHandler}/>

                <Button type = "submit">Add User</Button>

            </form>
        </Card>
    </div>
    );

};

export default AddUser;