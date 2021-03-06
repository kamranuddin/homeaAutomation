/**
 * Created by Irfan on 09-Jun-17.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async');



//services
var userServices = require('../services/userServices');
var homeService = require('../services/homeServices');
var floorService = require('../services/floorServices');
var palaceService = require('../services/palaceServices');
var switchService = require('../services/switchServices');
var sensorService = require('../services/sensorServices');
var switchLogService = require('../services/switchLogService');
var sensorlogService = require('../services/sensorlogServices');
var dashboarduserdataService = require('../services/dashboarduserdataServices');

import {ensureAuthorization} from "./../utils/"
import { ensureAnonymity, rejectRequest, caughtError } from '../utils'

var models = require('./../models')



module.exports= function(io){

    var io = io.of('/dashboard');

    router.get('/testing',function(req,res,nex) {
        models.user.findAll().then(function(result){
            res.send({result:result});
        });
    })

    // basically request for /dashboard
    router.get('/',ensureAuthorization,function(req,res,nex){

                console.log('my dashboard api called')
                var data = {
                    email:req.user.user_name
                }
                console.log('request . user')
                console.log(req.user)
                async.waterfall([

                    function findUser(callback){
                        userServices.findUser(data,callback);

                    },
                    function findHome(data,callback){
                        homeService.findHome(data,callback);

                    },function findDDashboardUserData(data,callback){
                        dashboarduserdataService.findDashboardUserData(data,callback);

                    },
                    function findFloor(data,callback){
                        floorService.findFloor(data,callback);

                    },
                    function findPalace(data,callback){
                        palaceService.findPalace(data,callback);
                    },
                    function findSwitch(data,callback)
                    {
                        switchService.findSwitch(data,callback);
                    },
                    function findSensor(data,callback){

                        sensorService.findSensor(data,callback);
                    },
                    function findBulbSwitchLog(data,callback){
                        switchLogService.findBulbSwitchLog(data,callback);

                    },
                    function findFanSwitchLog(data,callback){
                        switchLogService.findFanSwitchLog(data,callback);

                    },
                    function findTempSensorLog(data,callback){
                        sensorlogService.findTempSensorLog(data,callback);
                    },
                    function findLightSensorLog(data,callback){
                        sensorlogService.findLightSensorLog(data,callback);

                    }





                ],function(error,result){

                    if(error)
                        console.log('error = '+error)
                    else
                    {
                        var dashboardData={
                            overview:{
                                bulb:{
                                    totalon:0,
                                    total:0


                                },
                                fan:{
                                    totalon:0,
                                    total:0
                                },
                                mode:{

                                }


                            },
                            temp_sensor_log:[],
                            light_sensor_log:[],
                            bulb_log:[],
                            fan_log:[],
                            widget:[]

                        };

                        for(var i=0;i<result.switches.length;i++){
                            var single_switch = result.switches[i];
                            console.log(single_switch);

                            if(single_switch.dataValues.applianceApplianceId==1)
                            {
                                dashboardData.overview.bulb.total = dashboardData.overview.bulb.total+1;
                                if(single_switch.dataValues.status==1)
                                    dashboardData.overview.bulb.totalon = dashboardData.overview.bulb.totalon+1;
                            }
                            else
                            {
                                dashboardData.overview.fan.total = dashboardData.overview.fan.total+1;
                                if(single_switch.dataValues.status==1)
                                    dashboardData.overview.fan.totalon = dashboardData.overview.fan.totalon+1;
                            }

                        }

                        dashboardData.overview.mode.id=result.home[0].dataValues.mode.dataValues.id;
                        dashboardData.overview.mode.name=result.home[0].dataValues.mode.dataValues.name;

                        //widget
                        for(var l=0;l<result.dashboard_userdata.length;l++)
                        {
                            if(result.dashboard_userdata[l].dataValues.area=="widget_area") {
                              console.log('working l ='+l);
                                var widget = {
                                    did: result.dashboard_userdata[l].dataValues.did,
                                    area: result.dashboard_userdata[l].dataValues.area,
                                    palace: result.dashboard_userdata[l].dataValues.palacePalaceId,
                                    user_name: result.dashboard_userdata[l].dataValues.userUserName,
                                    floor: result.dashboard_userdata[l].dataValues.floorFloorId,
                                    sensor: result.dashboard_userdata[l].dataValues.sensorSensorId

                                }
                                if (result.dashboard_userdata[l].dataValues.switchSwitchId) {
                                    widget.switch = {
                                        switch_id: result.dashboard_userdata[l].dataValues.switchSwitchId,
                                        name: result.dashboard_userdata[l].dataValues.switch.name,
                                        appliance_id: result.dashboard_userdata[l].dataValues.switch.applianceApplianceId,
                                        palace_id: result.dashboard_userdata[l].dataValues.switch.palacePalaceId,
                                        status: result.dashboard_userdata[l].dataValues.switch.status

                                    }
                                }
                                else if (result.dashboard_userdata[l].dataValues.sensorSensorId) {
                                    widget.sensor = {
                                        sensor_id: result.dashboard_userdata[l].dataValues.sensorSensorId,
                                        name: result.dashboard_userdata[l].dataValues.sensor.name,
                                        appliance_id: result.dashboard_userdata[l].dataValues.sensor.applianceApplianceId,
                                        palace_id: result.dashboard_userdata[l].dataValues.sensor.palacePalaceId,
                                        value: result.dashboard_userdata[l].dataValues.sensor.value


                                    }
                                }


                                dashboardData.widget.push(widget);


                            }

                        }


                        for(var i=0;i<result.bulb_log.length;i++) {
                            dashboardData.bulb_log.push(result.bulb_log[i].dataValues);


                        }
                        for(var k=0;k<result.bulb_log.length;k++) {
                            dashboardData.fan_log.push(result.bulb_log[k].dataValues);


                        }


                        for(var j=0;j<result.temp_sensor_log.length;j++) {
                            dashboardData.temp_sensor_log.push(result.temp_sensor_log[j].dataValues);


                        }
                        for(var k=0;k<result.light_sensor_log.length;k++) {
                            dashboardData.light_sensor_log.push(result.light_sensor_log[k].dataValues);


                        }


                        console.log('dashboard data ='+dashboardData);
                        console.log('result'+result);

                        res.send({DashboardData:dashboardData});

                    }



                });

    });




    //for setting mode
  router.post('/setMode',function(req,res,nex){

    console.log('/setMode called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    let { mode,home_id} = body
    if ( !mode || !home_id) {
      rejectRequest('Missing required arguments', res)
      return
    }

    if(mode =='manual')
    {
      mode =2

    }
    else
    {
      mode =1
    }

    dashboarduserdataService.updateMode({ mode,home_id},function(err,result){

      if(!err)
      {
        res
          .status(200)
          .send({
            message: 'saved!'
          })
      }
      else
      {
        rejectRequest('Unkown Error occured', res)
      }
    })




  });

    io.on('connection',function(socket ){
        console.log('a new user connected in /dashboard end point');


        socket.on('token',function(data) {

            let {user}  = data.user;
            console.log('user'+user);
            console.log('In /dashboard end point i am connecting to room '+user.accountAccountId);
            socket.join(user.accountAccountId);


        });




        socket.on('disconnect',function(){
            console.log('a user disconnected in /dashboard end point');
        })
    });


    return router;
}