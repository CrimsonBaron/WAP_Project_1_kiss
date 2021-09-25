


///---------------------------------------------------------------------------------------
/// /* The millioner code */
///---------------------------------------------------------------------------------------

let stringNick;
let DATA;
let correct;
let usedKeys = [];
let myRequest = new Request("./data/questions.json");
fetch(myRequest)
    .then((resp)=>{
        return resp.json();
    })
    .then((data)=>{
        DATA = data;
        console.log(DATA);
         let keys = [];
         for(let key in data["qna"]){
             console.log(data["qna"][key]);
             keys.push(key);
         }
         let randKey = keys[Math.floor(Math.random()*keys.length)]
         usedKeys.push(randKey);
         console.log(randKey)
         PopulateAnswers(randKey,data);
         PopulateQuestion(randKey,data);
         correct = data["qna"][randKey]["correct"];
         console.log(correct);
    })


let PopulateAnswers = (key, data) =>{

    let Gelements = document.getElementsByClassName("Answer-g50");
    [...Gelements].forEach((ref)=>{
        ref.className = "Answer";
    })

    let Belements = document.getElementsByClassName("Answer-50");
    [...Belements].forEach((ref)=>{
        ref.className = "Answer";
    })

    let elements = document.getElementsByClassName("Answer");
    
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const keyString = "answer"+(1+i);
        element.innerHTML = data["qna"][key][keyString];
        
    }
}

let PopulateQuestion = (key, data) =>{
    let elements = document.getElementsByClassName("Question");

    [...elements].forEach((ref)=>{
        ref.innerHTML = data["qna"][key]["question"];
    })
}

let buttons = document.getElementsByClassName("Answer");
[...buttons].forEach((ref)=>{
    ref.onclick = () =>{
        let id = ref.getAttribute("id");
        if(id == correct){
            console.log("won");
            Won();
        }else{
            console.log("lost");
            Lost();
        }
    }
})



let Lost = ()=>{
    let rewardsWon = document.getElementsByClassName("Rewards-won");
    if(rewardsWon.length > 0){
        [...rewardsWon][rewardsWon.length-1].className = "Rewards";
        
    }else{
        WONorLOST(false);
    }
    NextQuestion();
}

let Won = ()=>{
    let rewards = document.getElementsByClassName("Rewards");

    if(rewards.length > 1){
        [...rewards][0].className = "Rewards-won";
        
    }else if(rewards.length >0){
        WONorLOST(true);
        [...rewards][0].className = "Rewards-won";
    }
    NextQuestion();
}

let NextQuestion = ()=>{
    console.log("NextQuestion");
    let keys = [];
    for(let key in DATA["qna"]){
        console.log(DATA["qna"][key]);
        keys.push(key);
    } 

    let randKey = GetRandKey(keys);
    PopulateAnswers(randKey,DATA);
    PopulateQuestion(randKey,DATA);
    correct = DATA["qna"][randKey]["correct"];
    ResetTimer()
}

let GetRandKey=(keys)=>{
    let randKey = keys[Math.floor(Math.random()*keys.length)];
    let isused = false;
    for(let key in usedKeys){
        if(key === randKey){
            isused = true;
        }
    }

    if(!isused){
        usedKeys.push(randKey);
        return randKey;
    }else{
        GetRandKey(keys);
    }
}

let min = 00;
let sec =29;
let milsec=99;

let Timer=()=>{
    if(sec > -1){
        milsec--;
    }else{
        Lost();
    }
    
    if(milsec == 0){
        sec--;
        milsec = 99;
    }
    if(sec == 0 && min !=0){
        min--;
        sec =60;
    }
    
    let timer = document.getElementsByClassName("ATimer");
    let stringMin = min > 9 ? min : "0"+min;
    let stringSec = sec > 9 ? sec : "0"+sec;
    let stringMilSec = milsec >9 ? milsec : "0"+milsec;
    [...timer][0].innerHTML = stringMin + " : "+stringSec+" : "+stringMilSec;
}

let ResetTimer = ()=>{
    min = 00;
    sec = 29;
    milsec = 99;
}

let StarTimer=()=>{
    setInterval(Timer,1)
}



///---------------------------------------------------------------------------------------
/// /* nick set code */
///---------------------------------------------------------------------------------------



let enter = document.getElementsByClassName("Enter");
[...enter][0].onclick=()=>{
    SetNick();
}


let SetNick = ()=>{
    document.getElementById("NICK").innerHTML = document.getElementById("NickInput").value;
    let NickWrapper = document.getElementsByClassName("Wrapper");
    [...NickWrapper][0].style.display="none"
    StarTimer();
}

///---------------------------------------------------------------------------------------
/// /* won Lost Code */
///---------------------------------------------------------------------------------------
let bReuse = false;
let WONorLOST = (bool)=>{
    let WonScreen = document.getElementsByClassName("Wrapper-won");
    [...WonScreen][0].style.display = "flex";
    
    let reButon = document.getElementsByClassName("Replay");
    if(bool){
        let text = document.getElementById("WonText");
        text.innerHTML="WON";
        [...reButon][0].innerHTML = "REPLAY"
        bReuse = false;
    }else{
        let text = document.getElementById("WonText");
        text.innerHTML="LOST";
        [...reButon][0].innerHTML = "RESTART"
        bReuse = true;
    }
   
}

let WonButon = document.getElementsByClassName("Replay");
[...WonButon][0].onclick =()=>{
    let WonScreen =document.getElementsByClassName("Wrapper-won")
    if(!bReuse){
        [...WonScreen][0].style.display = "none";
        ResetTimer();
        NextQuestion();
        let rewardsWon = document.getElementsByClassName("Rewards-won");

        [...rewardsWon].forEach((ref)=>{
            ref.className = "Rewards";
        })
    }else{
        [...WonScreen][0].style.display = "none";
        location.reload();
    }
    
}

///---------------------------------------------------------------------------------------
/// /* abilities Code */
///---------------------------------------------------------------------------------------
let abpUsed = [false,false,false];
let helpers = document.getElementsByClassName("Helpers");
[...helpers].forEach((ref)=>{
    ref.onclick = () =>{
        let id = ref.getAttribute("id");

    switch(id){
        case "abl1":
            if(!abpUsed[0]){Abl1(ref);}
            break;
        case "abl2":
            if(!abpUsed[1]){Abl2(ref);}
            break;
        case "abl3":
            if(!abpUsed[2]){Abl3(ref);}
            break;
        default:
            console.log("abl- default");
    }
    }
})

let Abl1 = (ref) =>{
    sec+=15
    milsec = 99;
    ref.className = "Helpers-used";
    abpUsed[0] = true;
    
}

let Abl2 = (ref) =>{
    let elements = document.getElementsByClassName("Answer");
    console.log("aasaaaaadadaewšesrfq   PIDFHDTIKUJNFH");
    [...elements].forEach((anw)=>{
        let id = anw.getAttribute("id");
        if(correct < 5 && correct > 1){
            if(id == correct || id == correct -1){
                anw.className = "Answer-g50";
            }else {
                anw.className = "Answer-50";
            }
        }else if(correct == 1){
            if(id == correct || id == correct +1 ){
                anw.className = "Answer-g50";
            } else{
                anw.className = "Answer-50";
            }
        }
    })

    ref.className = "Helpers-used";
    abpUsed[1] = true;
   
}

let Abl3 = (ref) =>{
    NextQuestion();
    ref.className = "Helpers-used";
    abpUsed[2] = true;
}