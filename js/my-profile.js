//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let profile = localStorage.getItem("profile");

    if(profile){
        profile = JSON.parse(profile);

        if(profile.imgURL != ""){
            document.getElementById("img").src = profile.image;
        }
        document.getElementById("imgUrl").value = profile.image;
        document.getElementById("name").value = profile.name;
        document.getElementById("surname").value = profile.surname;
        document.getElementById("age").value = profile.age;
        document.getElementById("email").value = profile.email;
        document.getElementById("telephone").value = profile.telephone;


        content =`<p style="text-align: center; margin: 0;"><strong>${profile.name} ${profile.surname}</strong></p>
        <p style="text-align: center; font-style: italic; margin: 0;">${profile.age}</p>
        <p style="text-align: center; margin: 0;">${profile.email}</p>
        <p style="text-align: center; margin: 0;">${profile.telephone}</p>`;
        document.getElementById("content").innerHTML = content;
    }

    document.getElementById("btnSave").addEventListener("click", function(e){
        let validate = true;
        let imgURL = document.getElementById("imgUrl");
        let name = document.getElementById("name");
        let surname = document.getElementById("surname");
        let age = document.getElementById("age");
        let email = document.getElementById("email");
        let telephone = document.getElementById("telephone");

        if(name.value === ""){
            name.classList.add("is-invalid");
            validate = false;
        }else{
            name.classList.remove("is-invalid");
            name.classList.add("is-valid");
        }

        if(surname.value === ""){
            surname.classList.add("is-invalid");
            validate = false;
        }else{
            surname.classList.remove("is-invalid");
            surname.classList.add("is-valid");
        }

        if(email.value === ""){
            email.classList.add("is-invalid");
            validate = false;
        }else{
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
        }

        if(validate){
            localStorage.setItem("profile", JSON.stringify({
                image: imgURL.value,
                name: name.value,
                surname: surname.value,
                age: age.value,
                email: email.value,
                telephone: telephone.value
            }));

            window.location = "my-profile.html";
        }


    });
});