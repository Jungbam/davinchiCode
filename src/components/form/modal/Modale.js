import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: {} },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const Modale = ({ showModal, closeModal, childeren }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <StBackDrop
          variants={backdrop}
          initial="hidden"
          animate="visible"
          className="backdrop"
          exit="hidden"
          onClick={closeModal}
        >
          <StModal
            onClick={(e) => {
              e.preventDefault();
            }}
            className="modal"
            variants={modal}
            initial="hidden"
            animate="visible"
          >
            {/* <p>Want to make another pizza?</p>
            <Link to="/">
              <button onClick={() => setShowModal(false)}>Start Again</button>
            </Link> */}
            {childeren}
          </StModal>
        </StBackDrop>
      )}
    </AnimatePresence>
  );
};

export default Modale;

const StModal = styled(motion.div)`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
`;
const StBackDrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
`;
