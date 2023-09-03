/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import { useResetContext } from '../Context';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AlertDialog from './Dialog';
import { apiEndpoint } from '../Config';

const ResetForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { alertOpen, resetEmail, handleDialog } = useResetContext()
  const [password, setPassword] = useState('')
  const [inputType, setinputType] = useState(true)
  const [icons, setIcons] = useState([
    {
      title: "caps",
      type: "close",
      text: "A Capital Letter"
    }
    ,
    {
      title: "small",
      type: "close",
      text: "A Small Letter"
    },
    {
      title: "special",
      type: "close",
      text: "A Special Character (@$!%*?&)"
    },
    {
      title: "number",
      type: "close",
      text: "A Number"
    },
    {
      title: "minimum",
      type: "close",
      text: "Minimum 8 Characters",
    }
  ])
  const handleInput = (e) => {
    setPassword(e.target.value)
    const pass = e.target.value;
    const updateIcons = icons.map((icon) => {
      switch (icon.title) {
        case "caps":
          return {
            ...icon,
            type: /[A-Z]/.test(pass) ? "check" : "close",
          };
        case "small":
          return {
            ...icon,
            type: /[a-z]/.test(pass) ? "check" : "close",
          };
        case "special":
          return {
            ...icon,
            type: /[@$!%*?&]/.test(pass) ? "check" : "close",
          };
        case "number":
          return {
            ...icon,
            type: /[0-9]/.test(pass) ? "check" : "close",
          };
        case "minimum":
          return {
            ...icon,
            type: pass.length >= 8 ? "check" : "close",
          };
        default:
          return icon;
      }
    });

    setPassword(pass);
    setIcons(updateIcons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      handleDialog("Please enter a valid password");
    }
    else {
      try{
        const request = await fetch(`${apiEndpoint}/users/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: resetEmail, password: password })
        })
        const response = await request.json();
        if (request.status === 500) {
          handleDialog("Error Occured! Please try again Later");
          return;
        }
  
        if (response.message) {
          handleDialog("Password updated successfully");
          setPassword("")
          const {path} = location;
          navigate(path)
        }
      }
      catch(error){
        console.log(error);
      }
    }
  }

  return (
    <div className="row">
      <div className="col-xl-3 col-lg-4 col-md-8 col-sm-10 shadow py-3 bg-white">
        <div className='d-flex align-items-center flex-column '>
          <h4 className='text-pink'>Reset Password</h4>
        </div>

        <form onSubmit={handleSubmit}>
          {alertOpen && <AlertDialog />}
          <div className="d-flex flex-column input">

            <label htmlFor="emailid" ><EmailIcon />Email address</label>
            <input
              type="email"
              id="emailid"
              value={resetEmail}
              disabled />

            <label htmlFor="password" ><LockIcon />Password</label>
            <input
              onInput={handleInput}
              type={inputType ? "password" : "text"}
              id="password"
              value={password} />

            <div className='d-flex flex-row justify-content-between'>
              <button type="submit" className="btn btn-primary mt-2 button">Reset</button>
              <span
                onClick={() => { setinputType(!inputType) }}
                className='view'
              >View Password?</span>
            </div>
            
            <div className='d-flex flex-column justify-content-between'>
              <span className='rules'>Password Must Contain</span>
              {icons.map((icon, index) => (
                <span
                  className={`rules ${icon.type === 'close' ? 'text-red' : 'text-blue'}`}
                  key={index + 1}>
                  {icon.type === "close" ? <CloseIcon /> : <DoneIcon />}
                  {icon.text}
                </span>
              ))}

            </div>
          </div>
        </form>
      </div>

    </div>
  );
};
export default ResetForm;