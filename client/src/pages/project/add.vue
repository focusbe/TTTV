<template>
<div class="page_wrap">
	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="项目标识" prop="name">
            <Input v-model="formValidate.projectname"  placeholder="请输入项目标识，用于创建项目目录,请使用全英文"></Input>
        </FormItem>

        <FormItem label="项目名称" prop="title">
            <Input v-model="formValidate.title"  placeholder="请输入项目名称"></Input>
        </FormItem>

        <FormItem label="项目描述" prop="desc">
            <Input v-model="formValidate.desc"  placeholder="请输入项目名称"></Input>
        </FormItem>

        <FormItem label="游戏" prop="gamename">
			<Select v-model="formValidate.gamename" placeholder="请选择游戏">
                <Option v-for="item in gameList" :value="item.value" :key="item.value" >{{item.label}}</Option>
            </Select>
        </FormItem>

        <FormItem label="构建工具" prop="buildtool">
            <Select v-model="formValidate.buildtool" placeholder="请选择构建工具">
                <Option value="webpack">webpack</Option>
                <Option value="gulp">gulp</Option>
            </Select>
        </FormItem>
        
		<FormItem label="GOS单号" prop="gosid">
            <Input v-model="formValidate.gosid"  placeholder="请输入GOS单号"></Input>
			<a target="_blank" href="http://gos.ztgame.com/CenterShow/server.shtml">查看GOS</a>
        </FormItem>

        <FormItem label="版本号" prop="version">
            <Input v-model="formValidate.version"  placeholder="请输入版本号"></Input>
        </FormItem>
        <!-- <FormItem label="选择日期">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="爱好" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="吃饭"></Checkbox>
                <Checkbox label="睡觉"></Checkbox>
                <Checkbox label="跑步"></Checkbox>
                <Checkbox label="看电影"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem> -->
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
import $ from 'jquery';

// for(var i in filelist){
//     alert(i);
//     console.log(filelist[i]);
// }

export default {
	name: 'project_add',
	data() {
		return {
            projectInfo:{
                name:'name',
                desc:'desc'
            },
			gameList:[
				{
					value:'xx2',
					label:'仙侠世界2'
				},
				{
					value:'zt2m',
					label:'征途2手游'
				}
			],
			formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    projectname: [
                        { required: true, message: '项目名称不能为空', trigger: 'blur' }
                    ],
                    gamename: [
                        { required: true, message: '游戏不能为空', trigger: 'change' },

                    ],
                    buildtool: [
                        { required: true, message: '构建工具不能为空', trigger: 'change' }
                    ],
                    gosid: [
                        { required: true, message: 'GOS单号不能为空', trigger: 'blur' }
                    ]
                }
		}
	},
	mounted: function() {
       
	},
	methods: {

	}
}
</script>
