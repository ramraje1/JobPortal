import styles from "./loading.module.css";
export default function Loading() {
  return (
    <>
      <center>
        <div className={`d-flex justify-content-center ${styles.mrg}`}>
          <div
            className="spinner-border"
            style={{ width: "4rem", height: "4rem" }}
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </center>
    </>
  );
}
