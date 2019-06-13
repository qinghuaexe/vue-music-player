import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiskList() {
  const url = '/getDiskList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// export function getSongVkey(songmid) {
//   const url = '/getSongVkey'
//   const data = Object.assign({}, commonParams, {
//     songmid: songmid,
//     notice: 0,
//     platform: 'yqq.json',
//     needNewCode: 0,
//     format: 'json',
//     data: { 'req_0': { 'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': { 'guid': '9244517832', 'songmid': ['001Qu4I30eVFYb'], 'songtype': [0], 'uin': '0', 'loginflag': 1, 'platform': '20' } }, 'comm': { 'uin': 0, 'format': 'json', 'ct': 24, 'cv': 0 } }
//   })
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }