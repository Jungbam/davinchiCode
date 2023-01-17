import React from "react";
import { useState } from "react";

const LockOrUnLock = (props) => {
  const [privacySetting, setPrivacySetting] = useState(true);

  return (
    <>
      {privacySetting ? (
        <span className="material-symbols-outlined">lock</span>
      ) : (
        <span className="material-symbols-outlined">lock_open</span>
      )}
    </>
  );
};

export default LockOrUnLock;
