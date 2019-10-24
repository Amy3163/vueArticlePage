<template>
  <div class="modal-mask" v-show="visible">
    <div class="modal-wraper">
      <div class="modal-container">
        <div class="modal-header" v-if="title">{{title}}</div>
        <div class="modal-body">
          <div>
            <div v-html="message"></div>
          </div>
        </div>
        <div class="modal-btn">
          <input v-if="!showOneBtn" type="button" class="modal-btn-cancel" @click="handleCancel()" :value="cancelButtonText" />
          <input type="button" class="modal-btn-confirm" @click="handleConfirm()" :value="confirmButtonText" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modal',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    handleConfirm: {
      type: Function,
      default() {
        this.visible = false;
      }
    },
    handleCancel: {
      type: Function,
      default() {
        this.visible = false;
      }
    },
    showOneBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity .3s ease;
    overflow: hidden;
    .modal-wraper {
      vertical-align: middle;
      display: table-cell;
      .modal-container {
        margin: 0px .8rem;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all .3s ease;
        font-family: Arial, "Microsoft YaHei";
        .modal-header {
          line-height: .56rem;
          font-size: .36rem;
          padding-top: .23rem;
          text-align: center;
          font-weight: bolder;
          color: #1e1e1e;
        }
        .modal-body {
          padding: 0.12rem 0.8rem 0.3rem 0.8rem;
          font-size: .30rem;
          line-height: .4rem;
        }
        .modal-btn {
          border-top: 1px solid #e7e7e7;
          display: flex;
          width: 100%;
          .modal-btn-cancel,.modal-btn-confirm {
            flex: 1;
            height: .9rem;
            line-height: .9rem;
            font-size: .34rem;
            border: none;
            background: none;
          }
          .modal-btn-cancel {
            color: #dadada;
            border-right: 1px solid #e7e7e7;
            border-radius: initial; //解决safari border继承bug
          }
          .modal-btn-confirm {
            color: #f37937
          }
        }
      }
    }
  }

</style>

