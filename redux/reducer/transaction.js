const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUMMARY_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    }
    case "GET_SUMMARY_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    }
    case "GET_SUMMARY_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transaction;
