const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

let currentDate = new Date();
let selectedDate = new Date(currentDate);


document.addEventListener('DOMContentLoaded', function () {
    const selectedDayNameEl = document.getElementById('selected-day-name');
    const selectedDayNumberEl = document.getElementById('selected-day-number');
    const selectedMonthYearEl = document.getElementById('selected-month-year');
    const selectedYearDisplayEl = document.getElementById('selected-year-display');
    const currentMonthEl = document.getElementById('current-month');
    const currentYearEl = document.getElementById('current-year');
    const calendarGridEl = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const prevYearBtn = document.getElementById('prev-year');
    const nextYearBtn = document.getElementById('next-year');
    const clearBtn = document.querySelector('.clear-btn');
    const actionBtns = document.querySelectorAll('.action-btns button');

    /**
     * Actualiza la fecha al hacer click.
     */
    function updateSelectedDateDisplay() {
        selectedDayNameEl.textContent = dayNames[selectedDate.getDay()];
        selectedDayNumberEl.textContent = selectedDate.getDate().toString();
        selectedMonthYearEl.textContent = monthNames[selectedDate.getMonth()];
        selectedYearDisplayEl.textContent = selectedDate.getFullYear().toString();
    }

    /**
     * Genera el calendario y establece la fecha actual como seleccionada
     */
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        currentMonthEl.textContent = monthNames[month];
        currentYearEl.textContent = year.toString();

        const dayElements = calendarGridEl.querySelectorAll('.day, .other-month');
        dayElements.forEach(el => el.remove());

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysInPrevMonth = new Date(year, month, 0).getDate();


        for (let i = firstDayOfMonth; i > 0; i--) {
            const day = daysInPrevMonth - i + 1;
            const dayEl = document.createElement('div');
            dayEl.classList.add('day', 'other-month');
            dayEl.textContent = day.toString();
            calendarGridEl.appendChild(dayEl);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day');
            dayEl.textContent = day.toString();

            if (year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate()) {
                dayEl.classList.add('selected');
            }

            dayEl.addEventListener('click', () => {
                const currentSelected = calendarGridEl.querySelector('.day.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }

                selectedDate = new Date(year, month, day);
                updateSelectedDateDisplay();

                dayEl.classList.add('selected');
            });

            calendarGridEl.appendChild(dayEl);
        }

        const totalCells = calendarGridEl.children.length - 7;
        const remainingCells = (7 - (totalCells % 7)) % 7; // Celdas necesarias para completar la última fila

        for (let i = 1; i <= remainingCells; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('day', 'other-month');
            dayEl.textContent = i.toString();
            calendarGridEl.appendChild(dayEl);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    prevYearBtn.addEventListener('click', () => {
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        renderCalendar();
    });

    nextYearBtn.addEventListener('click', () => {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        renderCalendar();
    });


    clearBtn.addEventListener('click', () => {
        const today = new Date();
        currentDate = new Date(today);
        selectedDate = new Date(today);
        updateSelectedDateDisplay();
        renderCalendar();
    });

    if (actionBtns.length > 0) {
        actionBtns[0].addEventListener('click', () => {
            console.log('Operación cancelada');
        });

        if (actionBtns.length > 1) {
            actionBtns[1].addEventListener('click', () => {
                console.log('Fecha seleccionada:', selectedDate);
            });
        }
    }

    updateSelectedDateDisplay();
    renderCalendar();
});