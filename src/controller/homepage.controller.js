import HabitRequest from './habit.controller.js'

export default class HomepageDOM {
    static modalCreateHabit = document.querySelector(".containerModalCreateHabit")
    static createHabit() {
        const buttonInsert = document.querySelector('.buttonInsert')
        buttonInsert.addEventListener('click', async (e) => {
            e.preventDefault()
            const inputs = [...e.srcElement.form]

            const data = {}

            if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != 'Selecione Categoria') {
                data[inputs[0].name] = inputs[0].value
                data[inputs[1].name] = inputs[1].value
                data[inputs[2].name] = inputs[2].value.split(' ')[1]

            }
            console.log(data)
            await HabitRequest.createHabit(data)

            if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != 'Selecione Categoria') {

                this.modalCreateHabit.classList.add('none')
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