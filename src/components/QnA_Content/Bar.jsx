import React from "react"
import styles from "./style_bar.module.css"
import HeartIcon from '@atlaskit/icon/core/heart';
import CommentIcon from '@atlaskit/icon/core/comment';
import ShareIcon from '@atlaskit/icon/core/share';
import { Share } from "@mui/icons-material";
const Bar = () => {
    return(
        <div className={styles.bar}> 
        <div className={styles.container}>
        <HeartIcon/>
        <div className={styles.label}>
            Thích
        </div>
        </div>
        <div className={styles.container}>
        <CommentIcon/>
        <div className={styles.label}>
            Bình luận
        </div>
        </div>
        <div className={styles.container}>
        <ShareIcon/>
        <div className={styles.label}>
            Chia sẻ
        </div>
        </div>
        </div>
    )

};
export default Bar;