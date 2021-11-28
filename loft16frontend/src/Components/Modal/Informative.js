import React from "react";

import { Modal, ModalBody, ModalFooter, Button} from '@windmill/react-ui'

import { VscError } from 'react-icons/vsc'

/* Redux */
import { useSelector ,useDispatch } from "react-redux";
import { closeAlertModal } from "../../Features/uiSlice";

const Informative = () => {
  const dispatch = useDispatch()
  const alertModalState = useSelector((state) => state.ui.alertModal)

  function closeModal() {
   dispatch(closeAlertModal())
  }

  const accept = () =>{
    closeModal()
  }

  return (
    <>
      <Modal isOpen={alertModalState.state} onClose={closeModal}>
        {/* <ModalHeader>{inputModalState.title}</ModalHeader> */}
        <ModalBody>
          <div>
            <div className="flex items-center">
                <VscError className="bg-red-100 text-red-600 rounded-full p-3 w-14 h-14" />
                <h4 className="font-inter font-medium text-2xl pl-4 defText-Col-2">{}</h4>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <div className="hidden sm:block">
            <Button className="rounded-xl  ">Ok</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button onClick={accept} className="rounded-xl " block size="large">
              Ok
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Informative;
