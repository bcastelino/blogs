import styles from './BrandMark.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function BrandMark({ size = 30, className }) {
  return (
    <span
      className={[styles.wrap, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
    >
      <img
        src={`${basePath}/tbj-black-logo.png`}
        alt="The Brian Journal"
        width={size}
        height={size}
        className={styles.light}
      />
      <img
        src={`${basePath}/tbj-white-logo.png`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={styles.dark}
      />
    </span>
  );
}
