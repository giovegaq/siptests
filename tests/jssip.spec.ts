import JsSIP from 'jssip';
import { test } from '@playwright/test';

const password = "81DC9BDB52D04DC20036DBD8313ED055";
const phoneNumber = "14352792009";
const realm = "vrs.qa-uat.sip.svrs.net";

test(`SIP Test`, async ({page}) => {
  const socket = new JsSIP.WebSocketInterface(`wss://${realm}`);
  const configuration = {
    sockets: [socket],
    authorization_user: phoneNumber,
    uri: 'sip:14352792009@vrs.qa-uat.sip.svrs.net',
    password: password
  };
  const ua = new JsSIP.UA(configuration);
  await ua.start();


  let i =0;
 while(i<15){
  console.log(ua.isConnected());
  console.log(ua.isRegistered());
  await page.waitForTimeout(1000);
 }


  ua.on("connected", () => {
    console.log("Connected to SIP server");
    ua.call(phoneNumber);
  });

  ua.on("newRTCSession", (data) => {
    const session = data.session;
    
    session.on("accepted", () => {
      console.log("Call accepted");
    });
  
    session.on("failed", () => {
      console.log("Call failed");
    });
  
    session.on("ended", () => {
      console.log("Call ended");
    });
  });
    
        
});