import {useState} from 'react'

const useInput = (initialValue) => {
   const [value, setValue] = useState(initialValue);
   const [error, setError] = useState("");

   const reset = () => {
       setValue(initialValue);
   }

   const bind = {
       value,
       onChange: e => {
           setValue(e.target.value);
       }
   }

   return [value, bind, reset, error, setError];
}

export default useInput;
