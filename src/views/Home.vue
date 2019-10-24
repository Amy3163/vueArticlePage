<template>
  <div class="home container">
    <div class="home-header">
      <h1 class="home-title">Node.js</h1>
      <nav class="home-nav">
        <div 
        @click="changeTab(tab.tab)" 
        class="home-nav-item" 
        :class="{active: tab.tab === activeTab}" 
        v-for="(tab,index) in tabs" 
        :key="index" >{{tab.name}}</div>
      </nav>
    </div>
    
    <div class="home-content">
      <div class="home-aricle" 
        v-for="article in articles" 
        @click="toDetail(article.id)" 
        :key="article.id">
        <div class="home-aricle-ava">
          <img :src="article.author.avatar_url" style="width:100%;" />
        </div>
        <div class="home-aricle-dis" v-if="article.top">置顶</div>
        <div class="home-aricle-dis" v-else-if="article.good">精华</div>
        <div v-else class="home-aricle-dis home-aricle-share">
            {{article.tab == 'share'
            ? '分享' 
            : article.tab =='ask' 
            ? '问答' 
            : article.tab =='job' 
            ? '招聘'
            : article.tab =='dev'
            ? '客户端测试'
            : ''}}
          </div>
          <div class="home-article-title">
            <p>{{article.title}}</p>
            <p>{{ article.reply_count }}/<span class="home-artical-visit">{{ article.visit_count }}</span></p>
          </div>
          <div class="home-article-time">{{ article.last_reply_at | fromNow }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import services from '../api/services';
  import filters from '../filters/filters';
  import {VModal} from '../utils/utils';

  export default {
    name: 'home',
    data() {
      return {
        tabs: [
          {
            tab: 'all',
            name: '全部'
          },
          {
            tab: 'good',
            name: '精华'
          },
          {
            tab: 'share',
            name: '分享'
          },
          {
            tab: 'ask',
            name: '问答'
          },
          {
            tab: 'job',
            name: '招聘'
          },
          {
            tab: 'dev',
            name: '客户端测试'
          }
        ],
        activeTab: 'all',
        articles: []
      }
    },
    created() {
      this.changeTab('all');
    },
    filters: {
      ...filters
    },
    methods: {
      changeTab(tab) {
        // VModal.show({showOneBtn: true});
        this.activeTab = tab;
        services.topics({
          tab
        }).then((data) => {
            this.articles = data.data;
        }, (error) => {
            console.log(error);
        });
      },
      toDetail(id) {
        this.$router.push(`/detail/${id}`);
      }
    }
  }
</script>
<style lang="less">
  .home {
    .home-header {
      background-color: @bgGrey;
      padding: .2rem .2rem;
      .home-title {
        margin-top: 0;
      }
    }
    .home-nav {
      // background-color: @bgGrey;
      .home-nav-item {
        display: inline-block;
        *display: inline;
        zoom: 1;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }
      .active {
        background-color: @bgNav;
      }
    }
    .home-content {
      .home-aricle {
        height: 1.04rem;
        background-color: #fff;
        padding: .2rem;
        display: flex;
        // justify-content: space-around;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        .home-aricle-ava {
          width: 1rem;
        }
        .home-aricle-dis {
          height: .4rem;
          width: .66rem;
          white-space: nowrap;
          font-size: .24rem;
          text-align: center;
          margin-left: .22rem;
          line-height: .4rem;
          border-radius: 4px;
          color: #fff;
          background-color: #80bd01;
        }
        .home-aricle-share {
          background-color: #e5e5e5;
          color: #999;
        }
        .home-article-title {
          margin-left: .12rem;
          color: @fontColor;
          width: 58%;
          .home-artical-visit {
            color: #b4b4b4;
          }
        }
        .home-article-time {
          line-height: .9rem;
          margin-left: .26rem;
          white-space: nowrap;
          color: #b4b4b4;
        }
      }
    }
    
  }
</style>

