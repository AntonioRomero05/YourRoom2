import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div className={styles.spinner}>
        <FaSpinner className={styles.spinning} size={60}/>
    </div>
  )
}

export default Spinner