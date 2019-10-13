while (document.body.nextElementSibling){document.body.nextElementSibling.remove()}
const t_body=document.createElement("div"),xI=document.createElement("div"),stI=document.createElement("style"),ifra=document.getElementsByTagName("iframe"),ifraL=ifra.length;
t_body.style="position: relative; z-index: 0;";
t_body.append(...document.body.childNodes);
stI.innerHTML=`
#inspect {
	display: flex;flex-direction: column;bottom: 0;height: 50%;padding: 0px;position: fixed;width: 100%;z-index: 1;background-color:gray;overflow:hidden;color: white;font-size: 4vw;line-height: normal;
}
#inspect li,ul{
	padding: 0px;margin: 0px;
}
#inspect>ul,#toolsH {
	width: 100%;display: flex;justify-content: space-evenly;
}
#inspect>div {
	height: -webkit-fill-available; overflow: scroll; display: none;background-color: darkgray;
}
.tree ul{
	padding-left: 20px;
}
#inspect li{
	list-style: none;
}
html {
	scroll-behavior: smooth;
}
.nested {
	display: none;margin-top: 0;
}
.active,#menuInspector>span,#history_inspect>span {
	display: block;
}
#history_inspect>span {
	user-select: all;
}
.caretInspect::before {
	content: 'V';color: black;display:inline-block;margin-right: 6px;transform: rotate(-90deg);
}
.caretInspect::after{
	content: attr(data-c) '\\A';white-space: pre;
}
.caretInspect {
	display: inline;
}
.caretInspect-down::before {
	transform: rotate(0);
}
#displayImages{
	text-align: center;
}
#displayImages img{
	display: block;margin-left: auto;margin-right: auto;
}
#menuInspector{
	display:none;width:fit-content;height: fit-content !important;position: fixed;overflow: hidden !important;user-select: none;
}
@media (min-width: 500px) {
	#inspect {
		font-size: 20px;
	}
  }
  `;
xI.id="inspect";
xI.innerHTML=`
<ul>
	<li data-index=1>HTML</li>
	<li data-index=2>JavaScript</li>
	<li data-index=3>CSS</li>
	<li data-index=4>Multimedia</li>
</ul>
<div>
	<ul id="toolsH">
		<li data-index=1>ALL</li>
		<li data-index=2>Inspeccionar</li>
		${(ifraL!==0)?`
		<li data-index=3>NextIfra</li>
		<li data-index=4>OpenIfra</li>
		<li data-index=5>HideIfra</li>`:
		''}
		<li data-index=6>↕</li>
	</ul>
	<div style="background-color: #52b152;min-width: max-content;width: fit-content;"></div>
	<div style="position: sticky; bottom: 0px;left: 0;background-color: darkblue;user-select: none">
		<strong data-index=7>Eliminar</strong>&emsp;
		<strong data-index=8>Parent</strong>&emsp;
		<strong data-index=9>Opciones</strong>
	</div>
</div>
<div>
	<div id="history_inspect"></div>
	<span contenteditable="true" style="display:block" id="inp_inspect"></span>
	<strong style="float:right;color: blue;" id="ejecutar_inspect">Enviar</strong>
	<a style="display:none;" id="url_inspect"></a>
</div>
<div>
	<div>
		<strong>Inspector Bottom: </strong>
		<span contenteditable="true">0px</span><br>
		<strong>Inspector Height: </strong><span contenteditable="true">50vh</span><br>
		<button id=inspectorStyle><strong>Aplicar Style</strong></button>
	</div>
</div>
<div id="displayImages">
	<div>
		<strong>LoadImages</strong>
	</div>
	<div></div>
	<div></div>
</div>
<div id=menuInspector>
	<span data-i=0>Enfocar Texto Seleccionado</span>
	<span data-i=1>Enfocar Nodo</span>
	<span data-i=2>Obtener Links</span>
	<span data-i=3>Expandir Todo</span>
</div>`;
xI.append(stI);
document.body.append(t_body,xI);
const inpI=document.getElementById("inp_inspect"),
	anchorI=document.getElementById("url_inspect"),
	historyI=document.getElementById("history_inspect"),
	menuI=document.getElementById("menuInspector"),
	seccionesI=xI.children,
	c=seccionesI[1].lastElementChild.previousElementSibling;
