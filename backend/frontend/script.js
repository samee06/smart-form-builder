let questions = [];

function addQuestion(){

let text = document.getElementById("questionText").value;
let type = document.getElementById("questionType").value;
let options = document.getElementById("options").value.split(",");

let q = {
question: text,
type: type,
options: options
};

questions.push(q);

let li = document.createElement("li");
li.innerText = text + " (" + type + ")";

let del = document.createElement("button");
del.innerText = "Delete";

del.onclick = function(){
questions = questions.filter(q=>q.question!==text);
li.remove();
}

li.appendChild(del);

document.getElementById("questionList").appendChild(li);

}

async function createForm(){

let title = document.getElementById("title").value;
let description = document.getElementById("description").value;
let form = {
title: title,
description: description,
questions: questions
};

let res = await fetch("http://127.0.0.1:5000/create-form",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(form)
});

let data = await res.json();

document.getElementById("formLink").innerHTML =
"Form Link: <a href='/form.html?id="+data.formId+"'>Open Form</a><br><br>" +
"<a href='/results.html?id="+data.formId+"'>View Results</a>";
}

// Load form when form.html opens

if(window.location.pathname.includes("form.html")){

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

fetch("http://127.0.0.1:5000/form/" + id)
.then(res => res.json())
.then(data => {

document.getElementById("formTitle").innerText = data.title;
document.getElementById("formDescription").innerText = data.description || "";
let formArea = document.getElementById("formArea");

data.questions.forEach((q,index)=>{

let div = document.createElement("div");

let label = document.createElement("p");
label.innerText = q.question;

div.appendChild(label);

if(q.type==="text"){

let input = document.createElement("input");
input.name="q"+index;

div.appendChild(input);

}

if(q.type==="multiple"){

q.options.forEach(opt=>{

let radio = document.createElement("input");
radio.type="radio";
radio.name="q"+index;
radio.value=opt;

div.appendChild(radio);
div.append(opt);

});

}

if(q.type==="checkbox"){

q.options.forEach(opt=>{

let box = document.createElement("input");
box.type="checkbox";
box.name="q"+index;
box.value=opt;

div.appendChild(box);
div.append(opt);

});

}

if(q.type==="dropdown"){

let select = document.createElement("select");
select.name="q"+index;

q.options.forEach(opt=>{
let option = document.createElement("option");
option.value=opt;
option.text=opt;
select.appendChild(option);
});

div.appendChild(select);

}

if(q.type==="emoji"){

let emojis = ["😡","😐","🙂","😍"];

emojis.forEach(e=>{

let radio = document.createElement("input");
radio.type="radio";
radio.name="q"+index;
radio.value=e;

div.appendChild(radio);
div.append(e);

});

}

formArea.appendChild(div);

});

});

window.formId=id;

}


// submit response

function submitResponse(){

let answers={};

let inputs=document.querySelectorAll("input");

inputs.forEach(i=>{
if(i.checked || i.type==="text"){
answers[i.name]=i.value;
}
});

fetch("http://127.0.0.1:5000/submit-response",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
formId: window.formId,
answers: answers
})
});

alert("Response submitted!");

}

// load results page

if(window.location.pathname.includes("results.html")){

let params = new URLSearchParams(window.location.search);
let id = params.get("id");

fetch("http://127.0.0.1:5000/responses/" + id)
.then(res => res.json())
.then(data => {

let table = document.getElementById("results");

data.forEach((response,index)=>{

for(let key in response.answers){

let row = document.createElement("tr");

let col1 = document.createElement("td");
col1.innerText = "Response " + (index+1);

let col2 = document.createElement("td");
col2.innerText = response.answers[key];

row.appendChild(col1);
row.appendChild(col2);

table.appendChild(row);

}

});


// SUMMARY COUNTS

let counts = {};

data.forEach(r=>{
for(let k in r.answers){

let val = r.answers[k];

counts[val] = (counts[val] || 0) + 1;

}
});

let summary = document.getElementById("summary");

for(let key in counts){

summary.innerHTML += key + " : " + counts[key] + "<br>";

}

});

}