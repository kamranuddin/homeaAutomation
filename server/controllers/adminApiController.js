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
var accountService = require('../services/accountService');
var sensorService = require('../services/sensorServices');
var switchLogService = require('../services/switchLogService');
var sensorlogService = require('../services/sensorlogServices');
var dashboarduserdataService = require('../services/dashboarduserdataServices');

import {ensureAuthorization} from "./../utils/"
import { ensureAnonymity, rejectRequest, caughtError } from '../utils'




module.exports= function(io){


  // /addAcount
  router.post('/addAccount',function(req,res,nex){

    console.log('/addAccount called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    const { status} = body
    if ( !status) {
      rejectRequest('Missing required arguments', res)
      return
    }


    accountService.addAccount({ status},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })
    })




  });
  // get all data by account
  router.get('/dataByAccounts',function(req,res,nex){

    console.log('/dataByAccounts called')

    accountService.getAllData(function(err,result){

      res
        .status(200)
        .send({
          data: result
        })
    })




  });

  //get all accounts
  router.get('/allAccount',function(req,res,nex){

    console.log('/allAccount called')

    accountService.getAllAccount(function(err,result){

      res
        .status(200)
        .send({
          data: result
        })
    })




  });


  // /addHome
  router.post('/addHome',function(req,res,nex){
    console.log('/addHome called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    const { name,description,accountId} = body
    if ( !name || !accountId ) {
      rejectRequest('Missing required arguments', res)
      return
    }

    homeService.addHome({ name,description,accountId},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })
    })


  });
  //get all home
  router.get('/allHome',function(req,res,nex){

    console.log('/allHome called')

    homeService.getAllHome(function(err,result){

      res
        .status(200)
        .send({
          data: result
        })
    })




  });



  // /addFloor
  router.post('/addFloor',function(req,res,nex){

    console.log('/addFloor called')

    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    let { name,homeId,floortype} = body
    if ( !name || !homeId ||!floortype) {
      rejectRequest('Missing required arguments', res)
      return
    }

    if(floortype=='first')
    {
      floortype=2
    }
    else if(floortype=="second")
    {
      floortype=3
    }
    else
    {
      floortype=1
    }


    floorService.addFloor({ name,homeId,floortype},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })
    })




  });
  //get floor by home id
  router.get('/floor/:home_id',function(req,res,nex){

    console.log('/floor home id called')

    floorService.findFloor({home_id:req.params.home_id},function(err,result){

      res
        .status(200)
        .send({
          data: result
        })
    })




  });



  // /addPalace
  router.post('/addPalace',function(req,res,nex){

    console.log('/addPalace called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    let { name,floorId,palaceType} = body
    if ( !name || !floorId ||!palaceType) {
      rejectRequest('Missing required arguments', res)
      return
    }

    if(palaceType=='hall')
    {
      palaceType=2
    }
    else if(palaceType=="garden")
    {
      palaceType=3
    }
    else
    {
      palaceType=1
    }


    palaceService.addPalace({ name,floorId,palaceType},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })
    })




  });
  //get paalace by floor id
  router.get('/palace/:floor',function(req,res,nex){

    console.log('/paalace floor id called')

    palaceService.findPalceByFloorId({floor:req.params.floor},function(err,result){

      res
        .status(200)
        .send({
          data: result
        })
    })




  });


  // /addSwitch
  router.post('/addSwitch',function(req,res,nex){

    console.log('/addSwitch called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    let { name,applianceType,palaceId} = body
    if ( !name || !applianceType||!palaceId ) {
      rejectRequest('Missing required arguments', res)
      return
    }

    if(applianceType =='light')
    {
      applianceType =1

    }
    else
    {
      applianceType =2
    }

    switchService.addSwitch({ name,applianceType,palaceId},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })
    })




  });


  // /addSensor
  router.post('/addSensor',function(req,res,nex){

    console.log('/addSensor called')
    const { body } = req
    if ( !body ) {
      rejectRequest('Missing request body', res)
      return
    }

    let { name,sensorType,palaceId} = body
    if ( !name || !sensorType||!palaceId ) {
      rejectRequest('Missing required arguments', res)
      return
    }

    if(sensorType=="temperature")
    {
      sensorType=1;

    }
    else{
      sensorType =2
    }

    sensorService.addSensor({ name,sensorType,palaceId},function(err,result){

      res
        .status(200)
        .send({
          message: 'saved!'
        })
    })




  });




  return router;
}