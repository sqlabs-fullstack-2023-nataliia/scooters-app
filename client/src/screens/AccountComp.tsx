import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAccountStore, Account, baseURL } from '../store/useAccountStore'
import axios from 'axios';

const AccountComp = () => {

  //const {scooters,addScooter,updateScooter,deleteScooter,fetchScooters} = useScooterStore();
  const addAccount = useAccountStore((state) => state.addAccount);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const registerAction = async () => {
    if (!firstName || !lastName || !email || !password || !lat || !long) {
      return toast.error('Please fill all fields');
    } else if (validateName() && validateLastName() && validateEmail() && validatePassword() && validateLat() && validateLong()) {

    } else {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(long);

      const newUser: Partial<Account> = {
        firstName,
        lastName,
        email,
        password,
        location: {
          lat: latitude,
          long: longitude
        }
      }

      try {
        await addAccount(newUser);
        resetForm();
        return toast.success('New account was created successfuly!');
      } catch (err: any) {
        console.log(err.code)
        if (err.code === 'ERR_BAD_REQUEST') {
          setEmail('')
          return toast.error(`Account with email: ${email} already exist!`)
        } else {
          resetForm()
          return toast.error(`Error occurred, please try again!`)
        }

      }

    }
  }

  console.log(localStorage.getItem('token'))

  const loginAction = async () => {
    if (!email || !password) {
      return toast.error('All fields required!');
    } else if (!validateEmail() && !validatePassword()) {
      return toast.error('Email or password not valid')
    } else {
      try {
        const token = await axios.post<any>(`${baseURL}/login`, { email, password });
        if (token.status === 200) {
          localStorage.setItem('token', token.data.message);
          console.log(token.data.message)
          toast.success("Login successful!");
        } else {
          return toast.error(`Error occurred, please try again!`)
        }
      } catch (err: any) {
        toast.error("")
      }
    }
  }

  const getMyData = async () => {
    try {
      const myData = await axios.get(`${baseURL}/getMyData`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      console.log(myData.data.message)
    } catch (err: any) {
      console.log(err.message)
    }

  }

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('')
    setLat('');
    setLong('');
  }

  const validateName = () => {
    return firstName && firstName.length > 2
  }

  const validateLastName = () => {
    return lastName && lastName.length > 2
  }

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validatePassword = () => {
    return password && password.length > 6
  }

  const validateLat = () => {
    const regex = /^\d+$/;
    return regex.test(lat);
    return firstName && firstName.length < 10
  }

  const validateLong = () => {
    const regex = /^\d+$/;
    return regex.test(long);
  }



  return (
    <div className='container'>
      <ToastContainer />
      <div className='row give-me-some-top-space'>
        <div className='col-lg-3'>
          <button className='btn btn-danger' onClick={getMyData}>Get My Data</button>
          {
            isLogin
              ? (
                <>
                  <h2>Login &#128640;</h2>
                  <br />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                  <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />

                  <button onClick={loginAction} className='btn btn-success'>Login</button>
                </>
              )
              : (
                <>
                  <h2>Register &#128640;</h2>
                  <br />
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className='form-control' placeholder='First name' />
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='form-control' placeholder='Last name' />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                  <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />
                  <input value={lat} onChange={(e) => setLat(e.target.value)} className='form-control' placeholder='Latitude' />
                  <input value={long} onChange={(e) => setLong(e.target.value)} className='form-control' placeholder='Longitude' />

                  <button onClick={registerAction} className='btn btn-success'>Register</button>
                </>
              )
          }

          <br />
          <br />
          <button className='btn btn-link' onClick={() => setIsLogin(!isLogin)}>
            {
              isLogin ? "Create new account" : "Back to Login"
            }
          </button>

        </div>
        <div className='col-lg-9'>
          <h2>My Orders</h2>
          <br />
        </div>
      </div>
    </div>
  )
}

export default AccountComp

