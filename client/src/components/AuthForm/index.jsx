import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FaTimesCircle } from 'react-icons/fa';

import styles from './index.module.scss';

const AuthForm = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log({
        email: userInput.email,
        password: userInput.password,
      });
    }
  };

  return (
    <div onSubmit={handleSubmit} className={styles.container}>
      <header className={styles.header}>
        <div className={styles.nav}>Note</div>
      </header>
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>{isLogin ? 'Log in' : 'Sign up'}</h1>
          </div>
          <div className={styles.inputs_container}>
            {!isLogin && (
              <>
                <label>
                  <span>Name</span>
                  <div
                    onChange={(e) =>
                      setUserInput((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    className={styles.input_wrapper}
                  >
                    <input type="text" placeholder="Enter your name..." />
                    {userInput.name.length > 0 && (
                      <FaTimesCircle
                        className={styles.cancel_icon}
                        size={'1.6rem'}
                      />
                    )}
                  </div>
                </label>
                <label>
                  <span>Last Name</span>
                  <div
                    onChange={(e) =>
                      setUserInput((prevState) => ({
                        ...prevState,
                        lastName: e.target.value,
                      }))
                    }
                    className={styles.input_wrapper}
                  >
                    <input type="text" placeholder="Enter your last name..." />
                    {userInput.lastName.length > 0 && (
                      <FaTimesCircle
                        className={styles.cancel_icon}
                        size={'1.6rem'}
                      />
                    )}
                  </div>
                </label>
              </>
            )}
            <label>
              <span>Email</span>
              <div
                onChange={(e) =>
                  setUserInput((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                className={styles.input_wrapper}
              >
                <input type="email" placeholder="Enter your email address..." />
                {userInput.email.length > 0 && (
                  <FaTimesCircle
                    className={styles.cancel_icon}
                    size={'1.6rem'}
                  />
                )}
              </div>
            </label>
            <label>
              <span>Password</span>
              <div
                onChange={(e) =>
                  setUserInput((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
                className={styles.input_wrapper}
              >
                <input type="password" placeholder="Enter your password..." />
                {userInput.password.length > 0 && (
                  <FaTimesCircle
                    className={styles.cancel_icon}
                    size={'1.6rem'}
                  />
                )}
              </div>
            </label>
          </div>
          <button className={styles.submit} type="submit">
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
          <div className={styles.switch_mode_wrapper}>
            <Link
              to={isLogin ? '/signup' : '/login'}
              className={styles.switch_mode}
            >
              {isLogin ? 'New account?' : 'Already have an account?'}
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AuthForm;
