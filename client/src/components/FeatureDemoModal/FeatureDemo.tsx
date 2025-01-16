import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./index.module.css";

const FeatureDemo: React.FC = ()=> {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div>
            <button onClick={()=> setIsModalOpen(true)}>Try Demo</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={()=> setIsModalOpen(false)}
                contentLabel="Feature Demo"
                ariaHideApp={false}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Feature Demo</h2>
                <p>This is where you can showcase a live demo of the feature.</p>
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
        </div>
    )
}

export default FeatureDemo;