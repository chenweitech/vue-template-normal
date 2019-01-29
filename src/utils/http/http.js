import axios from 'axios';
import { Loading } from 'element-ui';
import Vue from 'vue';

axios.defaults.timeout = 120000;
axios.defaults.baseURL ='';

const vm = new Vue();

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/JSON'
    };
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
);


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function fetch(url,params={},bool=true){
  if(process.env.NODE_ENV == "development") bool = false
  let loadingInstance = null
  if(bool){
    loadingInstance = Loading.service({
      text: '正在加载中',
      body: true
    });
  }
  return new Promise((resolve,reject) => {
    if(process.env.NODE_ENV == "development") url = "/API" + url
    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        vm.$message.error('网络请求失败')
        // vm.$confirm('网络在开小差，请稍后重试！', '提示', {
        //   confirmButtonText: '确定',
        //   showCancelButton: false
        // });
        reject(err)
      }).finally( ()=>{
        if(bool){
          vm.$nextTick(() => {
            loadingInstance.close();
          });
        }
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function post(url,data = {},bool= true){
  if(process.env.NODE_ENV == "development") bool = false
  let loadingInstance = null
  if(bool){
    loadingInstance = Loading.service({
      text: '正在加载中',
      body: true
    });
  }
  return new Promise((resolve,reject) => {
    if(process.env.NODE_ENV == "development") url = "/API" + url
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        vm.$message.error('网络请求失败')
        reject(err)
      })
      .finally( ()=>{
        if(bool){
          vm.$nextTick(() => {
            loadingInstance.close();
          });
        }
      });
  })
}

export default {
  fetch,
  post
}
