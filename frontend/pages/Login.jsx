import styles from './Login.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate }  from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../src/features/auth/authSlice.js';
import Spinner from '../src/Spinner.jsx';
import { IoIosArrowRoundBack } from "react-icons/io";


function Login() {
  const containerVariants = {
    hidden: {
      clipPath: 'inset(50% 0% 50% 0%)',
    },
    reveal: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: 1.2,
        ease: [0.785, 0.135, 0.15, 0.86],
        delay: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay: 1.4 + i * 0.1,
      },
    }),
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    } // if 

    // if (isSuccess || user) {
    if (isSuccess && user?.token) {
      navigate('/')
    } else {
      toast.error("Login failed - Invalid user");
    } // if

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()

    const  userData  = {
      email,
      password,
    }

    dispatch(login(userData));
  }

  if (isLoading) {
    return <Spinner />
  }

  const fields = [
    { id: 'email', label: 'Email address', type: 'email', value: email },
    { id: 'password', label: 'Password', type: 'password', value: password },
  ];

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["background-image"]}></div>
      <div className={styles["blur-overlay"]}></div>
        <div>
            
        </div>
      <motion.div
        className={styles["grid-container"]}
        variants={containerVariants}
        initial="hidden"
        animate="reveal"
      >
        <div className={styles["container"]}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Link className={styles["go-back"]} to={'/'}><IoIosArrowRoundBack /> Go back</Link>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            Welcome back
          </motion.h2>
          <motion.p
            className={styles["prompt"]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35 }}
          >
            Log in to your account
          </motion.p>

          <form onSubmit={onSubmit}>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                className={styles["form-group"]}
                custom={index}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <p>{field.label}</p>
                <input
                  type={field.type}
                  className="form-control"
                  id={field.id}
                  name={field.id}
                  value={field.value}
                  placeholder={`${field.label}`}
                  onChange={onChange}
                />
              </motion.div>
            ))}

            <motion.div
              className={styles["form-group"]}
              custom={fields.length}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <button type="submit" className={styles["btn-block"]}>Sign In</button>
            </motion.div>
          </form>

          <motion.p
            className={styles["sign-up"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 + fields.length * 0.1 }}
          >
            Don't have an account yet? <Link to='/register'>Sign up</Link>
          </motion.p>
        </div>

        <div className={styles["image-container"]}>
          <img src="/assets/register.jpg" alt="sign up image" />
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
