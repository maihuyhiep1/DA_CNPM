import React from "react";
import styles from "./style_QnABar.module.css"
import QnA from "../QnA/QnA";

const QnABar = () =>{
    return(
        <div className={styles.container}>
        <div className={styles.item}> 
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>

        </div>
        </div>
    );
};
export default QnABar;