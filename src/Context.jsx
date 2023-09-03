/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const ResetContext = createContext();

export function ResetProvider ({ children }) {
  const [resetKey, setResetKey] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [resetEmail,setResetEmail] = useState(false);
  const handleDialog = (text)=>{
    setAlertOpen(!alertOpen)
    setAlertText(text)
    if(alertText==="Password updated successfully" && alertOpen){
      setResetEmail(false)
    }
  }

  return (
    <ResetContext.Provider value={{ resetKey, setResetKey,handleDialog,alertOpen,alertText,resetEmail,setResetEmail }}>
      {children}
    </ResetContext.Provider>
  );
}

export function useResetContext() {
  return useContext(ResetContext);
}
