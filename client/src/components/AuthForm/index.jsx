import React from 'react';

import styles from './index.module.scss';

const AuthForm = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.nav}>Note</div>
      </header>
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>Log in</h1>
          </div>
          <div className={styles.inputs_wrapper}>
            <label>
              <span>Email</span>
              <input type="text" placeholder="Enter your email address..." />
            </label>
            <label>
              <span>Password</span>
              <input type="password" placeholder="Enter your password..." />
            </label>
          </div>
          <button className={styles.submit} type="submit">
            Log in
          </button>
          <div className={styles.switch_mode}>New account?</div>
        </form>
      </main>
    </div>
  );
};

export default AuthForm;
