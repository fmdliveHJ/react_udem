import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

/**
 *
 * @param {*} state 현재 상태
 * @param {*} action
 * @returns
 * 새상태를 반환해야함
 */
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state, //이전상태의 복사본 > 이전상태의 데이터를 분실하지 않기 위해 > 이전 상태의 객체(키 값)을 새 객체에 복사
        value: action.val, //상태에 value 프로퍼티가 있다면, 새값을 액션과 함께 전달하는 방법은 내가 결정함
        isValid: validate(action.val, action.validators), //입력이 유효한지 아닌지 확인
        //validate를 호출할고 action.val을 전달해서 입력필드에 사용자 입력이 들어가게 함
        // actioin.validators 는 제공해야하는 동작에 관한 검증자 목록 이 액션 검증자는
        //changeHandler의 함수에서 검증자 키를 추가하고 input컴포넌트에 전달한 검증자 프로퍼티를 가져옴
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  /**
   * 디스패치하는 액션을 수신함 현재 상태를 수신
   * 수신한 액션을 기반으로 현재 상태를 업데이트
   */
  const [inputState, dispatch] = useReducer(inputReducer, {
    //useState와 같이 무언가를 반환하고 똑같이 두개의 요소를 가진 배열을 반환함
    // 현재상태, 호출할수 있는 디스패치 함수 > 리듀서 하뭇에 액션을 디스패치 할수 있음
    //함수를 실행해서 새상태를 반환하고 inputState를 업데이트 함 그리고 마지막으로 컴포넌트를 리렌더링함
    value: props.initialValue || '', //빈문자열로 설정한 객체를 입력
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  /**
   *
   * @param {*} event
   * 둘이상의 상태를 관리하고 두상태가 연결된 경우
   * 두개의 상태가 명확하게 연결되어 있고, 유효성이 입력값에 따라 달라진다면
   * useReducer를 사용해서 상태를 업데이트 하고 컴포넌트를 리렌더링 하는 함수를 호출함
   * 상태가 더 복잡해지거나 상호 연결된 상태일때 유용함
   */
  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE', //inputReducer에 있는 type case와 똑같은 식별자를 사용해야함
      val: event.target.value, //event는 onChange 이벤트를 통해 전달되는 객체 target은 이벤트가 발생한 요소를 가리킴
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler} //사용자가 입력 요소에서 포커스를 잃엇을대 트리거
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
