<template>
  <div class="videos">
    <ul class="content-item">
      <li class="upload-input">
        <div class="file-button">
          <i class="icon--17">&nbsp;</i>上传</div>
        <input type="file" class="file-input" accept="audio/mpeg,audio/mp4,video/mp4" @change='uploadVideoFile($event)'>
        <div class="file-info">
          <i class="icon--15"></i>支持上传mp3、mp4</div>
        <div class="refresh" @click='refresh'>刷新</div>
      </li>
      <li class="upload-title">
        <div class="file-div">文件名</div>
        <div class="file-div">大小</div>
        <div class="file-div">上传时间</div>
        <div class="file-div">操作</div>
        <div class="file-div file-length">共{{uploadVideoData.list.length}}个文件</div>
      </li>
      <li v-for="(item,index) in uploadVideoData.list.slice().reverse()" class="upload-title-content" :key="index">
        <div class="file-div">{{ index + 1 }}</div>
        <div class="file-type-icon" :class="item.name | fileType"></div>
        <div class="file-div file-name">{{item.name}}</div>
        <div class="file-div size">{{item.size | readablizeBytes(1)}}</div>
        <div class="file-div date">{{item.createTime | parseTime('{y}/{m}/{d} {h}:{i}:{s}')}}</div>
        <div class="file-div">
          <div class="file-success" v-show="item.status == '3' && uploadVideoData.externalInputs.length == 0">
            <span class="file-ues" @click="useVideoFile(item.id,item.name)">使用</span>
            <span class="file-del" @click="delVideoFile(item.id)">删除</span>
          </div>
          <div class="file-uploading" v-show="item.status == '1'">
            上传成功
          </div>
          <div class="file-uploading" v-show="item.status == '2'">
            转码中...
          </div>
          <div class="file-failed" v-show="item.status == '4'">
            转码失败
            <span class="file-del" @click="delVideoFile(item.id)">删除</span>
          </div>
        </div>
      </li>
      <div v-show="this.uploadVideoData.isEmpty" class="empty">
        <img src="../../assets/images/empty.png" alt="">
        <div class="text">暂无音视频</div>
      </div>
    </ul>
  </div>
</template>
<script>
import { uploadFile, delFile, useFile } from 'api/uploadVideo';
import { mapGetters } from "vuex";
import config from "config";
import Bus from './Bus.js';

export default {
  name: 'uploadVideos',
  props: {
    uploadVideoData: {
      type: Object,
      default: function () {
        return {};
      }
    },
    roomId: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    uploadVideoFile(e) {
      Bus.$emit("controlLoading", true);
      this.$parent.$parent.dialogOption.text = "文件上传中，上传成功后将显示在文件列表中";
      this.$parent.$parent.showDialog = true;
      this.$parent.$parent.$refs.dialog.confirm().then(() => {
        this.$parent.$parent.showDialog = false;
      }).catch(() => {
        this.$parent.$parent.showDialog = false;
      });
      let file = e.target.files[0]
      if (file.name.indexOf('mp3') > -1 || file.name.indexOf('mp4') > -1) {
        let payload = new FormData();
        payload.append('appId', config.wd.videoAppid);
        payload.append('userId', this.uid);
        payload.append('token', this.token);
        payload.append('alias', '');
        payload.append('file', file);
        uploadFile(payload).then(response => {
          const data = response.data
          if (data.code == 0) {
            this.$emit("operateVideoSuccess");
            e.target.value = ''
          }
        })
      } else {
        Bus.$emit("controlLoading", false);
        this.$parent.$parent.dialogOption.text = "上传文件格式错误";
        this.$parent.$parent.showDialog = true;
        this.$parent.$parent.$refs.dialog.confirm().then(() => {
          this.$parent.$parent.showDialog = false;
        }).catch(() => {
          this.$parent.$parent.showDialog = false;
        });
      }
    },
    refresh() {
      this.$emit("operateVideoSuccess");
    },
    delVideoFile(id) {
      this.$parent.$parent.dialogOption.text = "确认删除所选文件？";
      this.$parent.$parent.showDialog = true;
      this.$parent.$parent.$refs.dialog.confirm().then(() => {
        delFile(config.wd.videoAppid, this.uid, id, this.token).then(response => {
          const data = response.data
          if (data.code == 0) {
            this.$emit("operateVideoSuccess");
          }
        })
        this.$parent.$parent.showDialog = false;
      }).catch(() => {
        this.$parent.$parent.showDialog = false;
      });



    },
    useVideoFile(fileId, name) {
      if (this.uploadVideoData.externalInputs.length == 0) {
        useFile(config.wd.videoAppid, this.roomId, fileId, this.token, 'h264').then(response => {
          const data = response.data
          this.$emit("useVideoSuccess", name);
        })
      }
    }
  },
  computed: {
    ...mapGetters(["token", "uid"])
  },

};

</script>
<style rel="stylesheet/scss" lang="scss">

</style>
