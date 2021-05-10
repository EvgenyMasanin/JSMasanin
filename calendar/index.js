const wrapper = document.querySelector('.wrapper')
const tableContainer = document.createElement('div')
const table = document.createElement('table')
table.classList.add('table')
table.style.width = '100%'
table.style.userSelect = 'none'
tableContainer.style.backgroundColor = '#26262a'
tableContainer.style.color = '#e9e9e9'
tableContainer.style.width = '390px'
tableContainer.style.padding = '10px'
wrapper.append(tableContainer)
const holidays = {
    '9 мая': 'orange',
    '1 мая': 'red',
    '8 марта': '#ff869a',
    '23 февраля': 'orange',
    '25 июля': 'blue',
    '1 сентября': 'yellow'
}
let now = new Date()
const config = {
    firstDayNum: 2,
    holidays
}
createCalendar(tableContainer, table, now, config)



function createCalendar(tableContainer, table, now, config) {
    const importantDates = new Set()

    createHeader()
    createBody(now)

    function createBody(now) {
        let firstDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        )
        firstDay.setDate(1)

        let dayNum
        firstDay.getDay() === 0 ?
            dayNum = (7 - config.firstDayNum) * -1 :
            dayNum = (firstDay.getDay() - config.firstDayNum) * -1

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
                if (importantDates.has(tmpDate)) {
                    th.style.color = 'red'
                }
                const rightNow = new Date()
                if (dayNum === rightNow.getDate() && tmp.getMonth() === rightNow.getMonth() && tmp.getFullYear() === rightNow.getFullYear()) {
                    th.style.backgroundColor = '#0078d7'
                    th.style.outline = '3px #0078d7 solid'
                }
                const holiday = tmp.toLocaleString("ru", {
                    month: 'long',
                    day: 'numeric'
                })
                if(holiday in config.holidays) {
                    th.style.borderColor = config.holidays[holiday]
                }
                th.append(tmp.getDate())
                tr.append(th)
                dayNum++
                th.addEventListener('click', () => {
                    if (th.style.color === 'red') {
                        tmp.getMonth() !== now.getMonth() ?
                            th.style.color = 'gray' :
                            th.style.color = 'white'
                        importantDates.delete(tmpDate)
                    }
                    else {
                        th.style.color = 'red'
                        importantDates.add(tmpDate)
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
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ]

        const firstHeader = document.createElement('div')
        firstHeader.classList.add('header')
        firstHeader.style.height = '30px'
        firstHeader.style.display = 'flex'
        firstHeader.style.justifyContent = 'space-between'
        firstHeader.style.alignItems = 'center'
        firstHeader.style.padding = '0 17px'

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
            config.firstDayNum === 2 ? config.firstDayNum = 1 : config.firstDayNum = 2
            fillFirstHeader()
            refresh(0, config.firstDayNum)
        })

        leftButton.addEventListener('click', () => {
            refresh(-1, config.firstDayNum)
        })
        rightButton.addEventListener('click', () => {
            refresh(1, config.firstDayNum)
        })

        function refresh(direction) {
            [...table.children].forEach((td, ind) => {
                if(ind > 0)
                td.parentNode.removeChild(td)
            })
            now.setMonth(now.getMonth() + direction)
            fillSecondHeader()
            createBody(now)
        }
        {
        // const dataSelect = document.createElement('input')
        // dataSelect.setAttribute('type', 'month')
        // dataSelect.setAttribute('min', '1000-01')
        // dataSelect.style.width = '170px'
        // dataSelect.style.color = 'white'
        // dataSelect.style.fontWeight = 'bold'
        // dataSelect.style.backgroundColor = 'inherit'
        // dataSelect.style.border = 'none'
        // dataSelect.style.fontSize = '16px'
        // if (now.getMonth() < 9) {
        //     dataSelect.value = now.getFullYear() + '-0' + (now.getMonth() + 1)
        // }
        // else {
        //     dataSelect.value = now.getFullYear() + '-' + (now.getMonth() + 1)
        // }
        // dataSelect.addEventListener('change', () => {
        //     let data = dataSelect.value.split('-')
        //     const newDate = new Date(
        //         data[0],
        //         data[1] - 1
        //     )
        //     console.log(data);
        //     table.innerHTML = ''
        //     firstHeader.innerHTML = ''
        //     tableContainer.innerHTML = ''
        //     createCalendar(tableContainer, table, newDate, firstDayNum, holidays)
        // })
        }

        const dataContainer = document.createElement('div')
        dataContainer.style.display = 'flex'
        dataContainer.style.width = '160px'
        dataContainer.style.justifyContent = 'space-between'
        
        const dataSelect = document.createElement('select')
        dataSelect.style.color = 'white'
        dataSelect.style.fontWeight = 'bold'
        dataSelect.style.backgroundColor = 'inherit'
        dataSelect.style.border = 'none'
        dataSelect.style.borderRadius = '5px'
        dataSelect.style.fontSize = '16px'
        months.forEach((month, num) => {
            let option = document.createElement('option')
            option.setAttribute('value', num)
            option.textContent = month
            option.style.backgroundColor = '#26262a'
            option.style.border = 'none'
            dataSelect.options.add(option)
        });

        const yearInput = document.createElement('input')
        fillSecondHeader()
        function fillSecondHeader() {
            dataSelect.value = now.getMonth()
            yearInput.value = now.getFullYear()
        }
        yearInput.style.width = '50px'
        yearInput.style.color = 'white'
        yearInput.style.fontWeight = 'bold'
        yearInput.style.backgroundColor = 'inherit'
        yearInput.style.border = 'none'
        yearInput.style.borderBottom = '1px Solid #c2bfbf'

        yearInput.addEventListener('change', changeDate);
        dataSelect.addEventListener('change', changeDate);
        function changeDate() {
            const string = yearInput.value.match('[0-9]{4}')
            if(string && string[0] == string.input) {
                const newDate = new Date(
                    yearInput.value,
                    dataSelect.value
                )
                dataSelect.selectedOptions = dataSelect.value;

                [...table.children].forEach((td, ind) => {
                    if (ind > 0)
                        td.parentNode.removeChild(td)
                })
                createBody(newDate)
            }
            else {
                yearInput.value = now.getFullYear()
            }
            
        }

        buttonContainer.append(changeButton)
        buttonContainer.append(leftButton)
        buttonContainer.append(rightButton)

        dataContainer.append(dataSelect)
        dataContainer.append(yearInput)

        firstHeader.append(dataContainer)
        firstHeader.append(buttonContainer)
        tableContainer.append(firstHeader)

        const secondHeader = document.createElement('tr')
        fillFirstHeader()
        function fillFirstHeader() {
            secondHeader.innerHTML = ''
            days.forEach((day, ind) => {
                const td = document.createElement('td')
                td.style.height = '30px'
                td.style.padding = '3px'
                td.style.textAlign = 'center'
                td.style.fontWeight = 'bold'
                if (config.firstDayNum === 1) {
                    ind === 0 ? td.textContent = days[6] : td.textContent = days[ind - 1]
                    secondHeader.append(td)
                }
                else {
                    td.textContent = day
                    secondHeader.append(td)
                }
                if (td.textContent === days[5] || td.textContent === days[6]) {
                    td.style.color = 'red'
                }
            })
        }
        table.append(secondHeader)
    }
}



