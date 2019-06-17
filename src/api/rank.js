import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
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

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    uin: 0,
    tpl: '3',
    type: 'top'
  })
  return jsonp(url, data, options)
}