import styles from './index.module.css';
import Image from 'next/image';

export const Logo = () => <Image className={styles.logo} src='/university-logo.png' alt="university logo" />
