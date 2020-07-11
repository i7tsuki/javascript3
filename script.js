let id = 1;

function addTask() {
 
 	let htmlOutputArray = [];
 	
 	
    //ID（1列目）
    let td1 = document.createElement("td");
    let td1TextNode = document.createTextNode(id);
    td1.appendChild(td1TextNode);
    htmlOutputArray.push(td1);
    
    
    //入力データ（2列目）
    const taskValue = document.getElementById('taskValue').value;
    let td2 = document.createElement("td");
    let td2TextNode = document.createTextNode(taskValue);
    td2.appendChild(td2TextNode);
    htmlOutputArray.push(td2);
    
    
    //未完了等のステータス（3列目）
    let statusButton = document.createElement("input");
    statusButton.setAttribute("type", "button");
    statusButton.setAttribute("value", "作業中");
    statusButton.setAttribute("id", "btn" + id);
    statusButton.setAttribute("onclick", 'changeStatus("btn' + id +'");');
    htmlOutputArray.push(statusButton);
    
    //削除ボタン（4列目）
    let delButton = document.createElement("input");
    delButton.setAttribute("type", "button");
    delButton.setAttribute("value", "削除");
    delButton.setAttribute("onclick", "delTask(" + id + ");");
    htmlOutputArray.push(delButton);
    
    //出力
	let tr = document.createElement("tr");
	tr.setAttribute("id", id);
	
	htmlOutputArray.forEach((e) => {
	    tr.appendChild(e);
	});
    
    let table = document.getElementById("table");	
    table.appendChild(tr);
    
    //事後処理
    document.getElementById("taskValue").value = "";
    id += 1;
    switchDisplay();
}

function delTask(delId) {
	//削除
	let table = document.getElementById("table");
	let tr = document.getElementById(delId);
	table.removeChild(tr);
	
	
	//採番
	id = 1;
	
	for (let i=2; i<table.childNodes.length; i++) {	//id更新、i=2以降が対象
		table.childNodes[i].setAttribute("id", id); //id属性
		table.childNodes[i].firstChild.textContent = id; 	//ID（1列目）
		table.childNodes[i].childNodes[2].setAttribute("id", "btn" + id); //ステータス（3列目）①
		table.childNodes[i].childNodes[2].setAttribute("onclick", 'changeStatus("btn' + id +'");'); //ステータス（3列目）②
		table.childNodes[i].lastChild.setAttribute("onclick", "delTask(" + id + ")");	//削除ボタン（4列目）
		id += 1;
	}
}

function changeStatus(changeId) {
	let btn = document.getElementById(changeId);
	
	console.log(typeof changeId);
	
	if (btn.getAttribute("value") === "作業中") {
		btn.setAttribute("value", "完了");
	} else {
		btn.setAttribute("value", "作業中");
	}
	//事後処理
	switchDisplay();
} 


function switchDisplay() {
	
	let status = "";
	
	/* 選択された状態を取得する */
	for (let i=0; i<document.tasks.chk.length; i++) {
		if (document.tasks.chk[i].checked) {
			status = document.tasks.chk[i].value;
			break;
		}
	}
	if (status === "") {
		return false;
	}
	
	
	/* 選択された状態のタスクのみ表示する */
	for (let i=2; i<table.childNodes.length; i++) {	
		if (status === "すべて") {
			table.childNodes[i].removeAttribute("style");
		} else {	
			
			if (status === table.childNodes[i].childNodes[2].getAttribute("value")) { //選択された状態のタスクと一致するステータスの場合
				table.childNodes[i].removeAttribute("style");
			} else { //選択された状態のタスクと一致しないステータスの場合
				table.childNodes[i].setAttribute("style", "display:none;");
			}
		}
	}
}

document.getElementById("radioAll").onchange = function() {
	switchDisplay();
};

document.getElementById("radioWorking").onchange = function() {
	switchDisplay();
};

document.getElementById("radioEnd").onchange = function() {
	switchDisplay();
};