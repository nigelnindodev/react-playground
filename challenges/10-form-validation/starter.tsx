import { useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

function App() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // TODO: validate the field that lost focus
  };

  const handleSubmit = () => {
    // TODO: validate all fields and mark as submitted if valid
  };

  if (submitted) {
    return <p>Registration successful!</p>;
  }

  return (
    <div>
      <h1>Registration</h1>
      <div>
        <input name="name" placeholder="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <input name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <input name="confirm" type="password" placeholder="Confirm Password" value={values.confirm} onChange={handleChange} onBlur={handleBlur} />
        {errors.confirm && <p>{errors.confirm}</p>}
      </div>
      <button onClick={handleSubmit} disabled>Submit</button>
    </div>
  );
}

export default App;
