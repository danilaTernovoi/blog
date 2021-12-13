interface ModalState {
  showed: boolean;
  message: string;
}

type ModalAction = {
  type: string;
  payload: any;
};

const init: ModalState = {
  showed: false,
  message: "",
};

const modalReducer = (state = init, action: ModalAction): ModalState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default modalReducer;
