import { useMemo } from "react";
import styles from "./newNode.module.css";
import Message from '../../../../../assets/message.png'

export default function NewNode({ nodeTypesList }) {
  // to configure node data whenever user wants to create new node via dragging
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypeLst = useMemo(() => {
    return nodeTypesList.map((node, index) => (
      <div
        key={index}
        className={styles.nodeBox}
        draggable={true}
        onDragStart={(event) => onDragStart(event, node.type)}
      >
        <img src={Message} alt='message'></img>
        {node.type}
      </div>
    ));
  }, [nodeTypesList]);
  return <div className={styles.wrapper}>{nodeTypeLst}</div>;
}
