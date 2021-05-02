const wrapper = document.querySelector('.wrapper')
const tableContainer = document.createElement('div')
const table = document.createElement('table')

table.style.borderCollapse = 'collapse'
table.style.fontFamily
table.style.width = '100%'
table.style.userSelect = 'none'
tableContainer.style.backgroundColor = '#26262a'
tableContainer.style.color = '#e9e9e9'
tableContainer.style.minWidth = '325px'
tableContainer.style.minHeight = '286px'
tableContainer.style.padding = '10px'
wrapper.append(tableContainer)
const cash = new Set()
let now = new Date()
createCalendar(tableContainer, table, now, 2)



function createCalendar(tableContainer, table, now, firstDayNum) {
    createHeader()
    createBody(now)

    function createBody(now) {
        let firstDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        )
        firstDay.setDate(1)

        let dayNum = (firstDay.getDay() - firstDayNum) * -1

        for (let i = 0; i < 6; i++) {
            const tr = document.createElement('tr')
            for (let j = 0; j < 7; j++) {
                const th = document.createElement('th')
                th.style.width = '40px'
                th.style.height = '30px'
                th.style.padding = '3px'
                th.style.textAlign = 'center'
                th.style.fontSize = 'bold'
                let tmp = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                )
                tmp.setDate(dayNum)
                const tmpDate = tmp.toLocaleString("ru", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                if (tmp.getMonth() !== now.getMonth()) {
                    th.style.color = 'gray'
                }
                if (cash.has(tmpDate)) {
                    th.style.color = 'red'
                }
                const rightNow = new Date()
                if (dayNum === rightNow.getDate() && tmp.getMonth() === rightNow.getMonth() && tmp.getFullYear() === rightNow.getFullYear()) {
                    th.style.backgroundColor = 'rgb(0, 120, 215)'
                    th.style.border = '5px rgb(38, 38, 42) solid'
                    th.style.outline = '3px rgb(0, 120, 215) solid'
                }
                th.append(tmp.getDate())
                tr.append(th)
                dayNum++
                th.addEventListener('click', () => {
                    if (th.style.color === 'red') {
                        th.style.color = 'white'
                        cash.delete(tmpDate)
                    }
                    else {
                        th.style.color = 'red'
                        cash.add(tmpDate)
                    }
                })
            }
            table.append(tr)

        tableContainer.append(table)    
    }
    }
    function createHeader() {
        const days = [
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
            'Вс',
        ]

        const firstHeader = document.createElement('div')
        firstHeader.classList.add('header')
        firstHeader.style.height = '30px'
        firstHeader.style.display = 'flex'
        firstHeader.style.justifyContent = 'space-between'
        firstHeader.style.alignItems = 'center'
        firstHeader.style.padding = '0 13px'

        const title = document.createElement('div')
        title.style.verticalAlign = 'middle'
        title.style.fontWeight = 'bold'

        let titleData = now.toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
        })
        title.textContent = titleData[0].toUpperCase() + titleData.slice(1)

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('buttonContainer')
        buttonContainer.style.width = '70px'
        buttonContainer.style.display = 'flex'
        buttonContainer.style.justifyContent = 'space-between'

        const changeButton = document.createElement('div')
        const leftButton = document.createElement('div')
        const rightButton = document.createElement('div')
        changeButton.classList.add('button')
        leftButton.classList.add('button')
        rightButton.classList.add('button')
        changeButton.innerHTML = '<i class="fas fa-cog"></i>'
        leftButton.innerHTML = '<i class="fas fa-chevron-up"></i>'
        rightButton.innerHTML = '<i class="fas fa-chevron-down"></i>'
        changeButton.addEventListener('click', () => {
            firstDayNum === 2 ? firstDayNum = 1 : firstDayNum = 2
            refresh(0, firstDayNum)
        })
        leftButton.addEventListener('click', () => {
            refresh(-1, firstDayNum)
        })

        rightButton.addEventListener('click', () => {
            refresh(1, firstDayNum)
        })

        function refresh(direction, firstDayNum) {
            table.innerHTML = ''
            firstHeader.innerHTML = ''
            tableContainer.innerHTML = ''
            now.setMonth(now.getMonth() + direction)
            createCalendar(tableContainer, table, now, firstDayNum)
        }

        buttonContainer.append(changeButton)
        buttonContainer.append(leftButton)
        buttonContainer.append(rightButton)

        firstHeader.append(title)
        firstHeader.append(buttonContainer)
        tableContainer.append(firstHeader)

        const secondHeader = document.createElement('tr')
        secondHeader.classList.add('header')
        days.forEach((day, ind) => {
            const td = document.createElement('td')
            td.style.width = '40px'
            td.style.height = '30px'
            td.style.padding = '3px'
            td.style.textAlign = 'center'
            td.style.fontSize = 'bold'
            if (firstDayNum === 1) {
                if (ind === 0) {
                    td.textContent = days[6]
                }
                else {
                    td.textContent = days[ind - 1]
                }
                secondHeader.append(td)
            }
            else {
                td.textContent = day
                secondHeader.append(td)
            }
        })
        table.append(secondHeader)
    }
}