var actual=seccionesI[1],E0,m=0,i,unique=[""];
document.getElementById("ejecutar_inspect").onclick=ejecutar;
seccionesI[0].onclick=iniciar;
seccionesI[1].firstElementChild.onclick=seccionesI[1].lastElementChild.onclick=toolsHTML;
seccionesI[4].firstElementChild.firstElementChild.onclick=dimages;
document.getElementById("inspectorStyle").onclick=inspectorStyle;
menuI.onclick=menuInspector;
c.onclick=function(){menuI.style.display="none";};
if (ifraL!==0){
	ifra[0].style.border="10px solid #a6c8ff";
}
function menuInspector(e){
	if(e.target.tagName === 'SPAN'){
		switch (e.target.dataset.i){
			case "0":
				c.innerText=window.getSelection().toString();
			break;
			case "1":
				c.innerText=window.getSelection().anchorNode.textContent;
			break;
			case "2":
				let arr=[];
				window.getSelection().anchorNode.textContent.split(/"|<|>/).forEach(function(e){
					if (e.includes(window.getSelection().toString())){
						arr.push("<a href='"+e+"'>"+e+"</a><br>");
					}
				});
				if (arr.length>0){
					c.innerHTML=arr.join('');
				}
			break;
			case "3":
				Array.from(c.getElementsByClassName("nested")).forEach(
					function(e){
						e.classList.add("active");
						e.parentElement.classList.add("caretInspect-down");
					}
				);
			break;
		}
		menuI.style.display="none";
	}
};
function txtSelect(e){
	menuI.style.display="block";
	menuI.style.top=(e.clientY-menuI.offsetHeight)+"px";
	menuI.style.left=e.clientX+"px";
}
function inspectorStyle(e){
	let spans=e.target.closest("div").getElementsByTagName("span");
	xI.style.bottom=spans[0].innerText;
	xI.style.height=spans[1].innerText;
}
function toolsHTML(e){
	switch (e.target.dataset.index){
		case "1":
			/* let t1=new Date() */
			processHtml();
			/* console.log(new Date() - t1); */
		break;
		case "2":
			insp(e.target);
		break;
		case "3":
			ifram();
		break;
		case "4":
			window.open(ifra[m].src);
		break;
		case "5":
			ocultar();
		break;
		case "6":
			moverX();
		break;
		case "7":
			E0.remove();
		break;
		case "8":
			E0=E0.parentElement;
			c.innerText=E0.outerHTML;
		break;
		case "9":
			txtSelect(e);
		break;
	}
}
function iniciar(e){
	if(e.target.tagName === 'LI'){
		actual.style=null;
		actual=seccionesI[Number(e.target.dataset.index)];
		actual.style.display="block";
	}
}
function ejecutar(){
	anchorI.href="javascript:"+inpI.textContent+";void(0)";
	anchorI.click();
	historyI.appendChild(document.createElement("span")).innerText=inpI.textContent;
	inpI.textContent=null;
}
function insp(ele){
	if (t_body.onclick){
		t_body.onclick=ele.style.border=null;
	}else{
		t_body.onclick=eleInspect;
		ele.style.border="2px solid #a6c8ff";
	}
}
function eleInspect(e){
	e.preventDefault();
	E0=e.target;
	c.innerText=E0.outerHTML;
}
function ifram(){
	ifra[m].style.border=null;
	m=(m===ifraL-1)?0:m+1;
	ifra[m].scrollIntoView();
	ifra[m].style.border="10px solid #a6c8ff";
	c.innerText="iframe: "+m+"\n"+ifra[m].outerHTML;
}
function createImgStr(src,strT,ele){
	unique.push(src);
	let im = new Image();
	im.src=src;
	im.onload=im.onerror=noLoad;
	let str=document.createElement("strong");
	str.innerHTML=strT;
	ele.append(str,im);
}
function dimages(e){
	e.target.parentElement.innerHTML='<strong>Small: </strong><span>0</span><strong>&emsp;Errors: </strong><span>0</span>';
	let aimg=document.images,l=aimg.length;
	for (i=0;i<l;i++) {
		if (!unique.includes(aimg[i].src)){
			createImgStr(aimg[i].src,"Normal",seccionesI[4].children[1])
		}
	}
	Array.from(t_body.querySelectorAll('*')).forEach(function (e){
		let prop = window.getComputedStyle(e, null).getPropertyValue('background-image');
		let matc = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i.exec(prop);
		if (matc&&!unique.includes(matc[1])) {
			createImgStr(matc[1],"Background",seccionesI[4].children[2])
		}
	});
}
function noLoad(e){
	if((e.target.naturalHeight<51)||(e.target.naturalWidth<51)){
		let spanEle=seccionesI[4].firstElementChild.getElementsByTagName("span")[(e.type==="error")?1:0];
		spanEle.innerText=Number(spanEle.innerText)+1;
		e.target.previousElementSibling.remove();
		e.target.remove();
	}else{
		e.target.previousElementSibling.innerText+=` (${e.target.naturalWidth}x${e.target.naturalHeight})`;
	}
}
function ocultar(){
	for (i=0;i<ifraL;i++) {
		ifra[i].style.display="none";
	}
}
function moverX(){
	if (xI.style.top){
		xI.style=null;
	}else{
		xI.style.top=0;
	}
}
function processHtml(){
	while (document.body.nextElementSibling){document.body.nextElementSibling.remove()};
	c.innerHTML='';
	let ul=document.createElement("ul");
	ul.className="tree";
	let li=ul.appendChild(document.createElement("li"));
	li.onclick=treeView;
	recursivo(li,document.head.parentElement);
	//iterativo(li,document.head.parentElement);
	li.firstElementChild.classList.add("active");
	li.classList.add("caretInspect-down");
	c.append(ul);
}
function treeView(e){
	e=e.target;
	if (e.classList.contains("caretInspect")){
		e.lastChild.classList.toggle("active");
		e.classList.toggle("caretInspect-down");
	}
}
function recursivo(eleTree,eleDOM){
	if (eleDOM.id!=="inspect"){
		let htm=eleDOM.outerHTML;
		eleTree.innerText=htm.substr(0,htm.indexOf(">")+1);
		if (eleDOM.firstChild){
			eleTree.className="caretInspect";
			eleTree.innerHTML+='<ul class="nested"><li></li></ul>';
			eleTree.dataset.c=htm.substring(htm.lastIndexOf("<"));
			if(eleDOM.firstElementChild){
				recursivo(eleTree.lastChild.firstChild,eleDOM.firstElementChild);
			}else{
				eleTree.lastChild.firstChild.innerText=eleDOM.textContent.trim();
			}
		}
		if (eleDOM.nextElementSibling){
			recursivo(eleTree.parentElement.appendChild(document.createElement("li")),eleDOM.nextElementSibling);
		}
	}
}
function iterativo (eleTree,eleDOM){
	let htm;
	while (eleDOM.id!=="inspect"){
		htm=eleDOM.outerHTML;
		eleTree.innerText=htm.substr(0,htm.indexOf(">")+1);
		if (eleDOM.firstChild){
			eleTree.className="caretInspect";
			eleTree.innerHTML+='<ul class="nested"><li></li></ul>';
			eleTree.dataset.c=htm.substring(htm.lastIndexOf("<"));
			eleTree=eleTree.lastChild.firstChild;
			if(eleDOM.firstElementChild){
				eleDOM=eleDOM.firstElementChild;
				continue;
			}else{
				eleTree.innerText=eleDOM.textContent.trim();
				eleTree=eleTree.parentElement.parentElement.parentElement;
			}
		}else{
			eleTree=eleTree.parentElement;
		}
		while (eleDOM.nextElementSibling===null){
				eleDOM=eleDOM.parentElement;
				eleTree=eleTree.parentElement.parentElement;
		}
		eleDOM=eleDOM.nextElementSibling;
		eleTree=eleTree.appendChild(document.createElement("li"));
	}
}
