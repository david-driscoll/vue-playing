<script lang="ts">
import Vue, { ComponentOptions, VueConstructor } from 'vue';
import {
    Component,
    Emit,
    Inject,
    Model,
    Prop,
    Provide,
    Watch,
} from 'vue-property-decorator';
import 'vue-rx';

@Component
export default class C extends Vue {
    value = 'abcd';
    value2 = 'abcd';
    asideVisible = true;
    width = 300;

    toggleMenu() {
        this.asideVisible = !this.asideVisible;
    }
}
</script>

<template>
    <el-container style="height: 100%; border: 1px solid #eee" direction="vertical" class="demo-layout" id="app">
        <el-header style="text-align: left; font-size: 12px">
            <i class="el-icon-menu" style="font-size: 40px;" @click="toggleMenu"></i>
        </el-header>
        <el-container direction="horizontal">
            <el-aside v-if="asideVisible" :width="width">
                this is some side content
            </el-aside>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <div class="grid-content bg-purple">
                            <el-button type="primary">Danger</el-button>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="8" :lg="9" :xl="11">
                        <div class="grid-content bg-purple-light"></div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="8" :lg="9" :xl="11">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <div class="grid-content bg-purple-light"></div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-footer>
            <center>this is my footer</center>
        </el-footer>
    </el-container>
</template>

<style lang="scss">
.el-container {
    position: relative;
}
.el-container .el-aside {
    margin-left: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
    //   opacity: 0;
    // margin-left: 0 !important;
}
body {
    margin: 0;
}

.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-footer {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 42px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
