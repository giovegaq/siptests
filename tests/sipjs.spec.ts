import { test } from '@playwright/test';
import { UserAgent, UserAgentOptions, Registerer } from "sip.js";

const password = "81DC9BDB52D04DC20036DBD8313ED055";
const realm = "vrs.qa-uat.sip.svrs.net";
const phoneNumber = "14352792009";

const userAgentOptions: UserAgentOptions = {
  uri: UserAgent.makeURI(`sip:${phoneNumber}@${realm}`),
  authorizationUsername: phoneNumber,
  authorizationPassword: password,
  transportOptions: {
    server: `ws://${realm}`,
  },
}; 



test.only(`SIP Test`, async ({page}) => {
  const userAgent:UserAgent = new UserAgent(userAgentOptions);
  const reg = new Registerer(userAgent)
  userAgent.start().then(() => {
    reg.register()
}).catch(e => {
    console.log(e)
})
  let i =0;
  while(i<15){
    console.log(userAgent.isConnected())
   await page.waitForTimeout(1000);
  }
});