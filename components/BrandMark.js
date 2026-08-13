import styles from './BrandMark.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function BrandMark({ size = 30, className }) {
  return (
    <span
      className={[styles.wrap, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
    >
      <img
        src={`${basePath}/brand/tbj-black-logo.png`}
        alt="The Brian Journal logo"
        width={size}
        height={size}
        className={styles.logo}
      />
    </span>
  );
}
