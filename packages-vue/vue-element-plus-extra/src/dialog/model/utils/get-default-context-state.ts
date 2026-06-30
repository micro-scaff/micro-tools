import {
  ELockState
} from "../enum";
import {
  IModelState,
  IDialogProps
} from "../types";

const idState = {
  incrementer: 0
};

function getId(): string {
  idState.incrementer += 1;

  return String(idState.incrementer); // 不要拼接其他的 因为逻辑中会用它来做数字比较
}

export default function getDefaultContextState(props: IDialogProps): IModelState {
  return {
    id: getId(),
    active: false,
    locked: ELockState.NO,
    zIndex: -1,
    data: props.data,
    dataLoading: false,
    windowHeight: window.innerHeight,
    form: null,
    formData: null
  };
}
