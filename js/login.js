document.addEventListener("DOMContentLoaded", function(e) {

	document.getElementById("btn").addEventListener("click", function(e) {
		
		let email = document.getElementById("email");
		let pass = document.getElementById("pass");
		let campo = true;

		if (email.value === ""){
			email.classList.add("invalid");
			campo = false;
		}

		if (pass.value === ""){
			pass.classList.add("invalid");
			campo = false;
		}

		if (campo){

				//---------------------------
				localStorage.setItem('user-logged', JSON.stringify({ email: email.value}));
				//---------------------------
				
				window.location = 'cover.html';

		}else{
			alert("Debes ingresar los datos!");
		}
	});
});




 
