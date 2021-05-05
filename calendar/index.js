const wrapper = document.querySelector('.wrapper')
const tableContainer = document.createElement('div')
const table = document.createElement('table')

table.style.width = '100%'
table.style.userSelect = 'none'
tableContainer.style.backgroundColor = '#26262a'
tableContainer.style.color = '#e9e9e9'
tableContainer.style.width = '390px'
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
                th.style.height = '30px'
                th.style.padding = '3px'
                th.style.border = '3px #26262a solid'
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
                    th.style.backgroundColor = '#0078d7'
                    th.style.outline = '3px #0078d7 solid'
                }
                th.append(tmp.getDate())
                tr.append(th)
                dayNum++
                th.addEventListener('click', () => {
                    if (th.style.color === 'red') {
                        tmp.getMonth() !== now.getMonth() ?
                        th.style.color = 'gray' :   
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
        firstHeader.style.padding = '0 17px'

        const title = document.createElement('div')
        title.style.fontWeight = 'bold'

        let titleData = now.toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
        })
        title.textContent = titleData[0].toUpperCase() + titleData.slice(1)

        const buttonContainer = document.createElement('div')
        buttonContainer.style.width = '70px'
        buttonContainer.style.display = 'flex'
        buttonContainer.style.justifyContent = 'space-between'

        const changeButton = document.createElement('div')
        const leftButton = document.createElement('div')
        const rightButton = document.createElement('div')
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
        days.forEach((day, ind) => {
            const td = document.createElement('td')
            td.style.height = '30px'
            td.style.padding = '3px'
            td.style.textAlign = 'center'
            td.style.fontWeight = 'bold'
            if (firstDayNum === 1) {
                ind === 0 ? td.textContent = days[6] : td.textContent = days[ind - 1]
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



