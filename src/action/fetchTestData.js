// 请求的三个状态，开始请求，请求成功，请求失败
import * as actionType from '../actionType';

const startFetch = () => ({
  type: actionType.START_FETCH
})
const fetchSuccess = payload => ({
  type: actionType.FETCH_SUCCESS,
  payload
})
const fetchFailed = error => ({
  type: actionType.FETCH_FAILED,
  error
})

// 在请求的三个阶段中，dispatch不同的action
export const fetchData = (params) => (dispatch) => {
  // 开始请求
  dispatch(startFetch())

  return fetch('/api/test')
    .then(res => res.text())
    .then(data => JSON.parse(data))
    .then(json => {
      dispatch(fetchSuccess(json.result))
    })
    .catch(error => {
      dispatch(fetchFailed(error))
    })
}
 