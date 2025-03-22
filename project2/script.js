alert("WELCOME TO PASSWORD GENERATOR");
const generatePassword = () => {
    const length = 12;
     //all thechar and sym
     const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQ!@#$%^&*()_+RSTUVWXYZ';
     let password =''
     for (let i=0; i<length;i++){
        const randomIndex = Math.floor(Math.random()* charset.length)
        password += charset[randomIndex]
     }
     document.getElementById('password').value = password
}
const show = document.getElementById('generate')
show.addEventListener('click',generatePassword)


// c
const copy = document.getElementById('copy')
copy.addEventListener('click',copyText)

function copyText() {
    var copyText = document.getElementById("password");
    copyText.select();
    document.execCommand("copy");
}
