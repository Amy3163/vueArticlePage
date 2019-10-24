import axios from 'axios';
import Vue from 'vue';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';

let LoadingC = Vue.extend(Loading);
let instance;

export const Load = {
  open(options = {}) {
    if (!instance) {
      this.initInstance(options);
    }
    instance.visible = true;
  },
  initInstance(options) {
    instance = new LoadingC({
      el: document.createElement('div')
    });
    instance.text = options.text || '加载中';
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  },
  close() {
    instance.visible = false;
  }
};

export const VModal = (() => {
  let ModalC = Vue.extend(Modal);
  let modalInstance;
  let el = document.createElement('div');
  return {
    show(options = {}) {
      if(!modalInstance) {
        this.initInstance(options);
      }
      modalInstance.visible = true;
    },
    initInstance(options) {
      modalInstance = new ModalC({
        el: el
      });
      modalInstance.message = options.message || '请输入内容';
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          modalInstance[prop] = options[prop];
        }
      }
      document.body.appendChild(modalInstance.$el);
      Vue.nextTick(() => {
        modalInstance.visible = true;
      });
    },
    close() {
      modalInstance.visible = false;
      document.body.removeChild(modalInstance.$el);
    }
  }
})();

// 响应拦截（一般拦截登录，还有loading等）
axios.interceptors.response.use(function (response) {
  Load.close();
  return response;
}, function (error) {
  return Promise.reject(error);
})

export const Request = (options, cb) => {
  Load.open();
  if (!options.headers) {
    options.headers = {};
  }
  if (options.method === 'GET' || options.method === 'get') {
    axios.get(options.url, {
      params: options.qs,
      headers: options.headers
    }).then((res) => {
      if (res.status === 200) {
        cb(res.data);
      } else {
        // console.log(res);
      }
    }).catch((err) => {
      console.log(err);
      Load.close();
    });
  } else if (options.method === 'POST' || options.method === 'post') {
    axios.post(options.url, {
      ...options.qs
    }, {
      headers: options.headers
    }).then((res) => {
      if (res.status === 200) {
        cb(res.data);
      } else {
        // console.log(res);
      }
    }).catch((err) => {
      console.log(err);
      Loading.close();
    });
  }
}