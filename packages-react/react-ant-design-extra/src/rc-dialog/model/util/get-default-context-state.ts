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
    id: getId(), // 因为每次 render 都会调用它，所以下一个 dialog 的 id 跟前一个是不连着的，但这并不要紧，只要保证 state.id 是不变的就行
    active: false,
    locked: ELockState.NO,
    zIndex: -1,
    data: props.data,
    dataLoading: false,
    windowHeight: window.innerHeight,
    form: null,
    formData: props.data
  };
}
