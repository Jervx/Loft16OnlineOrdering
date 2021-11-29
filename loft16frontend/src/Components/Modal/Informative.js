import React from "react";

import { Modal, ModalBody, ModalFooter, Button} from '@windmill/react-ui'

import { VscError } from 'react-icons/vsc'

/* Redux */
import { useSelector ,useDispatch } from "react-redux";
import { closeAlertModal } from "../../Features/uiSlice";

const Informative = () => {
  const dispatch = useDispatch()
  const alertModalState = useSelector((state) => state.ui.alertModal)

  const closeModal = () => {
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
                <div className="pl-4 ">
                  <h4 className="font-inter font-medium text-2xl defText-Col-2">{alertModalState.data.description}</h4>
                  <p className="text-gray-500">{alertModalState.data.solution}</p>
                </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <div className="hidden sm:block">
            <Button onClick={accept} className="rounded-xl  ">Ok</Button>
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
