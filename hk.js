const puppeteer=require("puppeteer");
const hkloginlink="https://www.hackerrank.com/auth/login"
const fs=require("fs");
let page;
let answerbuffer=fs.readFileSync(__dirname+"//answer.txt");
let answer=""+answerbuffer;
let name="shalinisinha.cspatna2@gmail.com";
let pass="shalini";
const browseropen=puppeteer.launch({headless:false,args:["--start-maximized"],defaultViewport:null});

browseropen.then(function(browserobj){
    let browserpagearr=browserobj.pages();
    return browserpagearr;})
.then (function(browserpagearr){
        page=browserpagearr[0];
       let gotopromise=page.goto(hkloginlink);
        return gotopromise; 
    })
    .then(function(){
let waitpromise=waitSelector("#input-1",page);
return waitpromise;
})
.then(function(){
   let enternamepromise=page.type("#input-1",name);
   return enternamepromise;

})

 .then(function(){
    let enterpasswordpromise=page.type("#input-2",pass);
    return enterpasswordpromise;
})

    
    .then(function(){
        let loginpromise=page.click("button[type='submit']");
        return loginpromise;
    })
    .then(function(){
        let waitpromise=waitSelector("div[class='topic-name']",page);
        return waitpromise;
        })
    
    .then(function(){   
   
            let waitpromise=waitSelector('input[value="warmup"]',page);
            return waitpromise;
    })
     .then (function(){
            let allchallengepromise=page.$$("div[class='challenge-submit-btn']",{delay:50});
            return allchallengepromise;
        }).then(function(questionarr){
           console.log("Number of question: ",questionarr.length);
          let questionsolvepromise=questionSolver(questionarr[1],page,answer);
          return questionsolvepromise;
        })
        .catch(function (error){
            console.log(error);
        })
       
  function questionSolver(question,page,answer){
    return new Promise(function(resolve,reject){
        let questionclick=question.click();
         questionclick.then(function(){
            let waitpromise=waitSelector("div[class='hr-monaco-editor-parent']",page)
            return waitpromise;
          })
       
         .then(function(){
            let checkpromise=page.click('div[class="checkBoxWrapper"]');
            return checkpromise;
         }).then(function(){
            let waitpromise=waitSelector("textarea[class='input text-area custominput auto-width']",page)
            return waitpromise;})
         .then(function(){
            let code=page.type("textarea[class='input text-area custominput auto-width']",answer,{delay:100});
            return code;
         }).then (function(){
            let ctrlpress=page.keyboard.down("Control");
            return ctrlpress;
         }).then (function(){
            let Apress=page.keyboard.press("A");
            return Apress;
         }).then (function(){
            let xpress=page.keyboard.press("X");
            return xpress;
         }).then (function(){
            let ctrlunpress=page.keyboard.up("Control");
            return ctrlunpress;
         }).then(function(){
            let waitpromise=waitSelector("div[class='hr-monaco-editor-parent']",page)
            return waitpromise;
         })
       
        .then(function(){
            let ctrlpress=page.keyboard.down("Control");
            return ctrlpress;
        }).then (function(){
            let Apress=page.keyboard.press("A");
            return Apress;
         })
         .then (function(){
            let vpress=page.keyboard.press("V");
            return vpress;
         }).then (function(){
            let ctrlunpress=page.keyboard.up("Control");
            return ctrlunpress;
        })
        .then(function(){
            let waitpromise=waitSelector("button[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']",page)
            return waitpromise;  
        })
      
         .then(function(){
            resolve();
        }).catch(function(error){
            reject();
        })
     
  })
}

function waitSelector(selector,page){
    return new Promise(function(resolve,reject){
        let waitpromise=page.waitForSelector(selector);
        waitpromise.then(function(){
          let clickselector=page.click(selector);
          return clickselector;
        }).then(function(){
            resolve();
        }).catch(function (error){
            reject();
        })
    })
}