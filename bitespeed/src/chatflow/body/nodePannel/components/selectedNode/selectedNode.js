import { useEffect, useMemo, useState } from "react";
import styles from "./selectedNode.module.css";
import BackImg from "../../../../../assets/left-arrow.svg";
export default function SelectedNode({ nodeSelected, nodes, setNodes,setNodeSelected }) {
  // get the value of selected nodes from the node list
  let values = useMemo(() => {
    return nodes?.find((ele) => ele.id === nodeSelected);
  }, [nodes, nodeSelected]);
  function handleMakeChanges() {
    let element = document.getElementById("node-text-data").value;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeSelected) {
          node.data = { label: element };
        }
        return node;
      })
    );
  }

  // handle back btn
  function handleBackBtn(){
    setNodeSelected(null)
    setNodes((nds) =>
    nds.map((node) => {
      if (node.id === nodeSelected) {
        node.selected=false;
      }
      return node;
    })
  );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img
          src={BackImg}
          height="20px"
          style={{ cursor: "pointer", position: "absolute", left: "10px" }}
          alt="back"
          onClick={()=>handleBackBtn()}
        ></img>{" "}
        Message
      </div>
      <div className={styles.body}>
        <div className={styles.bodyType}>Text</div>
        <textarea
          id="node-text-data"
          className={styles.textAreaCont}
          value={values?.data?.label}
          onChange={(event) => handleMakeChanges(event)}
        ></textarea>
      </div>
    </div>
  );
}
