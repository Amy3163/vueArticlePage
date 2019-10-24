
function hostName() {
  if(process.env.NODE_ENV == 'development') {
    return {
        rmb: 'https://cnodejs.org'
    };
  }
}
let host = hostName();

export default {
  // 话题
  topics: host.rmb + '/api/v1/topics?tab=',
  // 详情
  detail: host.rmb + '/api/v1/topic/',
  // 点赞
  up: host.uprmb + '/reply/'
};