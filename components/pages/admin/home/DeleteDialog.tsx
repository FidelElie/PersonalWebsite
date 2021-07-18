// ! Components
import Modal from "../../../misc/Modal";

const DeleteDialog = (props: any) => {
  const {
    title= "Are You Sure?",
    text,
    dialogOpen,
    closeDialog,
    onConfirm
  } = props;

  return (
    <Modal
      id="deletion-dialog"
      isOpen={dialogOpen}
      onClose={closeDialog}
      contentClassName="w-1/2 lg:w-1/4 bg-white rounded-md overflow-hidden"
      elevation={30}
    >
      <div className="flex flex-col justify-center">
        <div className="bg-primary p-5 flex items-center justify-between">
          <span className="text-xl text-white tracking-tight">{ title }</span>
          <i className="fas fa-exclamation-circle text-white text-2xl"/>
        </div>
        <div className="px-5 py-3">
          <span className="text-secondary">{ text }</span>
        </div>
        <div className="flex justify-end space-x-2 px-5 py-3">
          <button className="button bg-tertiary text-white" onClick={closeDialog}>
            Cancel
          </button>
          <button className="button bg-primary text-white" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteDialog;
