import stream from "stream"
import express from "express"
import multer from "multer";
import path from "path"
import {google} from "googleapis";

//const stream = require("stream");
//const express = require("express");
//const multer = require("multer");
//const path = require("path");
//const { google } = require("googleapis");
 
const uploadRouter = express.Router();
const upload = multer();
 
const KEYFILEPATH = "./credentials.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];
 
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const uploadFile = async (fileObject,bdy) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  //console.log("reached")
  //console.log(fileObject)
  //console.log(bdy)
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: bdy+"."+fileObject.originalname.split(".")[1],
      parents: ["1l6xGafGFGH18xVxOFwBz1ZSo9KR_ao3j"],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};
uploadRouter.post("/upload", upload.any(), async (req, res) => {
  try {
    const { body, files } = req;
    for (let f = 0; f < files.length; f += 1) {
      await uploadFile(files[f],body.drop);
    }
    console.log("uplloading files")
    console.log(body);
    res.status(200).send("Form Submitted");
  } catch (f) {
    res.send(f.message);
  }
});
export default uploadRouter
//module.exports = uploadRouter
