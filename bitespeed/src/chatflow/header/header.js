import { useCallback, useState } from "react";
import styles from "./header.module.css";
import classNames from "classnames";
export default function Header({ nodes, edges }) {
  const [saveStatus, setSaveStatus] = useState(null);  //maintaining the status of Save press
  //saving the flow
  const handleSaveFlow = useCallback(() => {
    // this function first counts all the nodes then checks which edge end at which node. This tells us if a node has any edge
    // connected to its target handle
    let obj = {};
    nodes.forEach((node) => {
      obj[node.id] = false;
    });
    edges.forEach((edge) => {
      obj[edge.target] = true;
    });
    let count = 0;
    for (let item in obj) {
      if (!obj[item]) {
        count++;
      }
    }
    if (count !== 1) {
      setSaveStatus({
        type: "error",
      });
    } else {
      setSaveStatus({
        type: "success",
      });
    }
    setTimeout(() => {
      setSaveStatus(null);
    }, 2000);
  }, [nodes, edges]);
  return (
    <div className={styles.headerWrapper}>
      <div
        className={classNames(
          styles.baseTab,
          saveStatus
            ? saveStatus.type === "success"
              ? styles.successTab
              : styles.errorTab
            : ""
        )}
      >
        {saveStatus
          ? saveStatus.type === "success"
            ? "Flow Saved!"
            : "Invalid Flow"
          : ""}
      </div>
      <div className={styles.saveBtn} onClick={() => handleSaveFlow()}>
        Save Changes
      </div>
    </div>
  );
}
