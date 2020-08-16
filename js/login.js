const inputs = document.querySelectorAll(".input");


function add(){
	let input = this.parentNode.parentNode;
	input.classList.add("focus");
}

function remove(){
	let input = this.parentNode.parentNode;
	if(this.value == ""){
		input.classList.remove("focus");
	}
} 


inputs.forEach(input => {
	input.addEventListener("focus", add);
	input.addEventListener("blur", remove);
});
