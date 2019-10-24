<template>
<!-- children -->
  <div class="detail container">
    <div class="detail-info">
      <div class="detail-title">
        <span class="detail-aricle-dis" v-if="articleData.top">置顶</span> 
        <span class="detail-aricle-dis" v-else-if="articleData.top">精华</span> 
        <span v-else class="detail-aricle-dis detail-aricle-share">
          {{articleData.tab == 'share'
          ? '分享' 
          : articleData.tab =='ask' 
          ? '问答' 
          : articleData.tab =='job' 
          ? '招聘'
          : articleData.tab =='dev'
          ? '客户端测试'
          : ''}}
        </span>
        {{articleData.title}}
      </div>
      <div class="detail-point">
        <span>发布于{{ articleData.create_at | fromNow }}</span>
        <span>作者{{ author.loginname }}</span>
        <span>{{ articleData.visit_count}}次浏览</span>
        <span>最后一次编辑是{{ articleData.last_reply_at | fromNow }}</span>
        <span>来自 {{ articleData.tab | tabText }}</span>
      </div>
    </div>
    <div class="detail-content" v-html="articleData.content"></div>
    <div class="detail-comments">
      <div class="detail-comments-count">{{articleData.reply_count}} 回复</div>
      <div v-for="(reply,idx) in articleData.replies" 
        :key="reply.id"
        :class="['detail-comment',{'detail-comment-good': reply.ups.length>4}]">
        <div class="detail-commentator">
          <div class="detail-commentator-ava">
              <img :src="reply.author.avatar_url" width="100%" />
          </div>
          <div class="detail-commentator-info">
            {{reply.author.loginname}}
            <span class="detail-commentator-time">
              {{idx}}楼 - {{reply.create_at | fromNow}}
            </span>
          </div>
          <div class="detail-commentator-ups" @click="ups(reply.id,idx)">
            <span :class="['iconfont', 'icon-buoumaotubiao16', 'detail-like-icon', {'detail-like': reply.is_uped}]" title="喜欢">
            </span>
            <span>&nbsp;{{reply.ups.length}}</span>
          </div>
        </div>
        <div class="detail-commentator-msg" v-html="reply.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import services from '../api/services';
import filters from '../filters/filters'
export default {
  name: 'detail',
  data() {
    return {
      id: '',
      articleData: {},
      author: {}
    }
  },
  filters: {
    ...filters
  },
  created() {
    const id = this.$route.params.id;
    services.detail({
      id
    }).then((data) => {
      this.articleData = data.data;
      this.author = data.data.author;
    });
  },
  methods: {
    ups(id, idx){
      this.articleData.replies[idx].is_uped = true;
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .detail-info {
    border-bottom: 1px solid #ccc;
    width: 100%;
    padding-top: .18rem;
    background-color: #fafafa;
    .detail-title {
      font-size: .44rem;
      font-weight: 700;
      margin: 0 .26rem .18rem .18rem;
      width: 80%;
      line-height: .6rem;
      vertical-align: bottom;
      .detail-aricle-dis {
        height: .4rem;
        width: .66rem;
        white-space: nowrap;
        display: inline-block;
        font-size: .24rem;
        text-align: center;
        // margin-left: .22rem;
        margin-right: .14rem;
        line-height: .4rem;
        border-radius: 4px;
        color: #fff;
        background-color: #80bd01;
      }
      .detail-aricle-share {
        background-color: #e5e5e5;
        color: #999;
      }
    }
    .detail-point {
      font-size: 12px;
      color: #838383;
      line-height: .4rem;
      padding: 0 .26rem .18rem .18rem;
      span {
        &:before {
          content: '•';
        }
      }
    }
  }
  .detail-content {
    padding: 0 .4rem .2rem .4rem;
    overflow: hidden;
  }
  .detail-comments {
    padding-top: .54rem;
    .detail-comments-count {
      height: .82rem;
      padding-left: .2rem;
      color: #444;
      background-color: #f6f6f6;
      line-height: .82rem;
      font-size: .28rem;
    }
    .detail-comment {
      padding: .24rem .2rem.5rem .28rem;
      border-bottom: 1px solid #ccc;
      .detail-commentator {
        display: flex;
        justify-content: space-between;
        .detail-commentator-ava {
          width: .64rem;
        }
        .detail-commentator-info {
          width: 80%;
          padding-left: .18rem;
          font-size: .28rem;
          .detail-commentator-time {
            color: #4e88cc;
          }
        }
        .detail-commentator-ups {
          display: flex;
          .detail-like-icon {
            color: #bababa;
          }
          .detail-like {
            color: red;
          }
        }
      }
    }
    .detail-comment-good {
      background-color: #f4fcf0;
    }
    
  }
}
</style>
<style scoped>
  .detail-content >>> img {
    max-width: 100%;
  }
</style>

