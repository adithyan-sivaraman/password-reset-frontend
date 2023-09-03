import './App.css';
import Form from './Components/Form';
import ResetForm from './Components/ResetForm';
import { useResetContext } from './Context';
function App() {

  const { resetEmail } = useResetContext();
  return (
    <div className="container-fluid">
      {resetEmail && <ResetForm />}
      {!resetEmail && <Form />}
    </div>

  );
}

export default App;
