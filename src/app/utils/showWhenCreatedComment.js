import pluralize from './pluralaze'
const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const showWhenCreatedComment = (timeStamp) => {
  timeStamp = Number(timeStamp)
  const dateNow = Date.now()
  const timeBefore = (dateNow - timeStamp) / 1000

  const hours = (timeBefore / (60 * 60)).toFixed(0)
  const min = ((timeBefore % (60 * 60)) / 60).toFixed(0)

  const date = new Date(timeStamp)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  if (timeBefore <= 60) {
    return '1 мин назад'
  }

  if (timeBefore <= (60 * 5)) {
    return '5 мин назад'
  }

  if (timeBefore <= (60 * 10)) {
    return '10 мин назад'
  }

  if (timeBefore <= (60 * 30)) {
    return '30 мин назад'
  }

  if (timeBefore > (60 * 30) && timeBefore < (60 * 60 * 24)) {
    return `${pluralize(hours, ['час', 'часа', 'часов'])} ${min} мин назад`
  }

  if (timeBefore > (60 * 60 * 24) && timeBefore < (60 * 60 * 24 * 365)) {
    return `${day} ${month}`
  }

  if (timeBefore > (60 * 60 * 24 * 365)) {
    return `${day} ${month} ${year} `
  }
}

export default showWhenCreatedComment
