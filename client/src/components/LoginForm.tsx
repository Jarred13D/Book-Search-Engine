import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: []
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER, { // setup mutation
    onError: (error) => {
      console.error(error);
      setShowAlert(true);
    },
    onCompleted: (data) => {
      Auth.login(data.login.token); // store the token
      handleModalClose(); // close modal if needed
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try { // execute mutation
      await loginUser({
        variables: {
          email: userFormData.email,
          password: userFormData.password
        },
      });

      setUserFormData({ // clear form vals
        username: '',
        email: '',
        password: '',
        savedBooks: [],
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    //   const response = await LOGIN_USER(userFormData);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const { token } = await response.json();
    //   Auth.login(token);
    // } catch (err) {
    //   console.error(err);
    //   setShowAlert(true);
    // }

    
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
