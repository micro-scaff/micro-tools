<script lang="ts" setup>
import {
  watch
} from "vue";

import {
  useState
} from "../../src";

const [
  state,
  setState
] = useState({
  age: 1
});

const handleClick = (): void => {
  setState({
    age: 2
  });
};

const handleReductionClick = (): void => {
  setState();
};

watch(() => {
  return state.age;
}, (newValue, oldValue) => {
  // eslint-disable-next-line no-console
  console.log(newValue, oldValue);

});

const [
  stateNum,
  setStateNum
] = useState(1);

const handleAddNumClick = (): void => {
  setStateNum(stateNum => {
    return stateNum + 1;
  });
};

</script>

<template>
  <div>
    useState
    <hr />
    {{ state.age }}
    <br />
    <br />
    <button @click="handleClick">
      修改
    </button>
    <br />
    <button @click="handleReductionClick">
      初始化
    </button>
    <hr />
    {{ stateNum }}
    <br />
    <br />
    <button @click="handleAddNumClick">
      修改
    </button>
    <br />
  </div>
</template>
