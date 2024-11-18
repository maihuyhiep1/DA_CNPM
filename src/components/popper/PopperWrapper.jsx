import React from 'react'
import styles from './popper.module.css';

const PopperWrapper = ({children}) => {
  return (
    <div className={styles.wrapper}>{children}</div>
  )
}

export default PopperWrapper