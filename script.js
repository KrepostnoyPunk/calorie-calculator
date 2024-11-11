let formEl = document.querySelector('.form')

function calculateCalories(formDataObj){
    let {gender, age, height, weight, activity, formula} = formDataObj

    if(formula === "Mifflin-St Jeor Equation"){
        return Math.round(
            Number(((10 * weight) + ((6.25 * height) - (5 * age) + (gender === 'Male' ? + 5 : -161)) * activity) * (1 + 20 / 100))
        )
    } else {
        return Math.round(
            Number(((gender === 'Male' ? ((13.397 * weight) + (4.799 * height) - (5.677 * age) + 88.362 * activity) : (9.247  * weight) + (3.098 * height) - (4.330 * age) + 447.593) * activity))
        )
    }
    
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(formEl)
    let formDataObj = Object.fromEntries(formData)

    console.log(formDataObj);

    console.log(calculateCalories(formDataObj));
})

