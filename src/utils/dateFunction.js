export function dateFunction(created) {
    const diff = Date.now() - Number(created)
    const createdDate = new Date(Number(created))

    const oneMin = 1000 * 60
    const fiveMin = oneMin * 5
    const tenMin = oneMin * 10
    const thirtyMin = oneMin * 30
    const oneDay = oneMin * 60 * 24
    const oneYear = oneDay * 365
    if (diff > 0 && diff <= oneMin) {
        return '1 минуту назад'
    } else if (diff > oneMin && diff <= fiveMin) {
        return '5 минут назад'
    } else if (diff > fiveMin && diff <= tenMin) {
        return '10 минут назад'
    } else if (diff > tenMin && diff <= thirtyMin) {
        return '30 минут назад'
    } else if (diff > thirtyMin && diff <= oneDay) {
        return `сегодня ${createdDate.getHours()}:${createdDate.getMinutes()}`
    } else if (diff > oneDay && diff <= oneYear) {
        return `${createdDate.getDay()} ${monthFunction(createdDate.getMonth() + 1)}`
    } else if (diff > oneYear) {
        return `${createdDate.getDay()}.${createdDate.getMonth() + 1}.${createdDate.getFullYear()}`
    }
    return created
}

const monthFunction = (month) => {
    switch (month) {
    case 1:
        return 'января'
    case 2:
        return 'февраля'
    case 3:
        return 'марта'
    case 4:
        return 'апреля'
    case 5:
        return 'мая'
    case 6:
        return 'июня'
    case 7:
        return 'июля'
    case 8:
        return 'августа'
    case 9:
        return 'сентября'
    case 10:
        return 'октября'
    case 11:
        return 'ноября'
    case 12:
        return 'декабря'
    default:
        return 'будущее'
    }
}
