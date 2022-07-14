import HabitRequest from './habit.controller.js'

export default class HomepageDOM {
    static modalCreateHabit = document.querySelector(".containerModalCreateHabit")
    static createHabit() {
        const buttonInsert = document.querySelector('.buttonInsert')
        const spans = document.querySelectorAll(".spanError")

        buttonInsert.addEventListener('click', async (e) => {
            e.preventDefault()
            const inputs = [...e.srcElement.form]

            const data = {}

            if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != 'Selecione Categoria') {
                data[inputs[0].name] = inputs[0].value
                data[inputs[1].name] = inputs[1].value
                data[inputs[2].name] = inputs[2].value.split(' ')[1]

            }
            await HabitRequest.createHabit(data)

            if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != 'Selecione Categoria') {

                this.modalCreateHabit.classList.add('none')
            } else {

                if (inputs[0].value == '') {
                    inputs[0].classList.add('inputError')
                    spans[0].classList.remove('none')
                } else {
                    inputs[0].classList.remove('inputError')
                    spans[0].classList.add('none')
                }
                if (inputs[1].value == '') {
                    inputs[1].classList.add('inputError')
                    spans[1].classList.remove('none')

                } else {
                    inputs[1].classList.remove('inputError')
                    spans[1].classList.add('none')
                }
                if (inputs[2].value == 'Selecione Categoria') {
                    inputs[2].classList.add('inputError')
                    spans[2].classList.remove('none')
                } else {
                    inputs[2].classList.remove('inputError')
                    spans[2].classList.add('none')
                }
            }



        })
    }
    static modalClose() {
        const buttonClose = document.querySelector('.close')
        buttonClose.addEventListener('click', () => {

            this.modalCreateHabit.classList.add('none')
        })

    }
}