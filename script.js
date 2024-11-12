let formEl = document.querySelector('.form')
let resultEl = document.querySelector('.result')
let backBtnEl = document.querySelector('.btn-back')
let btnClear = document.querySelector('.btn-clear')
let inputEls = document.querySelectorAll('input')
let selectEl = document.querySelector('select')


formEl.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(formEl)
    let formDataObj = Object.fromEntries(formData)

    calculateCalories(formDataObj);

    event.target.reset()
})


function calculateCalories(formDataObj){
    let {gender, age, height, weight, activity, formula} = formDataObj

    let baseValue = 
        formula === "Mifflin-St Jeor Equation" 
        ? 
        Number(((10 * weight) + ((6.25 * height) - (5 * age) + (gender === 'Male' ? + 5 : -161)) * activity) * 1.20)
        : 
        Number(((gender === 'Male' ? ((13.397 * weight) + (4.799 * height) - (5.677 * age) + 88.362 * activity) : (9.247  * weight) + (3.098 * height) - (4.330 * age) + 447.593) * activity))
    

     return renderResult(baseValue) 
}


function renderResult(baseValue){
    if(baseValue > 0){
        resultEl.innerHTML = `
        <table>
            <tr>
                <th>Gain Weght</th>
                <th>Maintain Weght</th>
                <th>Loose Weght</th>
            </tr>
            <tr>
                <td>${Math.round(baseValue * 1.20)}</td>
                <td>${Math.round(baseValue)}</td>
                <td>${Math.round(baseValue / 1.20)}</td>
            </tr>
        </table>
        <p>The results show a number of daily calorie estimates that can be used as a guideline for how many calories to consume each day to maintain, lose, or gain weight.</p>
    `

        formEl.style.display = 'none'

        resultEl.classList.add('calculated')
        resultEl.style.display = 'flex'

        backBtnEl.style.display = 'block'
    } else {
        alert('Impossible result. Use valid properties.')
    }
}


backBtnEl.addEventListener('click', event => {
    if(resultEl.classList.contains('calculated')){
        formEl.style.display = 'flex'
        resultEl.style.display = 'none'
        backBtnEl.style.display = 'none'
    }
})


function clearForm(){
    inputEls.forEach(el => {
        el.value = ''
        el.checked = false
    })
}


btnClear.addEventListener('click', event => {
    clearForm()
})