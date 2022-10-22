import styles from "./index.module.css";
import { IProgress } from "./index.d";

export const ProgressBar = ({ percentage }: IProgress) => (
    <div id="progressbar" className={styles.progressbar}>
        <div id="bar" className={styles.bar} style={{ width: `${percentage}%` }}>
            {percentage}%
        </div>
    </div>
)