// import jsonp from '../common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'

export function getTopList() {
  const url = '/getTopList'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}