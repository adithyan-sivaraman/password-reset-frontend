/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import AlertDialog from './Dialog';
import { useResetContext } from '../Context';
import LockIcon from '@mui/icons-material/Lock';
import { apiEndpoint } from '../Config';

const Form = () => {
  const [email, setEmail] = useState('');
  const { alertOpen, handleDialog, setResetEmail, setResetKey } = useResetContext();
  const [spinner, setSpinner] = useState(false);
  const [params,] = useSearchParams();
  const key = params.get('reset');
  useEffect(() => {
    if (key) {
      validateKey(key)
    }
  }, [key])
  const validateKey = async (key) => {
    const request = await fetch(`${apiEndpoint}/users/validate/key/?resetkey=${key}`)
    const response = await request.json();
    
    if (response.message === "link expired") {
      handleDialog("Password reset link expired");
      setResetKey('');
    }
    else if (response.message === "invalid resetkey") {
      setResetKey('');
      handleDialog("Password reset link is invalid");
    }
    else if (response.message === "link valid") {
      setResetEmail(response.email)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      handleDialog("Please enter a valid email address");
    }

    else {
      try {
        setSpinner(true)
        const request = await fetch(`${apiEndpoint}/users/validate/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
        });
        const response = await request.text();
        if (request.status === 500) {
          handleDialog("Error sending email. invalid email address");
          return;
        }
        setSpinner(false)
        if (response === "invalid email") {
          handleDialog("Email address entered is invalid");
          return;
        }
        else if (response === "Reset Link already sent") {
          handleDialog("Password reset link already sent");
          setEmail('');
        }

        else {
          handleDialog("Password reset email sent successfully");
          setEmail('');
        }

      }
      catch (err) {
        console.log(err);
      }
    }

  }
  const handleInput = (e) => {
    setEmail(e.target.value);
  }
  return (


    <div className="row">
      <div className="col-md-6 col-lg-4 shadow py-3 bg-white">
        <div className='d-flex align-items-center flex-column '>
          <LockIcon sx={{ fontSize: 90 }} />
          <h4 className='text-pink'>Password Recovery</h4>
        </div>
        <form onSubmit={handleSubmit}>

          {alertOpen && <AlertDialog />}
          <div className="d-flex flex-column input">
            <label htmlFor="email" ><EmailIcon />Email address</label>
            <input
              onInput={handleInput}
              type="email"
              id="email"
              placeholder="Enter email"
              value={email} />

          </div>

          <button type="submit" className="btn btn-primary mt-2 button">Reset
            {spinner && <div className='spinner'></div>}
          </button>


        </form>

      </div>
    </div>

  )
}
export default Form;