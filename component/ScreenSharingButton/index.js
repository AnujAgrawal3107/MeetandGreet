import { useState } from "react";
import styles from "@/component/ScreenSharingButton/index.module.css";

const ScreenSharingButton = ({ isScreenSharing, startScreenSharing, stopScreenSharing }) => {
    const [isSharing, setIsSharing] = useState(false);

    const handleButtonClick = () => {
        if (isSharing) {
            stopScreenSharing();
            setIsSharing(false);
        } else {
            startScreenSharing();
            setIsSharing(true);
        }
    };

    return (
        <button className={styles.button} onClick={handleButtonClick}>
            {isScreenSharing ? "Stop Screen Sharing" : "Start Screen Sharing"}
        </button>
    );
};

export default ScreenSharingButton;
