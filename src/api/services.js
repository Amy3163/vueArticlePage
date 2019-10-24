import urls from './urls';
import { Request } from '../utils/utils';

export default {
  topics(options = {}) {
    let url = `${urls.topics}${options.tab}`;
    return new Promise((resolve, reject) => {
      Request({
        method: 'GET',
        url: url,
      }, (res) => {
        resolve(res);
      });
    });
  },
  detail(options = {}) {
    let url = `${urls.detail}${options.id}`;
    options = { mdrender: true };
    return new Promise((resolve, reject) => {
      Request({
        method: 'GET',
        url: url,
        qs: options
      }, (res) => {
        resolve(res);
      });
    });
  },
  up(options = {}) {
    let url = `${urls.up}${options.id}/up`;
    return new Promise((resolve, reject) => {
      Request({
        method: 'POST',
        url: url,
        qs: options
      }, (res) => {
        resolve(res);
      });
    });
  }
};
