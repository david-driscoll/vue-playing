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

@Component({
    components: {},
})
export default class C extends Vue {
    asideVisible = true;
    asideCollapse = true;
    menuWidth = '300px';

    toggleMenu() {
        // this.asideVisible = !this.asideVisible;
        this.asideCollapse = !this.asideCollapse;
    }

    get width() {
        if (this.asideCollapse) {
            return '68px';
        }
        return this.menuWidth;
    }

    get marginLeft() {
        return !this.asideVisible ? `-${this.width}` : '0px';
    }

    beforeEnter(el: HTMLElement) {
        el.style.marginLeft = `-${this.width}`;
        setTimeout(() => (el.style.marginLeft = this.marginLeft), 10);
    }

    beforeLeave(el: HTMLElement) {
        el.style.marginLeft = this.marginLeft;
    }
}
</script>

<template>
    <el-container style="height: 100%; border: 1px solid #eee" direction="horizontal" class="demo-layout" id="app">
        <transition name="fade" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
            <el-aside class="menu" v-if="asideVisible" :style="{ marginLeft, width }">
                <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="asideCollapse" :style="{ width }">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">Navigator One</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">Group One</span>
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">item four</span>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Navigator Two</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">Navigator Three</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
        </transition>

        <el-container direction="vertical">
            <el-header style="text-align: left; font-size: 12px">
                <i class="el-icon-menu" style="font-size: 40px;" @click="toggleMenu"></i>
            </el-header>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <div class="grid-content bg-purple">
                            <el-button type="warning">Danger</el-button>
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
            <el-footer>
                <center>this is my footer</center>
            </el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss">
.el-container {
    position: relative;
}

.el-aside.menu {
    transition: all 0.3s;
    overflow: visible;

    .el-menu {
        transition: all 0.3s;
        // width: 100%;
    }

    .el-menu-item i {
        line-height: 56px;
    }
}

.el-container .el-aside {
    margin-left: 0;
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
