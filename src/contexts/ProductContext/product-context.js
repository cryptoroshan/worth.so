import { createContext, useCallback, useEffect, useReducer, useState, useRef } from "react";
import PropTypes from "prop-types";

var ActionType;
(function (ActionType) {
  ActionType["INITIALIZE"] = "INITIALIZE";
  ActionType["RELOAD"] = "RELOAD";
})(ActionType || (ActionType = {}));

const initialState = {
  reload: false
};

const handlers = {
  INITIALIZE: (state) => {
    return {
      ...state,
      reload: false
    };
  },
  RELOAD: (state, action) => {
    const { status } = action.payload;

    return {
      ...state,
      reload: status
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const ProductContext = createContext({
  ...initialState,
  confirmReload: () => Promise.resolve()
});

export const ProductProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    dispatch({
      type: ActionType.INITIALIZE,
      payload: {
        reload: false
      }
    });
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    []
  );

  const confirmReload = useCallback(
    async (status) => {
      dispatch({
        type: ActionType.RELOAD,
        payload: {
          status
        },
      });
    },
    [dispatch]
  );

  return (
    <ProductContext.Provider
      value={{
        ...state,
        confirmReload
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ProductConsumer = ProductContext.Consumer;
