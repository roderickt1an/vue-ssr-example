<template>
    <div style="background-color:#f64a42;height:100vh;">
        <img src="./static/header.png" style="width:100%;height:35vh;">
        <div class="main" style="margin-top:-10px">
        <!-- <img src="./static/guaguademo.png" id="guagua" style="display: none;" class="demo"> -->
        <!-- <div class="msg">刮开灰色部分看看，<a href="javascript:void(0)" onClick="window.location.reload()">再来一次</a></div> -->
            <center>
                <div class="content-border">
                    <!-- <canvas></canvas> -->
                    <div style="width:90%;height:15vh">
                        <h2>{{result.company_name}}</h2>
                        <span v-html="result.pass_rate"></span>
                    </div>
                </div>
            </center>
            <center style="margin-top:10px!important;width:80%;margin:auto">
                <img src="./static/inputcpname.png" style="width:50%;margin-top:10px!important">
                <field label="选择城市：" style="margin-bottom:5px;border-radius:6px;margin-top:5px;" v-model="city"></field>
                <field label="选择行业：" style="margin-bottom:5px;border-radius:6px" v-model="company_name"></field>
                <field label="意向名称：" style="margin-bottom:5px;border-radius:6px" v-model="company_line"></field>
                <Button type="danger" size="large" @click="submit"> 立刻提交</Button>

                <img src="./static/resultList.png" style="width:25%;margin-top:10px">
            </center>
    </div>
    </div>
</template>

<script>
import { Button, Field } from 'vant';
import 'vant/lib/vant-css/button.css';
import 'vant/lib/vant-css/field.css';

export default {
    asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
        return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
        // 从 store 的 state 对象中的获取 item。
        item () {
            return this.$store.state.items[this.$route.params.id]
        }
    },
    components:{
        Button,
        Field
    },
    data(){
        return{
            city: "",
            company_name: "",
            company_line: "",
            result: ""
        }
    },
    methods:{
        submit(){
            let _self = this
            let url = `api/store/tools/company/name/verification`
            let config = {
                params: {
                    city: _self.city,
                    company_name: _self.company_name,
                    company_line: _self.company_line
                }
            }

            function success(res){
                // eslint-disable-next-line
                _self.result = res.data.data
            }

            this.$Get(url, config, success)

        }
    }
}
</script>

<style scoped>
*{
    font-size:12px
}
.main{
    padding-top:4vh;
    background-image: url('static/main2.png');
    background-size: 100%;
    height: 60.5vh;
    border:3vw solid #f64a42;
    border-top:none;
    border-bottom:2vh solid #f64a42
}
.content-border{
    margin-top:10px;
    width: 80%;
    background-image: url('static/26.png');
    background-size: 100%;
    background-position:bottom;
    background-repeat:no-repeat;
}
.van-cell{
    background: #b6a37f;
    padding: 5px 2px;
    line-height: 20px;
}
.van-cell:not(:last-child)::after{
    content: none;
}
.van-button{
    border-radius: 5px;
}
.van-button--large{
    line-height: 22px;
    height: 26px;
}
</style>

