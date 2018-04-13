export const fetchData = ({url, actionType}) => (dispatch) => {

    const fetchSuccess = state => ({
        type: actionType,
        payload: {
            data: null,
            error: null,
            loading: false,
            ...state
        }
    })

    // 开始请求
    dispatch(fetchSuccess({
        loading: true
    }))
  
    return fetch(url)
      .then(res => res.text())
      .then(data => JSON.parse(data))
      .then(json => {
        dispatch(fetchSuccess({data: json.result}))
      })
      .catch(error => {
        dispatch(fetchFailed({error}))
      })
  }